
import React from 'react';
import { ChevronDown, Trophy } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';

const byPrefixAndName = {
  fab: {
    discord: faDiscord,
  },
};

interface HeroProps {
  setView: (view: any) => void;
  config: {
    title: string;
    subtitle: string;
    motto: string;
    mottoColor?: string;
    showMotto?: boolean;
    bgType: 'image' | 'video';
    bgImage: string;
    bgVideo: string;
    bgOpacity?: number;
    showProgressBar?: boolean;
    showProgressButton?: boolean;
    progressLabel: string;
    progressValue: number;
    discordUrl?: string;
  };
}

const Hero: React.FC<HeroProps> = ({ setView, config }) => {
  const bgOpacity = Math.min(100, Math.max(0, config.bgOpacity ?? 50)) / 100;

  const openAllProgress = () => {
    setView('all-progress');
  };

  return (
    <section id="home" className="relative h-screen min-h-[680px] md:min-h-[800px] flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* Cinematic Background */}
      <div className="absolute inset-0 z-0">
        {config.bgType === 'video' ? (
          <video
            key={config.bgVideo}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover brightness-[0.4]"
            style={{ opacity: bgOpacity }}
            src={config.bgVideo}
          />
        ) : (
          <div 
            className="absolute inset-0 bg-cover bg-center brightness-[0.4] transition-all duration-1000"
            style={{ backgroundImage: `url('${config.bgImage}')`, opacity: bgOpacity }}
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
      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
        
        {/* Progress Bar Display - Slightly larger label */}
        {(config.showProgressBar ?? true) && (
          <div className="mb-6 md:mb-8 w-full max-w-md md:max-w-md animate-fade-in">
            <div className="mb-4 flex items-center justify-center gap-2">
              <span className="text-red-600 font-bold cinzel-font tracking-[0.2em] md:tracking-[0.45em] text-[10px] md:text-[11px] uppercase opacity-90 px-2 text-center">
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
        <div className="relative mb-6 md:mb-6">
          <h1 className="text-[3.6rem] sm:text-[5rem] md:text-[10.5rem] font-black cinzel-font text-white tracking-tighter leading-none select-none filter drop-shadow-[0_15px_45px_rgba(0,0,0,0.95)]">
            {config.title}
          </h1>
          <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[70%] h-[2px] bg-gradient-to-r from-transparent via-[#c8aa6e]/40 to-transparent"></div>
        </div>

        {/* Subtitle - Scaled up (text-4xl) */}
        <p className="text-lg sm:text-2xl md:text-4xl text-neutral-100 max-w-xl md:max-w-5xl mx-auto mb-6 md:mb-6 font-serif leading-tight italic opacity-95 drop-shadow-lg">
          {config.subtitle}
        </p>
        
        {/* Motto - Slightly larger and more spaced */}
        {config.showMotto !== false && config.motto && (
          <p
            className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.3em] md:tracking-[0.75em] cinzel-font mb-8 md:mb-12 opacity-70"
            style={{ color: config.mottoColor || '#a3a3a3' }}
          >
            {config.motto.split(' • ').join('  •  ')}
          </p>
        )}

        {/* Action Buttons - Scaled up (px-16 py-7) */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-10 w-full sm:w-auto max-w-sm sm:max-w-none">
          {/* Discord Button */}
          <a 
            href={config.discordUrl || 'https://discord.gg/your-invite-link'} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative flex items-center justify-center gap-3 md:gap-4 w-full sm:w-auto px-8 md:px-12 py-4 md:py-5 bg-[#5865F2] hover:bg-[#4752C4] transition-all duration-500 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)] active:scale-95 overflow-hidden"
          >
            <div className="relative z-10 flex items-center gap-5">
              <FontAwesomeIcon icon={byPrefixAndName.fab['discord']} className="text-white text-[18px] md:text-[18px] group-hover:scale-110 transition-transform duration-500" />
              <span className="cinzel-font font-bold text-[12px] md:text-[12px] text-white uppercase tracking-[0.25em] md:tracking-[0.38em]">Discord</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </a>

          {/* Progress Button */}
          {(config.showProgressButton ?? true) && (
            <button 
              onClick={openAllProgress}
              className="group relative flex items-center justify-center gap-3 md:gap-4 w-full sm:w-auto px-8 md:px-12 py-4 md:py-5 bg-transparent border border-white/35 hover:border-white/80 transition-all duration-500 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.5)] active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10 flex items-center gap-5">
                <Trophy size={16} className="text-white/90 group-hover:text-white group-hover:scale-110 transition-all duration-500" />
                <span className="cinzel-font font-bold text-[12px] md:text-[12px] text-white/90 group-hover:text-white uppercase tracking-[0.25em] md:tracking-[0.38em]">Progress</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </button>
          )}
        </div>
      </div>

      {/* SCROLL INDICATOR - Anchored to bottom with more presence */}
      <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 md:gap-3 opacity-40 pointer-events-none animate-fade-in [animation-delay:1.5s]">
        <span className="text-[10px] cinzel-font tracking-[0.8em] uppercase text-white font-bold">Görgess</span>
        <ChevronDown size={18} className="text-white animate-bounce" />
      </div>
    </section>
  );
};

export default Hero;

