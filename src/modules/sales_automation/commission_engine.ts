/**
 * Sales Commission & Quota Accelerator Calculation Engine
 */

export interface SalesRepCommission {
  repId: string;
  repName: string;
  annualQuota: number;
  attainedRevenue: number;
  quotaAttainmentPercentage: number;
  baseCommissionRate: number;
  acceleratorTierRate: number;
  totalCommissionEarned: number;
  payoutStatus: 'Calculated' | 'Approved' | 'Paid';
}

export class CommissionEngine {
  public calculateRepPayout(
    rep: { id: string; name: string; quota: number },
    closedWonDeals: { id: string; amount: number; closedAt: string }[]
  ): SalesRepCommission {
    const totalWon = closedWonDeals.reduce((sum, d) => sum + d.amount, 0);
    const attainment = rep.quota > 0 ? (totalWon / rep.quota) * 100 : 0;

    const baseRate = 8.0; // 8% base commission
    let acceleratorRate = 8.0;

    if (attainment > 120) {
      acceleratorRate = 16.0; // 2x accelerator above 120%
    } else if (attainment > 100) {
      acceleratorRate = 12.0; // 1.5x accelerator between 100-120%
    }

    let earned = 0;
    if (totalWon <= rep.quota) {
      earned = totalWon * (baseRate / 100);
    } else {
      const baseEarned = rep.quota * (baseRate / 100);
      const excessWon = totalWon - rep.quota;
      const acceleratedEarned = excessWon * (acceleratorRate / 100);
      earned = baseEarned + acceleratedEarned;
    }

    return {
      repId: rep.id,
      repName: rep.name,
      annualQuota: rep.quota,
      attainedRevenue: totalWon,
      quotaAttainmentPercentage: Math.round(attainment * 10) / 10,
      baseCommissionRate: baseRate,
      acceleratorTierRate: acceleratorRate,
      totalCommissionEarned: Math.round(earned),
      payoutStatus: 'Calculated'
    };
  }
}
