import React from 'react';
import { 
  Bookmark, 
  CheckCircle, 
  HelpCircle, 
  ExternalLink, 
  Users, 
  Shield, 
  Sword, 
  AlertTriangle, 
  ChevronRight, 
  Sparkles,
  MousePointerClick,
  LayoutList,
  Target,
  Clock
} from 'lucide-react';
import FadeInSection from './FadeInSection';

const SrSystem: React.FC = () => {
  return (
    <section id="sr-details" className="py-32 relative bg-[#08080a] overflow-hidden border-t border-[#1a1a1a]">
      {/* Background Runes/Texture matched with EPGP page */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-20"></div>
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#050505] to-transparent z-10"></div>
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#050505] to-transparent z-10"></div>

      <div className="container mx-auto px-6 relative z-20 max-w-7xl">
        <FadeInSection>
          <div className="text-center mb-24">
            <span className="text-green-500 font-bold tracking-[0.4em] text-xs uppercase cinzel-font block mb-4">Loot Elosztás (PUG)</span>
            <h2 className="text-5xl md:text-6xl font-black cinzel-font text-[#e5e5e5] mb-8 text-shadow-glow">
              SR Rendszer
            </h2>
            <p className="text-neutral-400 max-w-2xl mx-auto text-xl font-serif">
              Soft Reserve elosztás PUG raideken, illetve MC és ZG során. Ez a rendszer biztosítja, hogy mindenki hozzájusson a vágyott tárgyához.
            </p>
          </div>

          {/* 1. PROCESS STEPS - Matching EPGP diamond style */}
          <div className="grid md:grid-cols-3 gap-12 mb-24 relative">
             {/* Connector - Line */}
             <div className="hidden md:block absolute top-12 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-600/30 to-transparent z-0"></div>

             {/* Step 1 */}
             <div className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-24 h-24 bg-[#0f0f10] border-2 border-[#333] group-hover:border-green-500 rotate-45 flex items-center justify-center mb-8 transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                    <div className="-rotate-45">
                        <MousePointerClick size={32} className="text-green-500" />
                    </div>
                </div>
                <h3 className="text-xl font-bold text-[#e5e5e5] mb-3 cinzel-font uppercase">1. Link & Foglalás</h3>
                <p className="text-sm text-neutral-500 px-4 font-serif">
                  A Raid Leader generálja a linket a raid előtt. A kapott felületen jelöld meg a kívánt tárgyadat.
                </p>
             </div>

             {/* Step 2 */}
             <div className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-24 h-24 bg-[#0f0f10] border-2 border-[#333] group-hover:border-red-600 rotate-45 flex items-center justify-center mb-8 transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                    <div className="-rotate-45">
                        <Clock size={32} className="text-red-600" />
                    </div>
                </div>
                <h3 className="text-xl font-bold text-[#e5e5e5] mb-3 cinzel-font uppercase">2. Határidő</h3>
                <p className="text-sm text-neutral-500 px-4 font-serif">
                  A foglalást az <strong className="text-white">első boss előtt</strong> kötelező leadni. Ekkor a Lead lezárja a listát.
                </p>
             </div>

             {/* Step 3 */}
             <div className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-24 h-24 bg-[#0f0f10] border-2 border-[#333] group-hover:border-[#c8aa6e] rotate-45 flex items-center justify-center mb-8 transition-all duration-500 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                    <div className="-rotate-45">
                        <Target size={32} className="text-[#c8aa6e]" />
                    </div>
                </div>
                <h3 className="text-xl font-bold text-[#e5e5e5] mb-3 cinzel-font uppercase">3. Sorsolás</h3>
                <p className="text-sm text-neutral-500 px-4 font-serif">
                  Ha többen SR-eztek egy tárgyat, rollolás dönt (/roll 100). Aki nagyobbat dob, azé a loot.
                </p>
             </div>
          </div>

          {/* 2. HIERARCHY & CHOICE CARDS - Matching EPGP cards */}
          <div className="grid lg:grid-cols-12 gap-10">
            
            {/* Left Column: Priority Rules */}
            <div className="lg:col-span-7 space-y-8">
                <div className="flex items-center gap-4 mb-4">
                    <div className="h-px bg-green-600 w-16"></div>
                    <h3 className="text-2xl font-bold text-[#e5e5e5] cinzel-font uppercase tracking-widest">Loot Prioritás</h3>
                </div>

                {/* SR Card */}
                <div className="relative bg-[#0f0f10] border border-[#333] p-1 shadow-2xl group overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-900 to-green-600"></div>
                    <div className="p-8 flex items-center justify-between relative z-10">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-[#050505] border border-green-900/50 flex items-center justify-center rounded-sm">
                                <Bookmark size={32} className="text-green-600" />
                            </div>
                            <div>
                                <h4 className="text-2xl font-bold text-green-500 cinzel-font uppercase tracking-wider mb-1">Soft Reserve (SR)</h4>
                                <p className="text-xs text-neutral-500 font-serif italic">A lefoglalt tárgyak élveznek abszolút előnyt.</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="block text-2xl font-black text-[#e5e5e5] cinzel-font">TOP PRIO</span>
                        </div>
                    </div>
                </div>

                {/* MS/OS Cards - matching style */}
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="relative bg-[#0f0f10] border border-[#333] p-6 shadow-2xl">
                        <div className="absolute top-0 left-0 w-full h-1 bg-white/10"></div>
                        <div className="flex items-center gap-4 mb-4">
                            <Sword size={20} className="text-[#c8aa6e]" />
                            <h5 className="font-bold cinzel-font text-white uppercase text-sm tracking-widest">Main Spec</h5>
                        </div>
                        <p className="text-xs text-neutral-500 font-serif">Ha senki nem SR-ezte az adott tárgyat.</p>
                    </div>

                    <div className="relative bg-[#0f0f10] border border-[#333] p-6 shadow-2xl">
                        <div className="absolute top-0 left-0 w-full h-1 bg-white/5"></div>
                        <div className="flex items-center gap-4 mb-4">
                            <Shield size={20} className="text-neutral-500" />
                            <h5 className="font-bold cinzel-font text-white uppercase text-sm tracking-widest">Off Spec</h5>
                        </div>
                        <p className="text-xs text-neutral-500 font-serif">Ha MS-re sincs jelentkező.</p>
                    </div>
                </div>

                 <div className="mt-8 p-6 bg-[#150505] border border-red-900/30 flex gap-5 items-start">
                    <AlertTriangle className="text-red-700 shrink-0 mt-1" size={24} />
                    <div>
                        <h4 className="text-red-500 font-bold text-sm mb-2 uppercase tracking-widest cinzel-font">Kritikus Szabályok</h4>
                        <div className="text-neutral-400 text-sm leading-relaxed font-serif space-y-2">
                            <p>
                                A <strong className="text-white">raidres.fly.dev</strong> linket a Raid Leader biztosítja közvetlenül a raid indulása előtt.
                            </p>
                            <p className="text-neutral-300">
                                <span className="text-red-500 font-bold">ZÁRÁS:</span> Az első boss pullolása előtt a lista lezárul. Aki addig nem reservelt, az már nem teheti meg később.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Commands Ledger - Matching EPGP style */}
            <div className="lg:col-span-5">
                <div className="bg-[#0f0f10] border border-[#333] h-full relative">
                     {/* Decorative corners */}
                     <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-green-600"></div>
                     <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-green-600"></div>
                     <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-green-600"></div>
                     <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-green-600"></div>

                     <div className="p-8 border-b border-[#333] flex justify-between items-center bg-[#0a0a0c]">
                        <h3 className="text-xl font-bold text-[#e5e5e5] cinzel-font uppercase tracking-widest">Roll Parancsok</h3>
                        <Users className="text-green-500" size={20} />
                     </div>
                     
                     <div className="divide-y divide-[#222]">
                        <CommandRow label="SR / MS Roll" cmd="/roll 100" color="text-green-500" />
                        <CommandRow label="Off Spec Roll" cmd="/roll 99" color="text-neutral-400" />
                        <CommandRow label="Transmog Roll" cmd="/roll 98" color="text-purple-500" />
                     </div>
                     
                     <div className="p-12 flex flex-col items-center justify-center text-center">
                        <Sparkles className="text-green-900/40 mb-4" size={48} />
                        <div className="flex flex-col gap-4 w-full">
                            <div className="p-4 bg-green-900/10 border border-green-500/20 rounded text-xs text-green-500/70 font-serif">
                                Az SR oldalt a Raid Leader generálja minden alkalommal.
                            </div>
                        </div>
                     </div>
                </div>
            </div>

          </div>

        </FadeInSection>
      </div>
    </section>
  );
};

const CommandRow: React.FC<{ label: string, cmd: string, color: string }> = ({ label, cmd, color }) => (
    <div className="p-6 flex items-center justify-between hover:bg-[#151515] transition-colors group">
        <span className="font-serif text-lg text-neutral-400 group-hover:text-white transition-colors">{label}</span>
        <div className="flex flex-col items-end">
            <span className={`font-black cinzel-font ${color} text-lg tracking-widest`}>
                {cmd}
            </span>
        </div>
    </div>
);

export default SrSystem;