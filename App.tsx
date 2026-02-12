
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import RaidTactics from './components/RaidTactics';
import Consumables from './components/Consumables';
import SrSystem from './components/SrSystem';
import RaidProgress from './components/RaidProgress';
import AllProgress from './components/AllProgress';
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

function App() {
  const [view, setView] = useState<'home' | 'tactics' | 'consumables' | 'epgp' | 'sr' | 'guides' | 'admin' | 'all-progress'>('home');
  const [discordAuth, setDiscordAuth] = useState<DiscordAuthState>({ status: 'idle', user: null });
  
  // Centralized State for Admin Editing
  const [officers, setOfficers] = useState(initialOfficers);
  const [progress, setProgress] = useState(initialProgress);
  const [consumables, setConsumables] = useState(initialConsumables);
  const [epValues, setEpValues] = useState(initialEpValues);
  const [rules, setRules] = useState([
    { title: "Viselkedés", description: "Légy megértő és tisztelettudó klántársaiddal. A jó hangulat megtartása mindenkinek közös érdeke." },
    { title: "Kommunikáció", description: "A káromkodást mellőzzük a klán chaten. Próbálj kulturáltan kommunikálni." },
    { title: "Aktivitás", description: "Próbálj aktív lenni. Legalább heti 1 klán raiden való részvétel elvárt minden tagtól." },
    { title: "Discord Fegyelem", description: "Raid közben a Discord használata kötelező. Boss harcok alatt csak a Raid Leader beszél." },
    { title: "Felkészülés", description: "A raidekre igyekezz a Consume listát átnézni és használni." },
    { title: "Reputáció", description: "Zul'gurub (Zandalar Tribe) reputációt Revered szintre kell felhúzni." },
  ]);

  const [heroConfig, setHeroConfig] = useState({
    title: "INSANE",
    subtitle: "A Turtle WoW legelismertebb magyar PvE közössége.",
    motto: "Fegyelem • Tudás • Győzelem",
    showMotto: true,
    bgType: 'video' as 'image' | 'video',
    bgImage: "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?q=80&w=2574&auto=format&fit=crop",
    bgVideo: "https://assets.mixkit.co/videos/preview/mixkit-flying-over-a-snowy-mountain-range-4360-large.mp4",
    showProgress: true,
    progressLabel: "NAXXRAMAS PROGRESS: 12 / 15",
    progressValue: 80
  });

  const [guides, setGuides] = useState([
    { id: 1, title: "Obsidian Mining Tipp", category: "Szakmák", content: "Bármely fajjal elérhető a +10 Mining skill, ami nélkülözhetetlen az Obsidian bányászatához. Szükséges hozzá: Enchant Gloves (+5), Goblin Mining Pick (+5).", date: "2024.03.10", badge: "Pro Tipp" },
    { id: 2, title: "Level 18 Mount", category: "Szintezés", content: "Keresd Silas Darkmoon-t a Darkmoon Faire idején. A Torta's Egg quest teljesítése után már 18-as szinten saját hátasod lehet!", date: "2024.03.11" },
    { id: 3, title: "Sátrazás és Rested XP", category: "Túlélés", content: "A Survival secondary skill a kulcs a gyors szintezéshez. A sátrak alatt 3x gyorsabban gyűlik a Rested XP városokban.", date: "2024.03.12", badge: "Fontos" },
  ]);

  const [tactics, setTactics] = useState(() => {
    return rawInitialTactics.map(raid => ({
      ...raid,
      bosses: raid.bosses.map(boss => {
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
      {view !== 'admin' && <Header setView={setView} currentView={view} />}
      
      <main>
        {view === 'home' && (
          <>
            <Hero setView={setView} config={heroConfig} />
            <RaidProgress data={progress} setView={setView} />
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
        {view === 'all-progress' && (
          <div className="pt-20">
            <AllProgress data={progress} setView={setView} />
          </div>
        )}
        {view === 'admin' && (
          <AdminDashboard 
            setView={setView}
            data={{ officers, progress, consumables, tactics, epValues, rules, guides, heroConfig }}
            updaters={{ setOfficers, setProgress, setConsumables, setTactics, setEpValues, setRules, setGuides, setHeroConfig }}
            discordAuth={discordAuth}
            onDiscordLogin={handleDiscordLogin}
            onDiscordLogout={handleDiscordLogout}
          />
        )}
      </main>
      
      {view !== 'admin' && <Footer setView={setView} />}
    </div>
  );
}

export default App;
