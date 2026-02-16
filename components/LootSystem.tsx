import React from 'react';
import { TrendingUp, AlertTriangle, Download, Crosshair, Sword, Shield, Coins, Trophy } from 'lucide-react';
import FadeInSection from './FadeInSection';
import { EP_VALUES } from '../constants';

const LootSystem: React.FC = () => {
  return (
    <section id="epgp" className="py-8 md:py-10 relative bg-[#08080a] overflow-hidden border-t border-[#1a1a1a]">
      {/* Background Runes/Texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-20"></div>
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#050505] to-transparent z-10"></div>
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#050505] to-transparent z-10"></div>

      <div className="container mx-auto px-3 md:px-4 max-w-[1500px] relative z-20">
        <FadeInSection>
          <div className="text-center mb-8 md:mb-10">
            <span className="text-[#c8aa6e] font-bold tracking-[0.4em] text-xs uppercase cinzel-font block mb-4">Loot Rendszer</span>
            <h2 className="text-3xl md:text-5xl font-black cinzel-font text-[#e5e5e5] mb-4 md:mb-6 text-shadow-glow">
              EPGP Működése
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto text-base md:text-lg font-serif">
              A BWL, AQ40 és Naxxramas raideken EPGP rendszert használunk a loot igazságos elosztására. Más raideken SR (Soft Reserve) rendszer él.
            </p>
          </div>

          {/* 1. PROCESS STEPS */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-10 relative">
             {/* Connector - Line */}
             <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c8aa6e]/30 to-transparent z-0"></div>

             {/* Step 1 */}
             <div className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-[#0f0f10] border-2 border-[#333] group-hover:border-[#c8aa6e] rotate-45 flex items-center justify-center mb-4 md:mb-6 transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                    <div className="-rotate-45">
                        <Trophy size={32} className="text-[#c8aa6e]" />
                    </div>
                </div>
                <h3 className="text-base md:text-lg font-bold text-[#e5e5e5] mb-2 cinzel-font uppercase">1. Effort Points (EP)</h3>
                <p className="text-sm text-neutral-500 px-4 font-serif">
                  A raideken való részvételért EP pontokat kapsz. Minél többet raidelsz, annál több pontod lesz.
                </p>
             </div>

             {/* Step 2 */}
             <div className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-[#0f0f10] border-2 border-[#333] group-hover:border-[#a855f7] rotate-45 flex items-center justify-center mb-4 md:mb-6 transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                    <div className="-rotate-45">
                        <Coins size={32} className="text-purple-500" />
                    </div>
                </div>
                <h3 className="text-base md:text-lg font-bold text-[#e5e5e5] mb-2 cinzel-font uppercase">2. Gear Points (GP)</h3>
                <p className="text-sm text-neutral-500 px-4 font-serif">
                  Ha elviszel egy tárgyat (loot), GP pontokat kapsz. Minél jobb a tárgy, annál több GP.
                </p>
             </div>

             {/* Step 3 */}
             <div className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-[#0f0f10] border-2 border-[#333] group-hover:border-[#3b82f6] rotate-45 flex items-center justify-center mb-4 md:mb-6 transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                    <div className="-rotate-45">
                        <TrendingUp size={32} className="text-blue-500" />
                    </div>
                </div>
                <h3 className="text-base md:text-lg font-bold text-[#e5e5e5] mb-2 cinzel-font uppercase">3. Prioritás (PR)</h3>
                <p className="text-sm text-neutral-500 px-4 font-serif">
                  A loot sorrendet az EP/GP arány határozza meg. Akinek nagyobb az aránya, azé az elsőbbség.
                </p>
             </div>
          </div>

          {/* 2. THE CHOICE & DATA */}
          <div className="grid lg:grid-cols-12 gap-6">
            
            {/* Left Column: The Choice Cards */}
            <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-4 mb-4">
                    <div className="h-px bg-[#c8aa6e] w-16"></div>
                    <h3 className="text-xl font-bold text-[#e5e5e5] cinzel-font uppercase tracking-widest">Loot Költségek</h3>
                </div>

                {/* Main Spec Card */}
                <div className="relative bg-[#0f0f10] border border-[#333] p-1 shadow-2xl group overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-900 to-green-600"></div>
                    <div className="p-5 flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 bg-[#050505] border border-green-900/50 flex items-center justify-center rounded-sm">
                                <Sword size={26} className="text-green-600" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-green-500 cinzel-font uppercase tracking-wider mb-1">Main Spec (+)</h4>
                                <p className="text-xs text-neutral-500 font-serif italic">Az elsődleges talenthez használt tárgy.</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="block text-3xl font-black text-[#e5e5e5] cinzel-font">100%</span>
                            <span className="text-[10px] text-green-500/70 uppercase tracking-[0.2em]">GP Ár</span>
                        </div>
                    </div>
                </div>

                {/* Off Spec Card */}
                <div className="relative bg-[#0f0f10] border border-[#333] p-1 shadow-2xl group overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-900 to-yellow-600"></div>
                    <div className="p-5 flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 bg-[#050505] border border-yellow-900/50 flex items-center justify-center rounded-sm">
                                <Shield size={26} className="text-yellow-600" />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-yellow-600 cinzel-font uppercase tracking-wider mb-1">Off Spec (-)</h4>
                                <p className="text-xs text-neutral-500 font-serif italic">Másodlagos talent vagy PvP tárgy.</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="block text-3xl font-black text-[#e5e5e5] cinzel-font">25%</span>
                            <span className="text-[10px] text-yellow-600/70 uppercase tracking-[0.2em]">GP Ár</span>
                        </div>
                    </div>
                </div>

                 <div className="mt-5 p-4 bg-[#150505] border border-red-900/30 flex gap-4 items-start">
                    <AlertTriangle className="text-red-700 shrink-0 mt-1" size={24} />
                    <div>
                        <h4 className="text-red-500 font-bold text-sm mb-2 uppercase tracking-widest cinzel-font">Fontos Tudnivalók</h4>
                        <div className="text-neutral-400 text-sm leading-relaxed font-serif space-y-2">
                            <p>
                                A rendszer célja a fair elosztás, így a loot sorrendet általában a pontszámok (EP/GP arány) határozzák meg, kivételezés nélkül.
                            </p>
                            <p className="text-neutral-300">
                                <span className="text-red-500 font-bold">Kivétel:</span> Progress Raideknél az első pár hétben Tank és Healer prioritást alkalmazunk a csapat gyorsabb haladása érdekében.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: The Ledger */}
            <div className="lg:col-span-5">
                <div className="bg-[#0f0f10] border border-[#333] h-full relative">
                     {/* Decorative corners */}
                     <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#c8aa6e]"></div>
                     <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#c8aa6e]"></div>
                     <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#c8aa6e]"></div>
                     <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#c8aa6e]"></div>

                     <div className="p-5 border-b border-[#333] flex justify-between items-center bg-[#0a0a0c]">
                        <h3 className="text-lg font-bold text-[#e5e5e5] cinzel-font uppercase tracking-widest">EP Értékek</h3>
                        <Crosshair className="text-[#c8aa6e]" size={20} />
                     </div>
                     
                     <div className="divide-y divide-[#222]">
                        {EP_VALUES.map((raid, idx) => (
                            <div key={idx} className="p-4 flex items-center justify-between hover:bg-[#151515] transition-colors group">
                                <span className="font-serif text-base text-neutral-400 group-hover:text-[#c8aa6e] transition-colors">{raid.name}</span>
                                <span className="font-bold cinzel-font text-[#e5e5e5] text-base">
                                    +{raid.points} <span className="text-[10px] text-neutral-600 ml-1">EP</span>
                                </span>
                            </div>
                        ))}
                     </div>
                     
                     <div className="p-5 bg-[#0a0a0c] border-t border-[#333] text-center">
                        <a 
                          href="https://github.com/Road-block/shootyepgp" 
                          target="_blank" 
                          rel="noreferrer"
                          className="inline-flex items-center gap-3 text-neutral-400 hover:text-[#c8aa6e] text-xs font-bold transition-colors uppercase tracking-[0.2em] border-b border-transparent hover:border-[#c8aa6e] pb-1"
                        >
                            <Download size={14} />
                            EPGP Addon Letöltése
                        </a>
                     </div>
                </div>
            </div>

          </div>

        </FadeInSection>
      </div>
    </section>
  );
};

export default LootSystem;
