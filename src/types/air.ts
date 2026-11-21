// src/types/air.ts

export type SALBand = 0 | 1 | 2 | 3 | 4 | 5;

export interface SALInfo {
  level: SALBand;
  name: string;
  nameHi: string;
  color: string;
  shape: 'circle' | 'square' | 'triangle' | 'diamond' | 'hexagon' | 'octagon';
  shapeChar: string;
  generalRule: string;
  sensitiveRule: string;
  pm25Range: [number, number];
}

export type AQIBand = 'good' | 'satisfactory' | 'moderate' | 'poor' | 'very_poor' | 'severe';

export interface AirReading {
  pm25: number; // in µg/m³
  aqi: number; // IN-NAQI scale
  band: AQIBand;
  bandLabel: string;
  sal: SALBand;
  confidence: 'high' | 'medium' | 'low';
  stationDistanceKm: number;
  stationName: string;
  updatedAt: string;
  sources: string[];
  officialAdvisory?: {
    active: boolean;
    stageLabel: string; // e.g. "GRAP Stage IV (Severe+)"
    summary: string;
    url?: string;
  };
}

export interface HourlyForecast {
  hour: string; // e.g. "06:00"
  timeLabel: string; // e.g. "6 AM"
  pm25: number;
  aqi: number;
  sal: SALBand;
  isBestWindow?: boolean;
  eventNote?: string; // e.g. "School walk", "Commute"
}

export interface VentilationWindow {
  start: string; // "13:00"
  end: string;   // "15:00"
  recommendedDurationMin: number;
  avgPm25: number;
  benefitDescription: string;
}
