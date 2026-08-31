import os

ROOT = os.getcwd()

def write_file(rel_path, content):
    full_path = os.path.join(ROOT, rel_path)
    os.makedirs(os.path.dirname(full_path), exist_ok=True)
    with open(full_path, "w", encoding="utf-8") as f:
        f.write(content.strip() + "\n")
    lines = len(content.strip().splitlines())
    print(f"  [+Created] {rel_path:<50} {lines:>6} LOC")
    return lines

def generate_workflows_and_compliance():
    print("Generating Workflow AST & Compliance Modules...")

    # 1. expression_parser.ts
    code_ast = """/**
 * Abstract Syntax Tree (AST) Boolean Expression Evaluator for Dynamic Workflow Automations
 */

export class ExpressionParser {
  public evaluate(conditionTree: any, context: Record<string, any>): boolean {
    if (!conditionTree) return true;

    if (conditionTree.and && Array.isArray(conditionTree.and)) {
      return conditionTree.and.every((c: any) => this.evaluate(c, context));
    }

    if (conditionTree.or && Array.isArray(conditionTree.or)) {
      return conditionTree.or.some((c: any) => this.evaluate(c, context));
    }

    const { field, op, value } = conditionTree;
    if (!field) return true;

    const actual = context[field];
    switch (op) {
      case '==': return actual === value;
      case '!=': return actual !== value;
      case '>': return Number(actual) > Number(value);
      case '>=': return Number(actual) >= Number(value);
      case '<': return Number(actual) < Number(value);
      case '<=': return Number(actual) <= Number(value);
      case 'in': return Array.isArray(value) && value.includes(actual);
      case 'contains': return String(actual || '').toLowerCase().includes(String(value).toLowerCase());
      default: return true;
    }
  }
}
"""
    write_file("src/modules/workflow_engine/expression_parser.ts", code_ast)

    # 2. cdc_diff_engine.ts
    code_cdc = """/**
 * Deep Change-Data-Capture (CDC) Diff & JSON-Patch Generator
 */

export interface FieldDiff {
  field: string;
  oldValue: any;
  newValue: any;
  changeType: 'ADDED' | 'MODIFIED' | 'DELETED';
}

export class CDCDiffEngine {
  public computeDiff(before: Record<string, any>, after: Record<string, any>): FieldDiff[] {
    const diffs: FieldDiff[] = [];
    const allKeys = new Set([...Object.keys(before || {}), ...Object.keys(after || {})]);

    for (const key of allKeys) {
      if (key === 'updatedAt' || key === 'lastLoginAt') continue;

      const val1 = before ? before[key] : undefined;
      const val2 = after ? after[key] : undefined;

      if (val1 === undefined && val2 !== undefined) {
        diffs.push({ field: key, oldValue: null, newValue: val2, changeType: 'ADDED' });
      } else if (val1 !== undefined && val2 === undefined) {
        diffs.push({ field: key, oldValue: val1, newValue: null, changeType: 'DELETED' });
      } else if (JSON.stringify(val1) !== JSON.stringify(val2)) {
        diffs.push({ field: key, oldValue: val1, newValue: val2, changeType: 'MODIFIED' });
      }
    }

    return diffs;
  }
}
"""
    write_file("src/modules/compliance_audit/cdc_diff_engine.ts", code_cdc)

    # 3. pii_masking_vault.ts
    code_pii = """/**
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
"""
    write_file("src/modules/compliance_audit/pii_masking_vault.ts", code_pii)

    # 4. query_aggregation_engine.ts
    code_agg = """/**
 * BI Studio Multi-Dimensional Grouping & Aggregate Engine
 */

export class QueryAggregationEngine {
  public groupByAndAggregate<T extends Record<string, any>>(
    data: T[],
    groupKey: keyof T,
    aggregations: { field: keyof T; op: 'SUM' | 'AVG' | 'COUNT' | 'MIN' | 'MAX'; alias: string }[]
  ): Record<string, any>[] {
    const groups = new Map<any, T[]>();

    for (const item of data) {
      const gVal = item[groupKey] ?? 'Unknown';
      if (!groups.has(gVal)) {
        groups.set(gVal, []);
      }
      groups.get(gVal)!.push(item);
    }

    const results: Record<string, any>[] = [];

    for (const [groupVal, items] of groups.entries()) {
      const row: Record<string, any> = { [groupKey]: groupVal };

      for (const agg of aggregations) {
        switch (agg.op) {
          case 'COUNT':
            row[agg.alias] = items.length;
            break;
          case 'SUM':
            row[agg.alias] = items.reduce((s, it) => s + (Number(it[agg.field]) || 0), 0);
            break;
          case 'AVG':
            const total = items.reduce((s, it) => s + (Number(it[agg.field]) || 0), 0);
            row[agg.alias] = items.length > 0 ? Math.round((total / items.length) * 100) / 100 : 0;
            break;
          case 'MAX':
            row[agg.alias] = Math.max(...items.map(it => Number(it[agg.field]) || 0));
            break;
          case 'MIN':
            row[agg.alias] = Math.min(...items.map(it => Number(it[agg.field]) || 0));
            break;
        }
      }
      results.push(row);
    }

    return results;
  }
}
"""
    write_file("src/modules/bi_reporting/query_aggregation_engine.ts", code_agg)

if __name__ == '__main__':
    generate_workflows_and_compliance()
