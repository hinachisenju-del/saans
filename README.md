# Saans (साँस) — Hyperlocal Air Quality Assistant

Real-time air quality tracking, personalized health guidance, and physics-based indoor modeling for Indian urban centers.

Live Website Demo: https://4d154099b7ef3c.app.lhr.life/

## Verified Audit Achievements
- SiteSpeakAI: **98 / 100** (Design: 100%, SEO: 100%, Content: 100%, AI Readiness: 100%, Performance: 90%) — [View Report](https://sitespeak.ai/tools/rate-my-website/dfba3fc2-5d25-482c-ba55-221221963869/share)
- RateMySite.io: **91 / 100 (Grade A)** (Best Practices: 100%, On-Page SEO: 100%, Mobile: 100%, Performance: 97%)
- DotPlus SEO Audit: **95% (Grade A+)** with 0 Errors & 63 Passed Checks


## Testing
Saans includes an automated test suite covering all calculation engines and safety features:
- 43 automated unit tests passing across 7 test suites
- Vitest and Happy-DOM integration
- Run tests: `npm test`

## Architecture & Features
- Simple Action Level (SAL) Engine (`src/engines/airQualityEngine.ts`): Translates raw NAQI breakpoints into 6 actionable categories.
- Single-Room Mass Balance Engine (`src/engines/massBalanceEngine.ts`): Models air exchange, particle infiltration, and HEPA filtration.
- Inhaled Dose Engine (`src/engines/inhaledDoseEngine.ts`): Calculates particulate lung deposition based on minute ventilation and mask type.
- Clinical Red-Flag Safety Engine (`src/engines/safetyEngine.ts`): Bilingual detection of severe respiratory emergency symptoms.
- Security and Sanitization (`src/utils/sanitize.ts`): HTML escaping and input filtering.

## Setup & Running
```bash
npm install
npm test
npm run lint
npm run build
```
