// src/engines/massBalanceEngine.ts
import type { Room } from '../types/household';

export interface MassBalanceInput {
  room: Room;
  outdoorPm25: number;
  cookingActive?: boolean;
  filterAgeDays?: number;
}

export interface MassBalanceOutput {
  steadyStatePm25: number;
  achAirExchange: number;
  achPurifier: number;
  totalLossRatePerH: number;
  protectionPercentage: number;
  tintOpacity: number;
}

export function calculateIndoorPm25(input: MassBalanceInput): MassBalanceOutput {
  const { room, outdoorPm25, cookingActive = false, filterAgeDays = 30 } = input;
  const volumeM3 = Math.max(10, room.areaM2 * room.heightM);

  let lambda = 0.6;
  if (room.windowOpen) {
    lambda = 4.2;
  } else if (room.isSealed) {
    lambda = 0.28;
  }

  const pPen = room.isSealed ? 0.65 : 0.85;
  const kDeposition = 0.25;

  let effectiveCadr = 0;
  if (room.hasPurifier && room.purifierPower !== 'off') {
    const baseCadr = room.purifierCadrM3h || 250;
    const powerMultiplier = 
      room.purifierPower === 'high' ? 1.0 :
      room.purifierPower === 'med' ? 0.65 : 0.35;
    
    const ageDerate = filterAgeDays > 90 ? 0.85 : 0.98;
    effectiveCadr = baseCadr * powerMultiplier * ageDerate;
  }

  const achPurifier = effectiveCadr / volumeM3;

  let sIndoorUgPerHour = 0;
  if (room.type === 'kitchen' || cookingActive) {
    sIndoorUgPerHour = room.hasExhaust ? 3500 : 16000;
  }

  const totalLossRate = lambda + kDeposition + achPurifier;
  const numerator = (pPen * lambda * outdoorPm25) + (sIndoorUgPerHour / volumeM3);
  const steadyState = Math.max(5, Math.round(numerator / totalLossRate));
  const protection = Math.max(0, Math.min(100, Math.round(((outdoorPm25 - steadyState) / outdoorPm25) * 100)));
  const tintOpacity = Math.max(0.08, Math.min(0.72, 0.08 + (steadyState / 350) * 0.64));

  return {
    steadyStatePm25: steadyState,
    achAirExchange: parseFloat(lambda.toFixed(2)),
    achPurifier: parseFloat(achPurifier.toFixed(2)),
    totalLossRatePerH: parseFloat(totalLossRate.toFixed(2)),
    protectionPercentage: protection,
    tintOpacity: parseFloat(tintOpacity.toFixed(3)),
  };
}
