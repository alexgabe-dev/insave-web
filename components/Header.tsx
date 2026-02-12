
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Globe, Shield } from 'lucide-react';

interface HeaderProps {
  setView: (view: any) => void;
  currentView: string;
}

const Header: React.FC<HeaderProps> = ({ setView, currentView }) => {
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
        { label: 'EPGP Loot', view: 'epgp' },
        { label: 'SR Rendszer', view: 'sr' },
        { label: 'Szabályzat', view: 'home', anchor: '#rules' },
      ]
    },
    {
      label: 'Klán',
      items: [
        { label: 'Hasznos Tippek', view: 'guides' },
        { label: 'Vezetőség', view: 'home', anchor: '#roster' },
      ]
    }
  ];

  const navigate = (item: any) => {
    setView(item.view);
    if (item.anchor) {
      setTimeout(() => {
        document.querySelector(item.anchor)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
    setIsOpen(false);
    setActiveDropdown(null);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled || currentView !== 'home' ? 'bg-[#050505]/95 border-b border-white/5 py-3 backdrop-blur-md' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <button onClick={() => setView('home')} className="flex items-center gap-3 group">
          <Shield className="text-[#c8aa6e] w-8 h-8 group-hover:scale-110 transition-transform" />
          <div className="flex flex-col text-left">
            <span className="text-xl font-black cinzel-font tracking-widest text-white">INSANE</span>
            <span className="text-[8px] cinzel-font tracking-[0.3em] text-neutral-500 uppercase">Turtle WoW Hungary</span>
          </div>
        </button>

        <nav className="hidden lg:flex items-center gap-10" ref={dropdownRef}>
          {menuGroups.map((group) => (
            <div key={group.label} className="relative">
              <button 
                onClick={() => setActiveDropdown(activeDropdown === group.label ? null : group.label)}
                className={`flex items-center gap-2 text-[10px] font-bold cinzel-font uppercase tracking-[0.2em] transition-colors ${activeDropdown === group.label ? 'text-[#c8aa6e]' : 'text-neutral-400 hover:text-white'}`}
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
          {/* Admin link removed from here */}
        </nav>

        <button className="lg:hidden text-neutral-400" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-[#050505] z-[99] pt-24 px-8 flex flex-col gap-8 animate-fade-in">
          {menuGroups.map(group => (
            <div key={group.label} className="space-y-4">
              <p className="text-[#c8aa6e] text-[10px] font-bold cinzel-font tracking-widest border-b border-white/5 pb-2 uppercase">{group.label}</p>
              <div className="flex flex-col gap-4 pl-4">
                {group.items.map(item => (
                  <button key={item.label} onClick={() => navigate(item)} className="text-left text-xl cinzel-font text-neutral-400">{item.label}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
