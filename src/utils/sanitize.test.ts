// src/utils/sanitize.test.ts
import { describe, it, expect } from 'vitest';
import { sanitizeHtml, sanitizeQuery, sanitizeNumeric } from './sanitize';

describe('sanitize utilities', () => {
  describe('sanitizeHtml', () => {
    it('escapes dangerous HTML script tags and characters', () => {
      const dirty = '<script>alert("XSS")</script>';
      const clean = sanitizeHtml(dirty);
      expect(clean).not.toContain('<script>');
      expect(clean).toContain('&lt;script&gt;');
      expect(clean).toContain('&quot;XSS&quot;');
      expect(clean).toContain('&lt;&#x2F;script&gt;');
    });

    it('handles empty, null, or undefined gracefully', () => {
      expect(sanitizeHtml('')).toBe('');
      expect(sanitizeHtml(null as unknown as string)).toBe('');
      expect(sanitizeHtml(undefined as unknown as string)).toBe('');
    });
  });

  describe('sanitizeQuery', () => {
    it('strips non-printable ASCII control characters', () => {
      const textWithControl = 'Hello\x00World\x1F!';
      const clean = sanitizeQuery(textWithControl);
      expect(clean).toBe('HelloWorld!');
    });

    it('enforces maximum character length limit', () => {
      const longText = 'A'.repeat(600);
      const clean = sanitizeQuery(longText, 50);
      expect(clean.length).toBe(50);
    });
  });

  describe('sanitizeNumeric', () => {
    it('coerces valid numbers and enforces bounds', () => {
      expect(sanitizeNumeric('120', 0, 500)).toBe(120);
      expect(sanitizeNumeric(600, 0, 500)).toBe(500);
      expect(sanitizeNumeric(-10, 0, 500)).toBe(0);
    });

    it('falls back to default on invalid non-numeric inputs', () => {
      expect(sanitizeNumeric('abc', 0, 500, 25)).toBe(25);
      expect(sanitizeNumeric(NaN, 0, 500, 50)).toBe(50);
      expect(sanitizeNumeric(null, 0, 500, 0)).toBe(0);
    });
  });
});
