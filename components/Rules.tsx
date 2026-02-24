import React from 'react';
import { Heart, MessageSquare, ShieldAlert, Users, Mic, ScrollText, ExternalLink } from 'lucide-react';
import FadeInSection from './FadeInSection';

const ruleIcons = [
    <Heart size={28} />,
    <MessageSquare size={28} />,
    <ShieldAlert size={28} />,
    <Mic size={28} />,
    <ScrollText size={28} />,
    <Users size={28} />,
];

const normalizeHref = (url: string) => {
  const raw = String(url || '').trim();
  if (!raw) return '';
  return /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
};

const normalizeLinks = (raw: any) => {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item: any) => ({
      label: typeof item?.label === 'string' ? item.label : '',
      url: normalizeHref(item?.url || '')
    }))
    .filter((item: any) => item.label && item.url);
};

const INLINE_LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;

const renderTextChunkWithLineBreaks = (text: string, keyPrefix: string) => {
  const nodes: React.ReactNode[] = [];
  const lines = text.split('\n');

  lines.forEach((line, idx) => {
    nodes.push(<React.Fragment key={`${keyPrefix}-line-${idx}`}>{line}</React.Fragment>);
    if (idx < lines.length - 1) {
      nodes.push(<br key={`${keyPrefix}-br-${idx}`} />);
    }
  });

  return nodes;
};

const renderDescriptionWithLinks = (description: string) => {
  const text = String(description || '');
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let nodeIndex = 0;
  INLINE_LINK_PATTERN.lastIndex = 0;

  let match = INLINE_LINK_PATTERN.exec(text);
  while (match) {
    const [fullMatch, label, rawUrl] = match;
    const startIndex = match.index;

    if (startIndex > lastIndex) {
      nodes.push(...renderTextChunkWithLineBreaks(text.slice(lastIndex, startIndex), `text-${nodeIndex}`));
      nodeIndex += 1;
    }

    const href = normalizeHref(rawUrl);
    if (label.trim() && href) {
      nodes.push(
        <a
          key={`link-${nodeIndex}`}
          href={href}
          target="_blank"
          rel="noreferrer"
          className="text-[#c8aa6e] underline underline-offset-2 hover:text-white transition-colors"
        >
          {label}
        </a>
      );
      nodeIndex += 1;
    } else {
      nodes.push(...renderTextChunkWithLineBreaks(fullMatch, `raw-${nodeIndex}`));
      nodeIndex += 1;
    }

    lastIndex = startIndex + fullMatch.length;
    match = INLINE_LINK_PATTERN.exec(text);
  }

  if (lastIndex < text.length) {
    nodes.push(...renderTextChunkWithLineBreaks(text.slice(lastIndex), `tail-${nodeIndex}`));
  }

  return nodes;
};

const RuleCard: React.FC<{ 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  links: Array<{ label: string; url: string }>;
  idx: number;
}> = ({ icon, title, description, links, idx }) => (
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
        {renderDescriptionWithLinks(description)}
      </p>
      {links.length > 0 && (
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {links.map((link, linkIdx) => (
            <a
              key={`${link.url}-${linkIdx}`}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 border border-[#c8aa6e]/30 text-[10px] uppercase tracking-widest font-bold text-[#c8aa6e] hover:text-white hover:border-white/30 transition-colors"
            >
              {link.label}
              <ExternalLink size={11} />
            </a>
          ))}
        </div>
      )}
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
                links={normalizeLinks(rule?.links)}
              />
            ))}
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default Rules;
