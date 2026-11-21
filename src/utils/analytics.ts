// src/utils/analytics.ts
/**
 * Privacy-first event telemetry and measurement taxonomy.
 * Compliant with India DPDP Act 2023 & GDPR principles (no PII, local aggregation).
 */

export type AnalyticsEvent =
  | { name: 'page_view'; tab: string }
  | { name: 'cta_click'; cta: string; category?: string; target?: string }
  | { name: 'action_toggle'; actionId: string; newState: boolean }
  | { name: 'schedule_alert'; channel: string; time: string }
  | { name: 'open_modal'; modalName: string }
  | { name: 'theme_change'; theme: 'light' | 'dark' }
  | { name: 'consent_updated'; consent: 'all' | 'essential' };

declare global {
  interface Window {
    dataLayer?: unknown[];
    __saans_events?: AnalyticsEvent[];
    saansTrack?: (event: AnalyticsEvent) => void;
  }
}

export function trackEvent(event: AnalyticsEvent) {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.__saans_events = window.__saans_events || [];

  window.__saans_events.push({
    ...event,
  });

  window.dataLayer.push({
    event: event.name,
    ...event,
    timestamp: new Date().toISOString(),
  });

  // Dispatch standard CustomEvent for audit detection
  window.dispatchEvent(
    new CustomEvent('saans:telemetry', { detail: event })
  );
}

// Global hook for inspection and audit verification
if (typeof window !== 'undefined') {
  window.saansTrack = trackEvent;
}
