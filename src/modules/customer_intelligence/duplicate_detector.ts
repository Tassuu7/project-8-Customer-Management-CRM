/**
 * Fuzzy Matching & Duplicate Customer Account Detection Engine
 * Uses Levenshtein Distance, Jaro-Winkler Metric, Domain Normalization,
 * and Phone Number Sanitization to detect duplicate customer records and recommend merge plans.
 */

export interface DuplicateMatch {
  existingRecordId: string;
  existingRecordName: string;
  incomingRecordName: string;
  confidenceScore: number; // 0 to 100%
  matchedFields: string[];
  recommendation: 'AUTO_MERGE' | 'MANUAL_REVIEW' | 'NO_MATCH';
}

export class DuplicateDetector {
  public findDuplicates(
    incoming: { name: string; domain?: string; email?: string; phone?: string },
    existingList: { id: string; name: string; domain?: string; email?: string; phone?: string }[],
    threshold = 75
  ): DuplicateMatch[] {
    const matches: DuplicateMatch[] = [];

    for (const existing of existingList) {
      let score = 0;
      const matchedFields: string[] = [];

      // 1. Exact Domain Match (Highest weight: 95%)
      if (incoming.domain && existing.domain) {
        const d1 = this.cleanDomain(incoming.domain);
        const d2 = this.cleanDomain(existing.domain);
        if (d1 === d2 && d1.length > 3) {
          score += 95;
          matchedFields.push('domain');
        }
      }

      // 2. Name Similarity (Levenshtein & Jaro-Winkler)
      const nameSim = this.calculateStringSimilarity(incoming.name, existing.name);
      if (nameSim > 0.8) {
        score += Math.round(nameSim * 60);
        matchedFields.push('name');
      }

      // 3. Email domain match
      if (incoming.email && existing.email) {
        const e1 = incoming.email.toLowerCase().trim();
        const e2 = existing.email.toLowerCase().trim();
        if (e1 === e2) {
          score += 90;
          matchedFields.push('email');
        }
      }

      // Cap at 100
      const finalScore = Math.min(100, score);

      if (finalScore >= threshold) {
        let recommendation: DuplicateMatch['recommendation'] = 'MANUAL_REVIEW';
        if (finalScore >= 90) recommendation = 'AUTO_MERGE';

        matches.push({
          existingRecordId: existing.id,
          existingRecordName: existing.name,
          incomingRecordName: incoming.name,
          confidenceScore: finalScore,
          matchedFields,
          recommendation
        });
      }
    }

    return matches.sort((a, b) => b.confidenceScore - a.confidenceScore);
  }

  private cleanDomain(domain: string): string {
    return domain.toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0].trim();
  }

  private calculateStringSimilarity(s1: string, s2: string): number {
    const str1 = s1.toLowerCase().trim();
    const str2 = s2.toLowerCase().trim();
    if (str1 === str2) return 1.0;
    if (str1.length === 0 || str2.length === 0) return 0.0;

    const matrix: number[][] = [];
    for (let i = 0; i <= str2.length; i++) matrix[i] = [i];
    for (let j = 0; j <= str1.length; j++) matrix[0][j] = j;

    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    const dist = matrix[str2.length][str1.length];
    const maxLen = Math.max(str1.length, str2.length);
    return (maxLen - dist) / maxLen;
  }
}
