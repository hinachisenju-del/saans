// src/engines/safetyEngine.test.ts
import { describe, it, expect } from 'vitest';
import { checkRedFlags } from './safetyEngine';

describe('safetyEngine', () => {
  describe('checkRedFlags', () => {
    it('detects immediate emergencies in English', () => {
      const inputs = [
        'My mother has difficulty breathing and chest pain',
        'The child is breathless after school',
        'He cant breathe properly',
        'Blue lips and fainting detected',
        'Inhaler not working and coughing blood',
      ];

      for (const text of inputs) {
        const result = checkRedFlags(text);
        expect(result.isRedFlag).toBe(true);
        expect(result.severity).toBe('immediate_emergency');
        expect(result.matchedKeywords.length).toBeGreaterThan(0);
        expect(result.emergencyMessage).toContain('medical help immediately');
        expect(result.nearestFacilityNote).toContain('102 / 112');
      }
    });

    it('detects immediate emergencies in Hindi transliteration', () => {
      const inputs = [
        'Mujhe saans lene me takleef ho rahi hai',
        'Dadi ki saans phool rahi hai aur chhati me dard hai',
        'Patient ne hosh kho diya',
      ];

      for (const text of inputs) {
        const result = checkRedFlags(text);
        expect(result.isRedFlag).toBe(true);
        expect(result.severity).toBe('immediate_emergency');
        expect(result.emergencyMessageHi).toContain('तुरंत');
      }
    });

    it('identifies same-day medical review symptoms', () => {
      const inputs = [
        'I have a persistent cough since yesterday morning',
        'Worsening wheeze during night sleep',
        'Eye burning and gale me jalan',
      ];

      for (const text of inputs) {
        const result = checkRedFlags(text);
        expect(result.isRedFlag).toBe(false);
        expect(result.severity).toBe('same_day_consult');
        expect(result.emergencyMessage).toContain('reviewed by a doctor today');
      }
    });

    it('returns severity none for routine environmental queries', () => {
      const safeInputs = [
        'What is the AQI in Delhi today?',
        'Should I open my windows in Bengaluru?',
        'Is N95 mask reusable after 8 hours?',
        'Best indoor plants for living room decor',
      ];

      for (const text of safeInputs) {
        const result = checkRedFlags(text);
        expect(result.isRedFlag).toBe(false);
        expect(result.severity).toBe('none');
        expect(result.matchedKeywords).toHaveLength(0);
        expect(result.emergencyMessage).toBe('');
      }
    });
  });
});
