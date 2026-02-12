
import React from 'react';
import { Officer, RaidEP, RaidTactic, RoleConsumables } from './types';

// Grouped navigation for the new header logic
export const NAV_GROUPS = [
  { 
    label: 'Kezdőlap', 
    href: '#home',
    view: 'home' 
  },
  { 
    label: 'Raid', 
    items: [
      { label: 'Taktikák', view: 'tactics', href: '#tactics' },
      { label: 'Consumables', view: 'consumables', href: '#consumables' },
      { label: 'Progress', view: 'home', anchor: '#progress' },
    ]
  },
  { 
    label: 'Rendszerek', 
    items: [
      { label: 'EPGP', view: 'epgp', href: '#epgp' },
      { label: 'SR Rendszer', view: 'sr', href: '#sr' },
      { label: 'Szabályzat', view: 'home', anchor: '#rules' },
    ]
  },
  { 
    label: 'Hasznos', 
    view: 'guides',
    href: '#guides' 
  },
];

export const NAV_ITEMS = [
  { label: 'Kezdőlap', href: '#home' },
  { label: 'Taktikák', href: '#tactics' },
  { label: 'Consumok', href: '#consumables' },
  { label: 'EPGP', href: '#epgp' },
  { label: 'SR Rendszer', href: '#sr' },
  { label: 'Progress', href: '#progress' },
  { label: 'Szabályzat', href: '#rules' },
  { label: 'Hasznos', href: '#guides' },
];

export const OFFICERS: Officer[] = [
  { name: 'Betonshaman', role: 'Leader' },
  { name: 'Rezsie', role: 'Officer' },
  { name: 'Alvin', role: 'Officer' },
  { name: 'Supa', role: 'Officer' },
  { name: 'Drassy', role: 'Officer' },
  { name: 'Noden', role: 'Officer' },
  { name: 'Mahnaz', role: 'Officer' },
  { name: 'Kekke', role: 'Officer' },
];

export const EP_VALUES: RaidEP[] = [
  { name: 'Emerald Sanctum (ES)', points: 75 },
  { name: 'Molten Core (MC)', points: 150 },
  { name: 'Blackwing Lair (BWL)', points: 175 },
  { name: 'Ahn\'Qiraj (AQ40)', points: 200 },
  { name: 'Naxxramas', points: 300 },
];

export const RAID_PROGRESS_DATA = [
  { name: 'Naxxramas', current: 12, total: 15, status: 'Progress', color: 'text-red-500', barColor: 'bg-red-600', img: 'https://img.youtube.com/vi/1_M4eC9S7W4/maxresdefault.jpg', featured: true },
  { name: 'Ahn\'Qiraj (AQ40)', current: 9, total: 9, status: 'Farmed', color: 'text-[#c8aa6e]', barColor: 'bg-[#c8aa6e]', img: 'https://i.ytimg.com/vi/S3rYJt5tO50/maxresdefault.jpg', featured: true },
  { name: 'Blackwing Lair', current: 8, total: 8, status: 'Farmed', color: 'text-neutral-400', barColor: 'bg-neutral-600', img: 'https://bnetcmsus-a.akamaihd.net/cms/blog_header/2g/2G45517G5S5C1581452656923.jpg', featured: true },
];

