import React from 'react';
import { Crown, Shield, ShieldCheck } from 'lucide-react';
import FadeInSection from './FadeInSection';
import { Officer } from '../types';

const Roster: React.FC<{ data: Officer[] }> = ({ data }) => {
  return (
    <section id="roster" className="py-32 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      {/* Decorative center line */}
      <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-[#c8aa6e]/20 via-transparent to-transparent"></div>

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <FadeInSection>
          <div className="text-center mb-24">
            <span className="text-[#c8aa6e] cinzel-font text-xs font-bold tracking-[0.5em] uppercase mb-4 block">The Inner Circle</span>
            <h2 className="text-4xl md:text-5xl font-black cinzel-font text-white mb-6">
                COMMAND <span className="text-[#c8aa6e]">ROSTER</span>
            </h2>
            <div className="w-16 h-1 bg-[#c8aa6e] mx-auto opacity-40"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-16">
            {data.map((officer, index) => (
              <div 
                key={index}
                className="flex flex-col items-center group relative"
              >
                {/* Visual Accent behind portrait */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-8xl font-black cinzel-font opacity-[0.03] text-white select-none group-hover:opacity-[0.06] transition-opacity duration-1000">
                    {officer.name.charAt(0)}
                </div>

                {/* Portrait Frame */}
                <div className="relative w-32 h-32 mb-8 perspective-1000">
                    <div className={`absolute inset-0 rotate-45 border-2 transition-all duration-700 group-hover:rotate-[135deg] ${
                        officer.role === 'Leader'
                        ? 'bg-[#0a0a0b] border-[#c8aa6e] shadow-[0_0_30px_rgba(200,170,110,0.1)]'
                        : 'bg-[#0a0a0b] border-white/10 group-hover:border-[#c8aa6e]/50'
                    }`}></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                        {officer.role === 'Leader' 
                            ? <Crown size={40} className="text-[#c8aa6e] drop-shadow-[0_0_10px_rgba(200,170,110,0.5)]" strokeWidth={1} /> 
                            : <ShieldCheck size={36} className="text-neutral-600 group-hover:text-[#c8aa6e] transition-all duration-500" strokeWidth={1} />
                        }
                    </div>
                </div>

                <div className="text-center relative">
                  <h4 className={`font-bold cinzel-font text-xl tracking-widest uppercase mb-2 ${officer.role === 'Leader' ? 'text-[#c8aa6e]' : 'text-neutral-200 group-hover:text-white transition-colors duration-500'}`}>
                    {officer.name}
                  </h4>
                  <div className="flex items-center justify-center gap-2">
                    <span className="h-px w-3 bg-[#c8aa6e]/30"></span>
                    <span className="text-[9px] uppercase tracking-[0.4em] text-neutral-500 font-bold block">
                        {officer.role === 'Leader' ? 'Guild Master' : 'Officer'}
                    </span>
                    <span className="h-px w-3 bg-[#c8aa6e]/30"></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default Roster;