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

export type RaidKey = 'MC' | 'BWL' | 'AQ40' | 'Naxx' | 'K40';

export interface ConsumableItem {
  name: string;
  effect: string;
  raids: RaidKey[];
  category: string;
  duration?: string;
  notes?: string;
}

export interface RoleConsumables {
  role: 'Tank' | 'Healer' | 'Melee' | 'Caster' | 'Hunter';
  items: ConsumableItem[];
}