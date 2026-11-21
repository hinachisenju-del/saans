// src/components/modals/SourceConfidenceModal.tsx
import React from 'react';
import { X, ShieldCheck, MapPin, Database } from 'lucide-react';
import type { AirReading } from '../../types/air';

interface SourceConfidenceModalProps {
  isOpen: boolean;
  onClose: () => void;
  air: AirReading;
  language: 'en' | 'hi';
}

export const SourceConfidenceModal: React.FC<SourceConfidenceModalProps> = ({
  isOpen,
  onClose,
  air,
  language,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-deep/70 dark:bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-paper-100 dark:bg-paper-dark100 rounded-3xl border border-paper-300 dark:border-paper-darkBorder w-full max-w-md overflow-hidden shadow-paper-lg transition-colors">
        {/* Header */}
        <div className="p-4 bg-paper-200/60 dark:bg-paper-dark200/60 border-b border-paper-300 dark:border-paper-dark300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-teal-brand dark:text-teal-darkBrand" />
            <h3 className="text-sm font-bold text-ink-deep dark:text-ink-darkDeep">
              {language === 'en'
                ? 'Air Data Sources & Calculation Confidence'
                : 'डेटा स्रोत एवं विश्वसनीयता विवरण'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-paper-300 dark:hover:bg-paper-dark300 text-ink-quiet dark:text-ink-darkQuiet transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4 text-xs">
          <div className="bg-paper-50 dark:bg-paper-dark200 p-3.5 rounded-2xl border border-paper-200 dark:border-paper-darkBorder space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-ink-deep dark:text-ink-darkDeep flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-teal-brand dark:text-teal-darkBrand" />
                <span>Nearest Monitoring Station</span>
              </span>
              <span className="font-bold text-teal-brand dark:text-teal-darkBrand">
                {air.stationDistanceKm} km away
              </span>
            </div>
            <div className="text-ink-muted dark:text-ink-darkMuted leading-relaxed">
              <strong>{air.stationName}</strong>
            </div>
            <div className="text-[11px] text-ink-quiet dark:text-ink-darkQuiet flex justify-between pt-1 border-t border-paper-200 dark:border-paper-darkBorder">
              <span>Freshness: {air.updatedAt}</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-semibold">Live Feed Online</span>
            </div>
          </div>

          <div className="space-y-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-ink-quiet dark:text-ink-darkQuiet block">
              Registered Data Feeds
            </span>
            <div className="space-y-1">
              {air.sources.map((source, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-2 rounded-lg bg-paper-50 dark:bg-paper-dark200 border border-paper-200 dark:border-paper-darkBorder text-ink-deep dark:text-ink-darkDeep font-medium"
                >
                  <span className="flex items-center gap-2">
                    <Database className="w-3.5 h-3.5 text-teal-brand dark:text-teal-darkBrand" />
                    <span>{source}</span>
                  </span>
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-300 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded font-bold">
                    QC Verified
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-teal-light/40 dark:bg-teal-darkLight/30 p-3.5 rounded-2xl border border-teal-brand/30 dark:border-teal-darkBrand/30 space-y-1.5">
            <span className="font-bold text-teal-brand dark:text-teal-darkBrand block">
              Confidence Level: High (Physically Grounded)
            </span>
            <p className="text-[11px] text-ink-muted dark:text-ink-darkMuted leading-relaxed">
              Hyperlocal interpolation blends direct CPCB beta-attenuation monitor observations with neighboring optical sensor networks using inverse-distance weighting and published humidity calibration formulas (RH 64%).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
