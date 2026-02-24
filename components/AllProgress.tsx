
import React from 'react';
import { Swords, Trophy, ArrowLeft, History, Shield } from 'lucide-react';
import FadeInSection from './FadeInSection';

interface AllProgressProps {
  data: any[];
  setView: (view: any) => void;
}

const AllProgress: React.FC<AllProgressProps> = ({ data, setView }) => {
  return (
    <div className="min-h-screen bg-[#050505] pb-32">
      {/* Header Szekció */}
      <section className="relative py-32 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-10"></div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-[#050505]/80 to-[#050505]"></div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <button 
            onClick={() => setView('home')}
            className="mb-12 inline-flex items-center gap-2 text-neutral-500 hover:text-[#c8aa6e] transition-colors cinzel-font text-[10px] font-bold uppercase tracking-widest"
          >
            <ArrowLeft size={16} /> Vissza a főoldalra
          </button>
          
          <div className="flex justify-center mb-6">
            <History size={48} className="text-[#c8aa6e]/40" strokeWidth={1} />
          </div>
          <h1 className="text-5xl md:text-7xl font-black cinzel-font text-white mb-6 tracking-tighter uppercase">
            Klán <span className="text-[#c8aa6e]">Eredmények</span>
          </h1>
          <p className="text-neutral-500 max-w-2xl mx-auto font-serif text-xl italic leading-relaxed">
            Az INSANE guild összesített haladása és diadalai a Turtle WoW szerverén.<br/>
            Minden rögzített raid és elért siker.
          </p>
        </div>
      </section>

      {/* Rács Elrendezés */}
      <section className="container mx-auto px-6 max-w-7xl mt-24">
        <FadeInSection>
          <div className="flex gap-6 overflow-x-auto pb-4 -mx-6 px-6 snap-x snap-mandatory md:mx-0 md:px-0 md:pb-0 md:overflow-visible md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-8 md:snap-none">
            {data.map((raid, idx) => (
              <div
                key={idx}
                className="group glass-card fantasy-border-accent flex flex-col hover-glow transition-all duration-700 animate-fade-in snap-center shrink-0 w-[85vw] sm:w-[70vw] md:w-auto md:min-w-0 md:shrink"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
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

                <div className="p-8 flex-grow flex flex-col bg-[#0a0a0b]">
                  <h3 className={`text-2xl font-bold cinzel-font mb-6 tracking-wide ${raid.status === 'Progress' ? 'text-red-200' : 'text-white'}`}>
                    {raid.name}
                  </h3>

                  <div className="mt-auto">
                    <div className="flex justify-between items-end mb-3">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold">Defeated</span>
                        <span className={`text-2xl cinzel-font font-black ${raid.status === 'Progress' ? 'text-red-500' : 'text-[#c8aa6e]'}`}>
                          {raid.current} <span className="text-neutral-600 font-serif text-sm">/ {raid.total}</span>
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold block mb-1">Success</span>
                        <span className="text-xl font-bold text-white inter-font">
                          {Math.round((raid.current / raid.total) * 100)}%
                        </span>
                      </div>
                    </div>

                    <div className="h-2 w-full bg-black/50 border border-white/5 p-[1px] relative">
                      <div 
                        className={`h-full ${raid.status === 'Progress' ? 'bg-red-600' : 'bg-[#c8aa6e]'} transition-all duration-1000 ease-out relative`}
                        style={{ width: `${(raid.current / raid.total) * 100}%` }}
                      >
                        <div className="absolute top-0 left-0 bottom-0 w-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shimmer_3s_infinite]"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-24 text-center">
            <div className="flex justify-center mb-6">
                <Shield size={32} className="text-neutral-800" />
            </div>
            <p className="text-neutral-700 cinzel-font text-[10px] font-bold uppercase tracking-[0.5em]">
                INSANE - Turtle WoW
            </p>
          </div>
        </FadeInSection>
      </section>
    </div>
  );
};

export default AllProgress;
