import React, { useState, useRef } from 'react';
import FadeInSection from './FadeInSection';
import { 
  BookOpen, Swords, FlaskConical, ChevronRight, LayoutList, 
  Shield, Heart, Sword, Trophy, AlertTriangle, Info, PlayCircle
} from 'lucide-react';

const RaidTactics: React.FC<{ data: any[] }> = ({ data }) => {
  const [selectedRaidIndex, setSelectedRaidIndex] = useState(0);
  const [selectedBossIndex, setSelectedBossIndex] = useState(0);
  const bossTitleRef = useRef<HTMLHeadingElement | null>(null);

  const currentRaid = data[selectedRaidIndex];
  const currentBoss = currentRaid.bosses[selectedBossIndex];

  const scrollToBossTitleMobile = () => {
    if (window.innerWidth >= 1024) return;
    window.requestAnimationFrame(() => {
      bossTitleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  // Helper to extract YouTube ID from link
  const getYoutubeID = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const renderBlocks = (description: string) => {
    let blocks = [];
    try {
        blocks = JSON.parse(description);
        if (!Array.isArray(blocks)) throw new Error();
    } catch (e) {
        return <div className="text-neutral-300 font-serif leading-relaxed" dangerouslySetInnerHTML={{ __html: description }} />;
    }

    return (
        <div className="space-y-10">
            {blocks.map((block: any, idx: number) => (
                <div key={idx} className="animate-fade-in">
                    {block.type === 'text' && (
                        <p className="text-neutral-300 font-serif text-lg leading-relaxed">{block.content}</p>
                    )}

                    {block.type === 'mechanic' && (
                        <div className="bg-[#151515] border-l-4 border-[#c8aa6e] p-8 shadow-xl">
                            <div className="flex items-center gap-4 mb-4">
                                <Trophy className="text-[#c8aa6e]" size={24} />
                                <h5 className="cinzel-font text-xl font-bold text-white uppercase tracking-wider">{block.title}</h5>
                            </div>
                            <p className="text-neutral-400 font-serif leading-relaxed">{block.content}</p>
                        </div>
                    )}

                    {block.type === 'warning' && (
                        <div className="bg-red-950/20 border border-red-500/30 p-8 flex gap-6 items-start">
                            <AlertTriangle className="text-red-500 shrink-0" size={32} />
                            <div>
                                <h5 className="text-red-500 cinzel-font font-bold uppercase tracking-widest mb-2">Vigyázat!</h5>
                                <p className="text-red-200/70 font-serif leading-relaxed italic">{block.content}</p>
                            </div>
                        </div>
                    )}

                    {(block.type === 'tank' || block.type === 'healer' || block.type === 'dps') && (
                        <div className={`p-8 border bg-black/40 ${
                            block.type === 'tank' ? 'border-blue-900/30' : 
                            block.type === 'healer' ? 'border-green-900/30' : 'border-red-900/30'
                        }`}>
                            <div className="flex items-center gap-4 mb-4">
                                {block.type === 'tank' && <Shield className="text-blue-500" size={24} />}
                                {block.type === 'healer' && <Heart className="text-green-500" size={24} />}
                                {block.type === 'dps' && <Sword className="text-red-500" size={24} />}
                                <h5 className={`cinzel-font font-bold uppercase tracking-widest ${
                                    block.type === 'tank' ? 'text-blue-400' : 
                                    block.type === 'healer' ? 'text-green-400' : 'text-red-400'
                                }`}>
                                    {block.title || (block.type.toUpperCase() + ' FELADAT')}
                                </h5>
                            </div>
                            <p className="text-neutral-400 font-serif leading-relaxed italic">{block.content}</p>
                        </div>
                    )}

                    {block.type === 'media' && block.url && (
                        <div className="mt-6 border border-white/5 p-2 bg-[#0a0a0b] shadow-2xl">
                            {block.mediaType === 'image' ? (
                                <img src={block.url} alt="Tactics Visual" className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-700" />
                            ) : (
                                <>
                                  {getYoutubeID(block.url) ? (
                                    <div className="aspect-video">
                                      <iframe
                                        className="w-full h-full"
                                        src={`https://www.youtube.com/embed/${getYoutubeID(block.url)}`}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                      ></iframe>
                                    </div>
                                  ) : (
                                    <video src={block.url} controls className="w-full h-auto max-h-[70vh] bg-black" />
                                  )}
                                </>
                            )}
                            <div className="p-4 flex items-center gap-3 border-t border-white/5 bg-black/40">
                                <PlayCircle size={16} className="text-[#c8aa6e]" />
                                <span className="text-[10px] cinzel-font font-bold text-neutral-500 uppercase tracking-widest">
                                  {block.content || 'Kep / Video melleklet'}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
  };

  return (
    <section id="tactics" className="min-h-screen py-16 bg-[#050505] relative border-b border-[#1a1a1a]">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-10 pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <FadeInSection>
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6 border-b border-[#222] pb-8">
            <div className="flex items-center gap-5">
                <div className="p-4 bg-[#c8aa6e]/10 border border-[#c8aa6e]/20 rounded-sm">
                    <LayoutList className="text-[#c8aa6e]" size={32} />
                </div>
                <div>
                    <h2 className="text-3xl md:text-5xl font-bold cinzel-font text-[#e5e5e5]">Raid <span className="text-[#c8aa6e]">Taktikák</span></h2>
                    <p className="text-neutral-500 font-serif italic mt-1 text-lg">Válaszd ki a raidet és a bosst a felkészüléshez.</p>
                </div>
            </div>
            
            <div className="relative group min-w-[300px]">
              <label className="block text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-600 mb-2 cinzel-font">Raid választó</label>
              <select 
                value={selectedRaidIndex}
                onChange={(e) => {
                  setSelectedRaidIndex(Number(e.target.value));
                  setSelectedBossIndex(0);
                }}
                className="w-full bg-[#0f0f10] border border-[#333] text-[#c8aa6e] py-4 px-5 cinzel-font font-bold uppercase tracking-widest text-sm focus:outline-none focus:border-[#c8aa6e] appearance-none cursor-pointer transition-colors"
              >
                {data.map((raid, idx) => (
                  <option key={raid.id} value={idx}>{raid.name}</option>
                ))}
              </select>
              <div className="absolute right-5 bottom-4 pointer-events-none text-[#c8aa6e]">
                <ChevronRight size={20} className="rotate-90" />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-8 bg-[#0f0f10] border border-[#333] fantasy-border overflow-hidden min-h-[600px] flex flex-col shadow-2xl">
               <div className="p-8 bg-[#0a0a0c] border-b border-[#222] relative overflow-hidden">
                  <div className="absolute -right-10 -top-10 text-white/5 opacity-10">
                    <BookOpen size={150} strokeWidth={1} />
                  </div>
                  <h3 className="text-[#c8aa6e] cinzel-font font-bold mb-4 flex items-center gap-3 relative z-10 text-xl tracking-widest">
                    <BookOpen size={24} /> Általános Tudnivalók
                  </h3>
                  <p className="text-neutral-400 font-serif leading-relaxed italic text-lg relative z-10">
                    {currentRaid.generalDescription}
                  </p>
               </div>

               <div className="p-8 lg:p-16 flex-grow bg-[#0f0f10] relative">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                    <div>
                        <span className="text-xs font-bold text-[#c8aa6e]/60 cinzel-font tracking-[0.4em] uppercase mb-2 block">Célpont</span>
                        <h4 ref={bossTitleRef} className="text-4xl md:text-5xl font-black cinzel-font text-white tracking-tighter text-shadow-glow scroll-mt-28">
                        {currentBoss.name.includes('. ') ? currentBoss.name.split('. ')[1] : currentBoss.name}
                        </h4>
                    </div>
                    {currentBoss.consumables && (
                      <div className="flex flex-col items-end gap-2">
                        <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest cinzel-font">Ajánlott Consumes</span>
                        <div className="flex items-center gap-3 px-6 py-3 bg-purple-950/20 border border-purple-900/30 rounded-sm">
                            <FlaskConical size={20} className="text-purple-400" />
                            <span className="text-sm font-bold text-purple-300 uppercase tracking-widest cinzel-font">
                            {currentBoss.consumables}
                            </span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="h-px w-full bg-gradient-to-r from-[#c8aa6e] via-[#c8aa6e]/20 to-transparent mb-12"></div>

                  <div className="text-neutral-300 text-xl leading-relaxed font-serif prose prose-invert max-w-none">
                    {renderBlocks(currentBoss.description)}
                  </div>
               </div>
               
               <div className="p-6 bg-[#0a0a0c] border-t border-[#222] text-center">
                 <p className="text-[10px] text-neutral-700 uppercase tracking-[0.3em] font-bold">INSANE Tactical Archive</p>
               </div>
            </div>

            <div className="lg:col-span-4 sticky top-24">
              <div className="bg-[#0a0a0c] border border-[#333] p-5 mb-4 flex items-center justify-between">
                 <h5 className="text-xs font-bold cinzel-font text-neutral-400 uppercase tracking-[0.3em] flex items-center gap-3">
                   <Swords size={18} className="text-[#c8aa6e]" /> Boss Kiválasztása
                 </h5>
                 <span className="text-[10px] bg-[#222] text-neutral-400 px-2 py-1 rounded font-bold">{currentRaid.bosses.length} Boss</span>
              </div>
              
              <div className="grid gap-3 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
                {currentRaid.bosses.map((boss: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedBossIndex(idx);
                      scrollToBossTitleMobile();
                    }}
                    className={`w-full text-left p-5 transition-all duration-300 border-l-4 flex items-center justify-between group rounded-sm shadow-lg ${
                      selectedBossIndex === idx 
                      ? 'bg-[#1a1a1c] border-[#c8aa6e] text-[#c8aa6e] shadow-[0_5px_15px_rgba(0,0,0,0.4)] translate-x-1' 
                      : 'bg-[#0f0f10] border-transparent text-neutral-500 hover:text-neutral-300 hover:bg-[#121214] hover:border-neutral-700'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                        <span className={`text-xs font-black cinzel-font ${selectedBossIndex === idx ? 'text-[#c8aa6e]' : 'text-neutral-700'}`}>
                            {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="cinzel-font font-bold text-sm tracking-widest uppercase truncate max-w-[200px]">
                        {boss.name.includes('. ') ? boss.name.split('. ')[1] : boss.name}
                        </span>
                    </div>
                    <ChevronRight size={18} className={`transition-all duration-300 ${selectedBossIndex === idx ? 'translate-x-0 opacity-100 scale-125' : '-translate-x-2 opacity-0 group-hover:opacity-50 group-hover:translate-x-0'}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default RaidTactics;
