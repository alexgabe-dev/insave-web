import React, { useCallback, useEffect, useState } from 'react';
import { AlertTriangle, Sparkles, X } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import RaidTactics from './components/RaidTactics';
import Consumables from './components/Consumables';
import SrSystem from './components/SrSystem';
import RaidProgress from './components/RaidProgress';
import AllProgress from './components/AllProgress';
import InfoPage from './components/InfoPage';
import Rules from './components/Rules';
import LootSystem from './components/LootSystem';
import Guides from './components/Guides';
import Roster from './components/Roster';
import Footer from './components/Footer';
import AdminDashboard from './components/Admin/AdminDashboard';
import {
  OFFICERS as initialOfficers,
  RAID_PROGRESS_DATA as initialProgress,
  CONSUMABLES_DATA as initialConsumables,
  RAID_TACTICS_DATA as rawInitialTactics,
  EP_VALUES as initialEpValues
} from './constants';
import {
  clearDiscordAuth,
  clearDiscordCallbackParams,
  completeDiscordLogin,
  loadDiscordAuth,
  startDiscordLogin,
  DiscordAuthState
} from './auth/discord';
import { ContentKey, fetchContentSnapshot, saveContentSection } from './utils/contentApi';

type View = 'home' | 'tactics' | 'consumables' | 'epgp' | 'sr' | 'guides' | 'info' | 'admin' | 'all-progress';
const VIEW_STORAGE_KEY = 'insave_last_view_v1';
const DISCORD_CALLBACK_TIMEOUT_MS = 8000;
const DEV_NOTICE_COOKIE_KEY = 'insave_dev_notice_dismissed_v1';
const DEV_NOTICE_COOKIE_MAX_AGE_SEC = 60 * 60 * 24 * 120;

