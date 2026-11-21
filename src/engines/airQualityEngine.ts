// src/engines/airQualityEngine.ts
import type { SALBand, SALInfo, AQIBand } from '../types/air';

export const SAL_SCALE: Record<SALBand, SALInfo> = {
  0: {
    level: 0,
    name: 'Clear',
    nameHi: 'साफ़',
    color: '#2E7D73', // Cool pale blue-green
    shape: 'circle',
    shapeChar: '●',
    generalRule: 'Normal routine. Air is clean.',
    sensitiveRule: 'Normal outdoor activities.',
    pm25Range: [0, 15],
  },
  1: {
    level: 1,
    name: 'Watch',
    nameHi: 'निगरानी',
    color: '#6B8E23', // Soft yellow-green
    shape: 'square',
    shapeChar: '■',
    generalRule: 'Reduce prolonged intense outdoor exercise.',
    sensitiveRule: 'Take more breaks during outdoor play.',
    pm25Range: [16, 35],
  },
  2: {
    level: 2,
    name: 'Careful',
    nameHi: 'सतर्क',
    color: '#C88719', // Warm amber
    shape: 'triangle',
    shapeChar: '▲',
    generalRule: 'Shorten outdoor time; prefer midday hours.',
    sensitiveRule: 'Shift morning walks indoors.',
    pm25Range: [36, 60],
  },
  3: {
    level: 3,
    name: 'Protect',
    nameHi: 'बचाव',
    color: '#D35400', // Burnt orange
    shape: 'diamond',
    shapeChar: '◆',
    generalRule: 'Avoid outdoor exertion. Wear N95 outdoors.',
    sensitiveRule: 'Stay indoors; run purifier; skip outdoor sports.',
    pm25Range: [61, 120],
  },
  4: {
    level: 4,
    name: 'Shelter',
    nameHi: 'आश्रय',
    color: '#B03A2E', // Deep brick red
    shape: 'hexagon',
    shapeChar: '⬢',
    generalRule: 'Stay indoors. Run clean room. N95 for essential outings.',
    sensitiveRule: 'Strictly remain indoors. Check on vulnerable elders.',
    pm25Range: [121, 250],
  },
  5: {
    level: 5,
    name: 'Emergency',
    nameHi: 'आपातकाल',
    color: '#641E16', // Dark maroon
    shape: 'octagon',
    shapeChar: '🛑',
    generalRule: 'Stay in sealed clean room. Avoid any outdoor exposure.',
    sensitiveRule: 'Emergency precautions. Keep rescue inhalers at hand.',
    pm25Range: [251, 999],
  },
};

export function pm25ToNaqi(pm25: number): { aqi: number; band: AQIBand; bandLabel: string } {
  let aqi: number;
  let band: AQIBand;
  let bandLabel: string;

  if (pm25 <= 30) {
    aqi = Math.round((50 / 30) * pm25);
    band = 'good';
    bandLabel = 'Good';
  } else if (pm25 <= 60) {
    aqi = Math.round(50 + ((100 - 50) / (60 - 30)) * (pm25 - 30));
    band = 'satisfactory';
    bandLabel = 'Satisfactory';
  } else if (pm25 <= 90) {
    aqi = Math.round(100 + ((200 - 100) / (90 - 60)) * (pm25 - 60));
    band = 'moderate';
    bandLabel = 'Moderate';
  } else if (pm25 <= 120) {
    aqi = Math.round(200 + ((300 - 200) / (120 - 90)) * (pm25 - 90));
    band = 'poor';
    bandLabel = 'Poor';
  } else if (pm25 <= 250) {
    aqi = Math.round(300 + ((400 - 300) / (250 - 120)) * (pm25 - 120));
    band = 'very_poor';
    bandLabel = 'Very Poor';
  } else {
    aqi = Math.min(500, Math.round(400 + ((500 - 400) / (380 - 250)) * (pm25 - 250)));
    band = 'severe';
    bandLabel = 'Severe';
  }

  return { aqi, band, bandLabel };
}

export function calculateSal(pm25: number, hasSensitiveMember: boolean = false): SALBand {
  let sal: SALBand = 0;
  if (pm25 <= 15) sal = 0;
  else if (pm25 <= 35) sal = 1;
  else if (pm25 <= 60) sal = 2;
  else if (pm25 <= 120) sal = 3;
  else if (pm25 <= 250) sal = 4;
  else sal = 5;

  if (hasSensitiveMember && sal < 5) {
    sal = (sal + 1) as SALBand;
  }

  return sal;
}
