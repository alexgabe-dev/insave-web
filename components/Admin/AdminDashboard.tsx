
import React, { useMemo, useState, useEffect } from 'react';
import { 
  Settings, Users, Trophy, FlaskConical, Save, Trash2, Plus, 
  LogOut, ChevronRight, LayoutDashboard, Swords, ListChecks, 
  Edit3, ArrowUp, ArrowDown, Sword, Image as ImageIcon, Video, 
  Monitor, ScrollText, CheckCircle, Shield, ShieldCheck, Heart, Wand2, Target, BookOpen,
  AlertTriangle, PlayCircle, Globe, Zap, ExternalLink, X,
  Star, Lock, MessageSquare, ArrowLeft, GripVertical
} from 'lucide-react';
import { DiscordAuthState, getDiscordAvatarUrl, getDiscordDisplayName } from '../../auth/discord';
import { getConsumableIcon } from '../../utils/consumableIcons';
import { CONSUMABLES_CATALOG } from '../../constants';

interface AdminDashboardProps {
  setView: (view: any) => void;
  data: any;
  updaters: any;
  discordAuth: DiscordAuthState;
  onDiscordLogin: () => void;
  onDiscordLogout: () => void;
}

const ADMIN_ACTIVE_TAB_STORAGE_KEY = 'insave_admin_active_tab_v1';
const ADMIN_TABS = ['overview', 'hero', 'roster', 'progress', 'rules', 'tactics', 'consumables', 'guides'] as const;
type AdminTab = typeof ADMIN_TABS[number];

const loadStoredAdminTab = (): AdminTab => {
  try {
    const raw = localStorage.getItem(ADMIN_ACTIVE_TAB_STORAGE_KEY);
    if (raw && (ADMIN_TABS as readonly string[]).includes(raw)) {
      return raw as AdminTab;
    }
  } catch {
    // ignore storage errors
  }
  return 'overview';
};

const AdminDashboard: React.FC<AdminDashboardProps> = ({ setView, data, updaters, discordAuth, onDiscordLogin, onDiscordLogout }) => {
  const isLoggedIn = discordAuth.status === 'authenticated' && !!discordAuth.user;
  const isAuthenticating = discordAuth.status === 'loading';
  const [activeTab, setActiveTab] = useState<AdminTab>(() => loadStoredAdminTab());
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const avatarUrl = discordAuth.user ? getDiscordAvatarUrl(discordAuth.user, 64) : null;
  const displayName = discordAuth.user ? getDiscordDisplayName(discordAuth.user) : '';

  useEffect(() => {
    try {
      localStorage.setItem(ADMIN_ACTIVE_TAB_STORAGE_KEY, activeTab);
    } catch {
      // ignore storage errors
    }
  }, [activeTab]);

  const triggerSaveFeedback = () => {
    setSaveStatus('Mentve');
    setTimeout(() => setSaveStatus(null), 2000);
  };

  const menuItems = [
    { id: 'overview', label: 'Áttekintés', icon: <LayoutDashboard size={18} /> },
    { id: 'hero', label: 'Hero Szekció', icon: <Monitor size={18} /> },
    { id: 'roster', label: 'Vezetőség', icon: <Users size={18} /> },
    { id: 'progress', label: 'Progress', icon: <Trophy size={18} /> },
    { id: 'rules', label: 'Szabályzat', icon: <ListChecks size={18} /> },
    { id: 'tactics', label: 'Taktikák', icon: <Swords size={18} /> },
    { id: 'guides', label: 'Hasznos', icon: <ScrollText size={18} /> },
    { id: 'consumables', label: 'Consumables', icon: <FlaskConical size={18} /> },
  ];

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
        {/* Cinematic Login Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#c8aa6e]/5 blur-[120px] rounded-full animate-pulse"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent,_#050505)]"></div>
          <div className="absolute inset-0 bg-grid opacity-5"></div>
        </div>

        <div className="w-full max-w-md relative z-10">
          <div className="bg-[#0a0a0b] border border-white/5 p-10 fantasy-border shadow-2xl text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="absolute inset-0 bg-[#c8aa6e]/20 blur-xl rounded-full"></div>
                <div className="relative w-20 h-20 bg-black border border-[#c8aa6e]/30 flex items-center justify-center rotate-45 group transition-transform hover:rotate-90 duration-500">
                  <Lock className="-rotate-45 text-[#c8aa6e]" size={32} />
                </div>
              </div>
            </div>

            <h2 className="text-3xl font-black cinzel-font text-white mb-3 uppercase tracking-widest">
              Zárt <span className="text-[#c8aa6e]">Terület</span>
            </h2>
            <p className="text-neutral-500 font-serif italic mb-10">
              A parancsnoki híd eléréséhez hitelesítés szükséges. Csak az INSANE vezetőség számára.
            </p>

            <button
              onClick={onDiscordLogin}
              disabled={isAuthenticating}
              className={`w-full group relative flex items-center justify-center gap-4 py-5 bg-[#5865F2] hover:bg-[#4752C4] transition-all duration-500 rounded-sm overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isAuthenticating ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <MessageSquare size={20} className="text-white group-hover:scale-110 transition-transform" />
                  <span className="cinzel-font font-bold text-[11px] text-white uppercase tracking-[0.3em]">Discord Belépés</span>
                </>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
            {discordAuth.status === 'error' && discordAuth.error && (
              <p className="mt-4 text-[10px] text-red-400 uppercase tracking-widest">
                {discordAuth.error}
              </p>
            )}

            <div className="mt-10 flex flex-col gap-4">
              <button 
                onClick={() => setView('home')}
                className="flex items-center justify-center gap-2 text-[10px] font-bold cinzel-font text-neutral-600 hover:text-[#c8aa6e] transition-colors uppercase tracking-widest"
              >
                <ArrowLeft size={14} /> Vissza a biztonságba
              </button>
              <div className="h-px w-12 bg-white/5 mx-auto"></div>
              <p className="text-[9px] text-neutral-800 uppercase tracking-widest font-black">Az összes kísérlet naplózva lesz</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#050505] text-neutral-300">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0a0a0b] border-r border-white/5 flex flex-col shrink-0">
        <div className="p-8 border-b border-white/5 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[#c8aa6e]">
            <Settings size={20} className="animate-spin-slow" />
            <span className="cinzel-font font-bold tracking-widest">CONTROL</span>
          </div>
          <span className="text-[9px] text-neutral-600 uppercase tracking-widest">INSANE Admin Portal</span>
          {isLoggedIn && discordAuth.user && (
            <div className="mt-4 flex items-center gap-3">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={displayName}
                  className="w-8 h-8 rounded-full border border-white/10"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10" />
              )}
              <div className="flex flex-col">
                <span className="text-[9px] text-neutral-600 uppercase tracking-widest">Signed in</span>
                <span className="text-xs text-neutral-200">{displayName}</span>
              </div>
            </div>
          )}
        </div>

        <nav className="flex-grow p-4 space-y-1 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveTab(item.id as any)}
              className={`w-full flex items-center justify-between p-3 rounded-sm transition-all ${
                activeTab === item.id 
                ? 'bg-[#c8aa6e] text-black font-bold' 
                : 'text-neutral-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="cinzel-font text-[10px] uppercase tracking-widest">{item.label}</span>
              </div>
              {activeTab === item.id && <ChevronRight size={14} />}
            </button>
          ))}
        </nav>

        {isLoggedIn && (
          <button 
            type="button"
            onClick={onDiscordLogout}
            className="p-6 border-t border-white/5 flex items-center gap-3 text-neutral-400 hover:bg-white/5 transition-colors cinzel-font text-[10px] font-bold uppercase tracking-widest"
          >
            <Lock size={16} /> Discord Logout
          </button>
        )}

        <button 
          type="button"
          onClick={() => setView('home')} 
          className="p-6 border-t border-white/5 flex items-center gap-3 text-red-500 hover:bg-red-500/5 transition-colors cinzel-font text-[10px] font-bold uppercase tracking-widest"
        >
          <LogOut size={16} /> Kilépés
        </button>
      </aside>

      {/* Main Area */}
      <main className="flex-grow overflow-y-auto bg-[radial-gradient(circle_at_top_right,_rgba(200,170,110,0.03),_transparent)] relative p-12">
        {saveStatus && (
          <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[200] bg-[#c8aa6e] text-black px-6 py-2 rounded-full flex items-center gap-2 shadow-[0_0_30px_rgba(200,170,110,0.4)] animate-fade-in font-bold cinzel-font text-xs uppercase tracking-widest">
            <CheckCircle size={16} /> {saveStatus}
          </div>
        )}

        <div className="max-w-5xl mx-auto">
          {activeTab === 'overview' && <OverviewTab data={data} />}
          {activeTab === 'hero' && <HeroEditor config={data.heroConfig} onSave={(val: any) => { updaters.setHeroConfig(val); triggerSaveFeedback(); }} />}
          {activeTab === 'rules' && <RulesEditor rules={data.rules} onSave={(val: any) => { updaters.setRules(val); triggerSaveFeedback(); }} />}
          {activeTab === 'roster' && <RosterEditor officers={data.officers} onSave={(val: any) => { updaters.setOfficers(val); triggerSaveFeedback(); }} />}
          {activeTab === 'progress' && <ProgressEditor progress={data.progress} onSave={(val: any) => { updaters.setProgress(val); triggerSaveFeedback(); }} />}
          {activeTab === 'tactics' && <TacticsEditor tactics={data.tactics} onSave={(val: any) => { updaters.setTactics(val); triggerSaveFeedback(); }} />}
          {activeTab === 'guides' && <GuidesEditor guides={data.guides} onSave={(val: any) => { updaters.setGuides(val); triggerSaveFeedback(); }} />}
          {activeTab === 'consumables' && <ConsumablesEditor consumables={data.consumables} onSave={(val: any) => { updaters.setConsumables(val); triggerSaveFeedback(); }} />}
        </div>
      </main>
    </div>
  );
};

// --- ICON ONLY SAVE BUTTON ---
const SaveIconBtn = ({ onClick }: { onClick: () => void }) => (
  <button 
    type="button"
    onClick={(e) => { e.preventDefault(); onClick(); }}
    className="fixed bottom-4 right-4 z-[260] p-3 bg-[#c8aa6e] text-black rounded-full hover:bg-[#e5d5b0] transition-all shadow-[0_5px_15px_rgba(0,0,0,0.3)] active:scale-90 hover:shadow-[0_0_20px_rgba(200,170,110,0.4)] md:bottom-8 md:right-8"
    title="Változtatások mentése"
  >
    <Save size={20} />
  </button>
);

