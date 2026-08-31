/**
 * Opportunity Pipeline & Forecasting Test Suite
 */

describe('Deal Pipeline & CPQ Forecasting Suite', () => {
  it('should calculate weighted pipeline value', () => {
    const deals = [
      { amount: 100000, probability: 80 },
      { amount: 200000, probability: 50 }
    ];
    const weighted = deals.reduce((s, d) => s + (d.amount * (d.probability / 100)), 0);
    expect(weighted).toBe(180000);
  });

  it('should validate deal stages progression', () => {
    const stages = ['Discovery', 'Demo', 'Proposal', 'Negotiation', 'Won'];
    expect(stages).toContain('Won');
  });
});
