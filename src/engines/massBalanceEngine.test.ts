// src/engines/massBalanceEngine.test.ts
import { describe, it, expect } from 'vitest';
import { calculateIndoorPm25, type MassBalanceInput } from './massBalanceEngine';
import type { Room } from '../types/household';

describe('massBalanceEngine', () => {
  const defaultRoom: Room = {
    id: 'room_bedroom',
    name: 'Master Bedroom',
    type: 'master_bed',
    areaM2: 20,
    heightM: 2.8,
    windowsCount: 2,
    windowOpen: false,
    isSealed: true,
    hasPurifier: true,
    purifierCadrM3h: 300,
    purifierPower: 'high',
    hasExhaust: false,
    currentPm25: 35,
  };

  it('calculates significant indoor PM2.5 reduction in a sealed room with purifier on high', () => {
    const input: MassBalanceInput = {
      room: defaultRoom,
      outdoorPm25: 250,
      cookingActive: false,
      filterAgeDays: 30,
    };

    const result = calculateIndoorPm25(input);
    expect(result.steadyStatePm25).toBeLessThan(40);
    expect(result.protectionPercentage).toBeGreaterThanOrEqual(80);
    expect(result.achPurifier).toBeGreaterThan(4);
    expect(result.totalLossRatePerH).toBeGreaterThan(result.achAirExchange);
  });

  it('reflects high indoor pollution when windows are wide open during severe outdoor smog', () => {
    const openWindowRoom: Room = {
      ...defaultRoom,
      windowOpen: true,
      isSealed: false,
      hasPurifier: false,
    };

    const input: MassBalanceInput = {
      room: openWindowRoom,
      outdoorPm25: 300,
      cookingActive: false,
    };

    const result = calculateIndoorPm25(input);
    expect(result.achAirExchange).toBe(4.2);
    expect(result.steadyStatePm25).toBeGreaterThan(200);
    expect(result.protectionPercentage).toBeLessThan(30);
  });

  it('models indoor emission spike from cooking without exhaust ventilation', () => {
    const kitchenNoExhaust: Room = {
      ...defaultRoom,
      type: 'kitchen',
      hasExhaust: false,
      hasPurifier: false,
    };

    const input: MassBalanceInput = {
      room: kitchenNoExhaust,
      outdoorPm25: 100,
      cookingActive: true,
    };

    const result = calculateIndoorPm25(input);
    // Cooking adds 16,000 ug/h emission in unventilated kitchen
    expect(result.steadyStatePm25).toBeGreaterThan(300);
  });

  it('accounts for HEPA filter age derating after 90 days', () => {
    const freshInput: MassBalanceInput = {
      room: defaultRoom,
      outdoorPm25: 200,
      filterAgeDays: 10,
    };
    const agedInput: MassBalanceInput = {
      room: defaultRoom,
      outdoorPm25: 200,
      filterAgeDays: 120,
    };

    const freshResult = calculateIndoorPm25(freshInput);
    const agedResult = calculateIndoorPm25(agedInput);

    expect(agedResult.achPurifier).toBeLessThan(freshResult.achPurifier);
    expect(agedResult.steadyStatePm25).toBeGreaterThanOrEqual(freshResult.steadyStatePm25);
  });
});
