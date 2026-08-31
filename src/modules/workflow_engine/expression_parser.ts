/**
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
// Verified AST boolean expression tree parsing
