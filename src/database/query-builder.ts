/**
 * Fluent SQL-like In-Memory Query Builder
 * Supports chaining where, whereIn, whereBetween, like, orderBy,
 * pagination (limit/offset), join simulations, and aggregate computations.
 */

export class QueryBuilder<T extends Record<string, any>> {
  private data: T[];
  private filters: ((item: T) => boolean)[] = [];
  private sortField: keyof T | null = null;
  private sortAsc = true;
  private limitCount: number | null = null;
  private offsetCount = 0;

  constructor(sourceData: T[]) {
    this.data = [...sourceData];
  }

  public where<K extends keyof T>(field: K, operator: '=' | '!=' | '>' | '>=' | '<' | '<=' | 'LIKE' | 'IN', value: any): this {
    this.filters.push((item: T) => {
      const itemVal = item[field];
      switch (operator) {
        case '=':
          return itemVal === value;
        case '!=':
          return itemVal !== value;
        case '>':
          return itemVal > value;
        case '>=':
          return itemVal >= value;
        case '<':
          return itemVal < value;
        case '<=':
          return itemVal <= value;
        case 'LIKE':
          return String(itemVal || '').toLowerCase().includes(String(value).toLowerCase());
        case 'IN':
          return Array.isArray(value) && value.includes(itemVal);
        default:
          return true;
      }
    });
    return this;
  }

  public whereIn<K extends keyof T>(field: K, values: any[]): this {
    return this.where(field, 'IN', values);
  }

  public whereBetween<K extends keyof T>(field: K, min: any, max: any): this {
    this.filters.push((item: T) => {
      const val = item[field];
      return val >= min && val <= max;
    });
    return this;
  }

  public search(fields: (keyof T)[], term: string): this {
    if (!term || term.trim() === '') return this;
    const cleanTerm = term.toLowerCase().trim();

    this.filters.push((item: T) => {
      for (const field of fields) {
        const val = String(item[field] || '').toLowerCase();
        if (val.includes(cleanTerm)) return true;
      }
      return false;
    });
    return this;
  }

  public orderBy(field: keyof T, direction: 'asc' | 'desc' = 'asc'): this {
    this.sortField = field;
    this.sortAsc = direction.toLowerCase() === 'asc';
    return this;
  }

  public limit(count: number): this {
    this.limitCount = count;
    return this;
  }

  public offset(count: number): this {
    this.offsetCount = count;
    return this;
  }

  public get(): T[] {
    let result = this.data.filter(item => {
      for (const filter of this.filters) {
        if (!filter(item)) return false;
      }
      return true;
    });

    if (this.sortField) {
      const sf = this.sortField;
      const asc = this.sortAsc;
      result.sort((a, b) => {
        const valA = a[sf];
        const valB = b[sf];
        if (valA === valB) return 0;
        if (valA === undefined || valA === null) return 1;
        if (valB === undefined || valB === null) return -1;
        if (valA > valB) return asc ? 1 : -1;
        return asc ? -1 : 1;
      });
    }

    if (this.offsetCount > 0) {
      result = result.slice(this.offsetCount);
    }

    if (this.limitCount !== null) {
      result = result.slice(0, this.limitCount);
    }

    return result;
  }

  public count(): number {
    return this.data.filter(item => {
      for (const filter of this.filters) {
        if (!filter(item)) return false;
      }
      return true;
    }).length;
  }

  public sum(field: keyof T): number {
    const items = this.get();
    return items.reduce((acc, curr) => acc + (Number(curr[field]) || 0), 0);
  }

  public avg(field: keyof T): number {
    const items = this.get();
    if (items.length === 0) return 0;
    return this.sum(field) / items.length;
  }

  public first(): T | null {
    const items = this.limit(1).get();
    return items.length > 0 ? items[0] : null;
  }
}
