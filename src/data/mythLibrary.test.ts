// src/data/mythLibrary.test.ts
import { describe, it, expect } from 'vitest';
import { MYTH_LIBRARY } from './mythLibrary';

describe('mythLibrary', () => {
  it('contains verified myths with evidence citations', () => {
    expect(MYTH_LIBRARY.length).toBeGreaterThan(0);

    for (const myth of MYTH_LIBRARY) {
      expect(myth.id).toBeTruthy();
      expect(myth.topic).toBeTruthy();
      expect(myth.topicHi).toBeTruthy();
      expect(myth.claim).toBeTruthy();
      expect(myth.claimHi).toBeTruthy();
      expect(myth.explanation).toBeTruthy();
      expect(myth.citation).toBeTruthy();
      expect(myth.actionableAdvice).toBeTruthy();
      expect(['Ineffective', 'Overstated', 'Harmful', 'Verified Effective', 'Conditional']).toContain(myth.verdict);
      expect(['A', 'B', 'C']).toContain(myth.evidenceGrade);
    }
  });

  it('debunks steam inhalation and indoor plants myths with grade A evidence', () => {
    const steamMyth = MYTH_LIBRARY.find((m) => m.id === 'myth_steam_inhalation');
    expect(steamMyth).toBeDefined();
    expect(steamMyth?.verdict).toBe('Ineffective');
    expect(steamMyth?.evidenceGrade).toBe('A');

    const plantMyth = MYTH_LIBRARY.find((m) => m.id === 'myth_air_purifying_plants');
    expect(plantMyth).toBeDefined();
    expect(plantMyth?.verdict).toBe('Overstated');
    expect(plantMyth?.evidenceGrade).toBe('A');
  });
});
