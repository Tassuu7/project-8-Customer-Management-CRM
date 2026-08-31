/**
 * Enterprise Cryptographic & Security Utilities
 */

import * as crypto from 'crypto';
import * as bcrypt from 'bcryptjs';
import { config } from './config';

export class CryptoUtils {
  public static async hashPassword(password: string): Promise<string> {
    const rounds = config.auth.bcryptRounds || 10;
    return bcrypt.hash(password, rounds);
  }

  public static async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  public static generateSecureToken(length = 32): string {
    return crypto.randomBytes(length).toString('hex');
  }

  public static generateUUID(): string {
    return crypto.randomUUID();
  }

  public static hmacSign(payload: string, secret = config.auth.jwtSecret): string {
    return crypto.createHmac('sha256', secret).update(payload).digest('hex');
  }

  public static verifyHmac(payload: string, signature: string, secret = config.auth.jwtSecret): boolean {
    const expected = this.hmacSign(payload, secret);
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
  }

  public static maskEmail(email: string): string {
    if (!email || !email.includes('@')) return '***';
    const [user, domain] = email.split('@');
    const maskedUser = user.length > 2 ? `${user[0]}***${user[user.length - 1]}` : `${user[0]}***`;
    return `${maskedUser}@${domain}`;
  }

  public static maskPhone(phone: string): string {
    if (!phone) return '***';
    const clean = phone.replace(/\D/g, '');
    if (clean.length < 4) return '***';
    return `***-***-${clean.slice(-4)}`;
  }
}
