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

def generate_sales_automation():
    print("Generating Sales Automation Modules...")
    
    # 1. forecasting_engine.ts
    code_forecast = """/**
 * Monte Carlo Deal Revenue Forecasting & Pipeline Simulation Engine
 */

export interface SimulationResult {
  p10ConservativeRevenue: number;
  p50ExpectedRevenue: number;
  p90OptimisticRevenue: number;
  expectedWonDealsCount: number;
  simulationsRunCount: number;
  quarterlyForecast: {
    q1: number;
    q2: number;
    q3: number;
    q4: number;
  };
}

export class ForecastingEngine {
  public runSimulation(
    deals: { id: string; amount: number; stage: string; probability: number; expectedCloseDate: string }[],
    iterations = 1000
  ): SimulationResult {
    const totals: number[] = [];

    for (let i = 0; i < iterations; i++) {
      let runTotal = 0;
      for (const d of deals) {
        if (d.stage === 'Won') {
          runTotal += d.amount;
        } else if (d.stage !== 'Lost') {
          const rand = Math.random() * 100;
          if (rand <= d.probability) {
            runTotal += d.amount;
          }
        }
      }
      totals.push(runTotal);
    }

    totals.sort((a, b) => a - b);
    const p10 = totals[Math.floor(iterations * 0.1)];
    const p50 = totals[Math.floor(iterations * 0.5)];
    const p90 = totals[Math.floor(iterations * 0.9)];

    const wonCount = deals.filter(d => d.stage === 'Won').length;
    const openCount = deals.filter(d => !['Won', 'Lost'].includes(d.stage)).length;
    const expectedWon = wonCount + Math.round(openCount * 0.45);

    return {
      p10ConservativeRevenue: Math.round(p10),
      p50ExpectedRevenue: Math.round(p50),
      p90OptimisticRevenue: Math.round(p90),
      expectedWonDealsCount: expectedWon,
      simulationsRunCount: iterations,
      quarterlyForecast: {
        q1: Math.round(p50 * 0.22),
        q2: Math.round(p50 * 0.26),
        q3: Math.round(p50 * 0.24),
        q4: Math.round(p50 * 0.28)
      }
    };
  }
}
"""
    write_file("src/modules/sales_automation/forecasting_engine.ts", code_forecast)

    # 2. deal_rot_calculator.ts
    code_rot = """/**
 * Deal Velocity & Pipeline Stagnation (Deal Rot) Monitor
 */

export interface DealVelocityMetric {
  dealId: string;
  dealTitle: string;
  stage: string;
  daysInCurrentStage: number;
  stageBenchmarkDays: number;
  isStagnant: boolean;
  velocityRiskScore: number; // 0 to 100
  recommendedIntervention: string;
}

export class DealRotCalculator {
  private stageBenchmarks: Record<string, number> = {
    Discovery: 14,
    Demo: 10,
    Proposal: 21,
    Negotiation: 14
  };

  public evaluateDeals(
    deals: { id: string; title: string; stage: string; updatedAt: string; amount: number }[]
  ): DealVelocityMetric[] {
    const now = Date.now();
    const metrics: DealVelocityMetric[] = [];

    for (const d of deals) {
      if (['Won', 'Lost'].includes(d.stage)) continue;

      const benchmark = this.stageBenchmarks[d.stage] || 14;
      const lastUpdate = new Date(d.updatedAt).getTime();
      const daysInStage = Math.max(1, Math.round((now - lastUpdate) / (1000 * 3600 * 24)));
      const isStagnant = daysInStage > benchmark;

      let riskScore = Math.min(100, Math.round((daysInStage / benchmark) * 50));
      if (daysInStage > benchmark * 2) riskScore = 95;

      let intervention = 'On track with stage velocity.';
      if (riskScore > 80) {
        intervention = 'Critical deal stagnation: Executive alignment or re-qualification meeting recommended.';
      } else if (riskScore > 50) {
        intervention = 'Approaching benchmark threshold: Follow up with champion contact on proposal feedback.';
      }

      metrics.push({
        dealId: d.id,
        dealTitle: d.title,
        stage: d.stage,
        daysInCurrentStage: daysInStage,
        stageBenchmarkDays: benchmark,
        isStagnant,
        velocityRiskScore: riskScore,
        recommendedIntervention: intervention
      });
    }

    return metrics.sort((a, b) => b.velocityRiskScore - a.velocityRiskScore);
  }
}
"""
    write_file("src/modules/sales_automation/deal_rot_calculator.ts", code_rot)

    # 3. cpq_calculator.ts
    code_cpq = """/**
 * Configure-Price-Quote (CPQ) & Tier Discount Matrix Engine
 */

export interface QuoteLineItem {
  productId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  discountPercentage: number;
  tierVolumeDiscountPercentage: number;
  effectiveUnitPrice: number;
  lineTotal: number;
}

export interface CPQQuoteSummary {
  subtotal: number;
  totalDiscountAmount: number;
  effectiveDiscountPercentage: number;
  taxAmount: number;
  grandTotal: number;
  requiresExecutiveApproval: boolean;
  approvalReason?: string;
  lineItems: QuoteLineItem[];
}

export class CPQCalculator {
  public calculateQuote(
    items: { productId: string; name: string; quantity: number; unitPrice: number; requestedDiscountPct?: number }[],
    taxRate = 8.0
  ): CPQQuoteSummary {
    let subtotal = 0;
    let totalDiscount = 0;
    const computedLines: QuoteLineItem[] = [];

    for (const item of items) {
      const gross = item.quantity * item.unitPrice;
      subtotal += gross;

      // Volume tiered discount
      let volumeDiscount = 0;
      if (item.quantity >= 500) volumeDiscount = 20;
      else if (item.quantity >= 100) volumeDiscount = 15;
      else if (item.quantity >= 50) volumeDiscount = 10;
      else if (item.quantity >= 10) volumeDiscount = 5;

      const manualDiscount = item.requestedDiscountPct || 0;
      const combinedDiscount = Math.min(40, volumeDiscount + manualDiscount);

      const discountAmt = gross * (combinedDiscount / 100);
      totalDiscount += discountAmt;
      const lineTotal = gross - discountAmt;
      const effectiveUnit = lineTotal / item.quantity;

      computedLines.push({
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        discountPercentage: manualDiscount,
        tierVolumeDiscountPercentage: volumeDiscount,
        effectiveUnitPrice: Math.round(effectiveUnit * 100) / 100,
        lineTotal: Math.round(lineTotal * 100) / 100
      });
    }

    const netSubtotal = subtotal - totalDiscount;
    const taxAmount = (netSubtotal * taxRate) / 100;
    const grandTotal = netSubtotal + taxAmount;
    const effectivePct = subtotal > 0 ? (totalDiscount / subtotal) * 100 : 0;

    const requiresApproval = effectivePct > 20 || grandTotal > 250000;
    let approvalReason: string | undefined;
    if (requiresApproval) {
      approvalReason = effectivePct > 20 
        ? `Discount of ${effectivePct.toFixed(1)}% exceeds standard 20% threshold`
        : `Deal value of $${grandTotal.toLocaleString()} requires VP approval`;
    }

    return {
      subtotal: Math.round(subtotal * 100) / 100,
      totalDiscountAmount: Math.round(totalDiscount * 100) / 100,
      effectiveDiscountPercentage: Math.round(effectivePct * 10) / 10,
      taxAmount: Math.round(taxAmount * 100) / 100,
      grandTotal: Math.round(grandTotal * 100) / 100,
      requiresExecutiveApproval: requiresApproval,
      approvalReason,
      lineItems: computedLines
    };
  }
}
"""
    write_file("src/modules/sales_automation/cpq_calculator.ts", code_cpq)

    # 4. commission_engine.ts
    code_comm = """/**
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
"""
    write_file("src/modules/sales_automation/commission_engine.ts", code_comm)

    # 5. cadence_sequencer.ts
    code_cadence = """/**
 * Outbound Sales Cadence Sequencer & State Machine
 */

export interface CadenceStep {
  stepNumber: number;
  dayOffset: number;
  channel: 'Email' | 'Phone' | 'LinkedIn' | 'Task';
  templateSubject?: string;
  templateBody?: string;
}

export class CadenceSequencer {
  private defaultCadence: CadenceStep[] = [
    { stepNumber: 1, dayOffset: 1, channel: 'Email', templateSubject: 'Introductory Platform Architecture Demo', templateBody: 'Hi {{firstName}}, noticing your infrastructure expansion...' },
    { stepNumber: 2, dayOffset: 3, channel: 'Phone', templateBody: 'Follow-up call on initial email note.' },
    { stepNumber: 3, dayOffset: 7, channel: 'LinkedIn', templateBody: 'Connect and share recent Gartner Magic Quadrant report.' },
    { stepNumber: 4, dayOffset: 12, channel: 'Email', templateSubject: 'Customer Case Study: 40% TCO Reduction', templateBody: 'Hi {{firstName}}, thought you might find this tech breakdown relevant...' },
    { stepNumber: 5, dayOffset: 18, channel: 'Phone', templateBody: 'Final touchpoint before closing cadence sequence.' }
  ];

  public getNextAction(startDate: string, completedStep = 0): {
    nextStep?: CadenceStep;
    dueDate: string;
    isFinished: boolean;
  } {
    const nextStepNumber = completedStep + 1;
    const step = this.defaultCadence.find(s => s.stepNumber === nextStepNumber);

    if (!step) {
      return { isFinished: true, dueDate: new Date().toISOString() };
    }

    const start = new Date(startDate).getTime();
    const dueTime = start + (step.dayOffset * 86400000);

    return {
      nextStep: step,
      dueDate: new Date(dueTime).toISOString(),
      isFinished: false
    };
  }
}
"""
    write_file("src/modules/sales_automation/cadence_sequencer.ts", code_cadence)

if __name__ == '__main__':
    generate_sales_automation()
