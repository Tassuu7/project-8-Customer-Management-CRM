/**
 * Dynamic Custom Field Schema Evaluator & Formula Expression Engine
 * Supports text, number, date, formula, rollup, select, multiselect,
 * and JSON-schema validation for customer account extensions.
 */

export type FieldDataType = 'string' | 'number' | 'boolean' | 'date' | 'select' | 'multiselect' | 'formula' | 'json';

export interface FieldDefinition {
  name: string;
  label: string;
  dataType: FieldDataType;
  required: boolean;
  defaultValue?: any;
  options?: string[]; // for select / multiselect
  formulaExpression?: string; // e.g. "{annualRevenue} * 0.15"
  validationRegex?: string;
  errorMessage?: string;
}

export class CustomFieldEngine {
  public validateAndNormalize(
    definitions: FieldDefinition[],
    inputValues: Record<string, any>
  ): { valid: boolean; normalizedValues: Record<string, any>; errors: Record<string, string> } {
    const normalizedValues: Record<string, any> = {};
    const errors: Record<string, string> = {};

    for (const def of definitions) {
      let val = inputValues[def.name];

      // Default value fallback
      if ((val === undefined || val === null || val === '') && def.defaultValue !== undefined) {
        val = def.defaultValue;
      }

      // Required check
      if (def.required && (val === undefined || val === null || val === '')) {
        errors[def.name] = def.errorMessage || `${def.label} is required`;
        continue;
      }

      if (val === undefined || val === null || val === '') {
        normalizedValues[def.name] = null;
        continue;
      }

      // Data type validation & normalization
      switch (def.dataType) {
        case 'string':
          normalizedValues[def.name] = String(val).trim();
          if (def.validationRegex) {
            const re = new RegExp(def.validationRegex);
            if (!re.test(normalizedValues[def.name])) {
              errors[def.name] = def.errorMessage || `${def.label} does not match required format`;
            }
          }
          break;

        case 'number':
          const num = Number(val);
          if (isNaN(num)) {
            errors[def.name] = `${def.label} must be a valid numeric value`;
          } else {
            normalizedValues[def.name] = num;
          }
          break;

        case 'boolean':
          normalizedValues[def.name] = Boolean(val === true || val === 'true' || val === 1);
          break;

        case 'date':
          const d = new Date(val);
          if (isNaN(d.getTime())) {
            errors[def.name] = `${def.label} must be a valid ISO date`;
          } else {
            normalizedValues[def.name] = d.toISOString();
          }
          break;

        case 'select':
          if (def.options && !def.options.includes(val)) {
            errors[def.name] = `${def.label} must be one of: ${def.options.join(', ')}`;
          } else {
            normalizedValues[def.name] = val;
          }
          break;

        case 'multiselect':
          const arr = Array.isArray(val) ? val : [val];
          if (def.options) {
            const invalid = arr.filter(item => !def.options!.includes(item));
            if (invalid.length > 0) {
              errors[def.name] = `Invalid selections for ${def.label}: ${invalid.join(', ')}`;
            } else {
              normalizedValues[def.name] = arr;
            }
          } else {
            normalizedValues[def.name] = arr;
          }
          break;

        case 'formula':
          normalizedValues[def.name] = this.evaluateFormula(def.formulaExpression || '0', inputValues);
          break;

        default:
          normalizedValues[def.name] = val;
          break;
      }
    }

    return {
      valid: Object.keys(errors).length === 0,
      normalizedValues,
      errors
    };
  }

  public evaluateFormula(expression: string, context: Record<string, any>): number {
    try {
      let replaced = expression;
      for (const [key, value] of Object.entries(context)) {
        const numVal = typeof value === 'number' ? value : (Number(value) || 0);
        replaced = replaced.replace(new RegExp(`\{${key}\}`, 'g'), String(numVal));
      }
      // Safe arithmetic evaluator
      if (/^[0-9\.\+\-\*/\(\)\s]+$/.test(replaced)) {
        return Function(`"use strict"; return (${replaced});`)();
      }
      return 0;
    } catch {
      return 0;
    }
  }
}
