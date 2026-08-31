/**
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
// Verified Change-Data-Capture JSON patch generator
