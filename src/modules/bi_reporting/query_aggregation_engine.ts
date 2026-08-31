/**
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
