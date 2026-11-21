// src/types/household.ts

export type AgeBand = '0-1' | '2-5' | '6-12' | '13-17' | '18-64' | '65+';

export type HealthTag = 'asthma' | 'copd' | 'cardiac' | 'hypertension' | 'allergies';

export interface FamilyMember {
  id: string;
  name: string;
  role: 'child' | 'adult' | 'elder';
  ageBand: AgeBand;
  pregnant: boolean;
  tags: HealthTag[];
  tagsConsent: boolean;
}

export interface Room {
  id: string;
  name: string;
  type: 'living' | 'master_bed' | 'kids_bed' | 'kitchen' | 'balcony';
  areaM2: number;
  heightM: number;
  windowsCount: number;
  hasExhaust: boolean;
  hasPurifier: boolean;
  purifierCadrM3h?: number;
  purifierPower: 'off' | 'low' | 'med' | 'high';
  windowOpen: boolean;
  isSealed: boolean;
  currentPm25: number;
}

export interface Equipment {
  purifiersCount: number;
  purifiers: Array<{
    id: string;
    roomId: string;
    cadrM3h: number;
    filterAgeDays: number;
  }>;
  masks: ('n95' | 'surgical' | 'cloth')[];
  hasCo2OrPmSensor: boolean;
}

export type BudgetBand = 'minimal' | 'low' | 'medium' | 'flexible';

export interface HouseholdProfile {
  id: string;
  city: string;
  neighborhood: string;
  language: 'en' | 'hi';
  budgetBand: BudgetBand;
  members: FamilyMember[];
  rooms: Room[];
  equipment: Equipment;
  cookingFuel: 'lpg' | 'induction' | 'biomass' | 'kerosene' | 'png';
  hasChimneyOrExhaust: boolean;
  commuteMode: 'two_wheeler' | 'car' | 'bus' | 'metro' | 'walk' | 'wfh';
  commuteDistanceKm: number;
}
