import React, { useState } from 'react';
import { RaidKey } from '../types';
import { Shield, Heart, Sword, Wand2, Target, Check, FlaskConical, Timer, Info } from 'lucide-react';
import FadeInSection from './FadeInSection';

const RAIDS: RaidKey[] = ['MC', 'BWL', 'AQ40', 'Naxx', 'K40'];

const Consumables: React.FC<{ data: any[] }> = ({ data }) => {
  const [activeRoleIdx, setActiveRoleIdx] = useState(0);
  const [activeRaid, setActiveRaid] = useState<RaidKey>('Naxx');

  const selectedRole = data[activeRoleIdx];

  const roleIcons = {
    Tank: <Shield size={24} />,
    Healer: <Heart size={24} />,
    Melee: <Sword size={24} />,
    Caster: <Wand2 size={24} />,
    Hunter: <Target size={24} />
  };

  return (
    <section id="consumables" className="min-h-screen py-24 bg-[#050505] relative">
      <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <FadeInSection>
          <div className="text-center mb-20">
            <span className="text-[#c8aa6e] cinzel-font text-xs font-bold tracking-[0.5em] uppercase mb-4 block">Preparedness</span>
            <h2 className="text-5xl md:text-6xl font-black cinzel-font text-white mb-6">
              CONSUMABLE <span className="text-[#c8aa6e]">GUIDE</span>
            </h2>
            <p className="text-neutral-500 font-serif italic text-xl max-w-2xl mx-auto">
              A raideken elvárt felkészültség alapkövei szerepkörök szerint.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-12">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-3 space-y-12">
                <div>
                    <h3 className="text-[10px] cinzel-font font-bold text-neutral-600 uppercase tracking-[0.3em] mb-6">Select Role</h3>
                    <div className="flex flex-col gap-3">
                        {data.map((roleData, idx) => (
                        <button
                            key={roleData.role}
                            onClick={() => setActiveRoleIdx(idx)}
                            className={`flex items-center gap-4 px-6 py-4 cinzel-font font-bold uppercase tracking-widest text-[11px] border transition-all duration-500 group ${
                            activeRoleIdx === idx
                                ? 'bg-[#c8aa6e] text-black border-[#c8aa6e] shadow-[0_10px_20px_rgba(200,170,110,0.2)] translate-x-2'
                                : 'bg-transparent text-neutral-500 border-white/5 hover:border-white/20 hover:text-white'
                            }`}
                        >
                            <div className={`${activeRoleIdx === idx ? 'text-black' : 'text-neutral-700 group-hover:text-[#c8aa6e]'} transition-colors`}>
                                {(roleIcons as any)[roleData.role] || <FlaskConical size={24}/>}
                            </div>
                            {roleData.role}
                        </button>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-[10px] cinzel-font font-bold text-neutral-600 uppercase tracking-[0.3em] mb-6">Active Raid</h3>
                    <div className="grid grid-cols-2 gap-2">
                        {RAIDS.map((raid) => (
                        <button
                            key={raid}
                            onClick={() => setActiveRaid(raid)}
                            className={`py-3 cinzel-font text-[10px] font-bold tracking-widest border transition-all ${
                            activeRaid === raid
                                ? 'bg-white/10 text-white border-[#c8aa6e]'
                                : 'text-neutral-600 border-white/5 hover:text-neutral-400 hover:border-white/10'
                            }`}
                        >
                            {raid}
                        </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-9">
                <div className="mb-8 flex items-center justify-between border-b border-white/5 pb-4">
                    <h4 className="cinzel-font text-2xl font-bold text-white flex items-center gap-4">
                        <span className="text-[#c8aa6e]">{selectedRole.role}</span> Toolkit
                    </h4>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    {selectedRole.items.map((item: any, idx: number) => {
                    const isRequired = item.raids.includes(activeRaid);
                    return (
                        <div 
                        key={idx}
                        className={`group p-6 border transition-all duration-700 relative overflow-hidden ${
                            isRequired 
                            ? 'bg-[#0f0f10] border-white/10 hover:border-[#c8aa6e]/40 shadow-xl' 
                            : 'bg-black/40 border-white/5 opacity-40 grayscale pointer-events-none'
                        }`}
                        >
                        {isRequired && (
                            <div className="absolute top-0 right-0 p-2 bg-[#c8aa6e]/10 text-[#c8aa6e] border-l border-b border-[#c8aa6e]/20">
                                <Check size={14} />
                            </div>
                        )}
                        
                        <div className="flex flex-col h-full">
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`p-2 rounded-sm ${isRequired ? 'bg-[#c8aa6e]/10 text-[#c8aa6e]' : 'bg-neutral-900 text-neutral-600'}`}>
                                <FlaskConical size={18} />
                                </div>
                                <span className="text-[9px] font-bold cinzel-font tracking-widest text-[#c8aa6e]/60 uppercase">
                                {item.category}
                                </span>
                            </div>

                            <h5 className={`text-lg font-bold cinzel-font mb-2 group-hover:text-[#c8aa6e] transition-colors ${isRequired ? 'text-white' : 'text-neutral-500'}`}>
                                {item.name}
                            </h5>
                            
                            <p className="text-sm text-neutral-400 font-serif mb-6 leading-relaxed italic flex-grow">
                                {item.effect}
                            </p>

                            <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                {item.duration && (
                                    <div className="flex items-center gap-1.5 text-[9px] font-bold text-neutral-500 uppercase tracking-widest">
                                        <Timer size={12} className="text-neutral-700" />
                                        {item.duration}
                                    </div>
                                )}
                            </div>
                        </div>
                        </div>
                    );
                    })}
                </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default Consumables;