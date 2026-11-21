// src/utils/analytics.test.ts
import { describe, it, expect, beforeEach } from 'vitest';
import { trackEvent, type AnalyticsEvent } from './analytics';

describe('analytics telemetry', () => {
  beforeEach(() => {
    // Reset global dataLayer
    window.dataLayer = [];
    window.__saans_events = [];
  });

  it('records events in local privacy data structures without PII', () => {
    const event: AnalyticsEvent = {
      name: 'cta_click',
      cta: 'View Action Ledger',
      category: 'navigation',
    };

    trackEvent(event);

    expect(window.__saans_events).toHaveLength(1);
    expect(window.__saans_events?.[0].name).toBe('cta_click');
    expect(window.dataLayer).toHaveLength(1);
  });

  it('tracks page view tab navigation', () => {
    const event: AnalyticsEvent = {
      name: 'page_view',
      tab: 'plan',
    };

    trackEvent(event);

    expect(window.dataLayer?.[0]).toMatchObject({
      event: 'page_view',
      tab: 'plan',
    });
  });
});
