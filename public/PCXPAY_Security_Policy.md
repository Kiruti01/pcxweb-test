## Introduction

PCX PAY Limited ("PCXPAY") takes the security of our platform, your data, and your funds seriously. This Security Policy describes the technical and organisational measures we implement to protect the PCXPAY platform and outlines the security responsibilities of all users.

This policy applies to all users of PCXPAY Services, including Business Users, Consumer Retail End-Users, Developer Users, and End-Users as defined in our [Terms and Conditions](/terms_and_conditions).

## Platform Security Measures

### Encryption

- All data transmitted between users and the PCXPAY platform is protected using SSL/TLS encryption with modern cipher suites
- Data at rest is encrypted using industry-standard algorithms
- All API endpoints enforce HTTPS-only connections; unencrypted connections are rejected

### Access Controls

- Role-based access control (RBAC) limits access to systems and data on a strict need-to-know basis
- Multi-factor authentication (MFA) is enforced for all administrative and privileged access
- Session management controls enforce automatic timeouts and secure token handling
- Access to production systems is logged, audited, and reviewed periodically

### Infrastructure Security

- Production systems are hosted in secure, certified data centres with restricted physical access
- Network segmentation isolates critical payment processing systems from general infrastructure
- Intrusion detection and prevention systems (IDS/IPS) monitor continuously for anomalous behaviour
- Web application firewalls (WAF) protect against common attack vectors including injection and scripting attacks

### Monitoring and Incident Response

- Continuous security monitoring of platform infrastructure and API endpoints
- Automated alerting for suspicious activity, failed authentication attempts, and anomalous transaction patterns
- Documented incident response procedures with defined escalation paths and recovery time objectives
- Post-incident reviews conducted to identify root causes and prevent recurrence

### Vulnerability Management

- Regular internal and third-party penetration testing of platform components
- Continuous vulnerability scanning of infrastructure, dependencies, and API surfaces
- Security patches applied within defined timeframes based on severity classification
- Responsible disclosure programme for independent security researchers

## API Security (Developer Users)

Developer Users integrating the PCXPAY API must implement the following security controls as a condition of their access.

### API Key Management

- Store API keys and secrets in secure vaults or secrets management services — never in source code, version control, configuration files, or client-side code
- Use separate API keys for sandbox and production environments
- Restrict each API key to the minimum permission scopes required for your integration
- Rotate API keys immediately upon suspected compromise, personnel changes, or as part of regular key rotation schedules

### Authentication and Session Security

- Enforce multi-factor authentication for all accounts with administrative access to your PCXPAY integration
- Implement secure token storage on your platform — do not store credentials in browser local storage or unprotected cookies
- Log all authentication attempts and API calls with timestamps, IP addresses, and outcome codes
- Implement rate limiting and request validation on your own platform to reduce abuse surface

### Reporting API Credential Compromise

If you suspect or confirm that your PCXPAY API credentials have been compromised:

1. Immediately rotate or revoke the affected credentials via your PCXPAY dashboard
2. Contact [info@pcxpay.com](mailto:info@pcxpay.com) with details of the suspected breach
3. Preserve all relevant logs and evidence
4. Cooperate fully with PCXPAY's incident response team during investigation and remediation

Delays in reporting suspected credential compromise may result in expanded liability under the [Terms and Conditions](/terms_and_conditions).

## User Responsibilities

All users share responsibility for the security of their accounts and transactions on the PCXPAY platform:

- Use strong, unique passwords and enable multi-factor authentication where available
- Never share account credentials, API keys, or one-time passcodes with any third party
- Log out of active sessions on shared or public devices
- Keep your registered contact information up to date so we can reach you in the event of a security incident
- Report suspicious activity, unrecognised transactions, or potential phishing attempts immediately to [info@pcxpay.com](mailto:info@pcxpay.com)
- Do not attempt to probe, scan, or test the security of PCXPAY systems without prior written authorisation

## Prohibited Technical Activities

The following activities are strictly prohibited and may result in immediate account suspension, termination, and legal action:

- Attempting to circumvent, bypass, or disable authentication or authorisation controls
- Using automated tools, scripts, or bots to interact with the platform or API without express written permission from PCXPAY
- Reverse engineering, decompiling, or attempting to extract source code or proprietary logic from the PCXPAY platform
- Conducting denial-of-service attacks or intentionally degrading platform performance for any user
- Exploiting discovered vulnerabilities rather than reporting them through our responsible disclosure process
- Creating multiple accounts or using false identities to evade security controls, transaction limits, or compliance requirements

## Data Security and Confidentiality

PCXPAY and Lightway Finance Limited maintain strict confidentiality controls over all user data:

- Access to personal and transaction data is restricted to authorised personnel with a documented business need
- All staff with access to sensitive data are subject to background checks and bound by confidentiality obligations
- Data processing activities are logged and subject to periodic internal and external audit
- Third-party processors are assessed for security compliance before engagement and are contractually bound to equivalent data protection standards

For full details on how we collect, use, retain, and protect your personal data, see our [Privacy Policy](/privacy-policy).

## Security Compliance

PCXPAY's security programme is aligned with the following standards and regulatory frameworks:

- **UK** — FCA operational resilience requirements and NCSC guidance on cyber security for financial services
- **Nigeria** — CBN Risk-Based Cybersecurity Framework and Guidelines for deposit money banks and payment service providers
- **Canada** — FINTRAC's compliance expectations and guidance for reporting entities
- **International** — ISO/IEC 27001 information security management principles
- **Data protection** — UK GDPR, Nigerian Data Protection Regulation (NDPR), and the Personal Information Protection and Electronic Documents Act (PIPEDA)

## Reporting a Security Vulnerability

If you believe you have identified a security vulnerability in the PCXPAY platform, we ask that you report it to us responsibly before any public disclosure:

- **Email:** [info@pcxpay.com](mailto:info@pcxpay.com)
- Include a clear description of the vulnerability, the steps required to reproduce it, and your assessment of the potential impact
- Do not exploit the vulnerability beyond what is necessary to confirm its existence
- Do not access, modify, or exfiltrate data belonging to other users during your research

We are committed to acknowledging receipt of your report within 48 hours and providing regular updates throughout our investigation and remediation process. We treat responsible disclosures seriously and will work with you in good faith.

## Contact

**Security incidents and vulnerability reports:**
[info@pcxpay.com](mailto:info@pcxpay.com)
Emergency security incidents are monitored around the clock.

**General support:**
[info@pcxpay.com](mailto:support@pcxpay.com)
Monday–Friday, 9:00 AM – 6:00 PM GMT

**Compliance and regulatory matters:**
[info@pcxpay.com](mailto:compliance@pcxpay.com)
