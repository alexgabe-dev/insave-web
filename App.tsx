
import React, { useState, useEffect } from 'react';
import { AlertTriangle, Sparkles } from 'lucide-react';
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

type View = 'home' | 'tactics' | 'consumables' | 'epgp' | 'sr' | 'guides' | 'info' | 'admin' | 'all-progress';

const viewToPath: Record<View, string> = {
  home: '/home',
  tactics: '/tacs',
  consumables: '/consuk',
  epgp: '/epgp',
  sr: '/sr',
  guides: '/guides',
  info: '/infok',
  admin: '/admin',
  'all-progress': '/progress',
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

const CONSUMABLES_STORAGE_KEY = 'insave_consumables_v2';
const TACTICS_STORAGE_KEY = 'insave_tactics_v1';
const PROGRESS_STORAGE_KEY = 'insave_progress_v1';
const HERO_STORAGE_KEY = 'insave_hero_v1';
const OFFICERS_STORAGE_KEY = 'insave_officers_v1';
const GUIDES_STORAGE_KEY = 'insave_guides_v1';

const loadStoredConsumables = () => {
  try {
    const raw = localStorage.getItem(CONSUMABLES_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

const loadStoredTactics = () => {
  try {
    const raw = localStorage.getItem(TACTICS_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

const loadStoredProgress = () => {
  try {
    const raw = localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

const loadStoredHeroConfig = () => {
  try {
    const raw = localStorage.getItem(HERO_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch {
    return null;
  }
};

const loadStoredOfficers = () => {
  try {
    const raw = localStorage.getItem(OFFICERS_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

const loadStoredGuides = () => {
  try {
    const raw = localStorage.getItem(GUIDES_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

const DEFAULT_HERO_CONFIG = {
  title: "INSANE",
  subtitle: "A Turtle WoW legelismertebb magyar PvE közössége.",
  motto: "Fegyelem • Tudás • Győzelem",
  mottoColor: "#a3a3a3",
  showMotto: true,
  bgType: 'video' as 'image' | 'video',
  bgImage: "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?q=80&w=2574&auto=format&fit=crop",
  bgVideo: "https://assets.mixkit.co/videos/preview/mixkit-flying-over-a-snowy-mountain-range-4360-large.mp4",
  bgOpacity: 50,
  showProgressBar: true,
  showProgressButton: true,
  progressLabel: "NAXXRAMAS PROGRESS: 12 / 15",
  progressValue: 80,
  discordUrl: "https://discord.gg/your-invite-link"
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

function App() {
  const [view, setView] = useState<View>(() => pathToView(window.location.pathname));
  const [showDevNotice, setShowDevNotice] = useState(true);
  const [discordAuth, setDiscordAuth] = useState<DiscordAuthState>({ status: 'idle', user: null });
  
  // Centralized State for Admin Editing
  const [officers, setOfficers] = useState(() => loadStoredOfficers() || initialOfficers);
  const [progress, setProgress] = useState(() => loadStoredProgress() || initialProgress);
  const [consumables, setConsumables] = useState(() => loadStoredConsumables() || initialConsumables);
  const [epValues, setEpValues] = useState(initialEpValues);
  const [rules, setRules] = useState([
    { title: "Viselkedés", description: "Légy megértő és tisztelettudó klántársaiddal. A jó hangulat megtartása mindenkinek közös érdeke." },
    { title: "Kommunikáció", description: "A káromkodást mellőzzük a klán chaten. Próbálj kulturáltan kommunikálni." },
    { title: "Aktivitás", description: "Próbálj aktív lenni. Legalább heti 1 klán raiden való részvétel elvárt minden tagtól." },
    { title: "Discord Fegyelem", description: "Raid közben a Discord használata kötelező. Boss harcok alatt csak a Raid Leader beszél." },
    { title: "Felkészülés", description: "A raidekre igyekezz a Consume listát átnézni és használni." },
    { title: "Reputáció", description: "Zul'gurub (Zandalar Tribe) reputációt Revered szintre kell felhúzni." },
  ]);

  const [heroConfig, setHeroConfig] = useState(() => normalizeHeroConfig(loadStoredHeroConfig() || DEFAULT_HERO_CONFIG));

  const [guides, setGuides] = useState(() => loadStoredGuides() || [
    { id: 1, title: "Obsidian Mining Tipp", category: "Szakmák", content: "Bármely fajjal elérhető a +10 Mining skill, ami nélkülözhetetlen az Obsidian bányászatához. Szükséges hozzá: Enchant Gloves (+5), Goblin Mining Pick (+5).", date: "2024.03.10", badge: "Pro Tipp" },
    { id: 2, title: "Level 18 Mount", category: "Szintezés", content: "Keresd Silas Darkmoon-t a Darkmoon Faire idején. A Torta's Egg quest teljesítése után már 18-as szinten saját hátasod lehet!", date: "2024.03.11" },
    { id: 3, title: "Sátrazás és Rested XP", category: "Túlélés", content: "A Survival secondary skill a kulcs a gyors szintezéshez. A sátrak alatt 3x gyorsabban gyűlik a Rested XP városokban.", date: "2024.03.12", badge: "Fontos" },
  ]);

  const [tactics, setTactics] = useState(() => {
    const stored = loadStoredTactics();
    const source = stored || rawInitialTactics;
    return source.map((raid: any) => ({
      ...raid,
      bosses: (raid.bosses || []).map((boss: any) => {
        let description = boss.description;
        if (typeof description !== 'string') {
            description = JSON.stringify([{ 
                id: Math.random(), 
                type: 'text', 
                content: "Kérlek szerkeszd ezt a taktikát az Admin felületen!" 
            }]);
        }
        return { ...boss, description };
      })
    }));
  });

  useEffect(() => {
    const stored = loadDiscordAuth();
    if (stored) {
      setDiscordAuth(stored);
    }

    const hasCallback =
      window.location.search.includes('code=') ||
      window.location.search.includes('error=') ||
      window.location.hash.includes('access_token=');

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
    completeDiscordLogin()
      .then((result) => {
        if (!mounted || !result) {
          return;
        }
        setDiscordAuth(result.auth);
        const targetView = (result.returnTo || 'admin') as any;
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
    window.scrollTo(0, 0);
  }, [view]);

  useEffect(() => {
    try {
      localStorage.setItem(CONSUMABLES_STORAGE_KEY, JSON.stringify(consumables));
    } catch {
      // ignore storage write errors
    }
  }, [consumables]);

  useEffect(() => {
    try {
      localStorage.setItem(TACTICS_STORAGE_KEY, JSON.stringify(tactics));
    } catch {
      // ignore storage write errors
    }
  }, [tactics]);

  useEffect(() => {
    try {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // ignore storage write errors
    }
  }, [progress]);

  useEffect(() => {
    try {
      localStorage.setItem(HERO_STORAGE_KEY, JSON.stringify(heroConfig));
    } catch {
      // ignore storage write errors
    }
  }, [heroConfig]);

  useEffect(() => {
    try {
      localStorage.setItem(OFFICERS_STORAGE_KEY, JSON.stringify(officers));
    } catch {
      // ignore storage write errors
    }
  }, [officers]);

  useEffect(() => {
    try {
      localStorage.setItem(GUIDES_STORAGE_KEY, JSON.stringify(guides));
    } catch {
      // ignore storage write errors
    }
  }, [guides]);

  useEffect(() => {
    const targetPath = viewToPath[view];
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
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

  return (
    <div className="min-h-screen text-slate-200 bg-slate-950 selection:bg-[#c8aa6e] selection:text-black">
      {view !== 'admin' && <Header setView={navigateToView} currentView={view} />}

      {showDevNotice && view !== 'admin' && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/75 backdrop-blur-md p-4 md:p-6">
          <div className="relative w-full max-w-2xl overflow-hidden rounded-2xl md:rounded-3xl border border-[#c8aa6e]/35 bg-gradient-to-b from-[#0f1016] via-[#0b0c12] to-[#08090d] shadow-[0_25px_90px_rgba(0,0,0,0.65)]">
            <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[380px] h-40 bg-[radial-gradient(circle,rgba(200,170,110,0.25),transparent_70%)]" />
            <div className="absolute -bottom-20 right-0 w-[340px] h-44 bg-[radial-gradient(circle,rgba(88,101,242,0.22),transparent_70%)]" />
            <div className="absolute inset-0 bg-grid opacity-[0.07]" />

            <div className="relative z-10 p-5 sm:p-7 md:p-9">
              <div className="flex items-start gap-4">
                <div className="shrink-0 rounded-xl border border-[#c8aa6e]/35 bg-[#c8aa6e]/10 p-3">
                  <AlertTriangle className="w-6 h-6 text-[#e8cf98]" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-[0.35em] text-[#c8aa6e]/85 font-bold cinzel-font mb-2">
                    Fejlesztői értesítés
                  </p>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-black cinzel-font text-white leading-tight">
                    Az oldal még fejlesztés alatt áll
                  </h3>
                </div>
              </div>

              <div className="mt-5 md:mt-6 rounded-xl border border-white/10 bg-black/25 p-4 md:p-5">
                <p className="text-neutral-200 text-sm md:text-base leading-relaxed font-serif">
                  Az oldalon időnként hibák vagy bugok előfordulhatnak. Folyamatosan javítom és finomítom a rendszert,
                  hogy minél stabilabb és gyorsabb élményt adjon.
                </p>
              </div>

              <div className="mt-5 md:mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-neutral-400 font-bold">
                  <Sparkles className="w-4 h-4 text-[#c8aa6e]" />
                  Köszönöm a türelmet
                </div>
                <button
                  type="button"
                  onClick={() => setShowDevNotice(false)}
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-[#c8aa6e]/45 text-[#e8cf98] hover:bg-[#c8aa6e]/12 hover:border-[#c8aa6e]/70 transition-all text-xs uppercase tracking-[0.24em] font-bold cinzel-font"
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
            updaters={{ setOfficers, setProgress, setConsumables, setTactics, setEpValues, setRules, setGuides, setHeroConfig }}
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

