/**
 * SOC-2 / GDPR Cryptographic PII Masking & Redaction Engine
 */

export class PIIMaskingVault {
  public maskCreditCard(cardNum: string): string {
    const clean = cardNum.replace(/\D/g, '');
    if (clean.length < 4) return '****';
    return `****-****-****-${clean.slice(-4)}`;
  }

  public maskEmail(email: string): string {
    if (!email || !email.includes('@')) return '***';
    const [name, domain] = email.split('@');
    const masked = name.length > 2 ? `${name[0]}***${name.slice(-1)}` : `${name[0]}***`;
    return `${masked}@${domain}`;
  }

  public maskPhoneNumber(phone: string): string {
    const clean = phone.replace(/\D/g, '');
    if (clean.length < 4) return '***-***-****';
    return `***-***-${clean.slice(-4)}`;
  }

  public redactSensitiveObject<T extends Record<string, any>>(obj: T, sensitiveKeys = ['password', 'ssn', 'taxId', 'secret', 'creditCard']): T {
    const copy = { ...obj };
    for (const key of Object.keys(copy)) {
      if (sensitiveKeys.some(s => key.toLowerCase().includes(s.toLowerCase()))) {
        (copy as any)[key] = '[REDACTED_BY_COMPLIANCE_POLICY]';
      }
    }
    return copy;
  }
}
