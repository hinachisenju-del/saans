// src/utils/sanitize.ts
/**
 * Security sanitization utilities to prevent Cross-Site Scripting (XSS),
 * script injection, and unsafe characters in user inputs.
 */

const HTML_ENTITY_MAP: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;',
  '`': '&#x60;',
};

/**
 * Escapes unsafe HTML characters in a string to prevent injection.
 * @param input Raw untrusted string
 * @returns Sanitized string safe for DOM interpolation
 */
export function sanitizeHtml(input: string): string {
  if (!input || typeof input !== 'string') return '';
  return input.replace(/[&<>"'`/]/g, (match) => HTML_ENTITY_MAP[match] || match).trim();
}

/**
 * Validates and normalizes user query strings.
 * Removes control characters and limits length to avoid denial of service.
 * @param input Raw search or prompt query
 * @param maxLength Maximum allowed character length (default 500)
 */
export function sanitizeQuery(input: string, maxLength: number = 500): string {
  if (!input || typeof input !== 'string') return '';
  // Strip control characters (ASCII 0-31, except newline and tab)
  const clean = Array.from(input)
    .filter((char) => {
      const code = char.charCodeAt(0);
      return (code >= 32 && code !== 127) || code === 9 || code === 10 || code === 13;
    })
    .join('');
  return sanitizeHtml(clean.slice(0, maxLength));
}

/**
 * Validates that an input is a safe positive integer within range.
 */
export function sanitizeNumeric(input: unknown, min: number = 0, max: number = 10000, fallback: number = 0): number {
  const num = Number(input);
  if (Number.isNaN(num) || !Number.isFinite(num)) {
    return fallback;
  }
  return Math.max(min, Math.min(max, num));
}
