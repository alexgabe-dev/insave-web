import React from 'react';

export interface Officer {
  name: string;
  role: 'Leader' | 'Officer';
  image?: string;
}

export interface RaidEP {
  name: string;
  points: number;
}

export interface BossTactic {
  id: string;
  name: string;
  consumables?: string;
  description: React.ReactNode;
}

export interface RaidTactic {
  id: string;
  name: string;
  generalDescription: string;
  bosses: BossTactic[];
}

export interface NavItem {
  label: string;
  href: string;
}

export type RaidKey = string;

export interface RaidConsumableSettings {
  required?: boolean;
  note?: string;
}

export interface ConsumableItem {
  name: string;
  effect: string;
  raids: RaidKey[];
  category: string;
  duration?: string;
  notes?: string;
  raidSettings?: Partial<Record<RaidKey, RaidConsumableSettings>>;
}

export interface RoleConsumables {
  role: 'Tank' | 'Healer' | 'Melee' | 'Caster' | 'Hunter' | 'Ranged';
  items: ConsumableItem[];
}
