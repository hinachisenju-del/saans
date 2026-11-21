// src/components/modals/CleanAirLedgerModal.tsx
import React from 'react';
import { X, BarChart2, Heart, Leaf } from 'lucide-react';

interface CleanAirLedgerModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: 'en' | 'hi';
}

export const CleanAirLedgerModal: React.FC<CleanAirLedgerModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-deep/70 dark:bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-paper-100 dark:bg-paper-dark100 rounded-3xl border border-paper-300 dark:border-paper-darkBorder w-full max-w-md overflow-hidden shadow-paper-lg transition-colors">
        {/* Header */}
        <div className="p-4 bg-paper-200/60 dark:bg-paper-dark200/60 border-b border-paper-300 dark:border-paper-dark300 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-teal-brand dark:text-teal-darkBrand" />
            <h3 className="text-sm font-bold text-ink-deep dark:text-ink-darkDeep">
              {language === 'en'
                ? 'Your Clean Air Ledger'
                : 'साप्ताहिक स्वच्छ वायु बहीखाता'}
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
        <div className="p-5 space-y-4">
          <div className="p-4 bg-teal-light/50 dark:bg-teal-darkLight/40 border border-teal-brand/30 dark:border-teal-darkBrand/30 rounded-2xl">
            <span className="text-[11px] font-bold text-teal-brand dark:text-teal-darkBrand uppercase tracking-wider block mb-1">
              {language === 'en' ? 'Weekly Impact Summary' : 'साप्ताहिक असर'}
            </span>
            <p className="text-sm font-medium text-ink-deep dark:text-ink-darkDeep leading-relaxed">
              {language === 'en'
                ? '“This week your family spent roughly 6 fewer hours breathing severe winter smog. Kabir’s bedroom purifier and your 1:30 PM ventilation timing did most of the work.”'
                : '“इस सप्ताह आपके परिवार ने लगभग 6 घंटे कम जहरीली हवा में सांस ली। बच्चों के कमरे के प्यूरीफायर और दोपहर 1:30 बजे की हवा बदलने की आदत ने सबसे बड़ा योगदान दिया।”'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-paper-50 dark:bg-paper-dark200 rounded-xl border border-paper-200 dark:border-paper-dark300 space-y-1">
              <span className="text-[10px] font-bold text-ink-quiet dark:text-ink-darkQuiet uppercase flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-sal-4" />
                <span>Exposure Avoided</span>
              </span>
              <div className="text-xl font-black text-ink-deep dark:text-ink-darkDeep tabular-nums">
                ~420 µg·h
              </div>
              <span className="text-[10px] text-ink-muted dark:text-ink-darkMuted">
                ~68% reduction in inhaled particulate dose
              </span>
            </div>

            <div className="p-3 bg-paper-50 dark:bg-paper-dark200 rounded-xl border border-paper-200 dark:border-paper-dark300 space-y-1">
              <span className="text-[10px] font-bold text-ink-quiet dark:text-ink-darkQuiet uppercase flex items-center gap-1">
                <Leaf className="w-3.5 h-3.5 text-teal-brand dark:text-teal-darkBrand" />
                <span>Emissions Avoided</span>
              </span>
              <div className="text-xl font-black text-teal-brand dark:text-teal-darkBrand tabular-nums">
                2.4 kg CO₂
              </div>
              <span className="text-[10px] text-ink-muted dark:text-ink-darkMuted">
                Metro transit vs 2-wheeler commute
              </span>
            </div>
          </div>

          <div className="bg-paper-50 dark:bg-paper-dark200 p-3.5 rounded-xl border border-paper-200 dark:border-paper-dark300 text-xs space-y-2">
            <div className="flex justify-between font-bold text-ink-deep dark:text-ink-darkDeep">
              <span>Completed Protective Actions</span>
              <span className="text-teal-brand dark:text-teal-darkBrand">18 of 21 (86%)</span>
            </div>
            <div className="w-full bg-paper-200 dark:bg-paper-dark300 h-2 rounded-full overflow-hidden">
              <div className="bg-teal-brand dark:bg-teal-darkBrand h-full rounded-full w-[86%]" />
            </div>
            <div className="text-[11px] text-ink-muted dark:text-ink-darkMuted flex justify-between pt-1">
              <span>Bedroom sealed: 7 nights</span>
              <span>N95 fit-checked: 10 outings</span>
            </div>
          </div>

          <p className="text-[10px] text-ink-quiet dark:text-ink-darkQuiet leading-relaxed text-center italic">
            *All calculations use single-zone indoor mass-balance physics and minute ventilation dose models based on Anand Vihar CPCB station readings, not direct clinical measurements.
          </p>
        </div>
      </div>
    </div>
  );
};
