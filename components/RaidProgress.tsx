
import React from 'react';
import FadeInSection from './FadeInSection';
import { Swords, Trophy, ChevronRight } from 'lucide-react';

interface RaidProgressProps {
  data: any[];
  setView: (view: any) => void;
}

const RaidProgress: React.FC<RaidProgressProps> = ({ data, setView }) => {
  // Megkeressük a kiemelt raideket. Ha nincs jelölve, az első hármat vesszük.
  const featuredRaids = data.some(r => r.featured) 
    ? data.filter(r => r.featured).slice(0, 3)
    : data.slice(0, 3);
    
  const hasMoreRaids = data.length > 3;

  return (
    <section id="progress" className="py-32 bg-[#050505] relative overflow-hidden">
        {/* Dekoratív választóvonal */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-64 bg-gradient-to-b from-[#c8aa6e]/40 to-transparent"></div>
        
        <div className="container mx-auto px-6 relative z-10 max-w-7xl">
            <FadeInSection>
                <div className="text-center mb-24">
                    <div className="inline-flex items-center gap-2 text-[#c8aa6e] mb-4">
                        <Swords size={20} />
                        <span className="cinzel-font text-sm font-bold tracking-[0.4em] uppercase">Kiemelt Hadjáratok</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-black cinzel-font text-white mb-6 uppercase tracking-tighter">
                      Raid <span className="text-[#c8aa6e]">Progress</span>
                    </h2>
                    <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#c8aa6e] to-transparent mx-auto"></div>
                </div>

                {/* Grid elrendezés: Mobilon 1, Tablettől (md) felfelé fix 3 oszlop */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
                    {featuredRaids.map((raid, idx) => (
                        <div key={idx} className="group glass-card fantasy-border-accent flex flex-col hover-glow transition-all duration-700 h-full">
                            <div className="h-56 relative overflow-hidden border-b border-white/5">
                                <img 
                                    src={raid.img} 
                                    alt={raid.name} 
                                    className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:scale-110 group-hover:brightness-75 transition-all duration-1000" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0b] to-transparent opacity-80"></div>
                                
                                {raid.status === 'Progress' ? (
                                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-950/80 border border-red-500/30 px-3 py-1 backdrop-blur-sm">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                                        <span className="text-[10px] cinzel-font font-bold text-red-200 tracking-widest uppercase">Progress</span>
                                    </div>
                                ) : (
                                    <div className="absolute top-4 left-4 flex items-center gap-2 bg-[#c8aa6e]/20 border border-[#c8aa6e]/30 px-3 py-1 backdrop-blur-sm">
                                        <Trophy size={12} className="text-[#c8aa6e]" />
                                        <span className="text-[10px] cinzel-font font-bold text-[#c8aa6e] tracking-widest uppercase">Cleared</span>
                                    </div>
                                )}
                            </div>

                            <div className="p-8 flex-grow flex flex-col bg-[#0a0a0b]/40">
                                <h3 className={`text-2xl font-bold cinzel-font mb-6 tracking-wide leading-tight ${raid.status === 'Progress' ? 'text-red-200' : 'text-white'}`}>
                                    {raid.name}
                                </h3>

                                <div className="mt-auto">
                                    <div className="flex justify-between items-end mb-4">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold mb-1">Bossok</span>
                                            <span className={`text-3xl cinzel-font font-black ${raid.status === 'Progress' ? 'text-red-500' : 'text-[#c8aa6e]'}`}>
                                                {raid.current} <span className="text-neutral-600 font-serif text-sm">/ {raid.total}</span>
                                            </span>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold block mb-1">Kész</span>
                                            <span className="text-2xl font-bold text-white inter-font">
                                                {Math.round((raid.current / raid.total) * 100)}%
                                            </span>
                                        </div>
                                    </div>

                                    <div className="h-2 w-full bg-black/50 border border-white/5 p-[1px] relative rounded-full overflow-hidden">
                                        <div 
                                            className={`h-full ${raid.status === 'Progress' ? 'bg-gradient-to-r from-red-900 to-red-600' : 'bg-gradient-to-r from-[#8a7c52] to-[#c8aa6e]'} transition-all duration-1000 ease-out relative rounded-full`}
                                            style={{ width: `${(raid.current / raid.total) * 100}%` }}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_3s_infinite]"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {hasMoreRaids && (
                  <div className="mt-20 flex justify-center">
                    <button 
                      onClick={() => setView('all-progress')}
                      className="group relative flex items-center gap-4 px-12 py-5 bg-transparent border border-[#c8aa6e]/30 hover:border-[#c8aa6e] transition-all duration-500 rounded-sm overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-[#c8aa6e]/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <span className="cinzel-font font-bold text-[11px] text-[#c8aa6e] uppercase tracking-[0.5em] group-hover:text-white transition-colors">További eredményeink</span>
                      <ChevronRight size={16} className="text-[#c8aa6e] group-hover:translate-x-1 group-hover:text-white transition-all" />
                      
                      {/* Dekoratív csillogás gombnyomásra/lebegésre */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    </button>
                  </div>
                )}
            </FadeInSection>
        </div>
    </section>
  );
};

export default RaidProgress;
