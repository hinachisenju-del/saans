// src/engines/inhaledDoseEngine.ts
import type { AgeBand } from '../types/household';

export interface ActivitySegment {
  id: string;
  label: string;
  durationMin: number;
  activityType: 'rest' | 'light_walk' | 'brisk_commute' | 'outdoor_sports';
  location: 'indoor_clean' | 'indoor_average' | 'roadside' | 'outdoor_park';
  exposurePm25: number;
  maskType: 'none' | 'cloth' | 'surgical' | 'n95';
  hasBeardOrPoorFit?: boolean;
}

export interface DoseResult {
  inhaledDoseUg: number;
  baselineDoseUg: number;
  avoidedDoseUg: number;
  percentAvoided: number;
}

export function getMinuteVentilation(ageBand: AgeBand, activity: ActivitySegment['activityType']): number {
  const isChild = ageBand === '0-1' || ageBand === '2-5' || ageBand === '6-12';
  const isElder = ageBand === '65+';

  if (isChild) {
    switch (activity) {
      case 'rest': return 0.005;
      case 'light_walk': return 0.010;
      case 'brisk_commute': return 0.014;
      case 'outdoor_sports': return 0.019;
    }
  }

  if (isElder) {
    switch (activity) {
      case 'rest': return 0.0065;
      case 'light_walk': return 0.012;
      case 'brisk_commute': return 0.018;
      case 'outdoor_sports': return 0.022;
    }
  }

  switch (activity) {
    case 'rest': return 0.007;
    case 'light_walk': return 0.015;
    case 'brisk_commute': return 0.026;
    case 'outdoor_sports': return 0.035;
  }
}

export function getMaskProtectionFactor(
  maskType: ActivitySegment['maskType'],
  isChild: boolean,
  poorFit: boolean = false
): number {
  switch (maskType) {
    case 'none':
      return 0.0;
    case 'cloth':
      return 0.15;
    case 'surgical':
      return 0.35;
    case 'n95':
      if (poorFit) return 0.65;
      if (isChild) return 0.82;
      return 0.92;
  }
}

export function calculateSegmentDose(
  segment: ActivitySegment,
  ageBand: AgeBand
): DoseResult {
  const isChild = ageBand === '0-1' || ageBand === '2-5' || ageBand === '6-12';
  const ve = getMinuteVentilation(ageBand, segment.activityType);
  const pProtection = getMaskProtectionFactor(segment.maskType, isChild, segment.hasBeardOrPoorFit);

  const inhaledDose = segment.exposurePm25 * ve * segment.durationMin * (1 - pProtection);
  const baselineExposure = Math.max(segment.exposurePm25, 240);
  const baselineDose = baselineExposure * ve * segment.durationMin * 1.0;
  const avoidedDose = Math.max(0, baselineDose - inhaledDose);
  const percentAvoided = Math.round((avoidedDose / baselineDose) * 100);

  return {
    inhaledDoseUg: Math.round(inhaledDose),
    baselineDoseUg: Math.round(baselineDose),
    avoidedDoseUg: Math.round(avoidedDose),
    percentAvoided,
  };
}
