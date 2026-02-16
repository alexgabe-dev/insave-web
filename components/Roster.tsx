import React from 'react';
import { Crown, Shield, ShieldCheck } from 'lucide-react';
import FadeInSection from './FadeInSection';
import { Officer } from '../types';

const Roster: React.FC<{ data: Officer[] }> = ({ data }) => {
  const roleLabel = (officer: Officer) => officer.role === 'Leader' ? 'Guild Master' : 'Officer';
  const leader = data.find((officer) => officer.role === 'Leader') || data[0];
  const officers = data.filter((officer) => officer !== leader);

  return (
    <section id="roster" className="py-20 md:py-32 bg-[#050505] border-t border-white/5 relative overflow-hidden">
      <div className="hidden md:block absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(200,170,110,0.07),transparent_50%)]" />

      <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
        <FadeInSection>
          <div className="text-center mb-14 md:mb-24">
            <span className="text-[#c8aa6e] cinzel-font text-[10px] md:text-xs font-bold tracking-[0.25em] md:tracking-[0.5em] uppercase mb-3 md:mb-4 block">Guild Leadership</span>
            <h2 className="text-3xl md:text-5xl font-black cinzel-font text-white mb-4 md:mb-6">
                <span className="text-[#c8aa6e]">Vezetőség</span>
            </h2>
            <div className="w-16 h-1 bg-[#c8aa6e] mx-auto opacity-40"></div>
          </div>

          <div className="md:hidden space-y-4">
            {data.map((officer, index) => (
              <div
                key={`mobile-${index}`}
                className={`relative overflow-hidden rounded-2xl border p-4 ${
                  officer.role === 'Leader'
                    ? 'border-[#c8aa6e]/70 bg-gradient-to-br from-[#1a1307] to-[#090909]'
                    : 'border-white/10 bg-gradient-to-br from-[#101113] to-[#090909]'
                }`}
              >
                <div className="absolute -right-3 -top-5 text-[3.2rem] leading-none font-black cinzel-font text-white/5 select-none">
                  {officer.name.charAt(0)}
                </div>
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c8aa6e]/70 to-transparent"></div>

                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 shrink-0">
                    <div className={`absolute inset-0 rotate-45 border ${
                      officer.role === 'Leader' ? 'border-[#c8aa6e]' : 'border-white/20'
                    }`}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      {officer.image ? (
                        <div className="absolute inset-[2px] rotate-45 overflow-hidden">
                          <img
                            src={officer.image}
                            alt={officer.name}
                            className="w-full h-full object-cover -rotate-45 scale-[1.45] origin-center"
                          />
                        </div>
                      ) : officer.role === 'Leader' ? (
                        <Crown size={28} className="text-[#c8aa6e]" strokeWidth={1.4} />
                      ) : (
                        <ShieldCheck size={24} className="text-neutral-500" strokeWidth={1.4} />
                      )}
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <h4 className={`font-bold cinzel-font text-lg uppercase truncate ${
                      officer.role === 'Leader' ? 'text-[#c8aa6e]' : 'text-white'
                    }`}>
                      {officer.name}
                    </h4>
                    <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3 py-1">
                      {officer.role === 'Leader' ? (
                        <Crown size={12} className="text-[#c8aa6e]" />
                      ) : (
                        <Shield size={12} className="text-neutral-400" />
                      )}
                      <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-300">
                        {roleLabel(officer)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden md:flex flex-col items-center gap-8">
            <div className="w-full max-w-[480px] glass-card fantasy-border-accent p-7 text-center">
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#c8aa6e]/80 mb-4">Guild Master</p>
              <div className="mx-auto relative w-24 h-24 mb-5">
                <div className="absolute inset-0 rotate-45 border border-[#c8aa6e]/35 bg-black/30"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  {leader?.image ? (
                    <div className="absolute inset-[2px] rotate-45 overflow-hidden">
                      <img src={leader.image} alt={leader.name} className="w-full h-full object-cover -rotate-45 scale-[1.45] origin-center" />
                    </div>
                  ) : (
                    <Crown size={34} className="text-[#c8aa6e]" />
                  )}
                </div>
              </div>
              <h3 className="text-4xl font-black cinzel-font uppercase text-[#edd6a6]">{leader?.name || 'Guild Master'}</h3>
              <p className="mt-2 text-[10px] uppercase tracking-[0.35em] text-neutral-500">Vezetőség</p>
            </div>

            <div className="w-full grid grid-cols-2 gap-4">
              {officers.map((officer, index) => (
                <div
                  key={`officer-${index}`}
                  className="glass-card fantasy-border-accent px-4 py-4 flex items-center gap-4 transition-all duration-300 hover-glow"
                >
                  <div className="relative w-12 h-12 shrink-0">
                    <div className="absolute inset-0 rotate-45 border border-white/20 bg-black/30"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      {officer.image ? (
                        <div className="absolute inset-[2px] rotate-45 overflow-hidden">
                          <img src={officer.image} alt={officer.name} className="w-full h-full object-cover -rotate-45 scale-[1.45] origin-center" />
                        </div>
                      ) : (
                        <ShieldCheck size={20} className="text-neutral-400" />
                      )}
                    </div>
                  </div>
                  <div className="min-w-0">
                    <h4 className="font-bold cinzel-font text-3xl leading-none uppercase text-white truncate">{officer.name}</h4>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.24em] text-neutral-500">{roleLabel(officer)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default Roster;

