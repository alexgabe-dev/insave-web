
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import insaneLogo from '../logo/insane-logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord } from '@fortawesome/free-brands-svg-icons';

interface HeaderProps {
  setView: (view: any) => void;
  currentView: string;
  discordUrl?: string;
}

const Header: React.FC<HeaderProps> = ({ setView, currentView, discordUrl }) => {
  const resolvedDiscordUrl = discordUrl && discordUrl.trim()
    ? discordUrl.trim()
    : 'https://discord.gg/your-invite-link';
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = '';
      return;
    }
    document.body.style.overflow = 'hidden';
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen]);

  const menuGroups = [
    {
      label: 'Raid',
      items: [
        { label: 'Taktikák', view: 'tactics' },
        { label: 'Consumables', view: 'consumables' },
        { label: 'Progress', view: 'home', anchor: '#progress' },
      ]
    },
    {
      label: 'Rendszerek',
      items: [
        { label: 'EPGP Rendszer', view: 'epgp' },
        { label: 'SR Rendszer', view: 'sr' },
        { label: 'Szabályzat', view: 'home', anchor: '#rules' },
      ]
    },
    {
      label: 'Klán',
      items: [
        { label: 'Hasznos Tippek', view: 'guides' },
        { label: 'Vezetőség', view: 'home', anchor: '#roster' },
        { label: 'Infók', view: 'info' },
      ]
    }
  ];

  const navigate = (item: any) => {
    setView(item.view);
    if (item.anchor && !isOpen) {
      setTimeout(() => {
        document.querySelector(item.anchor)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (isOpen) {
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 50);
    }
    setIsOpen(false);
    setActiveDropdown(null);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-[110] transition-all duration-500 ${scrolled || currentView !== 'home' || isOpen ? 'bg-[#050505]/95 border-b border-white/5 backdrop-blur-md' : 'bg-transparent'} py-3`}>
      <div className="container mx-auto px-4 md:px-6 h-16 md:h-[72px] flex justify-between items-center">
        <button onClick={() => setView('home')} className="flex items-center gap-2 md:gap-3 group min-w-0">
          <img
            src={insaneLogo}
            alt="Insane logo"
            className="w-9 h-9 md:w-12 md:h-12 object-contain brightness-0 invert group-hover:scale-110 transition-transform shrink-0"
          />
          <div className="flex flex-col text-left min-w-0">
            <span className="text-base md:text-xl leading-none font-black cinzel-font tracking-[0.18em] md:tracking-widest text-white truncate">INSANE</span>
            <span className="hidden sm:block mt-1 text-[8px] leading-none cinzel-font tracking-[0.3em] text-neutral-500 uppercase truncate">Turtle WoW Hungary</span>
          </div>
        </button>

        <nav className="hidden lg:flex items-center gap-6" ref={dropdownRef}>
          {menuGroups.map((group) => (
            <div key={group.label} className="relative">
              <button 
                onClick={() => setActiveDropdown(activeDropdown === group.label ? null : group.label)}
                className={`h-10 inline-flex items-center gap-2 text-[10px] font-bold cinzel-font uppercase tracking-[0.2em] transition-colors ${activeDropdown === group.label ? 'text-[#c8aa6e]' : 'text-neutral-400 hover:text-white'}`}
              >
                {group.label}
                <ChevronDown size={12} className={`transition-transform ${activeDropdown === group.label ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === group.label && (
                <div className="absolute top-full left-0 mt-4 w-48 bg-[#0a0a0b] border border-white/10 shadow-2xl py-2 animate-fade-in">
                  {group.items.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => navigate(item)}
                      className="w-full text-left px-5 py-3 text-[9px] font-bold cinzel-font uppercase tracking-widest text-neutral-500 hover:text-[#c8aa6e] hover:bg-white/5 transition-all"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          <a
            href={resolvedDiscordUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="h-10 inline-flex items-center gap-2 px-4 rounded-md bg-[#5865F2] hover:bg-[#4752C4] text-white transition-colors"
          >
            <FontAwesomeIcon icon={faDiscord} className="text-[14px]" />
            <span className="cinzel-font text-[10px] font-bold uppercase tracking-[0.2em]">Csatlakozz</span>
          </a>
        </nav>

        <button
          className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-white/15 bg-[#0c0c0d] text-[#e5e5e5] hover:border-[#c8aa6e]/60 hover:text-[#c8aa6e] transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Mobil menu bezarasa' : 'Mobil menu megnyitasa'}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-[220] h-[100dvh] w-screen max-w-[100vw] overflow-x-hidden bg-[#060607] animate-fade-in">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(200,170,110,0.10),transparent_45%)]"></div>
          <div className="relative h-full overflow-y-auto overflow-x-hidden pt-24 px-5 pb-8">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Menu bezarasa"
              className="absolute top-6 right-5 z-20 inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#c8aa6e]/40 bg-[#121214] text-[#f4e6c7] hover:bg-[#1a1a1d] hover:border-[#c8aa6e] transition-colors"
            >
              <X size={22} />
            </button>

            <div className="relative z-10 flex flex-col gap-7 w-full min-w-0">
              {menuGroups.map(group => (
                <div key={group.label} className="space-y-3 rounded-xl border border-white/10 bg-[#0f0f11]/90 p-4 w-full">
                  <p className="text-[#c8aa6e] text-[10px] font-bold cinzel-font tracking-widest border-b border-white/10 pb-2 uppercase">{group.label}</p>
                  <div className="flex flex-col gap-2">
                    {group.items.map(item => (
                      <button
                        key={item.label}
                        onClick={() => navigate(item)}
                        className="text-left text-base cinzel-font text-neutral-200 bg-white/[0.03] hover:bg-[#c8aa6e]/10 hover:text-[#f2d8a1] rounded-md px-3 py-2 transition-colors"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <a
                href={resolvedDiscordUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#7c84ff]/40 bg-[#5865F2] px-4 py-3 text-white hover:bg-[#4752C4] transition-colors w-full"
              >
                <FontAwesomeIcon icon={faDiscord} className="text-[16px]" />
                <span className="cinzel-font text-[11px] font-bold uppercase tracking-[0.22em]">Csatlakozz</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
