// src/engines/airQualityEngine.test.ts
import { describe, it, expect } from 'vitest';
import { pm25ToNaqi, calculateSal, SAL_SCALE } from './airQualityEngine';
import type { SALBand } from '../types/air';

describe('airQualityEngine', () => {
  describe('pm25ToNaqi', () => {
    it('correctly maps 0-30 µg/m³ to Good band', () => {
      const res0 = pm25ToNaqi(0);
      expect(res0.aqi).toBe(0);
      expect(res0.band).toBe('good');

      const res15 = pm25ToNaqi(15);
      expect(res15.aqi).toBe(25);
      expect(res15.band).toBe('good');

      const res30 = pm25ToNaqi(30);
      expect(res30.aqi).toBe(50);
      expect(res30.band).toBe('good');
    });

    it('correctly maps 31-60 µg/m³ to Satisfactory band', () => {
      const res = pm25ToNaqi(45);
      expect(res.aqi).toBe(75);
      expect(res.band).toBe('satisfactory');
      expect(res.bandLabel).toBe('Satisfactory');
    });

    it('correctly maps 61-90 µg/m³ to Moderate band', () => {
      const res = pm25ToNaqi(75);
      expect(res.aqi).toBe(150);
      expect(res.band).toBe('moderate');
      expect(res.bandLabel).toBe('Moderate');
    });

    it('correctly maps 91-120 µg/m³ to Poor band', () => {
      const res = pm25ToNaqi(105);
      expect(res.aqi).toBe(250);
      expect(res.band).toBe('poor');
      expect(res.bandLabel).toBe('Poor');
    });

    it('correctly maps 121-250 µg/m³ to Very Poor band', () => {
      const res = pm25ToNaqi(185);
      expect(res.aqi).toBe(350);
      expect(res.band).toBe('very_poor');
      expect(res.bandLabel).toBe('Very Poor');
    });

    it('correctly maps >250 µg/m³ to Severe band and caps at 500', () => {
      const resSevere = pm25ToNaqi(300);
      expect(resSevere.band).toBe('severe');
      expect(resSevere.bandLabel).toBe('Severe');
      expect(resSevere.aqi).toBeGreaterThanOrEqual(400);

      const resExtreme = pm25ToNaqi(1000);
      expect(resExtreme.aqi).toBe(500);
      expect(resExtreme.band).toBe('severe');
    });
  });

  describe('calculateSal (Simple Action Level)', () => {
    it('returns band 0 (Clear) for PM2.5 <= 15', () => {
      expect(calculateSal(10)).toBe(0);
      expect(calculateSal(15)).toBe(0);
    });

    it('returns band 1 (Watch) for PM2.5 between 16 and 35', () => {
      expect(calculateSal(25)).toBe(1);
      expect(calculateSal(35)).toBe(1);
    });

    it('returns band 2 (Careful) for PM2.5 between 36 and 60', () => {
      expect(calculateSal(45)).toBe(2);
      expect(calculateSal(60)).toBe(2);
    });

    it('returns band 3 (Protect) for PM2.5 between 61 and 120', () => {
      expect(calculateSal(80)).toBe(3);
      expect(calculateSal(120)).toBe(3);
    });

    it('returns band 4 (Shelter) for PM2.5 between 121 and 250', () => {
      expect(calculateSal(180)).toBe(4);
      expect(calculateSal(250)).toBe(4);
    });

    it('returns band 5 (Emergency) for PM2.5 > 250', () => {
      expect(calculateSal(300)).toBe(5);
    });

    it('bumps SAL level by 1 for households with sensitive members', () => {
      expect(calculateSal(10, true)).toBe(1);
      expect(calculateSal(25, true)).toBe(2);
      expect(calculateSal(45, true)).toBe(3);
      expect(calculateSal(80, true)).toBe(4);
      expect(calculateSal(180, true)).toBe(5);
      // Emergency (band 5) should remain capped at 5
      expect(calculateSal(350, true)).toBe(5);
    });
  });

  describe('SAL_SCALE definition', () => {
    it('contains all 6 levels (0 to 5) with required metadata', () => {
      for (let i = 0; i <= 5; i++) {
        const band = i as SALBand;
        const info = SAL_SCALE[band];
        expect(info).toBeDefined();
        expect(info.level).toBe(i);
        expect(info.name).toBeTruthy();
        expect(info.nameHi).toBeTruthy();
        expect(info.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
        expect(info.generalRule).toBeTruthy();
        expect(info.sensitiveRule).toBeTruthy();
        expect(info.pm25Range).toHaveLength(2);
      }
    });
  });
});