const getCookieValue = (name: string): string | null => {
  if (typeof document === 'undefined') return null;
  const item = document.cookie
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${name}=`));
  if (!item) return null;
  return decodeURIComponent(item.slice(name.length + 1));
};

const isDevNoticeDismissed = (): boolean => getCookieValue(DEV_NOTICE_COOKIE_KEY) === '1';

const persistDevNoticeDismissed = () => {
  if (typeof document === 'undefined') return;
  const isSecure = typeof window !== 'undefined' && window.location.protocol === 'https:';
  const secureFlag = isSecure ? '; Secure' : '';
  document.cookie = `${DEV_NOTICE_COOKIE_KEY}=1; Max-Age=${DEV_NOTICE_COOKIE_MAX_AGE_SEC}; Path=/; SameSite=Lax${secureFlag}`;
};

const DEFAULT_RULES = [
  { title: 'Viselkedés', description: 'Légy megértő és tisztelettudó klántársaiddal. A jó hangulat megtartása mindenkinek közös érdeke.' },
  { title: 'Kommunikáció', description: 'A káromkodást mellőzzük a klán chaten. Próbálj kulturáltan kommunikálni.' },
  { title: 'Aktivitás', description: 'Próbálj aktív lenni. Legalább heti 1 klán raiden való részvétel elvárt minden tagtól.' },
  { title: 'Discord Fegyelem', description: 'Raid közben a Discord használata kötelező. Boss harcok alatt csak a Raid Leader beszél.' },
  { title: 'Felkészülés', description: 'A raidekre igyekezz a Consume listát átnézni és használni.' },
  { title: 'Reputáció', description: 'Zul\'gurub (Zandalar Tribe) reputációt Revered szintre kell felhúzni.' }
];

const DEFAULT_GUIDES = [
  { id: 1, title: 'Obsidian Mining Tipp', category: 'Szakmák', content: 'Bármely fajjal elérhető a +10 Mining skill, ami nélkülözhetetlen az Obsidian bányászatához. Szükséges hozzá: Enchant Gloves (+5), Goblin Mining Pick (+5).', date: '2024.03.10', badge: 'Pro Tipp' },
  { id: 2, title: 'Level 18 Mount', category: 'Szintezés', content: 'Keresd Silas Darkmoon-t a Darkmoon Faire idején. A Torta\'s Egg quest teljesítése után már 18-as szinten saját hátasod lehet!', date: '2024.03.11' },
  { id: 3, title: 'Sátrazás és Rested XP', category: 'Túlélés', content: 'A Survival secondary skill a kulcs a gyors szintezéshez. A sátrak alatt 3x gyorsabban gyűlik a Rested XP városokban.', date: '2024.03.12', badge: 'Fontos' }
];

const DEFAULT_HERO_CONFIG = {
  title: 'INSANE',
  subtitle: 'A Turtle WoW legelismertebb magyar PvE közössége.',
  motto: 'Fegyelem • Tudás • Győzelem',
  mottoColor: '#a3a3a3',
  showMotto: true,
  bgType: 'video' as 'image' | 'video',
  bgImage: 'https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?q=80&w=2574&auto=format&fit=crop',
  bgVideo: 'https://assets.mixkit.co/videos/preview/mixkit-flying-over-a-snowy-mountain-range-4360-large.mp4',
  bgOpacity: 50,
  showProgressBar: true,
  showProgressButton: true,
  progressLabel: 'NAXXRAMAS PROGRESS: 12 / 15',
  progressValue: 80,
  discordUrl: 'https://discord.gg/your-invite-link'
};

const viewToPath: Record<View, string> = {
  home: '/home',
  tactics: '/tacs',
  consumables: '/consuk',
  epgp: '/epgp',
  sr: '/sr',
  guides: '/guides',
  info: '/infok',
  admin: '/admin',
  'all-progress': '/progress'
};

const pathToView = (pathname: string): View => {
  const path = pathname.toLowerCase();
  if (path === '/' || path === '/home') return 'home';
  if (path === '/tacs' || path === '/tactics') return 'tactics';
  if (path === '/consuk' || path === '/consumables') return 'consumables';
  if (path === '/epgp') return 'epgp';
  if (path === '/sr') return 'sr';
  if (path === '/guides' || path === '/hasznos') return 'guides';
  if (path === '/infok' || path === '/info') return 'info';
  if (path === '/admin') return 'admin';
  if (path === '/progress' || path === '/all-progress') return 'all-progress';
  return 'home';
};

const isValidView = (value: unknown): value is View => {
  return typeof value === 'string' && Object.prototype.hasOwnProperty.call(viewToPath, value);
};

const loadStoredView = (): View | null => {
  try {
    const raw = localStorage.getItem(VIEW_STORAGE_KEY);
    return isValidView(raw) ? raw : null;
  } catch {
    return null;
  }
};

const getInitialView = (): View => {
  const fromPath = pathToView(window.location.pathname);
  if (window.location.pathname !== '/' || fromPath !== 'home') {
    return fromPath;
  }
  return loadStoredView() || fromPath;
};

const normalizeHeroConfig = (raw: any) => {
  const value = raw || {};
  const legacyShowProgress = typeof value.showProgress === 'boolean' ? value.showProgress : undefined;
  const hasValidMottoColor = typeof value.mottoColor === 'string' && /^#[0-9a-fA-F]{6}$/.test(value.mottoColor);
  return {
    ...DEFAULT_HERO_CONFIG,
    ...value,
    showProgressBar: typeof value.showProgressBar === 'boolean'
      ? value.showProgressBar
      : (legacyShowProgress ?? DEFAULT_HERO_CONFIG.showProgressBar),
    showProgressButton: typeof value.showProgressButton === 'boolean'
      ? value.showProgressButton
      : (legacyShowProgress ?? DEFAULT_HERO_CONFIG.showProgressButton),
    mottoColor: hasValidMottoColor ? value.mottoColor : DEFAULT_HERO_CONFIG.mottoColor,
    discordUrl: typeof value.discordUrl === 'string' && value.discordUrl.trim()
      ? value.discordUrl
      : DEFAULT_HERO_CONFIG.discordUrl
  };
};

const normalizeTactics = (source: any[]) => {
  return source.map((raid: any) => ({
    ...raid,
    bosses: (raid.bosses || []).map((boss: any) => {
      let description = boss.description;
      if (typeof description !== 'string') {
        description = JSON.stringify([{
          id: Math.random(),
          type: 'text',
          content: 'Kérlek szerkeszd ezt a taktikát az Admin felületen!'
        }]);
      }
      return { ...boss, description };
    })
  }));
};

function App() {
  const [view, setView] = useState<View>(() => getInitialView());
  const [showDevNotice, setShowDevNotice] = useState(() => !isDevNoticeDismissed());
  const [discordAuth, setDiscordAuth] = useState<DiscordAuthState>({ status: 'idle', user: null });
  const [contentError, setContentError] = useState<string | null>(null);

  const [officers, setOfficers] = useState(() => initialOfficers);
  const [progress, setProgress] = useState(() => initialProgress);
  const [consumables, setConsumables] = useState(() => initialConsumables);
  const [epValues, setEpValues] = useState(() => initialEpValues);
  const [rules, setRules] = useState(() => DEFAULT_RULES);
  const [heroConfig, setHeroConfig] = useState(() => normalizeHeroConfig(DEFAULT_HERO_CONFIG));
  const [guides, setGuides] = useState(() => DEFAULT_GUIDES);
  const [tactics, setTactics] = useState(() => normalizeTactics(rawInitialTactics as any[]));

  useEffect(() => {
    let mounted = true;
    const loadRemoteContent = async () => {
      try {
        const snapshot = await fetchContentSnapshot();
        if (!mounted) return;

        const seeds: Array<{ key: ContentKey; value: unknown }> = [];

        if (Array.isArray(snapshot.officers)) {
          setOfficers(snapshot.officers as any);
        } else {
          seeds.push({ key: 'officers', value: initialOfficers });
        }

        if (Array.isArray(snapshot.progress)) {
          setProgress(snapshot.progress as any);
        } else {
          seeds.push({ key: 'progress', value: initialProgress });
        }

        if (Array.isArray(snapshot.consumables)) {
          setConsumables(snapshot.consumables as any);
        } else {
          seeds.push({ key: 'consumables', value: initialConsumables });
        }

        if (Array.isArray(snapshot.epValues)) {
          setEpValues(snapshot.epValues as any);
        } else {
          seeds.push({ key: 'epValues', value: initialEpValues });
        }

        if (Array.isArray(snapshot.rules)) {
          setRules(snapshot.rules as any);
        } else {
          seeds.push({ key: 'rules', value: DEFAULT_RULES });
        }

        if (Array.isArray(snapshot.guides)) {
          setGuides(snapshot.guides as any);
        } else {
          seeds.push({ key: 'guides', value: DEFAULT_GUIDES });
        }

        if (Array.isArray(snapshot.tactics)) {
          setTactics(normalizeTactics(snapshot.tactics as any[]));
        } else {
          seeds.push({ key: 'tactics', value: normalizeTactics(rawInitialTactics as any[]) });
        }

        if (snapshot.heroConfig && typeof snapshot.heroConfig === 'object' && !Array.isArray(snapshot.heroConfig)) {
          setHeroConfig(normalizeHeroConfig(snapshot.heroConfig));
        } else {
          seeds.push({ key: 'heroConfig', value: normalizeHeroConfig(DEFAULT_HERO_CONFIG) });
        }

        if (seeds.length) {
          Promise.allSettled(seeds.map((item) => saveContentSection(item.key, item.value)))
            .catch(() => undefined);
        }
      } catch (err) {
        if (!mounted) return;
        setContentError(err instanceof Error ? err.message : 'Nem sikerült betölteni az adatbázis tartalmát.');
      }
    };

    loadRemoteContent();
    return () => {
      mounted = false;
    };
  }, []);

  const persistSection = useCallback((key: ContentKey, value: unknown) => {
    saveContentSection(key, value)
      .then(() => {
        setContentError(null);
      })
      .catch((err) => {
        setContentError(err instanceof Error ? err.message : 'Mentési hiba történt.');
      });
  }, []);

  const updateOfficers = useCallback((value: any) => {
    setOfficers(value);
    persistSection('officers', value);
  }, [persistSection]);

  const updateProgress = useCallback((value: any) => {
    setProgress(value);
    persistSection('progress', value);
  }, [persistSection]);

  const updateConsumables = useCallback((value: any) => {
    setConsumables(value);
    persistSection('consumables', value);
  }, [persistSection]);

  const updateTactics = useCallback((value: any) => {
    const normalized = normalizeTactics(Array.isArray(value) ? value : []);
    setTactics(normalized);
    persistSection('tactics', normalized);
  }, [persistSection]);

  const updateEpValues = useCallback((value: any) => {
    setEpValues(value);
    persistSection('epValues', value);
  }, [persistSection]);

  const updateRules = useCallback((value: any) => {
    setRules(value);
    persistSection('rules', value);
  }, [persistSection]);

  const updateGuides = useCallback((value: any) => {
    setGuides(value);
    persistSection('guides', value);
  }, [persistSection]);

  const updateHeroConfig = useCallback((value: any) => {
    const normalized = normalizeHeroConfig(value);
    setHeroConfig(normalized);
    persistSection('heroConfig', normalized);
  }, [persistSection]);

  useEffect(() => {
    const stored = loadDiscordAuth();
    if (stored) {
      setDiscordAuth(stored);
    }

    const queryParams = new URLSearchParams(window.location.search);
    const hashParams = new URLSearchParams(window.location.hash.replace('#', ''));
    const hasCallback = Boolean(
      queryParams.get('code')
      || queryParams.get('error')
      || queryParams.get('state')
      || hashParams.get('access_token')
      || hashParams.get('error')
      || hashParams.get('state')
    );

    if (!hasCallback) {
      return;
    }

    setDiscordAuth((prev) => ({
      status: 'loading',
      user: prev.user ?? null,
      accessToken: prev.accessToken ?? null,
      expiresAt: prev.expiresAt ?? null,
      error: null
    }));

    let mounted = true;
    const callbackWithTimeout = Promise.race([
      completeDiscordLogin(),
      new Promise<null>((resolve) => {
        window.setTimeout(() => resolve(null), DISCORD_CALLBACK_TIMEOUT_MS);
      })
    ]);

    callbackWithTimeout
      .then((result) => {
        if (!mounted) {
          return;
        }
        if (!result) {
          const fallbackAuth = loadDiscordAuth();
          if (fallbackAuth) {
            setDiscordAuth(fallbackAuth);
            setView('admin');
          } else {
            setDiscordAuth({
              status: 'error',
              user: null,
              error: 'Discord login callback nem tartalmazott ervenyes tokent.'
            });
          }
          clearDiscordCallbackParams();
          return;
        }
        setDiscordAuth(result.auth);
        const targetView = (result.returnTo || 'admin') as View;
        setView(targetView);
        clearDiscordCallbackParams();
      })
      .catch((err) => {
        if (!mounted) {
          return;
        }
        setDiscordAuth({
          status: 'error',
          user: null,
          error: err instanceof Error ? err.message : 'Discord login failed'
        });
        clearDiscordCallbackParams();
      });

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (discordAuth.status !== 'loading') {
      return;
    }
    const timer = window.setTimeout(() => {
      const stored = loadDiscordAuth();
      if (stored) {
        setDiscordAuth(stored);
        setView('admin');
        clearDiscordCallbackParams();
      }
    }, 1200);
    return () => window.clearTimeout(timer);
  }, [discordAuth.status]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  useEffect(() => {
    const targetPath = viewToPath[view];
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    try {
      localStorage.setItem(VIEW_STORAGE_KEY, view);
    } catch {
      // ignore storage write errors
    }
  }, [view]);

  useEffect(() => {
    const onPopState = () => {
      setView(pathToView(window.location.pathname));
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigateToView = (nextView: View) => {
    setView(nextView);
  };

  const handleDiscordLogin = () => {
    try {
      startDiscordLogin('admin');
    } catch (err) {
      setDiscordAuth({
        status: 'error',
        user: null,
        error: err instanceof Error ? err.message : 'Discord login not configured'
      });
    }
  };

  const handleDiscordLogout = () => {
    clearDiscordAuth();
    setDiscordAuth({ status: 'idle', user: null });
  };

  const dismissDevNotice = useCallback(() => {
    setShowDevNotice(false);
    persistDevNoticeDismissed();
  }, []);

  return (
    <div className="min-h-screen text-slate-200 bg-slate-950 selection:bg-[#c8aa6e] selection:text-black">
      {contentError && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[400] px-4 py-2 bg-red-900/85 border border-red-500/50 text-red-100 text-[10px] uppercase tracking-widest font-bold rounded">
          API/DB hiba: {contentError}
        </div>
      )}

      {view !== 'admin' && (
        <Header
          setView={navigateToView}
          currentView={view}
          discordUrl={heroConfig?.discordUrl}
        />
      )}

      {showDevNotice && view !== 'admin' && (
        <div className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-md p-3 sm:p-6">
          <div className="relative w-full sm:max-w-2xl max-h-[85vh] overflow-hidden rounded-2xl sm:rounded-3xl border border-[#c8aa6e]/35 bg-gradient-to-b from-[#0f1016] via-[#0b0c12] to-[#08090d] shadow-[0_25px_90px_rgba(0,0,0,0.65)]">
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[320px] sm:w-[420px] h-40 bg-[radial-gradient(circle,rgba(200,170,110,0.25),transparent_70%)]" />
            <div className="absolute -bottom-24 right-0 w-[300px] sm:w-[380px] h-44 bg-[radial-gradient(circle,rgba(88,101,242,0.22),transparent_70%)]" />
            <div className="absolute inset-0 bg-grid opacity-[0.07]" />

            <button
              type="button"
              onClick={dismissDevNotice}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 z-20 rounded-full border border-white/10 bg-black/40 p-2 text-neutral-300 hover:text-white hover:border-[#c8aa6e]/60 transition-all"
              aria-label="Bezaras"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative z-10 p-5 sm:p-7 md:p-9 overflow-y-auto max-h-[85vh]">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="shrink-0 rounded-xl border border-[#c8aa6e]/35 bg-[#c8aa6e]/10 p-3">
                  <AlertTriangle className="w-6 h-6 text-[#e8cf98]" />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.35em] text-[#c8aa6e]/85 font-bold cinzel-font mb-2">
                    Fejlesztoi ertesites
                  </p>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black cinzel-font text-white leading-tight">
                    Az oldal még fejlesztés alatt áll
                  </h3>
                </div>
              </div>

              <div className="mt-4 sm:mt-6 rounded-xl border border-white/10 bg-black/25 p-4 md:p-5">
                <p className="text-neutral-200 text-sm md:text-base leading-relaxed font-serif">
                  Az oldalon időnként hibák vagy bugok előfordulhatnak. Folyamatosan javítom és finomítom a rendszert, hogy minél stabilabb és gyorsabb élményt adjon.
                </p>
              </div>

              <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.18em] sm:tracking-[0.22em] text-neutral-400 font-bold">
                  <Sparkles className="w-4 h-4 text-[#c8aa6e]" />
                  Koszonom a turelmet
                </div>
                <button
                  type="button"
                  onClick={dismissDevNotice}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-[#c8aa6e]/45 text-[#e8cf98] hover:bg-[#c8aa6e]/12 hover:border-[#c8aa6e]/70 transition-all text-xs uppercase tracking-[0.22em] font-bold cinzel-font"
                >
                  Rendben
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <main>
        {view === 'home' && (
          <>
            <Hero setView={navigateToView} config={heroConfig} />
            <RaidProgress data={progress} setView={navigateToView} />
            <Rules data={rules} />
            <LootSystem epValues={epValues} />
            <Roster data={officers} />
          </>
        )}
        {view === 'tactics' && (
          <div className="pt-20">
            <RaidTactics data={tactics} />
          </div>
        )}
        {view === 'consumables' && (
          <div className="pt-20">
            <Consumables data={consumables} />
          </div>
        )}
        {view === 'sr' && (
          <div className="pt-20">
            <SrSystem />
          </div>
        )}
        {view === 'epgp' && (
          <div className="pt-20">
            <LootSystem epValues={epValues} />
          </div>
        )}
        {view === 'guides' && (
          <div className="pt-20">
            <Guides data={guides} />
          </div>
        )}
        {view === 'info' && (
          <div className="pt-20">
            <InfoPage />
          </div>
        )}
        {view === 'all-progress' && (
          <div className="pt-20">
            <AllProgress data={progress} setView={navigateToView} />
          </div>
        )}
        {view === 'admin' && (
          <AdminDashboard
            setView={navigateToView}
            data={{ officers, progress, consumables, tactics, epValues, rules, guides, heroConfig }}
            updaters={{
              setOfficers: updateOfficers,
              setProgress: updateProgress,
              setConsumables: updateConsumables,
              setTactics: updateTactics,
              setEpValues: updateEpValues,
              setRules: updateRules,
              setGuides: updateGuides,
              setHeroConfig: updateHeroConfig
            }}
            discordAuth={discordAuth}
            onDiscordLogin={handleDiscordLogin}
            onDiscordLogout={handleDiscordLogout}
          />
        )}
      </main>

      {view !== 'admin' && <Footer setView={navigateToView} />}
    </div>
  );
}

export default App;
