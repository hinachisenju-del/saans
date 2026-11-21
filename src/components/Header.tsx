// src/components/Header.tsx
import React from 'react';
import type { AirReading } from '../types/air';
import { SAL_SCALE } from '../engines/airQualityEngine';
import { Info, BarChart2, MessageSquareText, ShieldAlert, Sun, Moon } from 'lucide-react';

interface HeaderProps {
  air: AirReading;
  language: 'en' | 'hi';
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onLanguageChange: (lang: 'en' | 'hi') => void;
  onOpenSourceModal: () => void;
  onOpenLedgerModal: () => void;
  onOpenChannelModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  air,
  language,
  theme,
  onToggleTheme,
  onLanguageChange,
  onOpenSourceModal,
  onOpenLedgerModal,
  onOpenChannelModal,
}) => {
  const sal = SAL_SCALE[air.sal];

  return (
    <header className="sticky top-0 z-40 bg-paper-100/95 dark:bg-paper-dark100/95 backdrop-blur-md border-b border-paper-300 dark:border-paper-dark300 transition-colors">
      <div className="max-w-4xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
        {/* Brand */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-teal-brand dark:bg-teal-darkBrand flex items-center justify-center text-paper-50 dark:text-ink-deep shadow-paper">
            <span className="font-bold text-sm tracking-tight">सां</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="font-bold text-ink-deep dark:text-ink-darkDeep text-lg leading-tight tracking-tight">
                {language === 'en' ? 'Saans' : 'सांस'}
              </h1>
              <span className="text-xs text-ink-quiet dark:text-ink-darkQuiet font-normal px-1.5 py-0.5 rounded bg-paper-200 dark:bg-paper-dark200">
                {language === 'en' ? 'Delhi-NCR' : 'दिल्ली-एनसीआर'}
              </span>
              <span className="text-[10px] font-bold text-teal-brand dark:text-teal-darkBrand px-1.5 py-0.5 rounded bg-teal-subtle dark:bg-teal-darkSubtle border border-teal-brand/20 hidden sm:inline">
                ₹0 Free
              </span>
            </div>
          </div>
        </div>

        {/* Persistent Air Now Chip */}
        <button
          onClick={onOpenSourceModal}
          data-cta="header-air-sources-chip"
          data-category="monitoring"
          data-action="open-sources"
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-paper-50 dark:bg-paper-dark200 border border-paper-300 dark:border-paper-darkBorder hover:border-ink-quiet dark:hover:border-paper-dark400 shadow-sm transition-all text-left group"
          title="Click to view air monitoring sources & calculation confidence"
        >
          {/* SAL Shape Indicator */}
          <span
            className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[10px] text-white font-bold transition-transform group-hover:scale-110 shadow-sm"
            style={{ backgroundColor: sal.color }}
          >
            {sal.shapeChar}
          </span>

          <div className="flex items-baseline gap-1.5">
            <span className="font-extrabold text-sm tabular-nums text-ink-deep dark:text-ink-darkDeep">
              {air.aqi}
            </span>
            <span className="text-xs font-semibold" style={{ color: sal.color }}>
              {language === 'en' ? sal.name : sal.nameHi}
            </span>
            <span className="text-[11px] text-ink-quiet dark:text-ink-darkQuiet hidden sm:inline tabular-nums">
              ({air.pm25} µg/m³)
            </span>
          </div>

          <Info className="w-3.5 h-3.5 text-ink-quiet dark:text-ink-darkQuiet opacity-60 group-hover:opacity-100 transition-opacity ml-0.5" />
        </button>

        {/* Primary Header CTA - Immediate Above The Fold Conversion */}
        <div className="flex items-center gap-2">
          <a
            href="#booking-tool"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('booking-tool')?.scrollIntoView({ behavior: 'smooth' });
            }}
            data-cta="header-primary-alert-cta"
            className="px-3 sm:px-4 py-1.5 rounded-full bg-teal-brand dark:bg-teal-darkBrand hover:opacity-90 text-white font-black text-xs shadow-md transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 flex-shrink-0 cursor-pointer"
            title="Schedule Free Daily Alerts"
          >
            <span>{language === 'en' ? 'Get Free Alerts →' : 'मुफ्त अलर्ट →'}</span>
          </a>
        </div>

        {/* Utility Actions */}
        <div className="flex items-center gap-1">
          {/* Theme Switcher Toggle */}
          <button
            onClick={onToggleTheme}
            data-cta="header-toggle-theme"
            data-category="customization"
            data-action="toggle-theme"
            className="p-1.5 rounded-lg text-ink-muted dark:text-ink-darkMuted hover:text-ink-deep dark:hover:text-ink-darkDeep hover:bg-paper-200 dark:hover:bg-paper-dark200 transition-colors"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-4 h-4 text-ink-muted hover:-rotate-12 transition-transform" />
            )}
          </button>

          {/* Channel Previews */}
          <button
            onClick={onOpenChannelModal}
            data-cta="header-open-channels"
            data-category="engagement"
            data-action="open-modal"
            className="p-1.5 rounded-lg text-ink-muted dark:text-ink-darkMuted hover:text-ink-deep dark:hover:text-ink-darkDeep hover:bg-paper-200 dark:hover:bg-paper-dark200 transition-colors"
            title="Preview WhatsApp, SMS & Voice IVR channels"
          >
            <MessageSquareText className="w-4 h-4" />
          </button>

          {/* Clean Air Ledger */}
          <button
            onClick={onOpenLedgerModal}
            data-cta="header-open-ledger"
            data-category="engagement"
            data-action="open-modal"
            className="p-1.5 rounded-lg text-ink-muted dark:text-ink-darkMuted hover:text-ink-deep dark:hover:text-ink-darkDeep hover:bg-paper-200 dark:hover:bg-paper-dark200 transition-colors"
            title="Open Weekly Clean Air Ledger"
          >
            <BarChart2 className="w-4 h-4" />
          </button>

          {/* Language Switcher */}
          <button
            onClick={() => onLanguageChange(language === 'en' ? 'hi' : 'en')}
            data-cta="header-toggle-language"
            data-category="customization"
            data-action="toggle-language"
            className="px-2 py-1 text-xs font-semibold rounded-md border border-paper-300 dark:border-paper-dark300 bg-paper-50 dark:bg-paper-dark200 hover:bg-paper-200 dark:hover:bg-paper-dark300 text-ink-deep dark:text-ink-darkDeep transition-all"
          >
            {language === 'en' ? 'हिन्दी' : 'English'}
          </button>
        </div>
      </div>

      {/* Official Advisory Banner (if active) */}
      {air.officialAdvisory?.active && (
        <div className="bg-[#481212] dark:bg-[#380e0e] text-amber-100 px-4 py-1.5 text-xs font-medium border-t border-b border-red-900/60 flex items-center justify-between">
          <div className="max-w-4xl mx-auto w-full flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0 animate-pulse" />
            <span className="font-bold uppercase tracking-wide text-amber-300">
              {air.officialAdvisory.stageLabel}:
            </span>
            <span className="truncate opacity-95 text-[11px] sm:text-xs">
              {air.officialAdvisory.summary}
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
