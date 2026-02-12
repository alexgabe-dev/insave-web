import React from 'react';
import { Coins, Trophy, TrendingUp, Download, MessageSquare, AlertCircle, Info } from 'lucide-react';
import FadeInSection from './FadeInSection';

const Epgp: React.FC = () => {
  return (
    <section id="epgp-details" className="min-h-screen py-16 bg-[#050505] relative">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-10 pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <FadeInSection>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold cinzel-font text-[#e5e5e5] mb-4">
              EPGP <span className="text-[#c8aa6e]">Rendszer</span>
            </h2>
            <div className="w-24 h-px bg-[#c8aa6e] mx-auto opacity-50 mb-6"></div>
            <p className="text-neutral-400 font-serif text-lg italic max-w-2xl mx-auto">
              A tisztességes és átlátható loot-elosztás alapköve a guildünkben.
            </p>
          </div>

          <div className="grid gap-8 mb-16">
            {/* Mechanism Explanation */}
            <div className="bg-[#0f0f10] border border-[#333] fantasy-border p-8 md:p-12">
              <div className="flex items-center gap-4 mb-8">
                <Info className="text-[#c8aa6e]" size={32} />
                <h3 className="text-2xl font-bold cinzel-font text-white uppercase tracking-widest">A Rendszer Lényege</h3>
              </div>
              
              <div className="space-y-6 text-neutral-300 font-serif text-lg leading-relaxed">
                <p>
                  Az EPGP rendszer lényege, hogy a loot prioritásodat az <strong className="text-white">Effort-pontok (EP)</strong> és a <strong className="text-white">Gear-pontok (GP)</strong> aránya határozza meg.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="bg-[#050505] p-6 border-l-4 border-[#c8aa6e]">
                    <div className="flex items-center gap-3 mb-3">
                      <Trophy className="text-[#c8aa6e]" size={20} />
                      <h4 className="font-bold cinzel-font text-sm uppercase tracking-widest">EP (Effort Points)</h4>
                    </div>
                    <p className="text-sm text-neutral-500">EP-t szerezhetsz raidek részvételével. Minél többet vagy jelen, annál több pontod lesz.</p>
                  </div>
                  <div className="bg-[#050505] p-6 border-l-4 border-purple-800">
                    <div className="flex items-center gap-3 mb-3">
                      <Coins className="text-purple-500" size={20} />
                      <h4 className="font-bold cinzel-font text-sm uppercase tracking-widest">GP (Gear Points)</h4>
                    </div>
                    <p className="text-sm text-neutral-500">GP-t akkor kapsz, amikor lootot viszel – minél jobb a tárgy, annál magasabb a GP értéke.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Formula & Priority */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-[#0f0f10] border border-[#333] p-8 flex flex-col items-center text-center justify-center">
                <TrendingUp className="text-blue-500 mb-6" size={48} />
                <h3 className="text-xl font-bold cinzel-font text-white mb-4 uppercase tracking-widest">Prioritás (PR)</h3>
                <div className="text-3xl font-black cinzel-font text-[#c8aa6e] mb-4 p-4 border border-[#c8aa6e]/20 bg-[#c8aa6e]/5 w-full">
                  PR = EP / GP
                </div>
                <p className="text-neutral-500 font-serif text-sm">
                  A prioritásodat az EP/GP arány határozza meg – minél magasabb ez az érték, annál előrébb vagy a loot sorrendben.
                </p>
                <div className="mt-6 p-4 bg-blue-900/10 border border-blue-900/30 rounded-sm w-full">
                  <p className="text-xs text-blue-300 italic">Példa: ha 200 EP-d és 100 GP-d van, az EP/GP arányod 2.0.</p>
                </div>
              </div>

              <div className="bg-[#0f0f10] border border-[#333] p-8 flex flex-col items-center text-center justify-center">
                <Download className="text-green-500 mb-6" size={48} />
                <h3 className="text-xl font-bold cinzel-font text-white mb-4 uppercase tracking-widest">Addon Használata</h3>
                <p className="text-neutral-500 font-serif text-sm mb-6">
                  Az EPGP rendszerhez elérhető egy opcionális addon is, ami segít nyomon követni a gear pontokat és a prioritásokat.
                </p>
                <a 
                  href="https://github.com/Road-block/shootyepgp" 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-8 py-3 bg-green-900/20 border border-green-500 text-green-500 hover:bg-green-500 hover:text-black transition-all cinzel-font font-bold text-xs uppercase tracking-widest"
                >
                  Addon Letöltése
                </a>
              </div>
            </div>

            {/* Whisper Protocol */}
            <div className="bg-[#150505] border border-red-900/30 p-8 md:p-12 relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 text-red-900/10 opacity-20">
                <MessageSquare size={160} />
              </div>
              <div className="flex items-center gap-4 mb-8">
                <MessageSquare className="text-red-500" size={32} />
                <h3 className="text-2xl font-bold cinzel-font text-white uppercase tracking-widest">Loot Kérése (Whisper)</h3>
              </div>
              <div className="space-y-4 text-neutral-400 font-serif text-lg leading-relaxed relative z-10">
                <p>Amikor egy tárgy esik a raidben, a master looternek kell írnod egy whispert (ha nincs addonod):</p>
                <ul className="space-y-4 mt-6">
                  <li className="flex gap-4 items-start">
                    <span className="text-2xl font-black text-green-500 cinzel-font">"+"</span>
                    <span>ha a tárgyat a <strong className="text-white">mainspecbe</strong> veszed fel, amit a raidben leggyakrabban használsz.</span>
                  </li>
                  <li className="flex gap-4 items-start">
                    <span className="text-2xl font-black text-yellow-500 cinzel-font">"-"</span>
                    <span>ha a tárgyat <strong className="text-white">PvP-re vagy offspecként</strong> szeretnéd használni.</span>
                  </li>
                </ul>
                <div className="mt-10 p-6 bg-red-950/20 border-l-4 border-red-700">
                  <h4 className="text-red-500 font-bold cinzel-font text-sm uppercase mb-2">GP Költségek</h4>
                  <ul className="text-sm space-y-2 text-neutral-400 italic">
                    <li>• Mainspec nyerés: A tárgy teljes GP értéke hozzáadódik (<strong className="text-white">100%</strong>).</li>
                    <li>• Offspec nyerés: Csak a GP érték <strong className="text-white">25%</strong>-a kerül hozzáadásra.</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Final Advice */}
            <div className="bg-[#0a0a0c] border border-[#c8aa6e]/10 p-8 text-center italic font-serif text-neutral-500">
              <div className="flex justify-center mb-4 text-[#c8aa6e]/50">
                <AlertCircle size={24} />
              </div>
              "Összességében minél nagyobb az EP és minél kisebb a GP, annál jobb az arányod. A kitartás kifizetődik!"
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default Epgp;