
import React, { useState, useEffect } from 'react';
import { 
  Settings, Users, Trophy, FlaskConical, Save, Trash2, Plus, 
  LogOut, ChevronRight, LayoutDashboard, Swords, ListChecks, 
  Edit3, ArrowUp, ArrowDown, Sword, Image as ImageIcon, Video, 
  Monitor, ScrollText, CheckCircle, Shield, Heart, Wand2, Target,
  AlertTriangle, PlayCircle, Timer, Globe, Zap, ExternalLink,
  Star, Lock, MessageSquare, ArrowLeft
} from 'lucide-react';
import { DiscordAuthState, getDiscordAvatarUrl, getDiscordDisplayName } from '../../auth/discord';

interface AdminDashboardProps {
  setView: (view: any) => void;
  data: any;
  updaters: any;
  discordAuth: DiscordAuthState;
  onDiscordLogin: () => void;
  onDiscordLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ setView, data, updaters, discordAuth, onDiscordLogin, onDiscordLogout }) => {
  const isLoggedIn = discordAuth.status === 'authenticated' && !!discordAuth.user;
  const isAuthenticating = discordAuth.status === 'loading';
  const [activeTab, setActiveTab] = useState<'overview' | 'hero' | 'roster' | 'progress' | 'rules' | 'tactics' | 'consumables' | 'guides'>('overview');
  const [saveStatus, setSaveStatus] = useState<string | null>(null);
  const avatarUrl = discordAuth.user ? getDiscordAvatarUrl(discordAuth.user, 64) : null;
  const displayName = discordAuth.user ? getDiscordDisplayName(discordAuth.user) : '';

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
    className="p-3 bg-[#c8aa6e] text-black rounded-full hover:bg-[#e5d5b0] transition-all shadow-[0_5px_15px_rgba(0,0,0,0.3)] active:scale-90 hover:shadow-[0_0_20px_rgba(200,170,110,0.4)]"
    title="Változtatások mentése"
  >
    <Save size={20} />
  </button>
);

