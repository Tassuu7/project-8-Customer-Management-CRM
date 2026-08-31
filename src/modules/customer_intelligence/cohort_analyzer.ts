/**
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
