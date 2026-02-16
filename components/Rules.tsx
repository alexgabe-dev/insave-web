import React from 'react';
import { Heart, MessageSquare, ShieldAlert, Users, Mic, ScrollText } from 'lucide-react';
import FadeInSection from './FadeInSection';

const ruleIcons = [
    <Heart size={28} />,
    <MessageSquare size={28} />,
    <ShieldAlert size={28} />,
    <Mic size={28} />,
    <ScrollText size={28} />,
    <Users size={28} />,
];

const RuleCard: React.FC<{ 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  idx: number;
}> = ({ icon, title, description, idx }) => (
  <div className="group fantasy-border p-6 md:p-8 hover:bg-[#151515] transition-colors duration-500 relative overflow-hidden">
    {/* Background Rune/Number */}
    <div className="absolute -right-4 -bottom-8 text-[6rem] md:text-[8rem] font-black text-[#1a1a1a] cinzel-font opacity-50 pointer-events-none select-none group-hover:text-[#202020] transition-colors">
      {idx + 1}
    </div>
    
    <div className="relative z-10 flex flex-col items-center text-center">
      <div className="mb-6 p-4 rounded-full border border-[#333] group-hover:border-[#c8aa6e] transition-colors duration-500 bg-[#0a0a0c]">
        <div className="text-[#c8aa6e] opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
          {icon}
        </div>
      </div>
      <h3 className="text-lg md:text-xl font-bold mb-4 text-[#e0e0e0] cinzel-font tracking-wide uppercase">{title}</h3>
      <div className="h-px w-12 bg-[#333] group-hover:bg-[#c8aa6e]/50 mb-4 transition-colors"></div>
      <p className="text-neutral-500 text-sm leading-6 md:leading-7 font-serif">
        {description}
      </p>
    </div>
  </div>
);

const Rules: React.FC<{ data: any[] }> = ({ data }) => {
  return (
    <section id="rules" className="py-20 md:py-32 bg-[#050505] relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#333] to-transparent"></div>
      
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <FadeInSection>
          <div className="mb-14 md:mb-24 text-center">
            <h2 className="text-3xl md:text-5xl font-bold cinzel-font text-[#e5e5e5] mb-4 md:mb-6">
                Klán <span className="text-[#c8aa6e]">Szabályzat</span>
            </h2>
            <p className="text-neutral-500 max-w-2xl mx-auto font-serif text-base md:text-lg italic">
              A zökkenőmentes játék és a jó közösség érdekében kérjük az alábbiak betartását.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((rule, idx) => (
              <RuleCard 
                key={idx}
                idx={idx}
                icon={ruleIcons[idx % ruleIcons.length]}
                title={rule.title}
                description={rule.description}
              />
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default Rules;
