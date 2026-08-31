/**
 * Enterprise Validation & Sanitization Engine
 */

import { ValidationError } from './errors';

export type ValidatorRule<T = any> = (value: T, fieldName: string) => string | null;

export class Validator {
  public static required(value: any, fieldName: string): string | null {
    if (value === undefined || value === null || (typeof value === 'string' && value.trim() === '')) {
      return `${fieldName} is required`;
    }
    return null;
  }

  public static string(value: any, fieldName: string): string | null {
    if (value !== undefined && value !== null && typeof value !== 'string') {
      return `${fieldName} must be a string`;
    }
    return null;
  }

  public static minLength(min: number): ValidatorRule<string> {
    return (value: string, fieldName: string) => {
      if (value && value.length < min) {
        return `${fieldName} must be at least ${min} characters long`;
      }
      return null;
    };
  }

  public static maxLength(max: number): ValidatorRule<string> {
    return (value: string, fieldName: string) => {
      if (value && value.length > max) {
        return `${fieldName} cannot exceed ${max} characters`;
      }
      return null;
    };
  }

  public static email(value: string, fieldName: string): string | null {
    if (!value) return null;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(value.trim())) {
      return `${fieldName} must be a valid email address`;
    }
    return null;
  }

  public static phone(value: string, fieldName: string): string | null {
    if (!value) return null;
    const phoneRegex = /^\+?[1-9]\d{1,14}$|^(\(\d{3}\)|\d{3})[- .]?\d{3}[- .]?\d{4}$/;
    if (!phoneRegex.test(value.replace(/\s+/g, ''))) {
      return `${fieldName} must be a valid phone number`;
    }
    return null;
  }

  public static number(value: any, fieldName: string): string | null {
    if (value !== undefined && value !== null && (typeof value !== 'number' || isNaN(value))) {
      return `${fieldName} must be a numeric value`;
    }
    return null;
  }

  public static min(min: number): ValidatorRule<number> {
    return (value: number, fieldName: string) => {
      if (value !== undefined && value !== null && value < min) {
        return `${fieldName} cannot be less than ${min}`;
      }
      return null;
    };
  }

  public static max(max: number): ValidatorRule<number> {
    return (value: number, fieldName: string) => {
      if (value !== undefined && value !== null && value > max) {
        return `${fieldName} cannot be greater than ${max}`;
      }
      return null;
    };
  }

  public static enum(allowedValues: any[]): ValidatorRule {
    return (value: any, fieldName: string) => {
      if (value !== undefined && value !== null && !allowedValues.includes(value)) {
        return `${fieldName} must be one of: ${allowedValues.join(', ')}`;
      }
      return null;
    };
  }

  public static sanitizeString(input: string): string {
    if (!input) return '';
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
      .trim();
  }

  public static validateSchema<T extends Record<string, any>>(
    data: T,
    schema: Record<string, ValidatorRule[]>
  ): void {
    const errors: Record<string, string> = {};

    for (const [field, rules] of Object.entries(schema)) {
      const value = data[field];
      for (const rule of rules) {
        const error = rule(value, field);
        if (error) {
          errors[field] = error;
          break;
        }
      }
    }

    if (Object.keys(errors).length > 0) {
      throw new ValidationError('Validation failed for one or more fields', errors);
    }
  }
}
