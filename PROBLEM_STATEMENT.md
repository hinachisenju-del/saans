# Problem Statement & Solution Architecture

## 1. Problem Statement

Across urban centers in India (Delhi NCR, Mumbai, Kolkata, Lucknow, Patna), ambient air pollution routinely reaches severe and hazardous categories, with particulate matter ($PM_{2.5}$) levels frequently exceeding $250\text{--}400\,\mu\text{g/m}^3$ during winter temperature inversions — up to **20 to 30 times higher than World Health Organization (WHO) annual guidelines**.

Despite the availability of raw Air Quality Index (AQI) values from continuous ambient air monitoring stations (CAAQMS), urban residents face critical operational gaps:

1. **The Actionability Gap**: Generic numbers (e.g. "AQI 342") lack context. Citizens do not know whether a child can participate in outdoor physical education, whether an elderly person can take their evening walk, or what specific protective mask actually filters hazardous particulates.
2. **The Indoor Exposure Blindspot**: Over 80% of urban time is spent indoors. Without physical modeling, households misunderstand indoor air quality, erroneously opening windows during peak smog spikes or assuming decorative indoor plants eliminate particulate soot.
3. **The Inhaled Dose Neglect**: Exposure is not merely atmospheric concentration; it is the physical mass of toxic particulate deposited into alveolar tissue, determined by minute ventilation rate ($V_E$), duration of physical exertion, and mask leakage factors.
4. **Clinical Emergency Delay**: Acute respiratory distress triggered by air pollution exacerbations (COPD, severe pediatric wheezing, asthma exacerbations) is often misdiagnosed as routine seasonal cough, delaying critical emergency room admission.

---

## 2. Target Beneficiaries & User Personas

| User Persona | Unique Vulnerability | Core Need Addressed by Saans |
| :--- | :--- | :--- |
| **Parents of Young Children** | Pediatric airways have higher ventilation per kg of body weight; standard adult N95 masks leak around small nasal bridges. | Pediatric-adjusted minute ventilation models and dedicated child safety guidance. |
| **Elderly & Chronic Respiratory Patients** | High susceptibility to acute cardiac and COPD exacerbations. | Dynamic Simple Action Level (SAL) alerts and automated clinical red-flag triage. |
| **Outdoor Commuters & Athletes** | High physical exertion increases minute ventilation from $7\,\text{L/min}$ up to $35\,\text{L/min}$, multiplying inhaled toxic dose five-fold. | Optimal commute and exercise window planning with avoided dose calculations. |
| **Budget-Conscious Households** | Commercial purifiers can be cost-prohibitive. | Actionable guidance on single-room clean-room containment, window sealing, and affordable filter maintenance. |

---

## 3. The Saans Solution Architecture

Saans bridges these gaps through four core deterministic modeling engines:

### A. Simple Action Level (SAL) Engine (`airQualityEngine.ts`)
Translates raw National Air Quality Index (NAQI) breakpoints into 6 unambiguous, color- and symbol-coded action tiers (Level 0: Clear to Level 5: Emergency). Automatically elevates precautions by one tier if a sensitive household member is present.

### B. Single-Room Mass Balance Engine (`massBalanceEngine.ts`)
Implements a first-principles continuous physical mass-balance model to forecast indoor $PM_{2.5}$ concentration:

$$C_{in} = \frac{p \cdot \lambda \cdot C_{out} + \frac{S}{V}}{\lambda + k_{dep} + \frac{\text{CADR}_{eff}}{V}}$$

- $\lambda$: Air exchange rate ($h^{-1}$), dynamically adjusted for open windows ($4.2\,h^{-1}$) vs sealed rooms ($0.28\,h^{-1}$).
- $p$: Penetration factor through building envelope ($0.65\text{--}0.85$).
- $S$: Indoor generation rate (e.g. unventilated cooking adding $16,000\,\mu\text{g/h}$).
- $\text{CADR}_{eff}$: Clean Air Delivery Rate of HEPA filtration derated by fan speed and filter age.

### C. Inhaled Dose & Avoided Risk Engine (`inhaledDoseEngine.ts`)
Calculates actual particulate mass deposited in lung tissue ($\mu\text{g}$) across activity segments:

$$\text{Dose} = C_{exp} \cdot V_E \cdot t \cdot (1 - \eta_{mask})$$

- Directly demonstrates avoided lung burden ($\mu\text{g}$ and $\%$ reduction) achieved by wearing certified N95 respirators or relocating to filtered indoor rooms.

### D. Bilingual Clinical Red-Flag Safety Engine (`safetyEngine.ts`)
Continuously monitors user queries for severe respiratory emergencies in both English and Hindi transliteration (*"saans phool rahi"*, *"chhati me dard"*, *"blue lips"*, *"infant fast breathing"*), immediately overriding standard advice with urgent 112/102 emergency instructions.

### E. Evidence-Grade Debunked Myth Library (`mythLibrary.ts`)
Provides scientific Grade-A citations refuting hazardous air pollution misconceptions, including steam inhalation risks and decorative plant fallacies.

---

## 4. Alignment Summary

Every feature in Saans directly resolves a documented public health barrier identified in urban air quality management, transforming abstract environmental statistics into life-saving, daily human actions.
