/**
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
