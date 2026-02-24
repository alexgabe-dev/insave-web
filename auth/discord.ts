export type DiscordUser = {
  id: string;
  username: string;
  discriminator?: string;
  avatar?: string | null;
  global_name?: string | null;
};

export type DiscordAuthState = {
  status: 'idle' | 'loading' | 'authenticated' | 'error';
  user: DiscordUser | null;
  accessToken?: string | null;
  expiresAt?: number | null;
  error?: string | null;
};

type StoredAuth = {
  user: DiscordUser;
  accessToken?: string | null;
  expiresAt?: number | null;
};

const AUTH_STORAGE_KEY = 'discord_auth_v1';
const OAUTH_STATE_KEY = 'discord_oauth_state';
const OAUTH_RETURN_KEY = 'discord_oauth_return_to';
const CALLBACK_CACHE_TTL_MS = 10_000;

const DISCORD_AUTHORIZE_URL = 'https://discord.com/api/oauth2/authorize';
const DISCORD_API_BASE = 'https://discord.com/api';
const DEFAULT_SCOPES = 'identify';
const callbackInFlight = new Map<string, Promise<{ auth: DiscordAuthState; returnTo?: string } | null>>();

const getEnv = (key: string, fallback = '') => {
  const value = (import.meta as any).env?.[key];
  return value ?? fallback;
};

const getRedirectUri = () => getEnv('VITE_DISCORD_REDIRECT_URI', window.location.origin);
const getClientId = () => getEnv('VITE_DISCORD_CLIENT_ID', '');
const getScopes = () => getEnv('VITE_DISCORD_SCOPES', DEFAULT_SCOPES);
const getResponseType = () => getEnv('VITE_DISCORD_RESPONSE_TYPE', 'token');
const getTokenEndpoint = () => getEnv('VITE_DISCORD_TOKEN_ENDPOINT', '');

const createState = () => {
  if (window.crypto?.getRandomValues) {
    const data = new Uint32Array(4);
    window.crypto.getRandomValues(data);
    return Array.from(data).join('-');
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
};

export const getDiscordDisplayName = (user: DiscordUser) => user.global_name || user.username;

export const getDiscordAvatarUrl = (user: DiscordUser, size = 64) => {
  if (!user.avatar) {
    return null;
  }
  return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=${size}`;
};

const saveAuth = (auth: DiscordAuthState) => {
  if (!auth.user) {
    return;
  }
  const stored: StoredAuth = {
    user: auth.user,
    accessToken: auth.accessToken ?? null,
    expiresAt: auth.expiresAt ?? null
  };
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(stored));
};

export const loadDiscordAuth = (): DiscordAuthState | null => {
  const raw = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) {
    return null;
  }
  try {
    const stored = JSON.parse(raw) as StoredAuth;
    if (stored.expiresAt && Date.now() > stored.expiresAt) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return null;
    }
    return {
      status: 'authenticated',
      user: stored.user,
      accessToken: stored.accessToken ?? null,
      expiresAt: stored.expiresAt ?? null
    };
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
};

export const clearDiscordAuth = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
};

export const startDiscordLogin = (returnTo = 'admin') => {
  const clientId = getClientId();
  if (!clientId) {
    throw new Error('Missing VITE_DISCORD_CLIENT_ID');
  }

  const state = createState();
  sessionStorage.setItem(OAUTH_STATE_KEY, state);
  sessionStorage.setItem(OAUTH_RETURN_KEY, returnTo);

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: getRedirectUri(),
    response_type: getResponseType(),
    scope: getScopes(),
    state
  });

  window.location.assign(`${DISCORD_AUTHORIZE_URL}?${params.toString()}`);
};

const fetchDiscordUser = async (accessToken: string, tokenType: string) => {
  const res = await fetch(`${DISCORD_API_BASE}/users/@me`, {
    headers: {
      Authorization: `${tokenType} ${accessToken}`
    }
  });

  if (!res.ok) {
    throw new Error(`Discord user request failed (${res.status})`);
  }

  return (await res.json()) as DiscordUser;
};

const exchangeCodeForToken = async (code: string, redirectUri: string) => {
  const endpoint = getTokenEndpoint();
  if (!endpoint) {
    throw new Error('Missing VITE_DISCORD_TOKEN_ENDPOINT for code flow');
  }

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, redirectUri })
  });

  if (!res.ok) {
    throw new Error(`Token exchange failed (${res.status})`);
  }

  const data = await res.json();
  if (!data?.access_token) {
    throw new Error('Token exchange did not return access_token');
  }

  return data as { access_token: string; token_type?: string; expires_in?: number };
};

export const clearDiscordCallbackParams = () => {
  const url = new URL(window.location.href);
  url.searchParams.delete('code');
  url.searchParams.delete('state');
  url.searchParams.delete('error');
  url.searchParams.delete('error_description');
  url.hash = '';
  window.history.replaceState({}, document.title, url.toString());
};

export const completeDiscordLogin = async (): Promise<{ auth: DiscordAuthState; returnTo?: string } | null> => {
  const callbackSignature = `${window.location.search}|${window.location.hash}`;
  const existing = callbackInFlight.get(callbackSignature);
  if (existing) {
    return existing;
  }

  const run = (async (): Promise<{ auth: DiscordAuthState; returnTo?: string } | null> => {
  const hashParams = new URLSearchParams(window.location.hash.replace('#', ''));
  const queryParams = new URLSearchParams(window.location.search);

  const accessToken = hashParams.get('access_token');
  const tokenType = hashParams.get('token_type') || 'Bearer';
  const expiresIn = parseInt(hashParams.get('expires_in') || '0', 10);
  const code = queryParams.get('code');
  const error = hashParams.get('error') || queryParams.get('error');
  const state = hashParams.get('state') || queryParams.get('state');

  if (!accessToken && !code && !error) {
    return null;
  }

  const storedState = sessionStorage.getItem(OAUTH_STATE_KEY);
  const returnTo = sessionStorage.getItem(OAUTH_RETURN_KEY) || undefined;
  sessionStorage.removeItem(OAUTH_STATE_KEY);
  sessionStorage.removeItem(OAUTH_RETURN_KEY);

  if (state && storedState && state !== storedState) {
    return {
      auth: {
        status: 'error',
        user: null,
        error: 'Invalid Discord state. Please try again.'
      },
      returnTo
    };
  }

  if (error) {
    return {
      auth: {
        status: 'error',
        user: null,
        error: `Discord login failed (${error}).`
      },
      returnTo
    };
  }

  if (accessToken) {
    const user = await fetchDiscordUser(accessToken, tokenType);
    const auth: DiscordAuthState = {
      status: 'authenticated',
      user,
      accessToken,
      expiresAt: expiresIn ? Date.now() + expiresIn * 1000 : null
    };
    saveAuth(auth);
    return { auth, returnTo };
  }

  if (code) {
    const token = await exchangeCodeForToken(code, getRedirectUri());
    const user = await fetchDiscordUser(token.access_token, token.token_type || 'Bearer');
    const auth: DiscordAuthState = {
      status: 'authenticated',
      user,
      accessToken: token.access_token,
      expiresAt: token.expires_in ? Date.now() + token.expires_in * 1000 : null
    };
    saveAuth(auth);
    return { auth, returnTo };
  }

  return null;
  })();

  callbackInFlight.set(callbackSignature, run);
  window.setTimeout(() => {
    callbackInFlight.delete(callbackSignature);
  }, CALLBACK_CACHE_TTL_MS);

  return run;
};
