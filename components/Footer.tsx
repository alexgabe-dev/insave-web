
import React from 'react';
import { Shield, ShieldCheck } from 'lucide-react';

interface FooterProps {
  setView?: (view: any) => void;
}

const Footer: React.FC<FooterProps> = ({ setView }) => {
  return (
    <footer className="bg-[#020202] py-16 border-t border-[#1a1a1a] relative group">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center mb-6 opacity-30">
            <Shield size={24} className="text-[#c8aa6e]" />
        </div>
        <h4 className="cinzel-font text-2xl text-[#c8aa6e] mb-4 tracking-[0.5em] font-bold opacity-80">INSANE</h4>
        <p className="text-neutral-600 text-sm mb-8 font-serif italic">
          &copy; {new Date().getFullYear()} Turtle WoW Private Server Guild
        </p>
        
        <div className="w-12 h-px bg-[#333] mx-auto mb-8"></div>
        
        <p className="text-[10px] text-neutral-700 max-w-lg mx-auto leading-relaxed uppercase tracking-wider font-bold">
            Made by <span className="text-[#c8aa6e]">Stabastian</span>
        </p>

        {/* Hidden Admin Trigger */}
        <button 
          onClick={() => setView && setView('admin')}
          className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-10 text-neutral-800 transition-opacity hover:opacity-100 hover:text-[#c8aa6e]"
          title="Admin Access"
        >
          <ShieldCheck size={16} />
        </button>
      </div>
    </footer>
  );
};

// Add default export for Footer
export default Footer;
