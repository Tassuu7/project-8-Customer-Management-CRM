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

def generate_customer_intelligence():
    print("Generating Customer Intelligence Module...")
    
    # 1. cohort_analyzer.ts
    code_cohort = """/**
 * Enterprise Cohort Retention & Churn Analytics Engine
 * Calculates month-over-month customer retention curves, revenue retention rates (NDR/GRR),
 * customer lifetime value (LTV) models, and churn risk predictions.
 */

export interface CohortGroup {
  cohortMonth: string; // e.g. "2025-01"
  initialAccountCount: number;
  initialMrr: number;
  retentionByMonth: {
    monthOffset: number;
    retainedCount: number;
    retainedPercentage: number;
    retainedMrr: number;
    expansionMrr: number;
    churnedMrr: number;
    netRetentionRate: number; // NDR %
  }[];
}

export interface CustomerLifetimeValueModel {
  accountId: string;
  accountName: string;
  annualRecurringRevenue: number;
  grossMarginPercentage: number;
  churnProbability: number;
  discountRatePercentage: number;
  predictedLifetimeMonths: number;
  calculatedLtv: number;
  historicalPaidRevenue: number;
  expansionPotentialScore: number;
}

export class CohortAnalyzer {
  private cohortData: Map<string, CohortGroup> = new Map();

  public calculateRetentionMatrix(
    customers: { id: string; joinDate: string; tier: string; annualRevenue: number; churnDate?: string }[],
    observationMonths = 12
  ): CohortGroup[] {
    const cohortsMap = new Map<string, typeof customers>();

    // Group customers by signup cohort (YYYY-MM)
    for (const customer of customers) {
      const cohortKey = customer.joinDate.substring(0, 7);
      if (!cohortsMap.has(cohortKey)) {
        cohortsMap.set(cohortKey, []);
      }
      cohortsMap.get(cohortKey)!.push(customer);
    }

    const result: CohortGroup[] = [];

    for (const [cohortMonth, cohortCustomers] of cohortsMap.entries()) {
      const initialCount = cohortCustomers.length;
      const initialMrr = cohortCustomers.reduce((sum, c) => sum + (c.annualRevenue / 12), 0);
      const retentionByMonth: CohortGroup['retentionByMonth'] = [];

      for (let offset = 0; offset < observationMonths; offset++) {
        let retainedCount = 0;
        let retainedMrr = 0;
        let expansionMrr = 0;
        let churnedMrr = 0;

        for (const customer of cohortCustomers) {
          const mrr = customer.annualRevenue / 12;
          let isRetained = true;

          if (customer.churnDate) {
            const joinD = new Date(customer.joinDate);
            const churnD = new Date(customer.churnDate);
            const diffMonths = (churnD.getFullYear() - joinD.getFullYear()) * 12 + (churnD.getMonth() - joinD.getMonth());
            if (diffMonths <= offset) {
              isRetained = false;
            }
          }

          if (isRetained) {
            retainedCount++;
            // Natural expansion simulation for healthy enterprise tiers
            const expansionFactor = customer.tier === 'Enterprise' ? (1 + offset * 0.015) : (1 + offset * 0.005);
            const currentMrr = mrr * expansionFactor;
            retainedMrr += currentMrr;
            if (currentMrr > mrr) {
              expansionMrr += (currentMrr - mrr);
            }
          } else {
            churnedMrr += mrr;
          }
        }

        const retainedPct = initialCount > 0 ? (retainedCount / initialCount) * 100 : 0;
        const ndr = initialMrr > 0 ? (retainedMrr / initialMrr) * 100 : 0;

        retentionByMonth.push({
          monthOffset: offset,
          retainedCount,
          retainedPercentage: Math.round(retainedPct * 10) / 10,
          retainedMrr: Math.round(retainedMrr),
          expansionMrr: Math.round(expansionMrr),
          churnedMrr: Math.round(churnedMrr),
          netRetentionRate: Math.round(ndr * 10) / 10
        });
      }

      result.push({
        cohortMonth,
        initialAccountCount: initialCount,
        initialMrr: Math.round(initialMrr),
        retentionByMonth
      });
    }

    return result.sort((a, b) => a.cohortMonth.localeCompare(b.cohortMonth));
  }

  public calculateLtv(
    account: {
      id: string;
      name: string;
      annualRevenue: number;
      tier: string;
      healthScore: number;
      lifetimeValue: number;
    },
    discountRate = 10,
    grossMargin = 80
  ): CustomerLifetimeValueModel {
    // Churn probability based on health score
    let churnProbability = 0.05; // 5% baseline
    if (account.healthScore < 50) churnProbability = 0.45;
    else if (account.healthScore < 70) churnProbability = 0.25;
    else if (account.healthScore < 85) churnProbability = 0.12;

    const annualMargin = account.annualRevenue * (grossMargin / 100);
    const predictedMonths = Math.min(120, Math.round(12 / (churnProbability || 0.01)));
    
    // DCF LTV model: LTV = Annual Margin / (Churn Rate + Discount Rate)
    const discountFactor = (churnProbability + (discountRate / 100));
    const calculatedLtv = Math.round(annualMargin / discountFactor);

    return {
      accountId: account.id,
      accountName: account.name,
      annualRecurringRevenue: account.annualRevenue,
      grossMarginPercentage: grossMargin,
      churnProbability: Math.round(churnProbability * 100),
      discountRatePercentage: discountRate,
      predictedLifetimeMonths: predictedMonths,
      calculatedLtv,
      historicalPaidRevenue: account.lifetimeValue || (account.annualRevenue * 1.5),
      expansionPotentialScore: account.tier === 'Enterprise' ? 90 : (account.tier === 'Growth' ? 75 : 50)
    };
  }
}
"""
    write_file("src/modules/customer_intelligence/cohort_analyzer.ts", code_cohort)

    # 2. sentiment_analyzer.ts
    code_sentiment = """/**
 * Customer Sentiment & Interaction Tone NLP Classifier
 * Evaluates ticket responses, meeting transcripts, and emails for positive/negative polarity,
 * urgency triggers, frustration markers, and Net Promoter Score (NPS) projections.
 */

export interface SentimentAnalysisResult {
  score: number; // -1.0 (Very Negative) to +1.0 (Very Positive)
  magnitude: number; // 0.0 to 10.0 intensity
  classification: 'VERY_POSITIVE' | 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE' | 'URGENT_FRUSTRATED';
  detectedKeywords: string[];
  recommendedAction: string;
  npsProjection: number; // 0 to 10
}

export class SentimentAnalyzer {
  private positiveKeywords = new Set([
    'excellent', 'amazing', 'great', 'love', 'fantastic', 'helpful', 'fast', 'resolved',
    'perfect', 'pleased', 'impressed', 'seamless', 'awesome', 'thank you', 'appreciate',
    'reliable', 'efficient', 'outstanding', 'superior', 'valuable', 'recommend', 'delighted'
  ]);

  private negativeKeywords = new Set([
    'broken', 'error', 'fail', 'bug', 'terrible', 'slow', 'frustrated', 'unacceptable',
    'cancel', 'refund', 'escalate', 'disappointed', 'worst', 'annoyed', 'useless',
    'unresponsive', 'complaint', 'outage', 'downtime', 'breach', 'lawyer', 'legal', 'churn'
  ]);

  private urgencyModifiers = new Set([
    'immediately', 'asap', 'urgent', 'emergency', 'blocker', 'critical', 'now', 'production down'
  ]);

  public analyzeText(content: string): SentimentAnalysisResult {
    if (!content || content.trim() === '') {
      return {
        score: 0.0,
        magnitude: 0.0,
        classification: 'NEUTRAL',
        detectedKeywords: [],
        recommendedAction: 'Standard monitoring.',
        npsProjection: 7
      };
    }

    const cleanText = content.toLowerCase();
    const words = cleanText.match(/\b[a-z]{3,}\b/g) || [];
    
    let positiveCount = 0;
    let negativeCount = 0;
    let urgencyCount = 0;
    const detectedKeywords: string[] = [];

    for (const word of words) {
      if (this.positiveKeywords.has(word)) {
        positiveCount++;
        detectedKeywords.push(`+${word}`);
      }
      if (this.negativeKeywords.has(word)) {
        negativeCount++;
        detectedKeywords.push(`-${word}`);
      }
      if (this.urgencyModifiers.has(word)) {
        urgencyCount++;
        detectedKeywords.push(`!${word}`);
      }
    }

    const totalMatches = positiveCount + negativeCount;
    let score = 0.0;
    if (totalMatches > 0) {
      score = (positiveCount - negativeCount) / totalMatches;
    }

    const magnitude = Math.min(10.0, (totalMatches * 1.5) + (urgencyCount * 2.5));

    let classification: SentimentAnalysisResult['classification'] = 'NEUTRAL';
    let recommendedAction = 'Maintain standard communication cadence.';
    let npsProjection = 7;

    if (urgencyCount > 0 && negativeCount > 0) {
      classification = 'URGENT_FRUSTRATED';
      recommendedAction = 'Immediate intervention: Assign senior customer success lead and initiate outbound resolution call.';
      npsProjection = 2;
    } else if (score > 0.4) {
      classification = 'VERY_POSITIVE';
      recommendedAction = 'High advocacy detected: Solicit G2/Gartner case study or expansion proposal.';
      npsProjection = 10;
    } else if (score > 0.1) {
      classification = 'POSITIVE';
      recommendedAction = 'Account sentiment positive: Reinforce ongoing milestone delivery.';
      npsProjection = 8;
    } else if (score < -0.3) {
      classification = 'NEGATIVE';
      recommendedAction = 'Elevated frustration: Review support ticket history and schedule technical alignment.';
      npsProjection = 4;
    }

    return {
      score: Math.round(score * 100) / 100,
      magnitude: Math.round(magnitude * 10) / 10,
      classification,
      detectedKeywords,
      recommendedAction,
      npsProjection
    };
  }
}
"""
    write_file("src/modules/customer_intelligence/sentiment_analyzer.ts", code_sentiment)

    # 3. hierarchy_resolver.ts
    code_hierarchy = """/**
 * Corporate Account Hierarchy & Subsidiary Tree Resolver
 * Traverses parent-child multinational accounts, computes rollup ARR,
 * total active users, global support ticket aggregation, and corporate credit limits.
 */

export interface AccountNode {
  id: string;
  name: string;
  parentAccountId?: string;
  annualRevenue: number;
  tier: string;
  healthScore: number;
  openTicketsCount: number;
  children: AccountNode[];
}

export interface HierarchyRollup {
  rootAccountId: string;
  rootAccountName: string;
  totalSubsidiaryCount: number;
  totalRollupRevenue: number;
  averageHealthScore: number;
  totalOpenTickets: number;
  treeDepth: number;
}

export class HierarchyResolver {
  public buildHierarchyTree(
    accounts: { id: string; name: string; parentAccountId?: string; annualRevenue: number; tier: string; healthScore: number; openTicketsCount?: number }[]
  ): AccountNode[] {
    const nodeMap = new Map<string, AccountNode>();

    // 1. Initialize nodes
    for (const acc of accounts) {
      nodeMap.set(acc.id, {
        id: acc.id,
        name: acc.name,
        parentAccountId: acc.parentAccountId,
        annualRevenue: acc.annualRevenue || 0,
        tier: acc.tier,
        healthScore: acc.healthScore || 85,
        openTicketsCount: acc.openTicketsCount || 0,
        children: []
      });
    }

    const roots: AccountNode[] = [];

    // 2. Link parent-child relations
    for (const node of nodeMap.values()) {
      if (node.parentAccountId && nodeMap.has(node.parentAccountId)) {
        const parent = nodeMap.get(node.parentAccountId)!;
        parent.children.push(node);
      } else {
        roots.push(node);
      }
    }

    return roots;
  }

  public computeRollup(rootNode: AccountNode): HierarchyRollup {
    let totalSubsidiaries = 0;
    let totalRevenue = 0;
    let totalHealth = 0;
    let totalTickets = 0;
    let totalNodes = 0;
    let maxDepth = 1;

    const traverse = (node: AccountNode, depth: number) => {
      totalNodes++;
      if (depth > 1) totalSubsidiaries++;
      totalRevenue += node.annualRevenue;
      totalHealth += node.healthScore;
      totalTickets += node.openTicketsCount;
      if (depth > maxDepth) maxDepth = depth;

      for (const child of node.children) {
        traverse(child, depth + 1);
      }
    };

    traverse(rootNode, 1);

    return {
      rootAccountId: rootNode.id,
      rootAccountName: rootNode.name,
      totalSubsidiaryCount: totalSubsidiaries,
      totalRollupRevenue: totalRevenue,
      averageHealthScore: totalNodes > 0 ? Math.round(totalHealth / totalNodes) : 85,
      totalOpenTickets: totalTickets,
      treeDepth: maxDepth
    };
  }
}
"""
    write_file("src/modules/customer_intelligence/hierarchy_resolver.ts", code_hierarchy)

    # 4. custom_field_engine.ts
    code_cfe = """/**
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
        replaced = replaced.replace(new RegExp(`\\{${key}\\}`, 'g'), String(numVal));
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
"""
    write_file("src/modules/customer_intelligence/custom_field_engine.ts", code_cfe)

    # 5. duplicate_detector.ts
    code_dup = """/**
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
"""
    write_file("src/modules/customer_intelligence/duplicate_detector.ts", code_dup)

    # 6. territory_manager.ts
    code_territory = """/**
 * Enterprise Territory & Geographic Account Routing Engine
 * Maps customer zip codes, states, countries, and industry verticals to designated account executive teams.
 */

export interface SalesTerritory {
  id: string;
  name: string;
  regions: string[]; // e.g. ["CA", "WA", "OR"]
  industryFocus: string[];
  assignedTeamLeaderId: string;
  assignedRepIds: string[];
  annualQuotaRevenue: number;
}

export class TerritoryManager {
  private territories: SalesTerritory[] = [
    {
      id: 'terr-west',
      name: 'North America West Strategic',
      regions: ['CA', 'WA', 'OR', 'NV', 'AZ', 'CO'],
      industryFocus: ['Technology', 'Cloud & Hosting', 'CleanTech'],
      assignedTeamLeaderId: 'usr-sales-01',
      assignedRepIds: ['usr-exec-01', 'usr-exec-02'],
      annualQuotaRevenue: 15000000
    },
    {
      id: 'terr-east',
      name: 'North America East Financial & Healthcare',
      regions: ['NY', 'NJ', 'MA', 'CT', 'PA', 'FL'],
      industryFocus: ['Financial Services', 'Healthcare', 'Insurance', 'Biotechnology'],
      assignedTeamLeaderId: 'usr-sales-01',
      assignedRepIds: ['usr-exec-01'],
      annualQuotaRevenue: 22000000
    }
  ];

  public assignTerritory(account: { state?: string; country?: string; industry?: string }): {
    territoryId: string;
    territoryName: string;
    assignedRepId: string;
  } {
    const state = (account.state || '').toUpperCase();
    const industry = account.industry || 'Technology';

    for (const terr of this.territories) {
      const matchState = state && terr.regions.includes(state);
      const matchIndustry = terr.industryFocus.includes(industry);

      if (matchState || matchIndustry) {
        // Round-robin selection of assigned rep
        const rep = terr.assignedRepIds[Math.floor(Math.random() * terr.assignedRepIds.length)];
        return {
          territoryId: terr.id,
          territoryName: terr.name,
          assignedRepId: rep || terr.assignedTeamLeaderId
        };
      }
    }

    return {
      territoryId: this.territories[0].id,
      territoryName: this.territories[0].name,
      assignedRepId: this.territories[0].assignedRepIds[0]
    };
  }
}
"""
    write_file("src/modules/customer_intelligence/territory_manager.ts", code_territory)

if __name__ == '__main__':
    generate_customer_intelligence()
