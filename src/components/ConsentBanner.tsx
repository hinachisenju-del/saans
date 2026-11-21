// src/components/ConsentBanner.tsx
import React, { useState, useEffect } from 'react';
import { Cookie, Check } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

export const ConsentBanner: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [essentialOnly, setEssentialOnly] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('saans_consent_status');
    if (!consent) {
      // Small timeout so it doesn't flicker on initial render
      const timer = setTimeout(() => setIsOpen(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('saans_consent_status', 'granted_all');
    trackEvent({ name: 'consent_updated', consent: 'all' });
    setIsOpen(false);
  };

  const handleEssentialOnly = () => {
    localStorage.setItem('saans_consent_status', 'essential_only');
    trackEvent({ name: 'consent_updated', consent: 'essential' });
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <aside
      aria-label="Privacy & Consent Preferences"
      data-cmp="consent-management-platform"
      data-vendor="saans-privacy-shield"
      className="fixed bottom-16 sm:bottom-4 left-4 right-4 max-w-lg mx-auto z-50 bg-paper-100 dark:bg-paper-dark100 border border-paper-300 dark:border-paper-darkBorder rounded-2xl p-4 shadow-xl text-ink-deep dark:text-ink-darkDeep transition-all animate-fade-in text-xs"
    >
      <div className="flex items-start gap-3">
        <div className="p-2 bg-teal-subtle dark:bg-teal-darkSubtle rounded-xl text-teal-brand dark:text-teal-darkBrand flex-shrink-0">
          <Cookie className="w-5 h-5" />
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-ink-deep dark:text-ink-darkDeep flex items-center gap-1.5">
              <span>Privacy & Consent Choices</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-teal-brand dark:bg-teal-darkBrand text-white">
                DPDP Act 2023
              </span>
            </h4>
          </div>

          <p className="text-ink-deep dark:text-ink-darkDeep font-medium leading-relaxed text-[11px]">
            Saans does not sell your data or serve commercial advertisements. We use privacy-preserving, zero-cookie telemetry solely to measure smog alert delivery reliability and ensure clinical circuit breaker uptime.
          </p>

          {showPreferences && (
            <div className="p-2.5 bg-paper-50 dark:bg-paper-dark200 rounded-xl border border-paper-200 dark:border-paper-darkBorder space-y-2 text-[11px]">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="font-medium text-ink-deep dark:text-ink-darkDeep">
                  Essential Safety & Physics Telemetry
                </span>
                <input
                  type="checkbox"
                  checked
                  disabled
                  className="rounded text-teal-brand dark:bg-paper-dark100"
                />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <span className="font-medium text-ink-muted dark:text-ink-darkMuted">
                  Anonymous Performance & UX Optimization
                </span>
                <input
                  type="checkbox"
                  checked={!essentialOnly}
                  onChange={(e) => setEssentialOnly(!e.target.checked)}
                  className="rounded text-teal-brand"
                />
              </label>
            </div>
          )}

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              onClick={handleAcceptAll}
              data-cta="consent-accept-all"
              data-category="consent"
              data-action="accept"
              className="px-3.5 py-1.5 bg-teal-brand hover:bg-teal-dark text-white font-bold rounded-xl text-xs transition-colors shadow-sm flex items-center gap-1"
            >
              <Check className="w-3.5 h-3.5" />
              Accept All
            </button>
            <button
              onClick={handleEssentialOnly}
              data-cta="consent-essential-only"
              data-category="consent"
              data-action="essential"
              className="px-3 py-1.5 bg-paper-200 dark:bg-paper-dark200 hover:bg-paper-300 dark:hover:bg-paper-dark300 text-ink-deep dark:text-ink-darkDeep font-bold rounded-xl text-xs transition-colors border border-paper-300 dark:border-paper-darkBorder"
            >
              Essential Only
            </button>
            <button
              onClick={() => setShowPreferences(!showPreferences)}
              data-cta="consent-toggle-prefs"
              data-category="consent"
              data-action="customize"
              className="px-2 py-1.5 text-ink-deep dark:text-ink-darkDeep hover:underline font-bold text-[11px] ml-auto"
            >
              {showPreferences ? 'Hide Options' : 'Preferences'}
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};
