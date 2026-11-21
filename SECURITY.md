# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

We take the security and privacy of Saans and our users seriously. If you discover a security vulnerability or weakness within this repository:

1. **Do not create a public GitHub issue.**
2. Report the vulnerability privately by opening a [GitHub Security Advisory](https://github.com/hinachisenju-del/saans/security/advisories/new) or emailing `security@saans.local`.
3. Provide a clear description of the vulnerability, reproduction steps, and impact.

### Response Time & SLA
- **Initial Acknowledgement**: Within 24 hours.
- **Triage & Assessment**: Within 48 hours.
- **Fix & Disclosure**: Within 7 business days.

## Security Architecture & Best Practices

- **Zero Personally Identifiable Information (PII)**: All health and household telemetry is processed locally on the client device.
- **Strict Content Security Policy (CSP)**: Disallows unauthorized script execution, frame embedding, and untrusted network origins.
- **Input Sanitization**: All user search queries and inputs pass through automated HTML escaping and control-character filtering (`src/utils/sanitize.ts`).
- **Dependency Auditing**: Automated continuous security scanning via GitHub CodeQL and `npm audit`.
