// src/types/action.ts

export type ActionCategory = 
  | 'ventilation'
  | 'purification'
  | 'mask'
  | 'cooking'
  | 'commute'
  | 'activity'
  | 'cleaning'
  | 'heating'
  | 'waste'
  | 'community';

export type CostBand = 'free' | 'low' | 'medium' | 'high';

export interface ActionImpact {
  metric: 'indoor_pm25_ugm3' | 'inhaled_dose_ug' | 'emissions_g_pm' | 'qualitative';
  baseline: { low: number; mid: number; high: number };
  withAction: { low: number; mid: number; high: number };
  percentChangeMid: number;
  horizon: 'immediate' | '2h' | 'overnight' | 'daily' | 'weekly';
  confidence: 'high' | 'medium' | 'low';
  assumptions: string[];
  citations: string[];
}

export interface ActionItem {
  id: string;
  category: ActionCategory;
  title: string;
  titleHi: string;
  shortImpact: string;
  shortImpactHi: string;
  detailedWhy: string;
  detailedWhyHi: string;
  costBand: CostBand;
  effortMin: number;
  assignedBlock: 'morning' | 'midday' | 'evening' | 'night';
  isDone: boolean;
  impact: ActionImpact;
  alternativeOf?: string;
  suitableRoles?: ('child' | 'adult' | 'elder')[];
}