export const CONSUMABLES_DATA: RoleConsumables[] = [
  {
    role: 'Tank',
    items: [
      { name: 'Spirit of Zanza', effect: 'Increases Spirit by 50 and Stamina by 50', raids: ['AQ40', 'Naxx', 'K40'], category: 'Long Effects', duration: '2h' },
      { name: 'Elixir of the Mongoose', effect: '+25 Agility, +2% Crit', raids: ['BWL', 'AQ40', 'Naxx', 'K40'], category: 'Long Effects', duration: '1h' },
      { name: 'Elixir of Giants', effect: '+25 Strength', raids: ['BWL', 'AQ40', 'Naxx', 'K40'], category: 'Long Effects', notes: 'STR category' },
      { name: 'JUJU Power', effect: '+30 Strength', raids: ['AQ40', 'Naxx', 'K40'], category: 'Long Effects', notes: 'STR category' },
      { name: 'Juju Might', effect: '+40 Attack Power', raids: ['Naxx', 'K40'], category: 'Long Effects', duration: '10 min', notes: 'AP category' },
      { name: 'Winterfall Firewater', effect: '+35 Melee AP and size', raids: ['Naxx', 'K40'], category: 'Long Effects', duration: '20 min', notes: 'AP category' },
      { name: 'Elixir of Fortitude', effect: '+120 Max Health', raids: ['BWL', 'AQ40', 'Naxx', 'K40'], category: 'Long Effects', duration: '1h' },
      { name: 'Elixir of Superior Defense', effect: '+450 Armor', raids: ['BWL', 'AQ40', 'Naxx', 'K40'], category: 'Long Effects', duration: '1h' },
      { name: 'Gift of Arthas', effect: '+10 Shadow Res, attacker takes +8 damage', raids: ['Naxx', 'K40'], category: 'Long Effects', duration: '30 min', notes: 'No persist through death' },
      { name: 'Ground Scorpok Assay', effect: '+25 Agility', raids: ['AQ40', 'Naxx', 'K40'], category: 'Long Effects', duration: '1h' },
      { name: 'Nordanaar Herbal Tea', effect: 'Restores 1050-1751 Health/Mana', raids: ['MC', 'BWL', 'AQ40', 'Naxx', 'K40'], category: 'Short Effects' },
      { name: 'Major Healing Potion', effect: '+1000 Armor', raids: ['MC', 'BWL', 'AQ40', 'Naxx', 'K40'], category: 'Short Effects', duration: '90 sec' },
      { name: 'Greater Stoneshield Potion', effect: '+2000 Armor', raids: ['Naxx', 'K40'], category: 'Short Effects', duration: '90 sec' },
      { name: 'Free Action Potion', effect: 'Immune to Stun/Movement Impairment', raids: ['MC', 'BWL', 'AQ40', 'Naxx', 'K40'], category: 'Short Effects', duration: '30 sec' },
      { name: 'Hardened Mushroom', effect: '+25 Stamina', raids: ['AQ40', 'Naxx', 'K40'], category: 'Food', duration: '15 min', notes: 'Stacks with Gumbo' },
      { name: 'Le Fishe Au Chocolat', effect: '1% dodge and 4 defense', raids: ['AQ40', 'Naxx', 'K40'], category: 'Food', duration: '15 min' },
      { name: 'Gurubashi Gumbo', effect: '+10 Stamina, 1% Crit Reduction', raids: ['AQ40', 'Naxx', 'K40'], category: 'Food', duration: '15 min' },
      { name: 'Rumsey Rum Black Label', effect: '+15 Stamina', raids: ['Naxx', 'K40'], category: 'Food', duration: '15 min' },
      { name: 'Medivh’s Merlot', effect: '+25 Stamina', raids: ['K40'], category: 'Food', duration: '15 min', notes: 'Stacks with food buffs' },
    ]
  },
  {
    role: 'Melee',
    items: [
      { name: 'Spirit of Zanza', effect: 'Increases Spirit by 50 and Stamina by 50', raids: ['AQ40', 'Naxx', 'K40'], category: 'Long Effects', duration: '2h' },
      { name: 'Elixir of the Mongoose', effect: '+25 Agility, +2% Crit', raids: ['BWL', 'AQ40', 'Naxx', 'K40'], category: 'Long Effects', duration: '1h' },
      { name: 'Elixir of Giants', effect: '+25 Strength', raids: ['BWL', 'AQ40', 'Naxx', 'K40'], category: 'Long Effects', notes: 'STR category' },
      { name: 'JUJU Power', effect: '+30 Strength', raids: ['AQ40', 'Naxx', 'K40'], category: 'Long Effects', notes: 'STR category' },
      { name: 'Juju Might', effect: '+40 Attack Power', raids: ['Naxx', 'K40'], category: 'Long Effects', notes: 'AP category' },
      { name: 'Winterfall Firewater', effect: '+35 AP', raids: ['Naxx', 'K40'], category: 'Long Effects', notes: 'AP category' },
      { name: 'Elixir of Fortitude', effect: '+120 Max Health', raids: ['BWL', 'AQ40', 'Naxx', 'K40'], category: 'Long Effects' },
      { name: 'Elemental Sharpening Stone', effect: '+2% Crit on weapon', raids: ['Naxx', 'K40'], category: 'Long Effects', duration: '30 min' },
      { name: 'Ground Scorpok Assay', effect: '+25 Agility', raids: ['AQ40', 'Naxx', 'K40'], category: 'Long Effects' },
      { name: 'R.O.I.D.S.', effect: '+25 Strength', raids: ['AQ40', 'Naxx', 'K40'], category: 'Long Effects' },
      { name: 'Nordanaar Herbal Tea', effect: 'Restores 1050-1751 Health/Mana', raids: ['MC', 'BWL', 'AQ40', 'Naxx', 'K40'], category: 'Short Effects' },
      { name: 'Major Healing Potion', effect: '+1000 Armor', raids: ['MC', 'BWL', 'AQ40', 'Naxx', 'K40'], category: 'Short Effects', duration: '90 sec' },
      { name: 'Free Action Potion', effect: 'Immune to Stun/Movement Impairment', raids: ['MC', 'BWL', 'AQ40', 'Naxx', 'K40'], category: 'Short Effects' },
      { name: 'Power Mushroom', effect: '+20 Strength', raids: ['AQ40', 'Naxx', 'K40'], category: 'Food' },
      { name: 'Danonzo’s Tel’Abim Medley', effect: '2% Haste', raids: ['Naxx', 'K40'], category: 'Food' },
      { name: 'Le Fishe Au Chocolat', effect: '+10 Agility', raids: ['AQ40', 'Naxx', 'K40'], category: 'Food' },
      { name: 'Consecrated Sharpening Stone', effect: '+100 AP against Undead', raids: ['Naxx'], category: 'Naxxramas Only' },
    ]
  },
  {
    role: 'Hunter',
    items: [
      { name: 'Spirit of Zanza', effect: 'Increases Spirit by 50 and Stamina by 50', raids: ['AQ40', 'Naxx', 'K40'], category: 'Long Effects' },
      { name: 'Elixir of the Mongoose', effect: '+25 Agility, +2% Crit', raids: ['BWL', 'AQ40', 'Naxx', 'K40'], category: 'Long Effects' },
      { name: 'Elixir of Fortitude', effect: '+120 Max Health', raids: ['Naxx', 'K40'], category: 'Long Effects' },
      { name: 'Juju Might', effect: '+40 AP', raids: ['Naxx', 'K40'], category: 'Long Effects', duration: '20 min' },
      { name: 'Brilliant Mana Oil', effect: '12 MP5 and 25 Healing/Damage', raids: ['Naxx', 'K40'], category: 'Long Effects' },
      { name: 'Ground Scorpok Assay', effect: '+25 Agility', raids: ['AQ40', 'Naxx', 'K40'], category: 'Long Effects' },
      { name: 'Cerebral Cortex Compound', effect: '+25 Intellect', raids: ['AQ40', 'Naxx', 'K40'], category: 'Long Effects' },
      { name: 'Major Mana Potion', effect: 'Restores 1350-2251 Mana', raids: ['MC', 'BWL', 'AQ40', 'Naxx', 'K40'], category: 'Short Effects' },
      { name: 'Major Healing Potion', effect: '+1000 Armor', raids: ['MC', 'BWL', 'AQ40', 'Naxx', 'K40'], category: 'Short Effects', duration: '90 sec' },
      { name: 'Danonzo’s Tel’Abim Surprise', effect: '+45 Ranged AP', raids: ['Naxx', 'K40'], category: 'Food' },
      { name: 'Danonzo’s Tel’Abim Medley', effect: '2% Haste', raids: ['Naxx', 'K40'], category: 'Food' },
      { name: 'Le Fishe Au Chocolat', effect: '+10 Agility', raids: ['AQ40', 'Naxx', 'K40'], category: 'Food' },
      { name: 'Consecrated Sharpening Stone', effect: '+100 AP against Undead', raids: ['Naxx'], category: 'Naxxramas Only' },
    ]
  },
  {
    role: 'Caster',
    items: [
      { name: 'Spirit of Zanza', effect: 'Increases Spirit by 50 and Stamina by 50', raids: ['AQ40', 'Naxx', 'K40'], category: 'Long Effects' },
      { name: 'Elixir of Fortitude', effect: '+120 Max Health', raids: ['Naxx', 'K40'], category: 'Long Effects' },
      { name: 'Mageblood Potion', effect: '12 MP5', raids: ['AQ40', 'Naxx', 'K40'], category: 'Long Effects' },
      { name: 'Brilliant Wizard Oil', effect: '+36 Spell Damage and 1% Crit', raids: ['BWL', 'AQ40', 'Naxx', 'K40'], category: 'Long Effects' },
      { name: 'Greater Arcane Elixir', effect: '+35 Spell Damage', raids: ['BWL', 'AQ40', 'Naxx', 'K40'], category: 'Long Effects' },
      { name: 'Elixir of Shadow/Fire/Frost Power', effect: '+15 to +55 SP', raids: ['AQ40', 'Naxx', 'K40'], category: 'Long Effects' },
      { name: 'Dreamshard Elixir', effect: '2% Spell Crit and 15 Spell Power', raids: ['AQ40', 'Naxx', 'K40'], category: 'Long Effects' },
      { name: 'Dreamtonic', effect: '+35 Spell Damage', raids: ['Naxx', 'K40'], category: 'Long Effects', duration: '20 min' },
      { name: 'Cerebral Cortex Compound', effect: '+25 Intellect', raids: ['AQ40', 'Naxx', 'K40'], category: 'Long Effects' },
      { name: 'Major Mana Potion', effect: 'Restores 1350-2251 Mana', raids: ['MC', 'BWL', 'AQ40', 'Naxx', 'K40'], category: 'Short Effects' },
      { name: 'Juice Striped Melon', effect: '+10 Intellect', raids: ['Naxx', 'K40'], category: 'Food' },
      { name: 'Nightfin Soup', effect: '8 MP5', raids: ['MC', 'BWL', 'AQ40', 'Naxx', 'K40'], category: 'Food' },
      { name: 'Danonzo’s Tel’Abim Delight', effect: '+22 Spell Damage', raids: ['Naxx', 'K40'], category: 'Food' },
      { name: 'Medivh’s Merlot Blue', effect: '+15 Intellect', raids: ['K40'], category: 'Food', notes: 'Stacks with food buffs' },
      { name: 'Blessed Wizard Oil', effect: '+60 Spell Damage against Undead', raids: ['Naxx'], category: 'Naxxramas Only' },
    ]
  },
  {
    role: 'Healer',
    items: [
      { name: 'Spirit of Zanza', effect: 'Increases Spirit by 50 and Stamina by 50', raids: ['AQ40', 'Naxx', 'K40'], category: 'Long Effects' },
      { name: 'Dreamshard Elixir', effect: '2% Spell Crit and 15 Spell Power', raids: ['AQ40', 'Naxx', 'K40'], category: 'Long Effects' },
      { name: 'Elixir of Fortitude', effect: '+120 Max Health', raids: ['Naxx', 'K40'], category: 'Long Effects' },
      { name: 'Brilliant Mana Oil', effect: '12 MP5 and 25 Healing', raids: ['BWL', 'AQ40', 'Naxx', 'K40'], category: 'Long Effects' },
      { name: 'Cerebral Cortex Compound', effect: '+25 Intellect', raids: ['AQ40', 'Naxx', 'K40'], category: 'Long Effects' },
      { name: 'Mageblood Potion', effect: '12 MP5', raids: ['AQ40', 'Naxx', 'K40'], category: 'Long Effects' },
      { name: 'Major Mana Potion', effect: 'Restores 1350-2251 Mana', raids: ['MC', 'BWL', 'AQ40', 'Naxx', 'K40'], category: 'Short Effects' },
      { name: 'Nightfin Soup', effect: '8 MP5', raids: ['MC', 'BWL', 'AQ40', 'Naxx', 'K40'], category: 'Food' },
      { name: 'Medivh’s Merlot Blue', effect: '+15 Intellect', raids: ['K40'], category: 'Food', notes: 'Stacks with food buffs' },
    ]
  }
];

