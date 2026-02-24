import React from 'react';
import {
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Clock3,
  ExternalLink,
  Gamepad2,
  Globe2,
  MessageCircle,
  ShieldCheck,
  Swords,
  UserPlus,
  Users
} from 'lucide-react';

const InfoPage: React.FC = () => {
  const quickFacts = [
    {
      icon: <Globe2 className="h-5 w-5 text-[#c8aa6e]" />,
      title: 'Realm',
      text: 'Turtle WoW - Nordanaar',
      sub: '1x XP ráta'
    },
    {
      icon: <Clock3 className="h-5 w-5 text-[#c8aa6e]" />,
      title: 'Raid Start',
      text: 'Általában minden nap 20:00',
      sub: 'Naxx időpontok Discordon'
    },
    {
      icon: <Users className="h-5 w-5 text-[#c8aa6e]" />,
      title: 'Tagfelvétel',
      text: 'Minden classt várunk',
      sub: 'Minden kezdő vagy veterán, bárki jöhet'
    }
  ];

  const joinSteps = [
    {
      icon: <UserPlus className="h-4 w-4 text-[#aab3ff]" />,
      title: 'Regisztrálj Turtle WoW-ra',
      description: 'Hozz létre accountot a hivatalos oldalon.',
      href: 'https://turtlecraft.gg/register',
      cta: 'Regisztráció'
    },
    {
      icon: <Gamepad2 className="h-4 w-4 text-[#aab3ff]" />,
      title: 'Töltsd le a launchert',
      description: 'Telepítsd a klienst, majd frissítsd a játékot.',
      href: 'https://launcher.turtlecraft.gg/api/launcher/TurtleWoW.exe?download=bunny',
      cta: 'Letöltés'
    },
    {
      icon: <MessageCircle className="h-4 w-4 text-[#aab3ff]" />,
      title: 'Lépj be és kérj invite-ot',
      description: 'Válaszd a Nordanaar realm-et, majd írj bármelyik guild tagnak guild invite-ért.',
      href: null,
      cta: null
    }
  ];

  return (
    <section className="relative overflow-hidden bg-[#050505] py-16 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(88,101,242,0.12),transparent_45%)]" />
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.08]" />

      <div className="relative z-10 container mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-10 md:mb-16 text-center">
          <span className="text-[11px] font-bold uppercase tracking-[0.35em] text-[#c8aa6e] cinzel-font">Infók</span>
          <h1 className="mt-3 text-4xl md:text-6xl font-black uppercase tracking-tight text-white cinzel-font">
            Játék, Raid és Csatlakozás
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base md:text-lg text-neutral-300 font-serif">
            Az INSANE guild a Turtle WoW <span className="text-white">Nordanaar</span> realm-en játszik.
            Minden classt és játékost szívesen fogadunk.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {quickFacts.map((fact) => (
            <div key={fact.title} className="rounded-xl border border-white/10 bg-[#0b0b0d]/90 p-5">
              <div className="mb-3 inline-flex rounded-lg border border-white/10 bg-black/40 p-2">
                {fact.icon}
              </div>
              <h2 className="text-lg font-bold text-white cinzel-font uppercase">{fact.title}</h2>
              <p className="mt-2 text-sm text-neutral-200">{fact.text}</p>
              <p className="mt-1 text-xs text-neutral-500">{fact.sub}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-[#0b0b0d]/90 p-6 lg:col-span-2">
            <div className="mb-4 flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-[#c8aa6e]" />
              <h3 className="text-xl md:text-2xl font-black text-white cinzel-font uppercase">Raid Menetrend</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between rounded-lg border border-white/10 bg-black/30 px-4 py-3">
                <span className="text-sm font-bold uppercase tracking-wider text-white cinzel-font">Hétfő - Péntek</span>
                <span className="text-sm text-[#c8aa6e] font-bold">20:00-tól</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-white/10 bg-black/30 px-4 py-3">
                <span className="text-sm font-bold uppercase tracking-wider text-white cinzel-font">Naxxramas</span>
                <span className="text-sm text-[#aab3ff] font-bold">általában 19:00-től</span>
              </div>
            </div>
            <p className="mt-4 text-sm text-neutral-400">
              Pontos heti lineup, summon időpontok és raid változások mindig Discordon frissülnek.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0b0b0d]/90 p-6">
            <div className="mb-4 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[#c8aa6e]" />
              <h3 className="text-xl font-black text-white cinzel-font uppercase">Mit Várunk</h3>
            </div>
            <div className="space-y-3 text-sm text-neutral-300">
              <p className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#8dd99b]" />
                Normális kommunikáció és csapatjáték.
              </p>
              <p className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#8dd99b]" />
                Raid időpontok betartása.
              </p>
              <p className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#8dd99b]" />
                Consume és karakter felkészültség.
              </p>
              <p className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#8dd99b]" />
                Discord aktív használata.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-[#5865F2]/30 bg-gradient-to-b from-[#0d1023] to-[#090a12] p-6 md:p-8">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-lg bg-[#5865F2]/20 p-2">
              <UserPlus className="h-5 w-5 text-[#aab3ff]" />
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white cinzel-font uppercase">Hogyan Csatlakozz</h3>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {joinSteps.map((step, idx) => (
              <div key={step.title} className="rounded-xl border border-white/10 bg-black/25 p-4">
                <div className="mb-3 inline-flex rounded-md border border-white/10 bg-black/30 p-2">
                  {step.icon}
                </div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-white cinzel-font">
                  {idx + 1}. {step.title}
                </h4>
                <p className="mt-2 text-sm text-neutral-300">{step.description}</p>
                {step.href && step.cta && (
                  <a
                    href={step.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-xs uppercase tracking-wider text-[#aab3ff] hover:text-white"
                  >
                    {step.cta} <ExternalLink size={12} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-[#0b0b0d]/90 p-6 md:p-7 flex flex-col">
            <div className="mb-4 flex items-center gap-2">
              <Swords className="h-5 w-5 text-[#c8aa6e]" />
              <h3 className="text-xl md:text-2xl font-black text-white cinzel-font uppercase">Első Lépéseid Nálunk</h3>
            </div>
            <div className="space-y-4 text-base md:text-lg text-neutral-200 leading-relaxed flex-1">
              <p className="flex items-start gap-3 rounded-lg border border-white/10 bg-black/25 px-4 py-4">
                <ChevronRight className="mt-1 h-5 w-5 text-[#c8aa6e] shrink-0" />
                Lépj be a Discord szerverünkre. 
              </p>
              <p className="flex items-start gap-3 rounded-lg border border-white/10 bg-black/25 px-4 py-4">
                <ChevronRight className="mt-1 h-5 w-5 text-[#c8aa6e] shrink-0" />
                Állítsd be a class/spec szerepköröd.
              </p>
              <p className="flex items-start gap-3 rounded-lg border border-white/10 bg-black/25 px-4 py-4">
                <ChevronRight className="mt-1 h-5 w-5 text-[#c8aa6e] shrink-0" />
                Nézd át a consume listát és raid infókat.
              </p>
              <p className="flex items-start gap-3 rounded-lg border border-white/10 bg-black/25 px-4 py-4">
                <ChevronRight className="mt-1 h-5 w-5 text-[#c8aa6e] shrink-0" />
                Ha 60-as meg van nyugodtan jelentkezz raidjeinkre.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0b0b0d]/90 p-6">
            <h3 className="mb-4 text-xl md:text-2xl font-black text-white cinzel-font uppercase">Gyakori Kérdések</h3>
            <div className="space-y-3 text-sm">
              <div className="rounded-lg border border-white/10 bg-black/30 p-3">
                <p className="font-bold text-white">Kell fix class?</p>
                <p className="mt-1 text-neutral-300">Nem. Minden classt várunk, csak jelezd milyen spec-ben játszol raidre.</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/30 p-3">
                <p className="font-bold text-white">Kell előzetes raid tapasztalat?</p>
                <p className="mt-1 text-neutral-300">Nem kötelező, de a taktikaanyagokat érdemes átnézni raid előtt.</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/30 p-3">
                <p className="font-bold text-white">Hol derül ki a pontos a raidek időpontja?</p>
                <p className="mt-1 text-neutral-300">Discord szerünk raid csatornáin, ott mindig friss infók vannak.</p>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/30 p-3">
                <p className="font-bold text-white">Kinek írjak guild invite-ért?</p>
                <p className="mt-1 text-neutral-300">Bárki tud a guildből invite-olni.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InfoPage;
