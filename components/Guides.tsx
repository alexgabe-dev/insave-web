import React from 'react';
import { Scroll, Sparkles, Zap, Calendar, Tag, X } from 'lucide-react';
import FadeInSection from './FadeInSection';

interface Guide {
  id: number;
  title: string;
  category: string;
  content: string;
  date: string;
  badge?: string;
  link?: string;
  image?: string;
}

const INLINE_LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;

const normalizeHref = (url: string) => {
  const raw = String(url || '').trim();
  if (!raw) return '';
  return /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
};

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

const renderGuideContentWithLinks = (content: string) => {
  const text = String(content || '');
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

const Guides: React.FC<{ data: Guide[] }> = ({ data }) => {
  const [lightboxImage, setLightboxImage] = React.useState<{ src: string; title: string } | null>(null);

  return (
    <section className="min-h-screen py-24 bg-[#050505] relative">
    
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <FadeInSection>
          <div className="text-center mb-24">
            <div className="flex justify-center mb-6">
                <div className="relative">
                    <Scroll className="text-[#c8aa6e] opacity-20" size={120} strokeWidth={1} />
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Sparkles className="text-[#c8aa6e] animate-pulse" size={32} />
                    </div>
                </div>
            </div>
            <h2 className="text-5xl md:text-7xl font-black cinzel-font text-white mb-6 tracking-tighter">
              HASZNOS <span className="text-[#c8aa6e]">TIPPEK</span>
            </h2>
            <p className="text-neutral-500 max-w-2xl mx-auto font-serif text-xl italic leading-relaxed">
              Klán tippek, trükkök és hasznos tudnivalók a Turtle WoW világából.<br/>
              A tudás hatalom, a tapasztalat pedig túlélés.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((guide) => (
              <div key={guide.id} className="group relative bg-[#0a0a0b] border border-white/5 p-8 hover:border-[#c8aa6e]/40 transition-all duration-700 shadow-2xl overflow-hidden fantasy-border-accent flex flex-col">
                <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-[#c8aa6e]/5 blur-[100px] rounded-full group-hover:bg-[#c8aa6e]/10 transition-all duration-1000"></div>

                <div className="relative z-10 flex flex-col h-full">
                  {guide.image && (
                    <div className="mb-6 overflow-hidden border border-white/10">
                      <button
                        type="button"
                        onClick={() => setLightboxImage({ src: guide.image as string, title: guide.title })}
                        className="w-full text-left"
                      >
                        <img
                          src={guide.image}
                          alt={guide.title}
                          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </button>
                    </div>
                  )}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-2 text-[10px] cinzel-font font-bold text-[#c8aa6e]/60 uppercase tracking-[0.2em]">
                        <Tag size={12} /> {guide.category}
                    </div>
                    {guide.badge && (
                      <span className="text-[8px] cinzel-font font-bold px-2 py-1 bg-red-950/40 text-red-400 border border-red-900/30 uppercase tracking-[0.2em]">
                        {guide.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-2xl font-bold text-white cinzel-font tracking-widest group-hover:text-[#c8aa6e] transition-colors mb-4 leading-tight">
                    {guide.title}
                  </h3>

                  <div className="text-neutral-400 text-sm leading-relaxed font-serif italic border-l border-white/10 pl-4 mb-8 flex-grow">
                      {renderGuideContentWithLinks(guide.content)}
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-auto">
                    <div className="flex items-center gap-2 text-[9px] text-neutral-600 font-bold uppercase tracking-widest">
                        <Calendar size={12} /> {guide.date}
                    </div>
                    {guide.link && (
                      <a href={guide.link} target="_blank" rel="noreferrer" className="text-[10px] font-bold text-[#c8aa6e] uppercase tracking-widest hover:text-white transition-all flex items-center gap-1">
                        Részletek <Zap size={10} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Further Resources - KEPT AT BOTTOM */}
          <div className="mt-32 p-12 bg-[#0a0a0b] border border-[#c8aa6e]/20 text-center relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#c8aa6e] to-transparent opacity-30"></div>
            <h4 className="cinzel-font text-2xl text-white mb-4 tracking-widest uppercase">További Források</h4>
            <p className="text-neutral-500 font-serif italic mb-8">A Turtle WoW világa folyamatosan bővül. Maradj naprakész a hivatalos fórumokon.</p>
            <div className="flex flex-wrap justify-center gap-6">
                <a href="https://turtlecraft.gg" target="_blank" className="px-8 py-3 border border-white/5 hover:border-[#c8aa6e] text-[10px] cinzel-font font-bold uppercase tracking-widest transition-all">Hivatalos oldal</a>
                <a href="https://database.turtlecraft.gg" target="_blank" className="px-8 py-3 border border-white/5 hover:border-[#c8aa6e] text-[10px] cinzel-font font-bold uppercase tracking-widest transition-all">AdatbÃ¡zis</a>
                <a href="https://forum.turtlecraft.gg" target="_blank" className="px-8 py-3 border border-white/5 hover:border-[#c8aa6e] text-[10px] cinzel-font font-bold uppercase tracking-widest transition-all">FÃ³rum</a>
            </div>
          </div>
        </FadeInSection>
      </div>

      {lightboxImage && (
        <div className="fixed inset-0 z-[350] bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-5xl">
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              className="absolute -top-11 right-0 inline-flex items-center gap-1 px-3 py-2 border border-white/20 bg-black/50 text-white text-[10px] uppercase tracking-widest hover:border-white/40 transition-colors"
            >
              <X size={12} /> Bezár
            </button>
            <div className="border border-white/15 bg-black/40">
              <img
                src={lightboxImage.src}
                alt={lightboxImage.title}
                className="w-full max-h-[82vh] object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Guides;