export const RAID_TACTICS_DATA: RaidTactic[] = [
  {
    id: 'naxx',
    name: 'Naxxramas',
    generalDescription: 'A végső Classic kihívás. 4 szárnyból és egy központi részből áll. Felkészülésként Nature, Shadow és Frost resist gear/potionok szükségesek.',
    bosses: [
      {
        id: 'anubrekhan',
        name: '1. Anub\'rekhan',
        description: (
          <div className="space-y-4">
            <p><strong className="text-red-400">Impale:</strong> Random targetre rá castolja, feldobja és sebet ejt rajta. Szétszóródni!</p>
            <p><strong className="text-red-400">Locust Swarm:</strong> A boss körül nagy sebzés és silence. Ilyenkor a tank körbeviszi a bosst a teremben.</p>
            <p>Az addokat azonnal le kell ölni, mert scarabokat idéznek a holttestekből.</p>
          </div>
        )
      },
      {
        id: 'faerlina',
        name: '2. Grand Widow Faerlina',
        description: <p>A boss Enrage-el. Amikor ez történik, egy Worshipper-t meg kell ölni a boss közelében, ami "megnyugtatja". Rain of Fire-ből ki kell állni.</p>
      },
      {
        id: 'maexxna',
        name: '3. Maexxna',
        description: <p>Web Wrap: a falra ragaszt embereket, ki kell őket szabadítani. Web Spray: 8 másodpercre mindenki lebénul, előtte tankot tele kell rakni HOT-okkal. 30%-nál Enrage.</p>
      },
      {
        id: 'noth',
        name: '4. Noth the Plaguebringer',
        description: <p>Gyors decurse kötelező! Teleportálás után addok jönnek, amiket le kell fogni. A boss Curse-je nagy sebzést okoz a raidnek.</p>
      },
      {
        id: 'heigan',
        name: '5. Heigan the Unclean',
        description: <p>A legendás "tánc". A padlóból kitörő méreg elől mozogni kell szinkronban. Mana Burn-re figyelni, kaszterek távol álljanak.</p>
      },
      {
        id: 'loatheb',
        name: '6. Loatheb',
        description: <p>Healing tilalom: 1 perc CD a healeken. Spórák adják a crit buffot, a DPS-nek bele kell állnia. Shadow potion a Doom elkerüléséhez kötelező.</p>
      },
      {
        id: 'razuvious',
        name: '7. Instructor Razuvious',
        description: <p>Priest-eknek Mind Control-oznia kell az Understudy-kat a tankoláshoz. A boss ordítása elégeti a manát, ha lát téged.</p>
      },
      {
        id: 'gothik',
        name: '8. Gothik the Harvester',
        description: <p>Két oldal: Élő és Halott. Egyensúlyban kell tartani a dps-t. 30%-nál kinyílik a kapu, és jön a boss.</p>
      },
      {
        id: 'horsemen',
        name: '9. The Four Horsemen',
        description: <p>4 boss a sarkokban. 3 mark után rotálni kell. Mograine (tűz), Zeliek (holy), Thane (meteor), Blaumeux (void zone).</p>
      },
      {
        id: 'horsemen',
        name: '9. The Four Horsemen',
        description: <p>4 boss a sarkokban. 3 mark után rotálni kell. Mograine (tűz), Zeliek (holy), Thane (meteor), Blaumeux (void zone).</p>
      },
      {
        id: 'patchwerk',
        name: '10. Patchwerk',
        description: <p>Hateful Strike: az off-tankokat üti, brutális heal kell rájuk. Tiszta DPS race, 7 perc után Enrage.</p>
      },
      {
        id: 'grobbulus',
        name: '11. Grobbulus',
        description: <p>Mérgező felhők a boss után, a tank folyamatosan mozgatja. Injection-nel ki kell futni a szélére robbanni.</p>
      },
      {
        id: 'gluth',
        name: '12. Gluth',
        description: <p>Zombikat kell kite-olni, nem érhetnek a boss-hoz. Decimate-nél 5% HP marad mindenkinek, ekkor minden dps a zombikra fókuszál.</p>
      },
      {
        id: 'thaddius',
        name: '13. Thaddius',
        description: <p>Polaritás váltás: (+) és (-) töltés. Ha elrontod, robban az egész raid. Az ugrást ne rontsd el!</p>
      },
      {
        id: 'sapphiron',
        name: '14. Sapphiron',
        description: <p>Frost Aura miatt Frost Resist gear kötelező. Ice Bolt robbanás elől a jégtömbök mögé kell bújni.</p>
      },
      {
        id: 'kelthuzad',
        name: '15. Kel\'Thuzad',
        description: <p>Fázis 1: Addok. Fázis 2: Boss, Frost Blast-nál heal, Shadow Fissure elől futás. Fázis 3: Bogarak jönnek 40%-nál.</p>
      }
    ]
  },
  {
    id: 'aq40',
    name: 'Ahn\'Qiraj (AQ40)',
    generalDescription: 'A sivatagi istenek temploma. Nature resist gear és potion szükséges.',
    bosses: [
      { id: 'skeram', name: '1. The Prophet Skeram', description: <p>75, 50, 25%-nál klónozza magát. A klónokat kell először ölni. Interrupt arcane explosion!</p> },
      { id: 'bugtrio', name: '2. Bug Trio', description: <p>Kri, Yauj és Vem. Kill order határozza meg a loot-ot. Yauj-t interruptolni kell.</p> },
      { id: 'sartura', name: '3. Battleguard Sartura', description: <p>Whirlwind boss. Addokat le stunolni és ölni először. Sartura WW alatt nem stunolható.</p> },
      { id: 'fankriss', name: '4. Fankriss the Unyielding', description: <p>Tankolás középen. A sárga kukacok (Spawn of Fankriss) prioritás, mert 10 sec után bedühödnek.</p> },
      { id: 'huhuran', name: '5. Princess Huhuran', description: <p>30% felett sleep és poison. 30% alatt Frenzy: NR gear-ben lévőknek (soakers) közel kell állniuk.</p> },
      { id: 'viscidus', name: '6. Viscidus', description: <p>Opcionális. Frost sebzés kell a fagyasztáshoz, majd fizikai sebzés a széttöréshez. AOE a kis slimeokra.</p> },
      { id: 'twins', name: '7. The Twin Emperors', description: <p>Vek\'lor (mágia immun) és Vek\'nilash (fizikai immun). 45 másodpercenként teleportálnak.</p> },
      { id: 'ouro', name: '8. Ouro', description: <p>Sand Blast miatt a tank rotáció fontos. Submerge alatt popcorn effekt and addok.</p> },
      { id: 'cthun', name: '9. C\'Thun', description: <p>P1: Eye Beam miatt szóródni. P2: Gyomor fázisban csápokat ölni, hogy a boss sebezhető legyen.</p> }
    ]
  },
  {
    id: 'bwl',
    name: 'Blackwing Lair',
    generalDescription: 'Nefarian fészke. Onyxia Scale Cloak kötelező az utolsó bossoknál.',
    bosses: [
      { id: 'razorgore', name: '1. Razorgore the Untamed', description: <p>Orb kontrollálása, tojások törése. Addokat a raid öli. P2-ben Razorgore-t le kell tankolni.</p> },
      { id: 'vaelastrasz', name: '2. Vaelastrasz the Corrupt', description: <p>A guild dps tesztje. 3 perced van ölni. Burning Adrenaline-nal ki kell futni robbanni.</p> },
      { id: 'lashlayer', name: '3. Broodlord Lashlayer', description: <p>Mortal Strike-ot üt, nagy heal kell a tankra. Blast Wave lökdös, fal mellé kell állni.</p> },
      { id: 'firemaw', name: '4. Firemaw', description: <p>Shadow Flame and Wing Buffet. A raidnek bújkálnia kell, hogy a Flame Buffet stack leessen.</p> },
      { id: 'ebonroc', name: '5. Ebonroc', description: <p>Shadow of Ebonroc debuff-ot rak a tankra, ilyenkur cserélni kell a tankokat, mert healeli a bosst.</p> },
      { id: 'flamegor', name: '6. Flamegor', description: <p>Hasonló a többi sárkányhoz, but Frenzy-t használ, amit Huntereknek Tranq Shot-tal kell leszedni.</p> },
      { id: 'chromaggus', name: '7. Chromaggus', description: <p>5 féle breath és gyengeségek váltakoznak. Hourglass of Sand-et használni kell a stun ellen.</p> },
      { id: 'nefarian', name: '8. Nefarian', description: <p>Class hívások (Warrior stance, Priest broken heal, etc.). P3-ban a drakonid csontvázak feltámadnak, AOE!</p> }
    ]
  },
  {
    id: 'mc',
    name: 'Molten Core',
    generalDescription: 'A Classic első raidje. Fire resist és decurse a legfontosabb.',
    bosses: [
      { id: 'lucifron', name: '1. Lucifron', description: <p>Decurse és Magic dispel prioritás. Az addokat (Protectors) meg kell ölni először.</p> },
      { id: 'magmadar', name: '2. Magmadar', description: <p>Frenzy-t Hunter Tranq Shot-olja. Fear ellen Tremor Totem vagy Fear Ward kell.</p> },
      { id: 'gehennas', name: '3. Gehennas', description: <p>Rain of Fire-ből kiállni. Curse csökkenti a gyógyulást, decurse kötelező.</p> },
      { id: 'garr', name: '4. Garr', description: <p>8 addja van, amiket Warlockoknak száműzni (Banish) kell. Ha egy add meghal, robban.</p> },
      { id: 'geddon', name: '5. Baron Geddon', description: <p>A "BOMBA" fázisnál ki kell futni a raidből. Mana burn ellen magic dispel.</p> },
      { id: 'shazzrah', name: '6. Shazzrah', description: <p>Counterspell a teleportálás után. AOE sebzés a boss körül, decurse magic dmg buff ellen.</p> },
      { id: 'sulfuron', name: '7. Sulfuron Harbinger', description: <p>4 addja van, akik gyógyítanak. Interrupt és target fókusz szükséges.</p> },
      { id: 'golemagg', name: '8. Golemagg the Burner', description: <p>Tank and spank. Az addokat nem öljük meg, csak lefogjuk, amíg a boss meg nem hal.</p> },
      { id: 'domo', name: '9. Majordomo Executus', description: <p>8 addot kell megölni. Healereket (priest) először, utána a melee addokat.</p> },
      { id: 'ragnaros', name: '10. Ragnaros', description: <p>Tűz uralkodója. P1: Fire resist. P2 (3 perc után): Sons of Flame jönnek, AOE és CC.</p> }
    ]
  }
];
