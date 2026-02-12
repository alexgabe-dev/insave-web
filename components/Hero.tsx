
import React from 'react';
import { MessageSquare, ChevronDown, Trophy } from 'lucide-react';

interface HeroProps {
  setView: (view: any) => void;
  config: {
    title: string;
    subtitle: string;
    motto: string;
    showMotto?: boolean;
    bgType: 'image' | 'video';
    bgImage: string;
    bgVideo: string;
    showProgress: boolean;
    progressLabel: string;
    progressValue: number;
  };
}

const Hero: React.FC<HeroProps> = ({ setView, config }) => {
  const scrollToProgress = () => {
    document.getElementById('progress')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative h-screen min-h-[800px] flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        {config.bgType === 'video' ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale brightness-[0.4]"
            src={config.bgVideo}
          />
        ) : (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 grayscale brightness-[0.4] transition-all duration-1000"
            style={{ backgroundImage: `url('${config.bgImage}')` }}
          ></div>
        )}
        
        {/* Artistic Overlays - Atmospheric glow to fill the void */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/80"></div>
        <div className="absolute inset-0 bg-grid opacity-10"></div>
        
        {/* Dynamic Glows behind the text - Increased size for larger text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[500px] bg-red-900/10 blur-[150px] rounded-full animate-pulse pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#c8aa6e]/5 blur-[120px] rounded-full animate-pulse [animation-delay:2s] pointer-events-none"></div>
      </div>

      {/* Main Content Container - Centered and scaled up */}
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        
        {/* Progress Bar Display - Slightly larger label */}
        {config.showProgress && (
          <div className="mb-10 w-full max-w-lg animate-fade-in">
            <div className="mb-4 flex items-center justify-center gap-2">
              <span className="text-red-600 font-bold cinzel-font tracking-[0.6em] text-[12px] uppercase opacity-90">
                {config.progressLabel}
              </span>
            </div>
            <div className="h-[3px] w-full bg-white/5 relative overflow-hidden rounded-full">
              <div 
                className="h-full bg-gradient-to-r from-red-900 via-red-600 to-[#c8aa6e] transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(239,68,68,0.5)]"
                style={{ width: `${config.progressValue}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2s_infinite]"></div>
              </div>
            </div>
          </div>
        )}
        
        {/* Title - Scaled by 50% (approx 14rem) */}
        <div className="relative mb-8">
          <h1 className="text-[6rem] md:text-[14rem] font-black cinzel-font text-white tracking-tighter leading-none select-none filter drop-shadow-[0_15px_45px_rgba(0,0,0,0.95)]">
            {config.title}
          </h1>
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[70%] h-[2px] bg-gradient-to-r from-transparent via-[#c8aa6e]/40 to-transparent"></div>
        </div>

        {/* Subtitle - Scaled up (text-4xl) */}
        <p className="text-2xl md:text-5xl text-neutral-100 max-w-6xl mx-auto mb-8 font-serif leading-tight italic opacity-95 drop-shadow-lg">
          {config.subtitle}
        </p>
        
        {/* Motto - Slightly larger and more spaced */}
        {config.showMotto !== false && config.motto && (
          <p className="text-neutral-500 text-[12px] md:text-[14px] font-bold uppercase tracking-[1em] cinzel-font mb-16 opacity-70">
            {config.motto.split(' • ').join('  •  ')}
          </p>
        )}

        {/* Action Buttons - Scaled up (px-16 py-7) */}
        <div className="flex flex-col sm:flex-row items-center gap-10">
          {/* Discord Button */}
          <a 
            href="https://discord.gg/your-invite-link" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative flex items-center gap-5 px-16 py-7 bg-[#5865F2] hover:bg-[#4752C4] transition-all duration-500 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)] active:scale-95 overflow-hidden"
          >
            <div className="relative z-10 flex items-center gap-5">
              <MessageSquare size={24} className="text-white group-hover:scale-110 transition-transform duration-500" />
              <span className="cinzel-font font-bold text-[14px] text-white uppercase tracking-[0.5em]">Discord</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </a>

          {/* Progress Button */}
          <button 
            onClick={scrollToProgress}
            className="group relative flex items-center gap-5 px-16 py-7 bg-transparent border border-[#c8aa6e]/30 hover:border-[#c8aa6e]/80 transition-all duration-500 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)] active:scale-95 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[#c8aa6e]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10 flex items-center gap-5">
              <Trophy size={24} className="text-[#c8aa6e]/90 group-hover:text-[#c8aa6e] group-hover:scale-110 transition-all duration-500" />
              <span className="cinzel-font font-bold text-[14px] text-[#c8aa6e]/90 group-hover:text-[#c8aa6e] uppercase tracking-[0.5em]">Progress</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#c8aa6e]/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </button>
        </div>
      </div>

      {/* SCROLL INDICATOR - Anchored to bottom with more presence */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-40 pointer-events-none animate-fade-in [animation-delay:1.5s]">
        <span className="text-[10px] cinzel-font tracking-[0.8em] uppercase text-white font-bold">Görgess</span>
        <ChevronDown size={18} className="text-white animate-bounce" />
      </div>
    </section>
  );
};

export default Hero;
