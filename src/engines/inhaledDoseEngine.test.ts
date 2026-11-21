// src/engines/inhaledDoseEngine.test.ts
import { describe, it, expect } from 'vitest';
import {
  getMinuteVentilation,
  getMaskProtectionFactor,
  calculateSegmentDose,
  type ActivitySegment,
} from './inhaledDoseEngine';

describe('inhaledDoseEngine', () => {
  describe('getMinuteVentilation', () => {
    it('returns higher ventilation for outdoor sports than rest', () => {
      const adultRest = getMinuteVentilation('18-64', 'rest');
      const adultSports = getMinuteVentilation('18-64', 'outdoor_sports');
      expect(adultSports).toBeGreaterThan(adultRest);
      expect(adultRest).toBe(0.007);
      expect(adultSports).toBe(0.035);
    });

    it('accounts for pediatric minute ventilation across activities', () => {
      const childRest = getMinuteVentilation('2-5', 'rest');
      const childSports = getMinuteVentilation('6-12', 'outdoor_sports');
      expect(childRest).toBe(0.005);
      expect(childSports).toBe(0.019);
    });

    it('accounts for geriatric minute ventilation', () => {
      const elderWalk = getMinuteVentilation('65+', 'light_walk');
      const elderCommute = getMinuteVentilation('65+', 'brisk_commute');
      expect(elderWalk).toBe(0.012);
      expect(elderCommute).toBe(0.018);
    });
  });

  describe('getMaskProtectionFactor', () => {
    it('returns 0.0 for no mask', () => {
      expect(getMaskProtectionFactor('none', false)).toBe(0.0);
    });

    it('returns 0.15 for cloth mask', () => {
      expect(getMaskProtectionFactor('cloth', false)).toBe(0.15);
    });

    it('returns 0.35 for surgical mask', () => {
      expect(getMaskProtectionFactor('surgical', false)).toBe(0.35);
    });

    it('returns 0.92 for well-fitted N95 on adults', () => {
      expect(getMaskProtectionFactor('n95', false, false)).toBe(0.92);
    });

    it('derates N95 protection for children due to nasal bridge leakage', () => {
      expect(getMaskProtectionFactor('n95', true, false)).toBe(0.82);
    });

    it('derates N95 protection for poor fit or facial hair', () => {
      expect(getMaskProtectionFactor('n95', false, true)).toBe(0.65);
    });
  });

  describe('calculateSegmentDose', () => {
    const baseSegment: ActivitySegment = {
      id: 'seg_1',
      label: 'Morning commute',
      durationMin: 60,
      activityType: 'brisk_commute',
      location: 'roadside',
      exposurePm25: 180,
      maskType: 'none',
    };

    it('calculates inhaled dose without protection', () => {
      const res = calculateSegmentDose(baseSegment, '18-64');
      // ve = 0.026 m3/min, duration = 60 min, pm25 = 180 ug/m3
      // dose = 180 * 0.026 * 60 * (1 - 0) = 280.8 ug -> 281 ug
      expect(res.inhaledDoseUg).toBe(281);
      expect(res.percentAvoided).toBe(25); // baseline uses 240 ug/m3
    });

    it('calculates significant avoided dose with N95 mask', () => {
      const protectedSegment: ActivitySegment = {
        ...baseSegment,
        maskType: 'n95',
      };
      const res = calculateSegmentDose(protectedSegment, '18-64');
      // 92% avoided on current exposure
      expect(res.inhaledDoseUg).toBeLessThan(30);
      expect(res.avoidedDoseUg).toBeGreaterThan(340);
      expect(res.percentAvoided).toBeGreaterThanOrEqual(90);
    });
  });
});