const ProgressEditor = ({ progress, onSave }: any) => {
  const [local, setLocal] = useState([...progress]);
  useEffect(() => { setLocal(JSON.parse(JSON.stringify(progress))); }, [progress]);

  const update = (idx: number, field: string, val: any) => {
    const next = [...local];
    next[idx] = { ...next[idx], [field]: val };
    setLocal(next);
  };

  const addRaid = () => {
    setLocal(prev => [
      ...prev,
      { 
        name: 'Új Raid', 
        current: 0, 
        total: 10, 
        status: 'Progress', 
        color: 'text-red-500', 
        barColor: 'bg-red-600', 
        img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2568&auto=format&fit=crop',
        featured: false
      }
    ]);
  };

  const removeRaid = (idx: number) => {
    if (confirm('Biztosan törölni akarod ezt a raidet?')) {
      setLocal(prev => prev.filter((_, i) => i !== idx));
    }
  };

  const moveRaid = (idx: number, dir: 'up' | 'down') => {
    const next = [...local];
    if (dir === 'up' && idx > 0) {
      [next[idx], next[idx - 1]] = [next[idx - 1], next[idx]];
    } else if (dir === 'down' && idx < next.length - 1) {
      [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
    }
    setLocal(next);
  };

  const featuredCount = local.filter(r => r.featured).length;

  return (
    <div className="space-y-10 animate-fade-in pb-20">
      <div className="flex items-center justify-between border-b border-white/5 pb-6">
        <div>
          <h2 className="text-3xl font-bold cinzel-font text-white uppercase tracking-widest">Raid Progress</h2>
          <p className="text-neutral-500 italic text-xs mt-1">Szerkeszd a guild aktuális haladását.</p>
        </div>
        <div className="flex items-center gap-6">
          <div className={`flex items-center gap-2 px-4 py-2 border rounded text-[10px] font-bold uppercase tracking-widest transition-all ${featuredCount > 3 ? 'bg-red-900/20 border-red-500 text-red-500' : 'bg-[#c8aa6e]/10 border-[#c8aa6e]/20 text-[#c8aa6e]'}`}>
            <Star size={14} className={featuredCount > 3 ? "animate-pulse" : ""} />
            Kiemelt: {featuredCount}/3
          </div>
          <div className="flex gap-4">
            <button type="button" onClick={addRaid} className="p-3 bg-white/5 hover:bg-white/10 text-[#c8aa6e] rounded-full transition-all border border-white/5">
              <Plus size={20} />
            </button>
            <SaveIconBtn onClick={() => onSave(local)} />
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {local.map((raid, i) => (
          <div key={i} className={`bg-[#0a0a0b] border ${raid.featured ? 'border-[#c8aa6e]/50 shadow-[0_0_30px_rgba(200,170,110,0.1)]' : 'border-white/5'} p-8 rounded-sm group hover:border-[#c8aa6e]/30 transition-all shadow-xl relative overflow-hidden`}>
            {raid.featured && (
              <div className="absolute top-0 left-0 bg-[#c8aa6e] text-black px-3 py-1 text-[8px] font-black uppercase tracking-widest z-20">
                Kiemelt
              </div>
            )}
            
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none grayscale group-hover:grayscale-0 transition-all">
                <img src={raid.img} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#0a0a0b]"></div>
            </div>

            <div className="relative z-10">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/4 space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <button type="button" onClick={() => moveRaid(i, 'up')} className="p-1 hover:text-[#c8aa6e] transition-colors"><ArrowUp size={16} /></button>
                    <button type="button" onClick={() => moveRaid(i, 'down')} className="p-1 hover:text-[#c8aa6e] transition-colors"><ArrowDown size={16} /></button>
                    <span className="text-[10px] text-neutral-700 font-bold uppercase tracking-widest ml-auto">Rend: {i + 1}</span>
                  </div>
                  <label className="block space-y-1">
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Raid Megnevezése</span>
                    <input 
                      value={raid.name} 
                      onChange={e => update(i, 'name', e.target.value)} 
                      className="w-full bg-black border border-white/10 p-3 rounded text-white cinzel-font text-sm outline-none focus:border-[#c8aa6e]" 
                    />
                  </label>
                  
                  <div className="flex items-center justify-between p-3 bg-black/40 border border-white/5 rounded">
                     <div className="flex items-center gap-2">
                        <Star size={12} className={raid.featured ? "text-[#c8aa6e]" : "text-neutral-700"} />
                        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Kiemelt</span>
                     </div>
                     <button 
                       type="button" 
                       onClick={() => update(i, 'featured', !raid.featured)} 
                       className={`w-10 h-5 rounded-full relative transition-colors ${raid.featured ? 'bg-[#c8aa6e]' : 'bg-neutral-800'}`}
                     >
                       <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${raid.featured ? 'right-1' : 'left-1'}`} />
                     </button>
                  </div>

                  <label className="block space-y-1">
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Státusz</span>
                    <select 
                      value={raid.status} 
                      onChange={e => update(i, 'status', e.target.value)} 
                      className="w-full bg-black border border-white/10 p-3 rounded text-[10px] uppercase font-bold tracking-widest outline-none focus:border-[#c8aa6e]"
                    >
                      <option value="Progress">Progress</option>
                      <option value="Farmed">Cleared / Farmed</option>
                    </select>
                  </label>
                </div>

                <div className="md:w-3/4 grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <label className="block space-y-1">
                        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Aktuális Boss</span>
                        <input 
                          type="number" 
                          value={raid.current} 
                          onChange={e => update(i, 'current', parseInt(e.target.value) || 0)} 
                          className="w-full bg-black border border-white/10 p-3 rounded text-center text-lg font-bold cinzel-font" 
                        />
                      </label>
                      <label className="block space-y-1">
                        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Összes Boss</span>
                        <input 
                          type="number" 
                          value={raid.total} 
                          onChange={e => update(i, 'total', parseInt(e.target.value) || 1)} 
                          className="w-full bg-black border border-white/10 p-3 rounded text-center text-lg font-bold cinzel-font" 
                        />
                      </label>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Előnézet ({raid.total > 0 ? Math.round((raid.current / raid.total) * 100) : 0}%)</span>
                        <div className="flex gap-2">
                           <button type="button" onClick={() => update(i, 'barColor', 'bg-red-600')} className={`w-4 h-4 rounded-full bg-red-600 border ${raid.barColor === 'bg-red-600' ? 'border-white' : 'border-transparent'}`} />
                           <button type="button" onClick={() => update(i, 'barColor', 'bg-[#c8aa6e]')} className={`w-4 h-4 rounded-full bg-[#c8aa6e] border ${raid.barColor === 'bg-[#c8aa6e]' ? 'border-white' : 'border-transparent'}`} />
                           <button type="button" onClick={() => update(i, 'barColor', 'bg-green-600')} className={`w-4 h-4 rounded-full bg-green-600 border ${raid.barColor === 'bg-green-600' ? 'border-white' : 'border-transparent'}`} />
                        </div>
                      </div>
                      <div className="h-3 w-full bg-black border border-white/5 rounded-full overflow-hidden p-[1px]">
                        <div 
                          className={`h-full ${raid.barColor} transition-all duration-1000 ease-out`}
                          style={{ width: `${raid.total > 0 ? (raid.current / raid.total) * 100 : 0}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 flex flex-col justify-between">
                    <label className="block space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Borítókép URL</span>
                        <ImageIcon size={14} className="text-neutral-700" />
                      </div>
                      <input 
                        value={raid.img} 
                        onChange={e => update(i, 'img', e.target.value)} 
                        placeholder="https://..."
                        className="w-full bg-black border border-white/10 p-3 rounded text-[10px] text-neutral-400 outline-none focus:border-[#c8aa6e]" 
                      />
                    </label>

                    <div className="pt-4 flex justify-end">
                      <button 
                        type="button"
                        onClick={(e) => { e.preventDefault(); removeRaid(i); }}
                        className="relative z-30 flex items-center gap-2 text-red-900 hover:text-red-500 text-[10px] font-bold uppercase tracking-widest transition-colors p-2 bg-red-500/5 rounded hover:bg-red-500/10"
                      >
                        <Trash2 size={14} /> Raid Törlése
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {local.length === 0 && (
        <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-lg">
          <Trophy size={48} className="mx-auto text-neutral-800 mb-4" />
          <p className="text-neutral-600 cinzel-font">Nincs raid rögzítve. Kattints a + gombra.</p>
        </div>
      )}
    </div>
  );
};

const HeroEditor = ({ config, onSave }: any) => {
  const [local, setLocal] = useState(config);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [videoObjectUrl, setVideoObjectUrl] = useState<string | null>(null);
  useEffect(() => { setLocal(config); }, [config]);
  useEffect(() => {
    return () => {
      if (videoObjectUrl) {
        URL.revokeObjectURL(videoObjectUrl);
      }
    };
  }, [videoObjectUrl]);

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
      if (videoObjectUrl) {
        URL.revokeObjectURL(videoObjectUrl);
        setVideoObjectUrl(null);
      }
      setLocal(prev => ({ ...prev, bgType: 'image', bgImage: dataUrl }));
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : 'Nem sikerult beolvasni a fajlt.');
    }
  };

  const handleVideoUpload = (file?: File | null) => {
    if (!file) return;
    if (!file.type.startsWith('video/')) {
      setUploadError('Csak video fajl toltheto fel.');
      return;
    }
    setUploadError(null);
    const url = URL.createObjectURL(file);
    if (videoObjectUrl) {
      URL.revokeObjectURL(videoObjectUrl);
    }
    setVideoObjectUrl(url);
    setLocal(prev => ({ ...prev, bgType: 'video', bgVideo: url }));
  };

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="flex items-center justify-between border-b border-white/5 pb-6">
        <div>
          <h2 className="text-3xl font-bold cinzel-font text-white uppercase tracking-widest">Hero Szekció</h2>
          <p className="text-neutral-500 italic text-xs mt-1">Vezéroldal megjelenésének módosítása.</p>
        </div>
        <SaveIconBtn onClick={() => onSave(local)} />
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <label className="block space-y-2">
            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Klán Név</span>
            <input value={local.title} onChange={e => setLocal({...local, title: e.target.value})} className="w-full bg-black border border-white/10 p-4 rounded text-white cinzel-font outline-none focus:border-[#c8aa6e]" />
          </label>
          <label className="block space-y-2">
            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Bemutatkozó szöveg</span>
            <textarea value={local.subtitle} onChange={e => setLocal({...local, subtitle: e.target.value})} className="w-full bg-black border border-white/10 p-4 rounded text-neutral-400 h-24 outline-none focus:border-[#c8aa6e]" />
          </label>
          
          <div className="p-6 bg-[#0a0a0b] border border-white/5 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Mottó láthatósága</span>
              <button type="button" onClick={() => setLocal({...local, showMotto: !local.showMotto})} className={`w-10 h-5 rounded-full relative transition-colors ${local.showMotto !== false ? 'bg-green-600' : 'bg-neutral-800'}`}>
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${local.showMotto !== false ? 'right-1' : 'left-1'}`} />
              </button>
            </div>
            {local.showMotto !== false && (
              <label className="block space-y-2 animate-fade-in">
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Mottó szövege</span>
                <input 
                  value={local.motto} 
                  onChange={e => setLocal({...local, motto: e.target.value})} 
                  placeholder="pl: Fegyelem • Tudás • Győzelem"
                  className="w-full bg-black border border-white/10 p-3 rounded text-neutral-400 text-xs outline-none focus:border-[#c8aa6e]" 
                />
              </label>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="p-6 bg-[#0a0a0b] border border-white/5 space-y-6">
            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block">Háttér Beállítások</span>
            <div className="flex gap-2">
              <button type="button" onClick={() => setLocal({...local, bgType: 'image'})} className={`flex-grow py-3 border text-[10px] font-bold cinzel-font transition-all ${local.bgType === 'image' ? 'bg-[#c8aa6e] text-black border-[#c8aa6e]' : 'text-neutral-500 border-white/5 hover:text-white'}`}>KÉP</button>
              <button type="button" onClick={() => setLocal({...local, bgType: 'video'})} className={`flex-grow py-3 border text-[10px] font-bold cinzel-font transition-all ${local.bgType === 'video' ? 'bg-[#c8aa6e] text-black border-[#c8aa6e]' : 'text-neutral-500 border-white/5 hover:text-white'}`}>VIDEÓ</button>
            </div>
            <input 
              value={local.bgType === 'image' ? local.bgImage : local.bgVideo} 
              onChange={e => setLocal({...local, [local.bgType === 'image' ? 'bgImage' : 'bgVideo']: e.target.value})} 
              placeholder={local.bgType === 'image' ? "Kép URL..." : "Videó .mp4 URL..."}
              className="w-full bg-black border border-white/10 p-3 rounded text-xs text-neutral-400 outline-none focus:border-[#c8aa6e]"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <label className="flex items-center justify-center gap-2 px-4 py-3 border border-white/10 text-[10px] font-bold cinzel-font uppercase tracking-widest text-neutral-400 hover:text-white hover:border-[#c8aa6e]/40 transition-all cursor-pointer">
                Kép Feltöltés
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => handleImageUpload(e.target.files?.[0])}
                  className="hidden"
                />
              </label>
              <label className="flex items-center justify-center gap-2 px-4 py-3 border border-white/10 text-[10px] font-bold cinzel-font uppercase tracking-widest text-neutral-400 hover:text-white hover:border-[#c8aa6e]/40 transition-all cursor-pointer">
                Videó Feltöltés
                <input
                  type="file"
                  accept="video/*"
                  onChange={e => handleVideoUpload(e.target.files?.[0])}
                  className="hidden"
                />
              </label>
            </div>
            <p className="text-[9px] text-neutral-600 uppercase tracking-widest">
              Helyi fájl csak ebben a böngésző munkamenetben működik. Tartósan URL-t használj.
            </p>
            {uploadError && (
              <p className="text-[10px] text-red-400 uppercase tracking-widest">{uploadError}</p>
            )}
          </div>

          <div className="p-6 bg-[#0a0a0b] border border-white/5 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">Progress Bar láthatósága</span>
              <button type="button" onClick={() => setLocal({...local, showProgress: !local.showProgress})} className={`w-10 h-5 rounded-full relative transition-colors ${local.showProgress ? 'bg-green-600' : 'bg-neutral-800'}`}>
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${local.showProgress ? 'right-1' : 'left-1'}`} />
              </button>
            </div>
            {local.showProgress && (
              <div className="space-y-4 pt-4 border-t border-white/5 animate-fade-in">
                <input value={local.progressLabel} onChange={e => setLocal({...local, progressLabel: e.target.value})} className="w-full bg-black border border-white/10 p-2 text-xs rounded outline-none" />
                <input type="range" min="0" max="100" value={local.progressValue} onChange={e => setLocal({...local, progressValue: parseInt(e.target.value)})} className="w-full accent-[#c8aa6e]" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const RosterEditor = ({ officers, onSave }: any) => {
  const [local, setLocal] = useState([...officers]);
  useEffect(() => { setLocal([...officers]); }, [officers]);

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="flex items-center justify-between border-b border-white/5 pb-6">
        <div>
          <h2 className="text-3xl font-bold cinzel-font text-white uppercase tracking-widest">Vezetőség</h2>
          <p className="text-neutral-500 italic text-xs mt-1">Officerek és a Guild Master kezelése.</p>
        </div>
        <div className="flex gap-4">
          <button type="button" onClick={() => setLocal([...local, { name: 'Új Tag', role: 'Officer' }])} className="p-3 bg-white/5 hover:bg-white/10 text-[#c8aa6e] rounded-full transition-all border border-white/5"><Plus size={18} /></button>
          <SaveIconBtn onClick={() => onSave(local)} />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {local.map((off, i) => (
          <div key={i} className="bg-[#0a0a0b] border border-white/5 p-6 flex justify-between items-center group hover:border-[#c8aa6e]/20 transition-all">
            <div className="flex flex-col gap-3 flex-grow mr-6">
              <input value={off.name} onChange={e => { const n = [...local]; n[i].name = e.target.value; setLocal(n); }} className="bg-black border border-white/10 p-3 rounded text-sm font-bold cinzel-font text-white outline-none focus:border-[#c8aa6e]" />
              <select value={off.role} onChange={e => { const n = [...local]; n[i].role = e.target.value as any; setLocal(n); }} className="bg-black border border-white/10 p-2 rounded text-[10px] text-neutral-500 uppercase font-bold tracking-widest outline-none">
                <option value="Leader">Guild Master</option>
                <option value="Officer">Officer</option>
              </select>
            </div>
            <button type="button" onClick={() => setLocal(local.filter((_, idx) => idx !== i))} className="text-red-900 hover:text-red-500 p-2 transition-colors"><Trash2 size={18} /></button>
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

  useEffect(() => { setLocal([...tactics]); }, [tactics]);

  const updateBoss = (field: string, val: any) => {
    const next = JSON.parse(JSON.stringify(local));
    next[selRaid].bosses[selBoss][field] = val;
    setLocal(next);
  };

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="flex items-center justify-between border-b border-white/5 pb-6">
        <div>
          <h2 className="text-3xl font-bold cinzel-font text-white uppercase tracking-widest">Taktika Szerkesztő</h2>
          <p className="text-neutral-500 italic text-xs mt-1">Boss mechanikák és raid stratégiák.</p>
        </div>
        <SaveIconBtn onClick={() => onSave(local)} />
      </div>

      <div className="flex gap-4 bg-[#0a0a0b] p-6 border border-white/5">
        <div className="flex flex-col gap-1 flex-grow">
          <span className="text-[9px] uppercase font-bold text-neutral-600 tracking-widest mb-1">Raid</span>
          <select value={selRaid} onChange={e => { setSelRaid(parseInt(e.target.value)); setSelBoss(0); }} className="w-full bg-black border border-white/10 p-3 rounded text-[#c8aa6e] cinzel-font font-bold outline-none">
            {local.map((r, i) => <option key={i} value={i}>{r.name}</option>)}
          </select>
        </div>
        <div className="flex flex-col gap-1 flex-grow">
          <span className="text-[9px] uppercase font-bold text-neutral-600 tracking-widest mb-1">Célpont</span>
          <select value={selBoss} onChange={e => setSelBoss(parseInt(e.target.value))} className="w-full bg-black border border-white/10 p-3 rounded text-neutral-400 cinzel-font outline-none">
            {local[selRaid].bosses.map((b:any, i:number) => <option key={i} value={i}>{b.name}</option>)}
          </select>
        </div>
      </div>

      {local[selRaid].bosses[selBoss] && (
        <div className="space-y-6 bg-[#0a0a0b] p-8 border border-white/5 animate-fade-in">
          <div className="flex items-center gap-4 border-b border-white/5 pb-4">
             <Edit3 size={20} className="text-[#c8aa6e]" />
             <input value={local[selRaid].bosses[selBoss].name} onChange={e => updateBoss('name', e.target.value)} className="text-2xl font-bold bg-transparent w-full cinzel-font text-white outline-none" />
          </div>
          <div className="space-y-2">
            <span className="text-[9px] uppercase font-bold text-neutral-600 tracking-widest">Taktikai Leírás (Raw Text / JSON)</span>
            <textarea 
                value={typeof local[selRaid].bosses[selBoss].description === 'string' ? local[selRaid].bosses[selBoss].description : 'Blocks editing not supported.'} 
                onChange={e => updateBoss('description', e.target.value)} 
                className="w-full h-[500px] bg-black border border-white/10 p-6 rounded font-serif text-neutral-400 leading-relaxed outline-none focus:border-white/20 custom-scrollbar" 
            />
          </div>
        </div>
      )}
    </div>
  );
};

// Overview Tab for quick stats
const OverviewTab = ({ data }: any) => (
  <div className="space-y-12 animate-fade-in">
    <div className="flex flex-col gap-2">
      <h2 className="text-5xl font-black cinzel-font text-white uppercase tracking-tighter">Áttekintés</h2>
      <p className="text-neutral-500 font-serif italic text-lg">Guild statisztikák és vezérlőpult.</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <StatBox label="Progress" value={data.progress.length > 0 ? `${data.progress[0].current}/${data.progress[0].total}` : 'N/A'} icon={<Trophy className="text-[#c8aa6e]" />} />
      <StatBox label="Officerek" value={data.officers.length} icon={<Users className="text-blue-500" />} />
      <StatBox label="Szabályok" value={data.rules.length} icon={<ListChecks className="text-green-500" />} />
      <StatBox label="Taktikák" value={data.tactics.reduce((acc: number, r: any) => acc + r.bosses.length, 0)} icon={<Swords className="text-red-500" />} />
    </div>
  </div>
);

const StatBox = ({ label, value, icon }: any) => (
  <div className="bg-[#0a0a0b] border border-white/5 p-8 rounded-sm flex items-center justify-between group hover:border-[#c8aa6e]/30 transition-all duration-500">
    <div>
      <span className="text-[10px] text-neutral-600 uppercase font-bold tracking-[0.3em] mb-2 block">{label}</span>
      <p className="text-4xl font-black text-white cinzel-font">{value}</p>
    </div>
    <div className="p-4 bg-white/5 rounded-full group-hover:bg-[#c8aa6e]/10 transition-colors">{icon}</div>
  </div>
);

const GuidesEditor = ({ guides, onSave }: any) => {
  const [l, s] = useState([...guides]);
  useEffect(() => { s([...guides]); }, [guides]);
  return (
    <div className="space-y-10 animate-fade-in">
      <div className="flex justify-between items-center border-b border-white/5 pb-6">
        <div>
          <h2 className="text-3xl font-bold cinzel-font text-white uppercase tracking-widest">Hasznos Tippek</h2>
          <p className="text-neutral-500 italic text-xs mt-1">Klán tudástár bővítése.</p>
        </div>
        <div className="flex gap-4">
          <button type="button" onClick={() => s([{ id: Date.now(), title: 'Új Tipp', category: 'Általános', content: '', date: '2024.xx.xx' }, ...l])} className="p-3 bg-white/5 hover:bg-white/10 text-[#c8aa6e] rounded-full"><Plus size={18} /></button>
          <SaveIconBtn onClick={() => onSave(l)} />
        </div>
      </div>
      <div className="grid gap-4">
        {l.map((g, i) => (
          <div key={g.id} className="bg-[#0a0a0b] border border-white/5 p-6 space-y-4 group">
            <div className="flex justify-between items-center">
              <input value={g.title} onChange={e => { const n = [...l]; n[i].title = e.target.value; s(n); }} className="bg-transparent text-[#c8aa6e] cinzel-font font-bold text-lg outline-none flex-grow" />
              <button type="button" onClick={() => s(l.filter((_, idx) => idx !== i))} className="text-red-900 hover:text-red-500"><Trash2 size={18} /></button>
            </div>
            <textarea value={g.content} onChange={e => { const n = [...l]; n[i].content = e.target.value; s(n); }} className="w-full bg-black/40 border border-white/5 p-4 rounded text-sm text-neutral-400 font-serif h-32 outline-none" />
          </div>
        ))}
      </div>
    </div>
  );
};

const ConsumablesEditor = ({ consumables, onSave }: any) => {
  const [local, setLocal] = useState([...consumables]);
  const [activeRoleIdx, setActiveRoleIdx] = useState(0);
  
  const raids = ['MC', 'BWL', 'AQ40', 'Naxx', 'K40'];

  useEffect(() => {
    setLocal(JSON.parse(JSON.stringify(consumables)));
  }, [consumables]);

  const updateItem = (itemIdx: number, field: string, value: any) => {
    const next = JSON.parse(JSON.stringify(local));
    next[activeRoleIdx].items[itemIdx][field] = value;
    setLocal(next);
  };

  const toggleRaid = (itemIdx: number, raid: string) => {
    const next = JSON.parse(JSON.stringify(local));
    const currentRaids = next[activeRoleIdx].items[itemIdx].raids || [];
    if (currentRaids.includes(raid)) {
      next[activeRoleIdx].items[itemIdx].raids = currentRaids.filter((r: string) => r !== raid);
    } else {
      next[activeRoleIdx].items[itemIdx].raids = [...currentRaids, raid];
    }
    setLocal(next);
  };

  const addItem = () => {
    setLocal(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      next[activeRoleIdx].items.unshift({
        name: 'Új Item',
        effect: 'Hatás leírása...',
        raids: ['Naxx'],
        category: 'Long Effects',
        duration: '1h'
      });
      return next;
    });
  };

  const removeItem = (idx: number) => {
    if (confirm('Biztosan törlöd ezt az elemet?')) {
      setLocal(prev => {
        const next = JSON.parse(JSON.stringify(prev));
        next[activeRoleIdx].items.splice(idx, 1);
        return next;
      });
    }
  };

  const roleIcons: Record<string, any> = {
    Tank: <Shield size={18} />,
    Healer: <Heart size={18} />,
    Melee: <Sword size={18} />,
    Caster: <Wand2 size={18} />,
    Hunter: <Target size={18} />
  };

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="flex justify-between items-center border-b border-white/5 pb-6">
        <div>
          <h2 className="text-3xl font-bold cinzel-font text-white uppercase tracking-widest">Consumables Menedzser</h2>
          <p className="text-neutral-500 italic text-xs mt-1">Vezesd be, melyik szerepkörnek melyik raidre mire van szüksége.</p>
        </div>
        <SaveIconBtn onClick={() => onSave(local)} />
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

      <div className="space-y-6">
        <div className="flex items-center justify-between bg-[#0a0a0b] p-6 border border-white/5">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#c8aa6e]/10 text-[#c8aa6e] rounded-full">
              {roleIcons[local[activeRoleIdx].role]}
            </div>
            <div>
              <h3 className="cinzel-font font-bold text-white uppercase tracking-widest">{local[activeRoleIdx].role} Felszerelés</h3>
              <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest">{local[activeRoleIdx].items.length} rögzített tárgy</p>
            </div>
          </div>
          <button 
            type="button"
            onClick={addItem}
            className="flex items-center gap-2 px-6 py-3 border border-[#c8aa6e]/30 text-[#c8aa6e] hover:bg-[#c8aa6e] hover:text-black transition-all cinzel-font font-bold text-[10px] uppercase tracking-widest"
          >
            <Plus size={16} /> Új Tárgy Hozzáadása
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {local[activeRoleIdx].items.map((item: any, idx: number) => (
            <div key={idx} className="bg-[#0a0a0b] border border-white/5 p-8 space-y-6 group hover:border-[#c8aa6e]/30 transition-all relative">
              <button 
                type="button"
                onClick={(e) => { e.preventDefault(); removeItem(idx); }}
                className="absolute top-4 right-4 p-2 text-red-900 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100 z-20"
                title="Törlés"
              >
                <Trash2 size={16} />
              </button>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold text-neutral-600 tracking-widest">Tárgy Neve</label>
                    <input 
                      value={item.name} 
                      onChange={e => updateItem(idx, 'name', e.target.value)}
                      className="w-full bg-black border border-white/10 p-3 rounded text-[#c8aa6e] cinzel-font font-bold text-sm outline-none focus:border-[#c8aa6e]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase font-bold text-neutral-600 tracking-widest">Kategória</label>
                    <select 
                      value={item.category} 
                      onChange={e => updateItem(idx, 'category', e.target.value)}
                      className="w-full bg-black border border-white/10 p-3 rounded text-neutral-400 text-[10px] uppercase font-bold tracking-widest outline-none"
                    >
                      <option value="Long Effects">Long Effects</option>
                      <option value="Short Effects">Short Effects</option>
                      <option value="Food">Food / Drink</option>
                      <option value="Naxxramas Only">Naxxramas Only</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] uppercase font-bold text-neutral-600 tracking-widest">Hatás Leírása</label>
                  <textarea 
                    value={item.effect} 
                    onChange={e => updateItem(idx, 'effect', e.target.value)}
                    className="w-full bg-black border border-white/10 p-3 rounded text-neutral-400 font-serif text-sm h-20 outline-none focus:border-white/20 resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase font-bold text-neutral-600 tracking-widest">Időtartam</label>
                      <div className="flex items-center bg-black border border-white/10 rounded px-3">
                        <Timer size={14} className="text-neutral-700" />
                        <input 
                          value={item.duration || ''} 
                          onChange={e => updateItem(idx, 'duration', e.target.value)}
                          placeholder="pl: 1h"
                          className="w-full bg-transparent p-3 text-neutral-400 text-xs outline-none"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] uppercase font-bold text-neutral-600 tracking-widest">Megjegyzés</label>
                      <div className="flex items-center bg-black border border-white/10 rounded px-3">
                        <Globe size={14} className="text-neutral-700" />
                        <input 
                          value={item.notes || ''} 
                          onChange={e => updateItem(idx, 'notes', e.target.value)}
                          placeholder="pl: STR stack"
                          className="w-full bg-transparent p-3 text-neutral-400 text-xs outline-none"
                        />
                      </div>
                    </div>
                </div>

                <div className="space-y-2 pt-2">
                  <label className="text-[9px] uppercase font-bold text-neutral-600 tracking-widest block">Szükséges a következő raideken:</label>
                  <div className="flex flex-wrap gap-1">
                    {raids.map(raid => {
                      const isActive = (item.raids || []).includes(raid);
                      return (
                        <button
                          key={raid}
                          type="button"
                          onClick={() => toggleRaid(idx, raid)}
                          className={`px-3 py-1.5 rounded-sm text-[9px] font-bold cinzel-font tracking-widest uppercase transition-all border ${
                            isActive 
                            ? 'bg-[#c8aa6e]/10 border-[#c8aa6e] text-[#c8aa6e]' 
                            : 'bg-black border-white/5 text-neutral-700 hover:text-neutral-400'
                          }`}
                        >
                          {isActive && <Zap size={8} className="inline mr-1 mb-0.5" />}
                          {raid}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