const ProgressEditor = ({ progress, onSave }: any) => {
  const [local, setLocal] = useState([...progress]);
  const [selectedRaidIdx, setSelectedRaidIdx] = useState(0);
  const [search, setSearch] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    setLocal(JSON.parse(JSON.stringify(progress)));
    setSelectedRaidIdx((prev) => {
      if (!progress.length) return 0;
      return Math.min(prev, progress.length - 1);
    });
    setSearch('');
    setHasUnsavedChanges(false);
    setUploadError(null);
  }, [progress]);

  useEffect(() => {
    if (!local.length) {
      setSelectedRaidIdx(0);
      return;
    }
    if (selectedRaidIdx > local.length - 1) {
      setSelectedRaidIdx(local.length - 1);
    }
  }, [local, selectedRaidIdx]);

  const markDirty = () => setHasUnsavedChanges(true);

  const updateRaid = (idx: number, field: string, val: any) => {
    setLocal(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      if (!next[idx]) return prev;
      next[idx][field] = val;
      if (field === 'total') {
        next[idx].total = Math.max(1, Number(next[idx].total) || 1);
        next[idx].current = Math.min(Math.max(0, Number(next[idx].current) || 0), next[idx].total);
      }
      if (field === 'current') {
        next[idx].current = Math.min(Math.max(0, Number(next[idx].current) || 0), Math.max(1, Number(next[idx].total) || 1));
      }
      return next;
    });
    markDirty();
  };

  const addRaid = () => {
    setLocal(prev => [
      ...prev,
      {
        name: 'Uj Raid',
        current: 0,
        total: 10,
        status: 'Progress',
        color: 'text-red-500',
        barColor: 'bg-red-600',
        img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2568&auto=format&fit=crop',
        featured: false
      }
    ]);
    setSelectedRaidIdx(local.length);
    markDirty();
  };

  const removeRaid = (idx: number) => {
    if (!confirm('Biztosan torolni akarod ezt a raidet?')) return;
    setLocal(prev => prev.filter((_: any, i: number) => i !== idx));
    setSelectedRaidIdx((prev) => Math.max(0, idx === prev ? prev - 1 : prev));
    markDirty();
  };

  const moveRaid = (idx: number, dir: 'up' | 'down') => {
    setLocal(prev => {
      const next = [...prev];
      const swap = dir === 'up' ? idx - 1 : idx + 1;
      if (swap < 0 || swap >= next.length) return prev;
      [next[idx], next[swap]] = [next[swap], next[idx]];
      return next;
    });
    setSelectedRaidIdx(dir === 'up' ? Math.max(0, idx - 1) : Math.min(local.length - 1, idx + 1));
    markDirty();
  };

  const handleSave = () => {
    onSave(local);
    setHasUnsavedChanges(false);
  };

  const readFileAsDataUrl = (file: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error('Nem sikerult beolvasni a fajlt.'));
    reader.readAsDataURL(file);
  });

  const optimizeImageForStorage = (file: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const maxSize = 1400;
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
        const width = Math.max(1, Math.round(img.width * scale));
        const height = Math.max(1, Math.round(img.height * scale));
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Nem sikerult a kep optimalizalasa.'));
          return;
        }
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/webp', 0.82);
        resolve(dataUrl);
      };
      img.onerror = () => reject(new Error('Nem sikerult feldolgozni a kepet.'));
      img.src = String(reader.result || '');
    };
    reader.onerror = () => reject(new Error('Nem sikerult beolvasni a fajlt.'));
    reader.readAsDataURL(file);
  });

  const handleRaidImageUpload = async (idx: number, file?: File | null) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setUploadError('Csak kep fajl toltheto fel.');
      return;
    }
    setUploadError(null);
    try {
      const dataUrl = await optimizeImageForStorage(file);
      updateRaid(idx, 'img', dataUrl);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Nem sikerult beolvasni a fajlt.');
    }
  };

  const featuredCount = local.filter((r: any) => r.featured).length;
  const selectedRaid = local[selectedRaidIdx];
  const selectedProgressPct = selectedRaid?.total > 0 ? Math.round(((selectedRaid?.current || 0) / selectedRaid.total) * 100) : 0;

  const filteredRaids = local
    .map((raid: any, idx: number) => ({ raid, idx }))
    .filter(({ raid }) => {
      const q = search.trim().toLowerCase();
      if (!q) return true;
      return String(raid.name || '').toLowerCase().includes(q);
    });

  return (
    <div className="space-y-8 animate-fade-in pb-20">
      <div className="flex items-center justify-between border-b border-white/5 pb-6">
        <div>
          <h2 className="text-3xl font-bold cinzel-font text-white uppercase tracking-widest">Raid Progress</h2>
          <p className="text-neutral-500 italic text-xs mt-1">Attekintheto lista + reszletes szerkeszto panel.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className={`flex items-center gap-2 px-4 py-2 border rounded text-[10px] font-bold uppercase tracking-widest transition-all ${featuredCount > 3 ? 'bg-red-900/20 border-red-500 text-red-400' : 'bg-[#c8aa6e]/10 border-[#c8aa6e]/20 text-[#c8aa6e]'}`}>
            <Star size={14} className={featuredCount > 3 ? 'animate-pulse' : ''} />
            Kiemelt: {featuredCount}/3
          </div>
          {hasUnsavedChanges && (
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#c8aa6e]">Nem mentett valtozasok</span>
          )}
          <button type="button" onClick={addRaid} className="p-3 bg-white/5 hover:bg-white/10 text-[#c8aa6e] rounded-full transition-all border border-white/5">
            <Plus size={20} />
          </button>
          <SaveIconBtn onClick={handleSave} />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-[#0a0a0b] border border-white/5 p-4">
          <p className="text-[10px] uppercase tracking-widest text-neutral-600 font-bold mb-1">Raid Szam</p>
          <p className="text-2xl cinzel-font text-white font-bold">{local.length}</p>
        </div>
        <div className="bg-[#0a0a0b] border border-white/5 p-4">
          <p className="text-[10px] uppercase tracking-widest text-neutral-600 font-bold mb-1">Kiemelt Raid</p>
          <p className="text-2xl cinzel-font text-white font-bold">{featuredCount}</p>
        </div>
        <div className="bg-[#0a0a0b] border border-white/5 p-4">
          <p className="text-[10px] uppercase tracking-widest text-neutral-600 font-bold mb-1">Aktiv Progress</p>
          <p className="text-2xl cinzel-font text-white font-bold">{selectedRaid ? `${selectedProgressPct}%` : '-'}</p>
        </div>
      </div>

      {uploadError && (
        <div className="text-[10px] text-red-400 uppercase tracking-widest">{uploadError}</div>
      )}

      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 bg-[#0a0a0b] border border-white/5 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs uppercase tracking-widest text-neutral-500 font-bold cinzel-font">Raid Lista</h3>
            <span className="text-[10px] text-neutral-600 uppercase tracking-widest">{filteredRaids.length}</span>
          </div>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Kereses raid nevre..."
            className="w-full bg-black border border-white/10 p-3 rounded text-xs text-neutral-300 outline-none focus:border-[#c8aa6e]"
          />
          <div className="space-y-2 max-h-[560px] overflow-y-auto custom-scrollbar pr-1">
            {filteredRaids.map(({ raid, idx }: any) => {
              const pct = raid.total > 0 ? Math.round((raid.current / raid.total) * 100) : 0;
              const active = idx === selectedRaidIdx;
              return (
                <button
                  key={`${raid.name}-${idx}`}
                  type="button"
                  onClick={() => setSelectedRaidIdx(idx)}
                  className={`w-full text-left p-3 border rounded-sm transition-all ${
                    active ? 'border-[#c8aa6e] bg-[#c8aa6e]/10' : 'border-white/10 bg-black/20 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`font-bold cinzel-font text-sm truncate ${active ? 'text-[#c8aa6e]' : 'text-white'}`}>{raid.name}</span>
                    {raid.featured && <Star size={12} className="text-[#c8aa6e]" />}
                  </div>
                  <div className="h-2 w-full bg-black border border-white/5 rounded-full overflow-hidden p-[1px]">
                    <div className={`h-full ${raid.barColor || 'bg-red-600'}`} style={{ width: `${pct}%` }} />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[10px] uppercase tracking-widest">
                    <span className={raid.status === 'Farmed' ? 'text-green-400' : 'text-red-400'}>{raid.status}</span>
                    <span className="text-neutral-500">{raid.current}/{raid.total}</span>
                  </div>
                </button>
              );
            })}
            {!filteredRaids.length && (
              <p className="text-xs text-neutral-500 p-3 border border-white/10 bg-black/20 rounded-sm">Nincs talalat.</p>
            )}
          </div>
        </div>

        <div className="lg:col-span-8 bg-[#0a0a0b] border border-white/5 p-6">
          {!selectedRaid ? (
            <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-lg">
              <Trophy size={48} className="mx-auto text-neutral-800 mb-4" />
              <p className="text-neutral-600 cinzel-font">Nincs raid rogzitve. Kattints a + gombra.</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="min-w-0">
                  <p className="text-[10px] uppercase tracking-widest text-neutral-600 font-bold mb-1">Szerkesztett raid</p>
                  <input
                    value={selectedRaid.name}
                    onChange={e => updateRaid(selectedRaidIdx, 'name', e.target.value)}
                    className="w-full text-2xl font-bold bg-transparent cinzel-font text-white outline-none"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => moveRaid(selectedRaidIdx, 'up')} className="p-2 border border-white/10 text-neutral-400 hover:text-white hover:border-white/20 rounded-sm"><ArrowUp size={14} /></button>
                  <button type="button" onClick={() => moveRaid(selectedRaidIdx, 'down')} className="p-2 border border-white/10 text-neutral-400 hover:text-white hover:border-white/20 rounded-sm"><ArrowDown size={14} /></button>
                  <button type="button" onClick={() => removeRaid(selectedRaidIdx)} className="px-3 py-2 border border-red-900/50 text-red-400 hover:bg-red-900/20 rounded-sm text-[10px] uppercase tracking-widest font-bold">
                    <Trash2 size={12} className="inline mr-1" /> Torles
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label className="block space-y-1">
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Statusz</span>
                    <select
                      value={selectedRaid.status}
                      onChange={e => updateRaid(selectedRaidIdx, 'status', e.target.value)}
                      className="w-full bg-black border border-white/10 p-3 rounded text-[10px] uppercase font-bold tracking-widest outline-none focus:border-[#c8aa6e]"
                    >
                      <option value="Progress">Progress</option>
                      <option value="Farmed">Cleared / Farmed</option>
                    </select>
                  </label>

                  <div className="grid grid-cols-2 gap-3">
                    <label className="block space-y-1">
                      <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Aktualis Boss</span>
                      <input
                        type="number"
                        min={0}
                        max={Math.max(1, Number(selectedRaid.total) || 1)}
                        value={selectedRaid.current}
                        onChange={e => updateRaid(selectedRaidIdx, 'current', parseInt(e.target.value, 10) || 0)}
                        className="w-full bg-black border border-white/10 p-3 rounded text-center text-lg font-bold cinzel-font"
                      />
                    </label>
                    <label className="block space-y-1">
                      <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Osszes Boss</span>
                      <input
                        type="number"
                        min={1}
                        value={selectedRaid.total}
                        onChange={e => updateRaid(selectedRaidIdx, 'total', parseInt(e.target.value, 10) || 1)}
                        className="w-full bg-black border border-white/10 p-3 rounded text-center text-lg font-bold cinzel-font"
                      />
                    </label>
                  </div>

                  <div className="p-3 bg-black/40 border border-white/10 rounded flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star size={13} className={selectedRaid.featured ? 'text-[#c8aa6e]' : 'text-neutral-700'} />
                      <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Kiemelt Kartya</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => updateRaid(selectedRaidIdx, 'featured', !selectedRaid.featured)}
                      className={`w-10 h-5 rounded-full relative transition-colors ${selectedRaid.featured ? 'bg-[#c8aa6e]' : 'bg-neutral-800'}`}
                    >
                      <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${selectedRaid.featured ? 'right-1' : 'left-1'}`} />
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Progress Elonezet ({selectedProgressPct}%)</span>
                      <div className="flex gap-2">
                        <button type="button" onClick={() => updateRaid(selectedRaidIdx, 'barColor', 'bg-red-600')} className={`w-4 h-4 rounded-full bg-red-600 border ${selectedRaid.barColor === 'bg-red-600' ? 'border-white' : 'border-transparent'}`} />
                        <button type="button" onClick={() => updateRaid(selectedRaidIdx, 'barColor', 'bg-[#c8aa6e]')} className={`w-4 h-4 rounded-full bg-[#c8aa6e] border ${selectedRaid.barColor === 'bg-[#c8aa6e]' ? 'border-white' : 'border-transparent'}`} />
                        <button type="button" onClick={() => updateRaid(selectedRaidIdx, 'barColor', 'bg-green-600')} className={`w-4 h-4 rounded-full bg-green-600 border ${selectedRaid.barColor === 'bg-green-600' ? 'border-white' : 'border-transparent'}`} />
                      </div>
                    </div>
                    <div className="h-3 w-full bg-black border border-white/5 rounded-full overflow-hidden p-[1px]">
                      <div
                        className={`h-full ${selectedRaid.barColor || 'bg-red-600'} transition-all duration-500`}
                        style={{ width: `${selectedProgressPct}%` }}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Boritokep</span>
                      <ImageIcon size={14} className="text-neutral-700" />
                    </div>
                    <label className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-white/10 text-[10px] font-bold cinzel-font uppercase tracking-widest text-neutral-400 hover:text-white hover:border-[#c8aa6e]/40 transition-all cursor-pointer rounded">
                      <ImageIcon size={12} /> Kep Feltoltes
                      <input
                        type="file"
                        accept="image/*"
                        onChange={e => handleRaidImageUpload(selectedRaidIdx, e.target.files?.[0])}
                        className="hidden"
                      />
                    </label>
                  </div>

                  {selectedRaid.img && (
                    <div className="border border-white/10 rounded overflow-hidden bg-black/30">
                      <img src={selectedRaid.img} alt={selectedRaid.name} className="w-full h-36 object-cover" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const HeroEditor = ({ config, onSave }: any) => {
  const normalizeHeroConfig = (val: any) => ({
    ...val,
    mottoColor: typeof val?.mottoColor === 'string' && /^#[0-9a-fA-F]{6}$/.test(val.mottoColor)
      ? val.mottoColor
      : '#a3a3a3',
    bgOpacity: typeof val?.bgOpacity === 'number' ? val.bgOpacity : 50,
    showProgressBar: typeof val?.showProgressBar === 'boolean'
      ? val.showProgressBar
      : (typeof val?.showProgress === 'boolean' ? val.showProgress : true),
    showProgressButton: typeof val?.showProgressButton === 'boolean'
      ? val.showProgressButton
      : (typeof val?.showProgress === 'boolean' ? val.showProgress : true),
    discordUrl: typeof val?.discordUrl === 'string' && val.discordUrl.trim()
      ? val.discordUrl
      : 'https://discord.gg/your-invite-link'
  });
  const [local, setLocal] = useState(normalizeHeroConfig(config));
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  useEffect(() => { 
    setLocal(normalizeHeroConfig(config)); 
    setHasUnsavedChanges(false);
    setUploadError(null);
  }, [config]);

  const readFileAsDataUrl = (file: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error('Nem sikerult beolvasni a fajlt.'));
    reader.readAsDataURL(file);
  });

  const handleImageUpload = async (file?: File | null) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setUploadError('Csak kep fajl toltheto fel.');
      return;
    }
    setUploadError(null);
    try {
      const dataUrl = await readFileAsDataUrl(file);
      setLocal(prev => ({ ...prev, bgType: 'image', bgImage: dataUrl }));
      setHasUnsavedChanges(true);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Nem sikerult beolvasni a fajlt.');
    }
  };

  const handleVideoUpload = async (file?: File | null) => {
    if (!file) return;
    if (!file.type.startsWith('video/')) {
      setUploadError('Csak video fajl toltheto fel.');
      return;
    }
    setUploadError(null);
    try {
      const dataUrl = await readFileAsDataUrl(file);
      setLocal(prev => ({ ...prev, bgType: 'video', bgVideo: dataUrl }));
      setHasUnsavedChanges(true);
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Nem sikerult beolvasni a fajlt.');
    }
  };

  const updateLocal = (patch: Record<string, any>) => {
    setLocal((prev: any) => ({ ...prev, ...patch }));
    setHasUnsavedChanges(true);
  };

  const handleSave = () => {
    onSave(local);
    setHasUnsavedChanges(false);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      <div className="flex items-center justify-between border-b border-white/5 pb-6">
        <div>
          <h2 className="text-3xl font-bold cinzel-font text-white uppercase tracking-widest flex items-center gap-2">
            <Monitor size={22} className="text-[#c8aa6e]" /> Hero Szekcio
          </h2>
          <p className="text-neutral-500 italic text-xs mt-1">Tartalom, hatter es progress beallitasok egy helyen.</p>
        </div>
        <div className="flex items-center gap-4">
          {hasUnsavedChanges && (
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#c8aa6e]">Nem mentett valtozasok</span>
          )}
          <SaveIconBtn onClick={handleSave} />
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 bg-[#0a0a0b] border border-white/5 space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-neutral-400 font-bold cinzel-font flex items-center gap-2">
              <ScrollText size={14} className="text-[#c8aa6e]" /> Tartalom
            </h3>
            <label className="block space-y-2">
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Klán Név</span>
              <input value={local.title} onChange={e => updateLocal({ title: e.target.value })} className="w-full bg-black border border-white/10 p-4 rounded text-white cinzel-font outline-none focus:border-[#c8aa6e]" />
            </label>
            <label className="block space-y-2">
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Bemutatkozó szöveg</span>
              <textarea value={local.subtitle} onChange={e => updateLocal({ subtitle: e.target.value })} className="w-full bg-black border border-white/10 p-4 rounded text-neutral-300 h-24 outline-none focus:border-[#c8aa6e]" />
            </label>
            <div className="p-4 bg-black/40 border border-white/10 rounded space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Motto lathatosag</span>
                <button type="button" onClick={() => updateLocal({ showMotto: !(local.showMotto !== false) })} className={`w-10 h-5 rounded-full relative transition-colors ${local.showMotto !== false ? 'bg-green-600' : 'bg-neutral-800'}`}>
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${local.showMotto !== false ? 'right-1' : 'left-1'}`} />
                </button>
              </div>
              {local.showMotto !== false && (
                <div className="space-y-3 animate-fade-in">
                  <label className="block space-y-2">
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Motto szovege</span>
                    <input
                      value={local.motto}
                      onChange={e => updateLocal({ motto: e.target.value })}
                      placeholder="pl: Fegyelem • Tudas • Gyozelem"
                      className="w-full bg-black border border-white/10 p-3 rounded text-neutral-300 text-xs outline-none focus:border-[#c8aa6e]"
                    />
                  </label>
                  <label className="block space-y-2">
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Motto szine</span>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={local.mottoColor || '#a3a3a3'}
                        onChange={e => updateLocal({ mottoColor: e.target.value })}
                        className="h-10 w-12 bg-black border border-white/10 rounded p-1 cursor-pointer"
                      />
                      <input
                        value={local.mottoColor || '#a3a3a3'}
                        onChange={e => updateLocal({ mottoColor: e.target.value })}
                        placeholder="#a3a3a3"
                        className="w-full bg-black border border-white/10 p-3 rounded text-neutral-300 text-xs uppercase outline-none focus:border-[#c8aa6e]"
                      />
                    </div>
                  </label>
                </div>
              )}
            </div>
          </div>

          <div className="p-6 bg-[#0a0a0b] border border-white/5 space-y-6">
            <h3 className="text-xs uppercase tracking-widest text-neutral-400 font-bold cinzel-font flex items-center gap-2">
              {local.bgType === 'image' ? <ImageIcon size={14} className="text-[#c8aa6e]" /> : <Video size={14} className="text-[#c8aa6e]" />}
              Hatter Beallitasok
            </h3>
            <div className="flex gap-2">
              <button type="button" onClick={() => updateLocal({ bgType: 'image' })} className={`flex-grow py-3 border text-[10px] font-bold cinzel-font transition-all ${local.bgType === 'image' ? 'bg-[#c8aa6e] text-black border-[#c8aa6e]' : 'text-neutral-500 border-white/5 hover:text-white'}`}>Kep</button>
              <button type="button" onClick={() => updateLocal({ bgType: 'video' })} className={`flex-grow py-3 border text-[10px] font-bold cinzel-font transition-all ${local.bgType === 'video' ? 'bg-[#c8aa6e] text-black border-[#c8aa6e]' : 'text-neutral-500 border-white/5 hover:text-white'}`}>Video</button>
            </div>
            <label className="block space-y-2">
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Forras URL</span>
              <input
                value={local.bgType === 'image' ? local.bgImage : local.bgVideo}
                onChange={e => updateLocal({ [local.bgType === 'image' ? 'bgImage' : 'bgVideo']: e.target.value })}
                placeholder={local.bgType === 'image' ? 'Kep URL...' : 'Video .mp4 URL...'}
                className="w-full bg-black border border-white/10 p-3 rounded text-xs text-neutral-300 outline-none focus:border-[#c8aa6e]"
              />
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <label className="flex items-center justify-center gap-2 px-4 py-3 border border-white/10 text-[10px] font-bold cinzel-font uppercase tracking-widest text-neutral-400 hover:text-white hover:border-[#c8aa6e]/40 transition-all cursor-pointer">
                <ImageIcon size={13} /> Kep Feltoltes
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => handleImageUpload(e.target.files?.[0])}
                  className="hidden"
                />
              </label>
              <label className="flex items-center justify-center gap-2 px-4 py-3 border border-white/10 text-[10px] font-bold cinzel-font uppercase tracking-widest text-neutral-400 hover:text-white hover:border-[#c8aa6e]/40 transition-all cursor-pointer">
                <Video size={13} /> Video Feltoltes
                <input
                  type="file"
                  accept="video/*"
                  onChange={e => handleVideoUpload(e.target.files?.[0])}
                  className="hidden"
                />
              </label>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Hatter Opacitas</span>
                <span className="text-[10px] text-[#c8aa6e] font-bold">{local.bgOpacity}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={local.bgOpacity}
                onChange={e => updateLocal({ bgOpacity: parseInt(e.target.value, 10) || 0 })}
                className="w-full accent-[#c8aa6e]"
              />
            </div>
            <p className="text-[9px] text-neutral-600 uppercase tracking-widest">
              Feltolteskor a fajl beagyazott adat URL-kent mentodik.
            </p>
            {uploadError && (
              <p className="text-[10px] text-red-400 uppercase tracking-widest">{uploadError}</p>
            )}
          </div>

          <div className="p-6 bg-[#0a0a0b] border border-white/5 space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-neutral-400 font-bold cinzel-font flex items-center gap-2">
              <MessageSquare size={14} className="text-[#5865F2]" /> Discord Gomb
            </h3>
            <label className="block space-y-2">
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Discord Meghivo Link</span>
              <input
                value={local.discordUrl || ''}
                onChange={e => updateLocal({ discordUrl: e.target.value })}
                placeholder="https://discord.gg/..."
                className="w-full bg-black border border-white/10 p-3 rounded text-xs text-neutral-300 outline-none focus:border-[#5865F2]"
              />
            </label>
            <p className="text-[9px] text-neutral-600 uppercase tracking-widest">
              Ezt a linket hasznalja a Hero Discord gomb.
            </p>
          </div>

          <div className="p-6 bg-[#0a0a0b] border border-white/5 space-y-4">
            <h3 className="text-xs uppercase tracking-widest text-neutral-400 font-bold cinzel-font flex items-center gap-2">
              <Trophy size={14} className="text-[#c8aa6e]" /> Progress Modul
            </h3>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Progress Bar lathatosaga</span>
              <button type="button" onClick={() => updateLocal({ showProgressBar: !local.showProgressBar })} className={`w-10 h-5 rounded-full relative transition-colors ${local.showProgressBar ? 'bg-green-600' : 'bg-neutral-800'}`}>
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${local.showProgressBar ? 'right-1' : 'left-1'}`} />
              </button>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Progress Gomb lathatosaga</span>
              <button type="button" onClick={() => updateLocal({ showProgressButton: !local.showProgressButton })} className={`w-10 h-5 rounded-full relative transition-colors ${local.showProgressButton ? 'bg-green-600' : 'bg-neutral-800'}`}>
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${local.showProgressButton ? 'right-1' : 'left-1'}`} />
              </button>
            </div>
            {local.showProgressBar && (
              <div className="space-y-4 pt-3 border-t border-white/5 animate-fade-in">
                <label className="block space-y-2">
                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Progress Cimke</span>
                  <input
                    value={local.progressLabel}
                    onChange={e => updateLocal({ progressLabel: e.target.value })}
                    className="w-full bg-black border border-white/10 p-3 rounded text-xs text-neutral-300 outline-none focus:border-[#c8aa6e]"
                  />
                </label>
                <label className="block space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Progress Ertek</span>
                    <span className="text-[10px] text-[#c8aa6e] font-bold">{local.progressValue}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={local.progressValue}
                    onChange={e => updateLocal({ progressValue: parseInt(e.target.value, 10) || 0 })}
                    className="w-full accent-[#c8aa6e]"
                  />
                </label>
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="sticky top-6 p-4 bg-[#0a0a0b] border border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs uppercase tracking-widest text-neutral-400 font-bold cinzel-font flex items-center gap-2">
                <Monitor size={14} className="text-[#c8aa6e]" /> Elo Hero Elonezet
              </h3>
              <span className="text-[9px] uppercase tracking-widest text-neutral-600">Admin Preview</span>
            </div>

            <div className="relative border border-white/10 rounded overflow-hidden min-h-[380px]">
              <div className="absolute inset-0">
                {local.bgType === 'video' ? (
                  <video
                    key={local.bgVideo}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ opacity: (Math.min(100, Math.max(0, local.bgOpacity || 0)) / 100) }}
                    src={local.bgVideo}
                  />
                ) : (
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${local.bgImage}')`, opacity: (Math.min(100, Math.max(0, local.bgOpacity || 0)) / 100) }}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-[#050505]/40" />
              </div>

              <div className="relative z-10 p-6 h-full flex flex-col justify-end gap-3">
                {local.showProgressBar && (
                  <div className="mb-2">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-red-300 font-bold mb-2">{local.progressLabel}</p>
                    <div className="h-[3px] w-full bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-red-700 via-red-500 to-[#c8aa6e]" style={{ width: `${local.progressValue || 0}%` }} />
                    </div>
                  </div>
                )}
                <h4 className="text-4xl font-black cinzel-font text-white leading-none">{local.title || 'INSANE'}</h4>
                <p className="text-sm text-neutral-200 font-serif line-clamp-3">{local.subtitle || 'Bemutatkozo szoveg...'}</p>
                {local.showMotto !== false && (
                  <p className="text-[10px] uppercase tracking-[0.25em] font-bold" style={{ color: local.mottoColor || '#a3a3a3' }}>
                    {local.motto || 'Motto'}
                  </p>
                )}
                <div className="flex gap-2 pt-1">
                  <div className="px-3 py-2 text-[10px] uppercase tracking-widest border border-[#5865F2]/40 text-[#cdd5ff] bg-[#5865F2]/10 rounded">Discord</div>
                  {local.showProgressButton && (
                    <div className="px-3 py-2 text-[10px] uppercase tracking-widest border border-[#c8aa6e]/40 text-[#c8aa6e] bg-[#c8aa6e]/10 rounded">Progress</div>
                  )}
                </div>
              </div>
            </div>
            <p className="text-[9px] uppercase tracking-widest text-neutral-600">
              Az elonezet a valtozasokat valos idoben mutatja.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const RosterEditor = ({ officers, onSave }: any) => {
  const [local, setLocal] = useState([...officers]);
  const [uploadError, setUploadError] = useState<string | null>(null);
  useEffect(() => { setLocal([...officers]); }, [officers]);

  const readFileAsDataUrl = (file: File) => new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ''));
    reader.onerror = () => reject(new Error('Nem sikerult beolvasni a fajlt.'));
    reader.readAsDataURL(file);
  });

  const handleOfficerImageUpload = async (idx: number, file?: File | null) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setUploadError('Csak kep fajl toltheto fel.');
      return;
    }
    setUploadError(null);
    try {
      const dataUrl = await readFileAsDataUrl(file);
      setLocal(prev => {
        const next = [...prev];
        next[idx] = { ...next[idx], image: dataUrl };
        return next;
      });
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Nem sikerult beolvasni a fajlt.');
    }
  };

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="flex items-center justify-between border-b border-white/5 pb-6">
        <div>
          <h2 className="text-3xl font-bold cinzel-font text-white uppercase tracking-widest">Vezetőség</h2>
          <p className="text-neutral-500 italic text-xs mt-1">Officerek, rangok es profilkepek kezelese.</p>
        </div>
        <div className="flex gap-4">
          <button type="button" onClick={() => setLocal([...local, { name: 'Uj Tag', role: 'Officer', image: '' }])} className="p-3 bg-white/5 hover:bg-white/10 text-[#c8aa6e] rounded-full transition-all border border-white/5"><Plus size={18} /></button>
          <SaveIconBtn onClick={() => onSave(local)} />
        </div>
      </div>

      {uploadError && (
        <div className="text-[10px] text-red-400 uppercase tracking-widest">{uploadError}</div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        {local.map((off, i) => (
          <div key={i} className="bg-[#0a0a0b] border border-white/5 p-6 group hover:border-[#c8aa6e]/20 transition-all space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-full border border-white/10 bg-black/40 overflow-hidden shrink-0 flex items-center justify-center">
                {off.image ? (
                  <img src={off.image} alt={off.name} className="w-full h-full object-cover" />
                ) : (
                  <ShieldCheck size={20} className="text-neutral-600" />
                )}
              </div>
              <div className="flex flex-col gap-3 flex-grow">
                <input value={off.name} onChange={e => { const n = [...local]; n[i].name = e.target.value; setLocal(n); }} className="bg-black border border-white/10 p-3 rounded text-sm font-bold cinzel-font text-white outline-none focus:border-[#c8aa6e]" />
                <select value={off.role} onChange={e => { const n = [...local]; n[i].role = e.target.value as any; setLocal(n); }} className="bg-black border border-white/10 p-2 rounded text-[10px] text-neutral-500 uppercase font-bold tracking-widest outline-none">
                  <option value="Leader">Guild Master</option>
                  <option value="Officer">Officer</option>
                </select>
              </div>
              <button type="button" onClick={() => setLocal(local.filter((_, idx) => idx !== i))} className="text-red-900 hover:text-red-500 p-2 transition-colors"><Trash2 size={18} /></button>
            </div>

            <label className="flex items-end">
              <span className="w-full text-center flex items-center justify-center gap-2 px-4 py-3 border border-white/10 text-[10px] font-bold cinzel-font uppercase tracking-widest text-neutral-400 hover:text-white hover:border-[#c8aa6e]/40 transition-all cursor-pointer rounded">
                <ImageIcon size={12} /> Feltoltes
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => handleOfficerImageUpload(i, e.target.files?.[0])}
                  className="hidden"
                />
              </span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

const RulesEditor = ({ rules, onSave }: any) => {
  const [local, setLocal] = useState([...rules]);
  useEffect(() => { setLocal([...rules]); }, [rules]);

  const update = (idx: number, field: string, val: string) => {
    const next = [...local];
    next[idx] = { ...next[idx], [field]: val };
    setLocal(next);
  };

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="flex items-center justify-between border-b border-white/5 pb-6">
        <div>
          <h2 className="text-3xl font-bold cinzel-font text-white uppercase tracking-widest">Szabályzat</h2>
          <p className="text-neutral-500 italic text-xs mt-1">A klán működési alapelvei.</p>
        </div>
        <div className="flex gap-4">
          <button type="button" onClick={() => setLocal([...local, { title: 'Új Szabály', description: '' }])} className="p-3 bg-white/5 hover:bg-white/10 text-[#c8aa6e] rounded-full"><Plus size={18} /></button>
          <SaveIconBtn onClick={() => onSave(local)} />
        </div>
      </div>

      <div className="grid gap-4">
        {local.map((rule, i) => (
          <div key={i} className="bg-[#0a0a0b] border border-white/5 p-8 flex gap-8 group hover:border-white/10 transition-all">
            <div className="flex-grow space-y-4">
              <input value={rule.title} onChange={e => update(i, 'title', e.target.value)} className="w-full bg-transparent border-b border-white/10 py-3 text-xl font-bold cinzel-font text-[#c8aa6e] outline-none focus:border-[#c8aa6e]" />
              <textarea value={rule.description} onChange={e => update(i, 'description', e.target.value)} className="w-full bg-black/40 border border-white/5 p-4 rounded text-sm text-neutral-400 font-serif h-24 outline-none focus:border-white/20" />
            </div>
            <button type="button" onClick={() => setLocal(local.filter((_, idx) => idx !== i))} className="text-red-900 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"><Trash2 size={24} /></button>
          </div>
        ))}
      </div>
    </div>
  );
};

const TacticsEditor = ({ tactics, onSave }: any) => {
  const [local, setLocal] = useState([...tactics]);
  const [selRaid, setSelRaid] = useState(0);
  const [selBoss, setSelBoss] = useState(0);
  const [bossSearch, setBossSearch] = useState('');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [draggedBlockIdx, setDraggedBlockIdx] = useState<number | null>(null);
  const [dragOverBlockIdx, setDragOverBlockIdx] = useState<number | null>(null);

  useEffect(() => {
    setLocal(JSON.parse(JSON.stringify(tactics || [])));
    setSelRaid(0);
    setSelBoss(0);
    setBossSearch('');
    setHasUnsavedChanges(false);
  }, [tactics]);

  useEffect(() => {
    if (!local.length) {
      setSelRaid(0);
      setSelBoss(0);
      return;
    }
    if (selRaid > local.length - 1) {
      setSelRaid(local.length - 1);
      setSelBoss(0);
    }
  }, [local, selRaid]);

  useEffect(() => {
    const raid = local[selRaid];
    if (!raid) {
      setSelBoss(0);
      return;
    }
    if (selBoss > (raid.bosses?.length || 0) - 1) {
      setSelBoss(Math.max(0, (raid.bosses?.length || 1) - 1));
    }
  }, [local, selRaid, selBoss]);

  const markDirty = () => setHasUnsavedChanges(true);
  const cloneLocal = () => JSON.parse(JSON.stringify(local));
  const makeId = (prefix: string) => `${prefix}-${Date.now()}-${Math.floor(Math.random() * 100000)}`;

  const parseBlocks = (raw: any) => {
    const fallback = [{ id: makeId('block'), type: 'text', content: typeof raw === 'string' ? raw : '' }];
    if (typeof raw !== 'string') return fallback;
    try {
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return fallback;
      return parsed.map((b: any) => ({
        id: b?.id || makeId('block'),
        type: b?.type || 'text',
        title: b?.title || '',
        content: b?.content || '',
        mediaType: b?.mediaType || 'image',
        url: b?.url || ''
      }));
    } catch {
      return fallback;
    }
  };

  const setBossField = (field: string, value: any) => {
    const next = cloneLocal();
    if (!next[selRaid] || !next[selRaid].bosses?.[selBoss]) return;
    next[selRaid].bosses[selBoss][field] = value;
    setLocal(next);
    markDirty();
  };

  const setBlocks = (blocks: any[]) => {
    setBossField('description', JSON.stringify(blocks));
  };

  const addRaid = () => {
    const next = cloneLocal();
    next.push({
      id: makeId('raid'),
      name: 'Uj Raid',
      generalDescription: '',
      bosses: []
    });
    setLocal(next);
    setSelRaid(next.length - 1);
    setSelBoss(0);
    markDirty();
  };

  const removeRaid = (raidIdx: number) => {
    if (!confirm('Biztosan torlod ezt a raidet?')) return;
    const next = cloneLocal();
    next.splice(raidIdx, 1);
    setLocal(next);
    setSelRaid(Math.max(0, raidIdx - 1));
    setSelBoss(0);
    markDirty();
  };

  const addBoss = () => {
    if (!local[selRaid]) return;
    const next = cloneLocal();
    next[selRaid].bosses = next[selRaid].bosses || [];
    next[selRaid].bosses.push({
      id: makeId('boss'),
      name: `${next[selRaid].bosses.length + 1}. Uj Boss`,
      description: JSON.stringify([{ id: makeId('block'), type: 'text', content: '' }])
    });
    setLocal(next);
    setSelBoss(next[selRaid].bosses.length - 1);
    markDirty();
  };

  const removeBoss = (bossIdx: number) => {
    if (!local[selRaid] || !confirm('Biztosan torlod ezt a bosst?')) return;
    const next = cloneLocal();
    next[selRaid].bosses.splice(bossIdx, 1);
    setLocal(next);
    setSelBoss(Math.max(0, bossIdx - 1));
    markDirty();
  };

  const moveBoss = (bossIdx: number, direction: 'up' | 'down') => {
    const next = cloneLocal();
    const bosses = next[selRaid]?.bosses || [];
    const swapWith = direction === 'up' ? bossIdx - 1 : bossIdx + 1;
    if (swapWith < 0 || swapWith >= bosses.length) return;
    [bosses[bossIdx], bosses[swapWith]] = [bosses[swapWith], bosses[bossIdx]];
    next[selRaid].bosses = bosses;
    setLocal(next);
    setSelBoss(swapWith);
    markDirty();
  };

  const addBlock = (type: string) => {
    const blocks = parseBlocks(selectedBoss?.description);
    const defaultBlock: any = {
      id: makeId('block'),
      type,
      title: '',
      content: '',
      mediaType: 'image',
      url: ''
    };
    if (type === 'warning') defaultBlock.title = 'Vigyazat';
    if (type === 'mechanic') defaultBlock.title = 'Mechanika';
    if (type === 'tank') defaultBlock.title = 'Tank feladat';
    if (type === 'healer') defaultBlock.title = 'Healer feladat';
    if (type === 'dps') defaultBlock.title = 'DPS feladat';
    if (type === 'media') defaultBlock.title = 'Media';
    setBlocks([...blocks, defaultBlock]);
  };

  const updateBlock = (idx: number, patch: Record<string, any>) => {
    const blocks = parseBlocks(selectedBoss?.description);
    blocks[idx] = { ...blocks[idx], ...patch };
    setBlocks(blocks);
  };

  const removeBlock = (idx: number) => {
    const blocks = parseBlocks(selectedBoss?.description);
    blocks.splice(idx, 1);
    setBlocks(blocks.length ? blocks : [{ id: makeId('block'), type: 'text', content: '' }]);
  };

  const reorderBlocks = (fromIdx: number, toIdx: number) => {
    if (fromIdx === toIdx) return;
    const blocks = parseBlocks(selectedBoss?.description);
    if (fromIdx < 0 || fromIdx >= blocks.length || toIdx < 0 || toIdx >= blocks.length) return;
    const next = [...blocks];
    const [moved] = next.splice(fromIdx, 1);
    next.splice(toIdx, 0, moved);
    setBlocks(next);
  };

  const onBlockDragStart = (idx: number) => {
    setDraggedBlockIdx(idx);
    setDragOverBlockIdx(idx);
  };

  const onBlockDrop = (idx: number) => {
    if (draggedBlockIdx === null) return;
    reorderBlocks(draggedBlockIdx, idx);
    setDraggedBlockIdx(null);
    setDragOverBlockIdx(null);
  };

  const handleSave = () => {
    onSave(local);
    setHasUnsavedChanges(false);
  };

  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = (url || '').match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const blockTypeConfig: Record<string, any> = {
    text: {
      label: 'Szoveg',
      icon: <ScrollText size={12} />,
      chip: 'bg-blue-500/15 border-blue-400/40 text-blue-300',
      panel: 'border-blue-500/25 bg-blue-500/5'
    },
    mechanic: {
      label: 'Mechanika',
      icon: <Trophy size={12} />,
      chip: 'bg-amber-500/15 border-amber-400/40 text-amber-300',
      panel: 'border-amber-500/25 bg-amber-500/5'
    },
    warning: {
      label: 'Veszely',
      icon: <AlertTriangle size={12} />,
      chip: 'bg-red-500/15 border-red-400/40 text-red-300',
      panel: 'border-red-500/25 bg-red-500/5'
    },
    tank: {
      label: 'Tank',
      icon: <Shield size={12} />,
      chip: 'bg-sky-500/15 border-sky-400/40 text-sky-300',
      panel: 'border-sky-500/25 bg-sky-500/5'
    },
    healer: {
      label: 'Healer',
      icon: <Heart size={12} />,
      chip: 'bg-emerald-500/15 border-emerald-400/40 text-emerald-300',
      panel: 'border-emerald-500/25 bg-emerald-500/5'
    },
    dps: {
      label: 'DPS',
      icon: <Sword size={12} />,
      chip: 'bg-orange-500/15 border-orange-400/40 text-orange-300',
      panel: 'border-orange-500/25 bg-orange-500/5'
    },
    media: {
      label: 'Media',
      icon: <PlayCircle size={12} />,
      chip: 'bg-fuchsia-500/15 border-fuchsia-400/40 text-fuchsia-300',
      panel: 'border-fuchsia-500/25 bg-fuchsia-500/5'
    }
  };

  const blockActionTypes = ['text', 'mechanic', 'warning', 'tank', 'healer', 'dps', 'media'];

  const selectedRaid = local[selRaid];
  const bosses = selectedRaid?.bosses || [];
  const filteredBosses = bosses
    .map((boss: any, idx: number) => ({ boss, idx }))
    .filter(({ boss }) => {
      const q = bossSearch.trim().toLowerCase();
      if (!q) return true;
      return String(boss.name || '').toLowerCase().includes(q);
    });
  const selectedBoss = bosses[selBoss];
  const blocks = parseBlocks(selectedBoss?.description);
  const raidCount = local.length;
  const bossCount = local.reduce((acc: number, r: any) => acc + (r.bosses?.length || 0), 0);

  return (
    <div className="space-y-8 animate-fade-in pb-16 relative">
      <div className="flex items-center justify-between border-b border-white/5 pb-6">
        <div>
          <h2 className="text-3xl font-bold cinzel-font text-white uppercase tracking-widest flex items-center gap-3">
            <Swords size={24} className="text-[#c8aa6e]" /> Taktika Szerkeszto
          </h2>
          <p className="text-neutral-500 italic text-xs mt-1">Blokk alapu boss taktika editor kepekkel es video beagyazassal.</p>
        </div>
        <div className="flex items-center gap-4">
          {hasUnsavedChanges && (
            <span className="text-[10px] uppercase tracking-widest font-bold text-amber-300 flex items-center gap-1 px-3 py-1 rounded-full border border-amber-400/40 bg-amber-500/10">
              <AlertTriangle size={12} /> Nem mentett valtozasok
            </span>
          )}
          <SaveIconBtn onClick={handleSave} />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-[linear-gradient(145deg,rgba(200,170,110,0.12),rgba(10,10,11,1))] border border-[#c8aa6e]/30 p-4">
          <p className="text-[10px] uppercase tracking-widest text-[#c8aa6e] font-bold mb-2 flex items-center gap-2"><BookOpen size={12} /> Raid</p>
          <p className="text-2xl cinzel-font text-white font-bold">{raidCount}</p>
        </div>
        <div className="bg-[linear-gradient(145deg,rgba(239,68,68,0.12),rgba(10,10,11,1))] border border-red-500/30 p-4">
          <p className="text-[10px] uppercase tracking-widest text-red-300 font-bold mb-2 flex items-center gap-2"><Sword size={12} /> Boss</p>
          <p className="text-2xl cinzel-font text-white font-bold">{bossCount}</p>
        </div>
        <div className="bg-[linear-gradient(145deg,rgba(16,185,129,0.12),rgba(10,10,11,1))] border border-emerald-500/30 p-4">
          <p className="text-[10px] uppercase tracking-widest text-emerald-300 font-bold mb-2 flex items-center gap-2"><LayoutDashboard size={12} /> Blokk (Aktiv Boss)</p>
          <p className="text-2xl cinzel-font text-white font-bold">{selectedBoss ? blocks.length : 0}</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[#0a0a0b] border border-white/5 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs uppercase tracking-widest text-neutral-300 font-bold cinzel-font flex items-center gap-2"><BookOpen size={13} className="text-[#c8aa6e]" /> Raidek</h3>
              <button
                type="button"
                onClick={addRaid}
                className="flex items-center gap-2 px-3 py-2 border border-[#c8aa6e]/40 text-[#c8aa6e] hover:bg-[#c8aa6e] hover:text-black transition-all text-[10px] uppercase tracking-widest font-bold rounded-sm"
              >
                <Plus size={12} /> Raid
              </button>
            </div>
            <div className="space-y-2 max-h-[220px] overflow-y-auto custom-scrollbar pr-1">
              {local.map((raid: any, idx: number) => (
                <button
                  key={raid.id || idx}
                  type="button"
                  onClick={() => { setSelRaid(idx); setSelBoss(0); }}
                  className={`w-full text-left p-3 border rounded-sm transition-all ${
                    idx === selRaid
                      ? 'border-[#c8aa6e] bg-[#c8aa6e]/10'
                      : 'border-white/10 bg-black/20 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className={`font-bold cinzel-font text-sm truncate ${idx === selRaid ? 'text-[#c8aa6e]' : 'text-white'}`}>{raid.name}</span>
                    <span className="text-[10px] text-neutral-500">{(raid.bosses || []).length}</span>
                  </div>
                </button>
              ))}
            </div>
            {selectedRaid && (
              <div className="space-y-2 pt-2 border-t border-white/5">
                <label className="space-y-1 block">
                  <span className="text-[9px] uppercase tracking-widest text-neutral-600 font-bold">Raid neve</span>
                  <input
                    value={selectedRaid.name || ''}
                    onChange={(e) => {
                      const next = cloneLocal();
                      next[selRaid].name = e.target.value;
                      setLocal(next);
                      markDirty();
                    }}
                    className="w-full bg-black border border-white/10 p-3 rounded text-white outline-none focus:border-[#c8aa6e]"
                  />
                </label>
                <label className="space-y-1 block">
                  <span className="text-[9px] uppercase tracking-widest text-neutral-600 font-bold">Altalanos leiras</span>
                  <textarea
                    value={selectedRaid.generalDescription || ''}
                    onChange={(e) => {
                      const next = cloneLocal();
                      next[selRaid].generalDescription = e.target.value;
                      setLocal(next);
                      markDirty();
                    }}
                    className="w-full bg-black border border-white/10 p-3 rounded text-sm text-neutral-300 h-24 outline-none focus:border-[#c8aa6e]"
                  />
                </label>
                <button
                  type="button"
                  onClick={() => removeRaid(selRaid)}
                  className="w-full px-3 py-2 border border-red-900/50 text-red-400 hover:bg-red-900/20 rounded-sm text-[10px] uppercase tracking-widest font-bold"
                >
                  <Trash2 size={12} className="inline mr-1" /> Raid torlese
                </button>
              </div>
            )}
          </div>

          <div className="bg-[#0a0a0b] border border-white/5 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs uppercase tracking-widest text-neutral-300 font-bold cinzel-font flex items-center gap-2"><Swords size={13} className="text-red-300" /> Boss lista</h3>
              <button
                type="button"
                onClick={addBoss}
                disabled={!selectedRaid}
                className="flex items-center gap-2 px-3 py-2 border border-[#c8aa6e]/40 text-[#c8aa6e] hover:bg-[#c8aa6e] hover:text-black transition-all text-[10px] uppercase tracking-widest font-bold rounded-sm disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Plus size={12} /> Boss
              </button>
            </div>
            <input
              value={bossSearch}
              onChange={(e) => setBossSearch(e.target.value)}
              placeholder="Boss keresese..."
              className="w-full bg-black border border-white/10 p-3 rounded text-xs text-neutral-300 outline-none focus:border-[#c8aa6e]"
            />
            <div className="space-y-2 max-h-[320px] overflow-y-auto custom-scrollbar pr-1">
              {filteredBosses.map(({ boss, idx }: any) => (
                <button
                  key={boss.id || idx}
                  type="button"
                  onClick={() => setSelBoss(idx)}
                  className={`w-full text-left p-3 border rounded-sm transition-all ${
                    idx === selBoss
                      ? 'border-[#c8aa6e] bg-[#c8aa6e]/10'
                      : 'border-white/10 bg-black/20 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className={`font-bold text-sm truncate ${idx === selBoss ? 'text-[#c8aa6e]' : 'text-white'}`}>{boss.name}</span>
                    <span className="text-[10px] text-neutral-500">#{idx + 1}</span>
                  </div>
                </button>
              ))}
              {!filteredBosses.length && (
                <p className="text-xs text-neutral-500 p-3 border border-white/10 bg-black/20 rounded-sm">Nincs talalat.</p>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 bg-[#0a0a0b] border border-white/5 p-6 relative overflow-hidden">
          <div className="absolute -right-12 -top-12 w-56 h-56 rounded-full bg-[#c8aa6e]/10 blur-3xl pointer-events-none"></div>
          {!selectedBoss ? (
            <div className="min-h-[360px] flex items-center justify-center text-neutral-600 text-sm">
              Valassz egy bosst a listabol.
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center gap-3 justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-3 min-w-0">
                  <Edit3 size={18} className="text-[#c8aa6e] shrink-0" />
                  <input
                    value={selectedBoss.name || ''}
                    onChange={e => setBossField('name', e.target.value)}
                    className="text-2xl font-bold bg-transparent w-full cinzel-font text-white outline-none min-w-[260px]"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={() => moveBoss(selBoss, 'up')} className="px-2 py-2 border border-white/10 text-neutral-400 hover:text-white hover:border-white/20 rounded-sm"><ArrowUp size={14} /></button>
                  <button type="button" onClick={() => moveBoss(selBoss, 'down')} className="px-2 py-2 border border-white/10 text-neutral-400 hover:text-white hover:border-white/20 rounded-sm"><ArrowDown size={14} /></button>
                  <button type="button" onClick={() => removeBoss(selBoss)} className="px-3 py-2 border border-red-900/50 text-red-400 hover:bg-red-900/20 rounded-sm text-[10px] uppercase tracking-widest font-bold">
                    <Trash2 size={12} className="inline mr-1" /> Torles
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[10px] uppercase tracking-widest text-neutral-600 font-bold">Blokk hozzaadas</p>
                <div className="flex flex-wrap gap-2">
                  {blockActionTypes.map((type) => {
                    const cfg = blockTypeConfig[type] || blockTypeConfig.text;
                    return (
                    <button
                      key={type}
                      type="button"
                      onClick={() => addBlock(type)}
                      className={`px-3 py-2 border rounded-sm text-[10px] uppercase tracking-widest font-bold transition-all flex items-center gap-1.5 ${cfg.chip} hover:brightness-125`}
                    >
                      {cfg.icon} <Plus size={10} /> {cfg.label}
                    </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-[10px] uppercase tracking-widest text-neutral-600 font-bold flex items-center gap-1">
                  <GripVertical size={12} /> Blokk sorrend: drag & drop
                </p>
                {blocks.map((block: any, idx: number) => (
                  <div
                    key={block.id || idx}
                    draggable
                    onDragStart={() => onBlockDragStart(idx)}
                    onDragOver={(e) => {
                      e.preventDefault();
                      if (dragOverBlockIdx !== idx) setDragOverBlockIdx(idx);
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      onBlockDrop(idx);
                    }}
                    onDragEnd={() => {
                      setDraggedBlockIdx(null);
                      setDragOverBlockIdx(null);
                    }}
                    className={`border rounded-sm p-4 space-y-3 cursor-move transition-all ${
                      blockTypeConfig[block.type]?.panel || blockTypeConfig.text.panel
                    } ${
                      dragOverBlockIdx === idx ? 'ring-2 ring-[#c8aa6e]/70 shadow-[0_0_0_1px_rgba(200,170,110,0.5)]' : ''
                    } ${
                      draggedBlockIdx === idx ? 'opacity-70 scale-[0.995]' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-neutral-500"><GripVertical size={14} /></span>
                        <span className={`px-2 py-1 text-[9px] uppercase tracking-widest font-bold border rounded-sm flex items-center gap-1 ${blockTypeConfig[block.type]?.chip || blockTypeConfig.text.chip}`}>
                          {blockTypeConfig[block.type]?.icon || blockTypeConfig.text.icon}
                          {blockTypeConfig[block.type]?.label || block.type}
                        </span>
                        <span className="text-[10px] text-neutral-600 uppercase tracking-widest">#{idx + 1}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeBlock(idx)}
                        className="px-2 py-1 border border-red-900/50 text-red-400 hover:bg-red-900/20 rounded-sm text-[10px] uppercase tracking-widest"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>

                    {block.type !== 'text' && (
                      <label className="space-y-1 block">
                        <span className="text-[9px] uppercase tracking-widest text-neutral-600 font-bold">Cim</span>
                        <input
                          value={block.title || ''}
                          onChange={(e) => updateBlock(idx, { title: e.target.value })}
                          className="w-full bg-black border border-white/10 p-3 rounded text-sm text-white outline-none focus:border-[#c8aa6e]"
                        />
                      </label>
                    )}

                    {block.type === 'media' ? (
                      <div className="space-y-3">
                        <div className="grid md:grid-cols-2 gap-3">
                          <label className="space-y-1 block">
                            <span className="text-[9px] uppercase tracking-widest text-neutral-600 font-bold flex items-center gap-1"><Video size={11} /> Media tipus</span>
                            <select
                              value={block.mediaType || 'image'}
                              onChange={(e) => updateBlock(idx, { mediaType: e.target.value })}
                              className="w-full bg-black border border-white/10 p-3 rounded text-[11px] uppercase tracking-widest text-neutral-300 outline-none focus:border-[#c8aa6e]"
                            >
                              <option value="image">Kep</option>
                              <option value="video">Video</option>
                            </select>
                          </label>
                          <label className="space-y-1 block">
                            <span className="text-[9px] uppercase tracking-widest text-neutral-600 font-bold flex items-center gap-1"><ExternalLink size={11} /> URL</span>
                            <input
                              value={block.url || ''}
                              onChange={(e) => updateBlock(idx, { url: e.target.value })}
                              placeholder="https://..."
                              className="w-full bg-black border border-white/10 p-3 rounded text-sm text-white outline-none focus:border-[#c8aa6e]"
                            />
                          </label>
                        </div>
                        <label className="space-y-1 block">
                          <span className="text-[9px] uppercase tracking-widest text-neutral-600 font-bold flex items-center gap-1"><MessageSquare size={11} /> Megjegyzes / Caption</span>
                          <input
                            value={block.content || ''}
                            onChange={(e) => updateBlock(idx, { content: e.target.value })}
                            className="w-full bg-black border border-white/10 p-3 rounded text-sm text-neutral-300 outline-none focus:border-[#c8aa6e]"
                          />
                        </label>

                        {block.url && (
                          <div className="border border-white/10 bg-black/40 p-3 rounded-sm">
                            {block.mediaType === 'image' ? (
                              <>
                                <div className="text-[10px] uppercase tracking-widest text-neutral-500 mb-2 flex items-center gap-1"><ImageIcon size={11} /> Kep elonezet</div>
                                <img src={block.url} alt="preview" className="w-full max-h-[360px] object-contain rounded-sm" />
                              </>
                            ) : (
                              <>
                                {getYoutubeId(block.url) ? (
                                  <div className="aspect-video">
                                    <div className="text-[10px] uppercase tracking-widest text-neutral-500 mb-2 flex items-center gap-1"><PlayCircle size={11} /> YouTube beagyazas</div>
                                    <iframe
                                      className="w-full h-full rounded-sm"
                                      src={`https://www.youtube.com/embed/${getYoutubeId(block.url)}`}
                                      title="Video preview"
                                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                      allowFullScreen
                                    />
                                  </div>
                                ) : (
                                  <>
                                    <div className="text-[10px] uppercase tracking-widest text-neutral-500 mb-2 flex items-center gap-1"><Video size={11} /> Direkt video</div>
                                    <video src={block.url} controls className="w-full max-h-[360px] rounded-sm bg-black" />
                                  </>
                                )}
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    ) : (
                      <label className="space-y-1 block">
                        <span className="text-[9px] uppercase tracking-widest text-neutral-600 font-bold">Tartalom</span>
                        <textarea
                          value={block.content || ''}
                          onChange={(e) => updateBlock(idx, { content: e.target.value })}
                          className="w-full bg-black border border-white/10 p-3 rounded text-sm text-neutral-300 min-h-[110px] outline-none focus:border-[#c8aa6e]"
                        />
                      </label>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Overview Tab for quick stats
const OverviewTab = ({ data }: any) => {
  const progress = data?.progress || [];
  const officers = data?.officers || [];
  const tactics = data?.tactics || [];
  const consumables = data?.consumables || [];
  const rules = data?.rules || [];
  const guides = data?.guides || [];
  const heroConfig = data?.heroConfig || {};

  const raidCount = progress.length;
  const totalCurrent = progress.reduce((acc: number, r: any) => acc + (Number(r.current) || 0), 0);
  const totalBosses = progress.reduce((acc: number, r: any) => acc + (Number(r.total) || 0), 0);
  const overallCompletion = totalBosses > 0 ? Math.round((totalCurrent / totalBosses) * 100) : 0;
  const featuredRaids = progress.filter((r: any) => r.featured).length;
  const progressRaids = progress.filter((r: any) => r.status === 'Progress').length;
  const farmedRaids = progress.filter((r: any) => r.status === 'Farmed').length;

  const leaders = officers.filter((o: any) => o.role === 'Leader').length;
  const officerCount = officers.filter((o: any) => o.role === 'Officer').length;

  const tacticRaidCount = tactics.length;
  const tacticBossCount = tactics.reduce((acc: number, r: any) => acc + (r.bosses?.length || 0), 0);
  const tacticBlockCount = tactics.reduce((acc: number, raid: any) => {
    return acc + (raid.bosses || []).reduce((bossAcc: number, boss: any) => {
      if (typeof boss.description !== 'string') return bossAcc;
      try {
        const parsed = JSON.parse(boss.description);
        return bossAcc + (Array.isArray(parsed) ? parsed.length : 1);
      } catch {
        return bossAcc + 1;
      }
    }, 0);
  }, 0);

  const consumableRoleCount = consumables.length;
  const consumableAssignments = consumables.reduce((acc: number, role: any) => acc + (role.items?.length || 0), 0);
  const requiredAssignments = consumables.reduce((acc: number, role: any) => {
    return acc + (role.items || []).reduce((itemAcc: number, item: any) => {
      const settings = item.raidSettings || {};
      return itemAcc + Object.values(settings).filter((v: any) => !!v?.required).length;
    }, 0);
  }, 0);

  const heroProgressEnabled = !!heroConfig.showProgressBar;
  const heroProgressButtonEnabled = !!heroConfig.showProgressButton;
  const heroDiscordUrlSet = typeof heroConfig.discordUrl === 'string' && heroConfig.discordUrl.includes('discord');

  const statCards = [
    {
      label: 'Global Raid Progress',
      value: `${overallCompletion}%`,
      sub: `${totalCurrent}/${totalBosses} boss`,
      icon: <Trophy className="text-[#c8aa6e]" />,
      accent: 'border-[#c8aa6e]/30'
    },
    {
      label: 'Progress Raidek',
      value: `${progressRaids}`,
      sub: `${farmedRaids} farmolt`,
      icon: <Zap className="text-red-400" />,
      accent: 'border-red-500/30'
    },
    {
      label: 'Vezetoseg',
      value: `${officers.length}`,
      sub: `${leaders} leader, ${officerCount} officer`,
      icon: <Users className="text-blue-400" />,
      accent: 'border-blue-500/30'
    },
    {
      label: 'Taktika Tartalom',
      value: `${tacticBossCount}`,
      sub: `${tacticRaidCount} raid, ${tacticBlockCount} blokk`,
      icon: <Swords className="text-red-400" />,
      accent: 'border-red-500/30'
    },
    {
      label: 'Consumables',
      value: `${consumableAssignments}`,
      sub: `${consumableRoleCount} role, ${requiredAssignments} kotelezo`,
      icon: <FlaskConical className="text-emerald-400" />,
      accent: 'border-emerald-500/30'
    },
    {
      label: 'Tudastar',
      value: `${guides.length + rules.length}`,
      sub: `${guides.length} guide, ${rules.length} szabaly`,
      icon: <ScrollText className="text-violet-400" />,
      accent: 'border-violet-500/30'
    }
  ];

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="flex flex-col gap-2">
        <h2 className="text-5xl font-black cinzel-font text-white uppercase tracking-tighter">Attekintes</h2>
        <p className="text-neutral-500 font-serif italic text-lg">Valos ideju admin dashboard allapotjelentessel.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {statCards.map((card) => (
          <div key={card.label} className={`bg-[#0a0a0b] border ${card.accent} p-6 rounded-sm hover:bg-[#0d0d0f] transition-all`}>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] text-neutral-500 uppercase tracking-[0.25em] font-bold">{card.label}</span>
              <div className="p-2 bg-black/40 rounded">{card.icon}</div>
            </div>
            <p className="text-4xl font-black text-white cinzel-font leading-none">{card.value}</p>
            <p className="text-xs text-neutral-500 mt-2 uppercase tracking-widest">{card.sub}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#0a0a0b] border border-white/10 p-6 rounded-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-bold cinzel-font flex items-center gap-2">
              <Monitor size={14} className="text-[#c8aa6e]" /> Hero Modul Statusz
            </h3>
            <span className="text-[10px] text-neutral-600 uppercase tracking-widest">Frontend</span>
          </div>
          <div className="space-y-3">
            <StatusLine
              label="Hero Progress Bar"
              ok={heroProgressEnabled}
              okText="Bekapcsolva"
              failText="Kikapcsolva"
            />
            <StatusLine
              label="Hero Progress Gomb"
              ok={heroProgressButtonEnabled}
              okText="Bekapcsolva"
              failText="Kikapcsolva"
            />
            <StatusLine
              label="Discord Link"
              ok={heroDiscordUrlSet}
              okText="Beallitva"
              failText="Hianyzik / rossz"
            />
            <div className="pt-2 border-t border-white/10">
              <p className="text-[10px] uppercase tracking-widest text-neutral-600 font-bold mb-2">Cimke elonezet</p>
              <p className="text-sm text-neutral-300 cinzel-font">{heroConfig.progressLabel || 'Nincs cimke beallitva'}</p>
            </div>
          </div>
        </div>

        <div className="bg-[#0a0a0b] border border-white/10 p-6 rounded-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs uppercase tracking-[0.25em] text-neutral-400 font-bold cinzel-font flex items-center gap-2">
              <Trophy size={14} className="text-[#c8aa6e]" /> Raid Allapot
            </h3>
            <span className="text-[10px] text-neutral-600 uppercase tracking-widest">{raidCount} raid</span>
          </div>
          <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
            {progress.map((raid: any, idx: number) => {
              const pct = raid.total > 0 ? Math.round((raid.current / raid.total) * 100) : 0;
              return (
                <div key={`${raid.name}-${idx}`} className="border border-white/10 bg-black/20 rounded-sm p-3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-white font-bold truncate">{raid.name}</p>
                    <div className="flex items-center gap-2">
                      {raid.featured && <Star size={12} className="text-[#c8aa6e]" />}
                      <span className={`text-[10px] uppercase tracking-widest font-bold ${raid.status === 'Farmed' ? 'text-green-400' : 'text-red-400'}`}>
                        {raid.status}
                      </span>
                    </div>
                  </div>
                  <div className="h-2 w-full bg-black border border-white/5 rounded-full overflow-hidden p-[1px]">
                    <div className={`h-full ${raid.barColor || 'bg-red-600'}`} style={{ width: `${pct}%` }} />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[10px] uppercase tracking-widest text-neutral-500">
                    <span>{raid.current}/{raid.total}</span>
                    <span>{pct}%</span>
                  </div>
                </div>
              );
            })}
            {!progress.length && (
              <div className="border border-white/10 bg-black/20 rounded-sm p-4 text-xs text-neutral-500 uppercase tracking-widest">
                Nincs meg progress adat.
              </div>
            )}
          </div>
          {featuredRaids > 3 && (
            <div className="pt-2 border-t border-red-900/30 text-[10px] uppercase tracking-widest font-bold text-red-400 flex items-center gap-2">
              <AlertTriangle size={12} /> Tobb mint 3 kiemelt raid van beallitva.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatusLine = ({ label, ok, okText, failText }: { label: string; ok: boolean; okText: string; failText: string }) => (
  <div className="flex items-center justify-between p-2 border border-white/10 bg-black/30 rounded-sm">
    <span className="text-[11px] text-neutral-300">{label}</span>
    <span className={`text-[10px] uppercase tracking-widest font-bold flex items-center gap-1 ${ok ? 'text-green-400' : 'text-red-400'}`}>
      {ok ? <CheckCircle size={12} /> : <AlertTriangle size={12} />}
      {ok ? okText : failText}
    </span>
  </div>
);

const GuidesEditor = ({ guides, onSave }: any) => {
  const [local, setLocal] = useState([...guides]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    setLocal(JSON.parse(JSON.stringify(guides || [])));
    setSelectedIdx(0);
    setSearch('');
    setCategoryFilter('all');
    setHasUnsavedChanges(false);
  }, [guides]);

  useEffect(() => {
    if (!local.length) {
      setSelectedIdx(0);
      return;
    }
    if (selectedIdx > local.length - 1) {
      setSelectedIdx(local.length - 1);
    }
  }, [local, selectedIdx]);

  const markDirty = () => setHasUnsavedChanges(true);
  const today = new Date().toISOString().slice(0, 10);

  const addGuide = () => {
    setLocal(prev => ([
      {
        id: Date.now(),
        title: 'Uj Tipp',
        category: 'Altalanos',
        content: '',
        date: today,
        badge: '',
        link: ''
      },
      ...prev
    ]));
    setSelectedIdx(0);
    markDirty();
  };

  const removeGuide = (idx: number) => {
    if (!confirm('Biztosan torlod ezt a bejegyzest?')) return;
    setLocal(prev => prev.filter((_: any, i: number) => i !== idx));
    setSelectedIdx((prev) => Math.max(0, idx === prev ? prev - 1 : prev));
    markDirty();
  };

  const updateGuide = (idx: number, field: string, value: any) => {
    setLocal(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      if (!next[idx]) return prev;
      next[idx][field] = value;
      return next;
    });
    markDirty();
  };

  const handleSave = () => {
    onSave(local);
    setHasUnsavedChanges(false);
  };

  const selectedGuide = local[selectedIdx];
  const categories = ['all', ...Array.from(new Set(local.map((g: any) => g.category || 'Altalanos')))];
  const filteredGuides = local
    .map((guide: any, idx: number) => ({ guide, idx }))
    .filter(({ guide }) => {
      const q = search.trim().toLowerCase();
      const bySearch = !q || String(guide.title || '').toLowerCase().includes(q) || String(guide.content || '').toLowerCase().includes(q);
      const byCategory = categoryFilter === 'all' || guide.category === categoryFilter;
      return bySearch && byCategory;
    });

  return (
    <div className="space-y-10 animate-fade-in pb-20">
      <div className="flex justify-between items-center border-b border-white/5 pb-6">
        <div>
          <h2 className="text-3xl font-bold cinzel-font text-white uppercase tracking-widest">Hasznos Bejegyzesek</h2>
          <p className="text-neutral-500 italic text-xs mt-1">Szerkesztes admin oldalon, azonnali hatas a user oldalon.</p>
        </div>
        <div className="flex items-center gap-4">
          {hasUnsavedChanges && (
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#c8aa6e]">Nem mentett valtozasok</span>
          )}
          <button type="button" onClick={addGuide} className="p-3 bg-white/5 hover:bg-white/10 text-[#c8aa6e] rounded-full border border-white/5 transition-all">
            <Plus size={18} />
          </button>
          <SaveIconBtn onClick={handleSave} />
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 bg-[#0a0a0b] border border-white/5 p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs uppercase tracking-widest text-neutral-400 font-bold cinzel-font flex items-center gap-2">
              <ScrollText size={14} className="text-[#c8aa6e]" /> Bejegyzesek
            </h3>
            <span className="text-[10px] uppercase tracking-widest text-neutral-600">{filteredGuides.length}</span>
          </div>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Kereses cimre vagy tartalomra..."
            className="w-full bg-black border border-white/10 p-3 rounded text-xs text-neutral-300 outline-none focus:border-[#c8aa6e]"
          />
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="w-full bg-black border border-white/10 p-3 rounded text-[10px] uppercase tracking-widest text-neutral-400 outline-none focus:border-[#c8aa6e]"
          >
            <option value="all">Minden kategoria</option>
            {categories.filter(c => c !== 'all').map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <div className="space-y-2 max-h-[620px] overflow-y-auto custom-scrollbar pr-1">
            {filteredGuides.map(({ guide, idx }: any) => {
              const active = idx === selectedIdx;
              return (
                <button
                  key={guide.id}
                  type="button"
                  onClick={() => setSelectedIdx(idx)}
                  className={`w-full text-left p-3 border rounded-sm transition-all ${
                    active ? 'border-[#c8aa6e] bg-[#c8aa6e]/10' : 'border-white/10 bg-black/20 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className={`font-bold text-sm truncate ${active ? 'text-[#c8aa6e]' : 'text-white'}`}>{guide.title || 'Ures cim'}</p>
                    {!!guide.badge && <span className="text-[8px] px-2 py-0.5 border border-red-900/40 text-red-400 uppercase tracking-widest">{guide.badge}</span>}
                  </div>
                  <p className="text-[10px] text-neutral-500 uppercase tracking-widest">{guide.category || 'Altalanos'}</p>
                </button>
              );
            })}
            {!filteredGuides.length && (
              <div className="p-4 border border-white/10 bg-black/20 text-xs text-neutral-500 uppercase tracking-widest">
                Nincs talalat.
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-8 bg-[#0a0a0b] border border-white/5 p-6">
          {!selectedGuide ? (
            <div className="min-h-[360px] flex items-center justify-center text-neutral-600 text-sm">
              Valassz egy bejegyzest a listabol.
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="min-w-0 flex-grow">
                  <p className="text-[10px] uppercase tracking-widest text-neutral-600 font-bold mb-1">Bejegyzes</p>
                  <input
                    value={selectedGuide.title || ''}
                    onChange={e => updateGuide(selectedIdx, 'title', e.target.value)}
                    className="w-full text-2xl font-bold bg-transparent cinzel-font text-white outline-none"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeGuide(selectedIdx)}
                  className="px-3 py-2 border border-red-900/50 text-red-400 hover:bg-red-900/20 rounded-sm text-[10px] uppercase tracking-widest font-bold"
                >
                  <Trash2 size={12} className="inline mr-1" /> Torles
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <label className="space-y-1 block">
                  <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Kategoria</span>
                  <input
                    value={selectedGuide.category || ''}
                    onChange={e => updateGuide(selectedIdx, 'category', e.target.value)}
                    className="w-full bg-black border border-white/10 p-3 rounded text-sm text-white outline-none focus:border-[#c8aa6e]"
                  />
                </label>
                <label className="space-y-1 block">
                  <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Badge (opcionalis)</span>
                  <input
                    value={selectedGuide.badge || ''}
                    onChange={e => updateGuide(selectedIdx, 'badge', e.target.value)}
                    placeholder="pl: Pro Tipp"
                    className="w-full bg-black border border-white/10 p-3 rounded text-sm text-white outline-none focus:border-[#c8aa6e]"
                  />
                </label>
                <label className="space-y-1 block">
                  <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Datum</span>
                  <input
                    type="date"
                    value={(selectedGuide.date || '').replace(/\./g, '-').slice(0, 10)}
                    onChange={e => updateGuide(selectedIdx, 'date', e.target.value)}
                    className="w-full bg-black border border-white/10 p-3 rounded text-sm text-white outline-none focus:border-[#c8aa6e]"
                  />
                </label>
                <label className="space-y-1 block">
                  <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold flex items-center gap-1">
                    <ExternalLink size={12} /> Link (opcionalis)
                  </span>
                  <input
                    value={selectedGuide.link || ''}
                    onChange={e => updateGuide(selectedIdx, 'link', e.target.value)}
                    placeholder="https://..."
                    className="w-full bg-black border border-white/10 p-3 rounded text-sm text-white outline-none focus:border-[#c8aa6e]"
                  />
                </label>
              </div>

              <label className="space-y-2 block">
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold flex items-center gap-1">
                  <MessageSquare size={12} /> Tartalom
                </span>
                <textarea
                  value={selectedGuide.content || ''}
                  onChange={e => updateGuide(selectedIdx, 'content', e.target.value)}
                  className="w-full bg-black border border-white/10 p-4 rounded text-sm text-neutral-300 font-serif h-40 outline-none focus:border-[#c8aa6e]"
                />
              </label>

              <div className="border border-white/10 bg-black/30 rounded-sm p-4 space-y-3">
                <p className="text-[10px] uppercase tracking-widest text-neutral-600 font-bold">User oldali elonezet</p>
                <div className="bg-[#0a0a0b] border border-white/10 p-5">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[10px] uppercase tracking-widest text-[#c8aa6e]">{selectedGuide.category || 'Altalanos'}</span>
                    {!!selectedGuide.badge && (
                      <span className="text-[8px] px-2 py-1 border border-red-900/40 text-red-400 uppercase tracking-widest">{selectedGuide.badge}</span>
                    )}
                  </div>
                  <h4 className="text-xl cinzel-font text-white mb-3">{selectedGuide.title || 'Ures cim'}</h4>
                  <p className="text-sm text-neutral-400 font-serif leading-relaxed mb-4">{selectedGuide.content || 'Ures tartalom...'}</p>
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-widest text-neutral-500 border-t border-white/10 pt-3">
                    <span>{selectedGuide.date || '-'}</span>
                    {!!selectedGuide.link && <span className="text-[#c8aa6e]">Van link</span>}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ConsumablesEditor = ({ consumables, onSave }: any) => {
  const DEFAULT_RAIDS = ['MC', 'BWL', 'AQ40', 'Naxx', 'K40'];
  const [local, setLocal] = useState([...consumables]);
  const [activeRoleIdx, setActiveRoleIdx] = useState(0);
  const [selectedItemIdx, setSelectedItemIdx] = useState(0);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dbQuery, setDbQuery] = useState('');
  const [isDbOpen, setIsDbOpen] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  const raids = DEFAULT_RAIDS;
  const normalizeConsumables = (value: any[]) =>
    (value || []).map((role: any) => ({
      ...role,
      items: (role.items || []).map((item: any) => {
        const existingSettings = item.raidSettings || {};
        const migratedNotes = (item.notes && (item.raids || []).length)
          ? (item.raids || []).reduce((acc: any, raid: string) => {
              acc[raid] = { ...(existingSettings[raid] || {}), note: existingSettings[raid]?.note || item.notes };
              return acc;
            }, {})
          : {};

        return {
          ...item,
          raidSettings: { ...migratedNotes, ...existingSettings }
        };
      })
    }));

  useEffect(() => {
    setLocal(normalizeConsumables(JSON.parse(JSON.stringify(consumables))));
    setActiveRoleIdx(0);
    setSelectedItemIdx(0);
    setSearch('');
    setCategoryFilter('all');
    setHasUnsavedChanges(false);
  }, [consumables]);

  const markDirty = () => setHasUnsavedChanges(true);
  const activeRole = local[activeRoleIdx];
  const items = activeRole?.items || [];
  const consumablesDb = useMemo(
    () => [...CONSUMABLES_CATALOG].sort((a: any, b: any) => a.name.localeCompare(b.name)),
    []
  );
  const filteredDbItems = consumablesDb.filter((item: any) => {
    const q = dbQuery.trim().toLowerCase();
    if (!q) return true;
    return item.name.toLowerCase().includes(q) || item.effect.toLowerCase().includes(q);
  });
  const categories = ['all', ...Array.from(new Set(items.map((item: any) => item.category || 'Uncategorized')))];

  const filteredItemIndexes = items
    .map((item: any, idx: number) => ({ item, idx }))
    .filter(({ item }) => {
      const q = search.trim().toLowerCase();
      const bySearch = !q || item.name?.toLowerCase().includes(q) || item.effect?.toLowerCase().includes(q);
      const byCategory = categoryFilter === 'all' || item.category === categoryFilter;
      return bySearch && byCategory;
    })
    .sort((a, b) => {
      return String(a.item?.name || '').localeCompare(String(b.item?.name || ''));
    })
    .map(({ idx }) => idx);

  useEffect(() => {
    if (!items.length) {
      setSelectedItemIdx(0);
      return;
    }
    if (!filteredItemIndexes.length) {
      setSelectedItemIdx(0);
      return;
    }
    if (!filteredItemIndexes.includes(selectedItemIdx)) {
      setSelectedItemIdx(filteredItemIndexes[0]);
    }
  }, [activeRoleIdx, selectedItemIdx, filteredItemIndexes.join(','), items.length]);

  const updateItem = (itemIdx: number, field: string, value: any) => {
    setLocal(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      next[activeRoleIdx].items[itemIdx][field] = value;
      return next;
    });
    markDirty();
  };

  const updateSelectedItem = (field: string, value: any) => updateItem(selectedItemIdx, field, value);
  const updateRaidSetting = (raid: string, field: 'required' | 'note', value: any) => {
    setLocal(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      const item = next[activeRoleIdx].items[selectedItemIdx];
      item.raidSettings = item.raidSettings || {};
      item.raidSettings[raid] = { ...(item.raidSettings[raid] || {}), [field]: value };
      onSave(next);
      return next;
    });
    setHasUnsavedChanges(false);
  };

  const toggleRaid = (raid: string) => {
    setLocal(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      const item = next[activeRoleIdx].items[selectedItemIdx];
      const currentRaids = item.raids || [];
      if (currentRaids.includes(raid)) {
        item.raids = currentRaids.filter((r: string) => r !== raid);
        if (item.raidSettings?.[raid]) {
          delete item.raidSettings[raid];
        }
      } else {
        item.raids = [...currentRaids, raid];
        item.raidSettings = item.raidSettings || {};
        item.raidSettings[raid] = item.raidSettings[raid] || { required: false, note: '' };
      }
      onSave(next);
      return next;
    });
    setHasUnsavedChanges(false);
  };

  const addItem = () => {
    setIsDbOpen(true);
    setDbQuery('');
  };
  const addItemFromDb = (dbItem: any) => {
    setLocal(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      const roleItems = next[activeRoleIdx].items || [];
      const already = roleItems.some((it: any) => it.name === dbItem.name);
      if (!already) {
        roleItems.push({
          name: dbItem.name,
          effect: dbItem.effect,
          category: dbItem.category || 'Long Effects',
          duration: dbItem.duration || '',
          raids: [],
          raidSettings: {}
        });
      }
      next[activeRoleIdx].items = roleItems;
      const idx = next[activeRoleIdx].items.findIndex((it: any) => it.name === dbItem.name);
      if (idx >= 0) setSelectedItemIdx(idx);
      onSave(next);
      return next;
    });
    setIsDbOpen(false);
    setDbQuery('');
    setHasUnsavedChanges(false);
  };

  const removeItem = (idx: number) => {
    if (confirm('Biztosan torlod ezt az elemet?')) {
      setLocal(prev => {
        const next = JSON.parse(JSON.stringify(prev));
        next[activeRoleIdx].items.splice(idx, 1);
        const nextLen = next[activeRoleIdx].items.length;
        if (nextLen <= 0) {
          setSelectedItemIdx(0);
        } else if (idx >= nextLen) {
          setSelectedItemIdx(nextLen - 1);
        }
        return next;
      });
      markDirty();
    }
  };

  const handleSave = () => {
    onSave(local);
    setHasUnsavedChanges(false);
  };
  const selectedItem = items[selectedItemIdx];

  const roleIcons: Record<string, any> = {
    Tank: <Shield size={18} />,
    Healer: <Heart size={18} />,
    Melee: <Sword size={18} />,
    Caster: <Wand2 size={18} />,
    Hunter: <Target size={18} />,
    Ranged: <Target size={18} />,
    'Raid Specific': <ScrollText size={18} />
  };

  return (
    <div className="space-y-10 animate-fade-in pb-20">
      <div className="flex justify-between items-center border-b border-white/5 pb-6">
        <div>
          <h2 className="text-3xl font-bold cinzel-font text-white uppercase tracking-widest">Consumables Menedzser</h2>
          <p className="text-neutral-500 italic text-xs mt-1">Gyors szerkesztes: bal oldalon lista, jobb oldalon reszletek.</p>
        </div>
        <div className="flex items-center gap-4">
          {hasUnsavedChanges && (
            <span className="text-[10px] uppercase tracking-widest font-bold text-[#c8aa6e]">Nem mentett valtozasok</span>
          )}
          <SaveIconBtn onClick={handleSave} />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 p-1 bg-[#0a0a0b] border border-white/5 rounded-sm">
        {local.map((roleData, idx) => (
          <button
            key={roleData.role}
            type="button"
            onClick={() => setActiveRoleIdx(idx)}
            className={`flex items-center gap-2 px-6 py-3 cinzel-font font-bold text-[10px] uppercase tracking-[0.2em] transition-all rounded-sm ${
              activeRoleIdx === idx
                ? 'bg-[#c8aa6e] text-black shadow-lg'
                : 'text-neutral-500 hover:text-white hover:bg-white/5'
            }`}
          >
            {roleIcons[roleData.role]} {roleData.role}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 bg-[#0a0a0b] border border-white/5 p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#c8aa6e]/10 text-[#c8aa6e] rounded-full">
                {roleIcons[activeRole?.role]}
              </div>
              <div>
                <h3 className="cinzel-font font-bold text-white uppercase tracking-widest text-sm">{activeRole?.role}</h3>
                <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest">{items.length} targy</p>
              </div>
            </div>
            <button
              type="button"
              onClick={addItem}
              className="flex items-center gap-2 px-3 py-2 border border-[#c8aa6e]/30 text-[#c8aa6e] hover:bg-[#c8aa6e] hover:text-black transition-all cinzel-font font-bold text-[10px] uppercase tracking-widest rounded-sm"
            >
              <Plus size={14} /> Uj
            </button>
          </div>

          <div className="grid grid-cols-1 gap-2">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Kereses nev vagy hatas..."
              className="w-full bg-black border border-white/10 p-3 rounded text-xs text-neutral-300 outline-none focus:border-[#c8aa6e]"
            />
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="w-full bg-black border border-white/10 p-3 rounded text-[10px] uppercase font-bold tracking-widest text-neutral-400 outline-none focus:border-[#c8aa6e]"
            >
              <option value="all">Minden kategoria</option>
              {categories.filter(c => c !== 'all').map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2 max-h-[640px] overflow-y-auto custom-scrollbar pr-1">
            {filteredItemIndexes.length === 0 && (
              <div className="p-4 border border-white/5 bg-black/30 text-[11px] text-neutral-500 uppercase tracking-widest">
                Nincs talalat a szuresre.
              </div>
            )}
            {filteredItemIndexes.map(idx => {
              const item = items[idx];
              const active = idx === selectedItemIdx;
              return (
                <button
                  key={`${item.name}-${idx}`}
                  type="button"
                  onClick={() => setSelectedItemIdx(idx)}
                  className={`w-full text-left p-3 border transition-all rounded-sm ${
                    active
                      ? 'border-[#c8aa6e] bg-[#c8aa6e]/10'
                      : 'border-white/5 bg-black/20 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <img src={getConsumableIcon(item.name)} alt={item.name} className="w-7 h-7 rounded-sm border border-white/10 shrink-0" />
                      <p className={`text-sm font-bold cinzel-font truncate ${active ? 'text-[#c8aa6e]' : 'text-white'}`}>{item.name}</p>
                    </div>
                    <span className="text-[9px] text-neutral-500 uppercase tracking-widest flex items-center gap-1 shrink-0">
                      {item.raids?.length || 0} raid
                    </span>
                  </div>
                  <p className="text-[10px] text-neutral-500 uppercase tracking-widest mt-1">{item.category}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-8 bg-[#0a0a0b] border border-white/5 p-6">
          {!selectedItem ? (
            <div className="h-full min-h-[360px] flex items-center justify-center text-neutral-600 text-sm">
              Valassz egy itemet a szerkeszteshez.
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-4 border-b border-white/5 pb-4">
                <div className="flex items-center gap-3">
                  <img src={getConsumableIcon(selectedItem.name)} alt={selectedItem.name} className="w-10 h-10 rounded border border-white/10" />
                  <div>
                  <p className="text-[10px] uppercase tracking-widest text-neutral-600 font-bold">Szerkesztett elem</p>
                  <h4 className="cinzel-font text-xl text-white font-bold">{selectedItem.name || 'Nevtelen Item'}</h4>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => removeItem(selectedItemIdx)}
                    className="p-2 border border-red-900/50 text-red-500 hover:bg-red-500/10 rounded-sm"
                    title="Elem torlese"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <label className="space-y-1">
                  <span className="text-[9px] uppercase font-bold text-neutral-600 tracking-widest">Targy neve</span>
                  <input
                    value={selectedItem.name}
                    readOnly
                    className="w-full bg-black/50 border border-white/10 p-3 rounded text-[#c8aa6e] cinzel-font font-bold text-sm outline-none cursor-not-allowed"
                  />
                </label>
                <label className="space-y-1">
                  <span className="text-[9px] uppercase font-bold text-neutral-600 tracking-widest">Kategoria</span>
                  <input
                    value={selectedItem.category}
                    readOnly
                    className="w-full bg-black/50 border border-white/10 p-3 rounded text-neutral-300 text-[10px] uppercase font-bold tracking-widest outline-none cursor-not-allowed"
                  />
                </label>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase font-bold text-neutral-600 tracking-widest">Hatas leirasa</span>
                  <span className="text-[9px] uppercase font-bold tracking-widest text-neutral-700">Fix mező</span>
                </div>
                <div className="relative rounded border border-[#c8aa6e]/20 bg-[linear-gradient(180deg,rgba(200,170,110,0.08),rgba(0,0,0,0.15))] p-4">
                  <textarea
                    value={selectedItem.effect}
                    readOnly
                    className="w-full bg-transparent text-neutral-200 font-serif text-sm leading-relaxed min-h-[110px] outline-none resize-none cursor-not-allowed"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black/20 to-transparent pointer-events-none rounded-b"></div>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[9px] uppercase font-bold text-neutral-600 tracking-widest block">Melyik raid(ek)re kell</span>
                <div className="flex flex-wrap gap-2">
                  {raids.map(raid => {
                    const isActive = (selectedItem.raids || []).includes(raid);
                    const isRequired = !!selectedItem?.raidSettings?.[raid]?.required;
                    return (
                      <button
                        key={raid}
                        type="button"
                        onClick={() => toggleRaid(raid)}
                        className={`px-3 py-1.5 rounded-sm text-[10px] font-bold cinzel-font tracking-widest uppercase transition-all border ${
                          isActive
                            ? 'bg-[#c8aa6e]/10 border-[#c8aa6e] text-[#c8aa6e]'
                            : 'bg-black border-white/10 text-neutral-500 hover:text-white hover:border-white/20'
                        }`}
                      >
                        {isActive && isRequired && <X size={10} className="inline mr-1 mb-0.5 text-red-400" />}
                        {isActive && !isRequired && <Zap size={10} className="inline mr-1 mb-0.5" />}
                        {raid}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3 pt-2 border-t border-white/5">
                <span className="text-[9px] uppercase font-bold text-neutral-600 tracking-widest block">Raid specifikus megjegyzes es kotelezo</span>
                {(selectedItem.raids || []).length === 0 && (
                  <p className="text-xs text-neutral-500">Eloszor valassz legalabb egy raidet az itemhez.</p>
                )}
                {(selectedItem.raids || []).map((raid: string) => {
                  const meta = selectedItem?.raidSettings?.[raid] || {};
                  return (
                    <div key={raid} className="grid md:grid-cols-[90px_1fr_auto] gap-3 items-center">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-neutral-400">{raid}</span>
                      <div className="flex items-center bg-black border border-white/10 rounded px-3">
                        <Globe size={14} className="text-neutral-700" />
                        <input
                          value={meta.note || ''}
                          onChange={e => updateRaidSetting(raid, 'note', e.target.value)}
                          placeholder={`${raid} megjegyzes`}
                          className="w-full bg-transparent p-3 text-neutral-300 text-xs outline-none"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => updateRaidSetting(raid, 'required', !meta.required)}
                        className={`px-3 py-2 border rounded-sm text-[10px] uppercase tracking-widest font-bold transition-all ${
                          meta.required
                            ? 'border-red-500/60 bg-red-900/20 text-red-300'
                            : 'border-white/10 text-neutral-500 hover:text-white hover:border-white/20'
                        }`}
                      >
                        <X size={12} className="inline mr-1" /> Kotelezo
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
      {isDbOpen && (
        <div className="fixed inset-0 z-[300] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="w-full max-w-3xl bg-[#0a0a0b] border border-white/10 rounded-sm shadow-2xl">
            <div className="p-5 border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="cinzel-font text-xl text-white font-bold uppercase tracking-widest">Consumable Adatbazis</h3>
                <p className="text-xs text-neutral-500 mt-1">Keress es valassz egy itemet a szerepkorhoz.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsDbOpen(false)}
                className="px-3 py-2 border border-white/10 text-neutral-400 hover:text-white hover:border-white/20 text-[10px] uppercase tracking-widest font-bold rounded-sm"
              >
                Bezár
              </button>
            </div>
            <div className="p-5 space-y-4">
              <input
                value={dbQuery}
                onChange={e => setDbQuery(e.target.value)}
                placeholder="Kereses nev vagy hatas alapjan..."
                className="w-full bg-black border border-white/10 p-3 rounded text-sm text-neutral-200 outline-none focus:border-[#c8aa6e]"
              />
              <div className="max-h-[420px] overflow-y-auto custom-scrollbar space-y-2 pr-1">
                {filteredDbItems.map((item: any) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => addItemFromDb(item)}
                    className="w-full text-left p-3 bg-black/30 border border-white/5 hover:border-[#c8aa6e]/40 rounded transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <img src={getConsumableIcon(item.name)} alt={item.name} className="w-8 h-8 rounded border border-white/10 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-sm text-white font-bold cinzel-font truncate">{item.name}</p>
                        <p className="text-[10px] text-neutral-500 uppercase tracking-widest">{item.category}</p>
                        <p className="text-xs text-neutral-400 mt-1 line-clamp-2">{item.effect}</p>
                      </div>
                    </div>
                  </button>
                ))}
                {filteredDbItems.length === 0 && (
                  <p className="text-sm text-neutral-500 p-3 border border-white/5 bg-black/20 rounded">Nincs talalat.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

