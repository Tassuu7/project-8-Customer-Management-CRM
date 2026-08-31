/**
 * Deal & Pipeline Opportunity Forecasting Service
 */

import { Repository } from '../database/repository';
import { Deal, DealStage, DealPipelineMetricsDTO } from '../models/deal.model';
import { ValidationError, NotFoundError } from '../core/errors';
import { eventBus } from '../core/events';
import { logger } from '../core/logger';

export class DealService {
  private dealRepo = new Repository<Deal>('deals');

  private stageProbabilities: Record<DealStage, number> = {
    Discovery: 20,
    Demo: 40,
    Proposal: 60,
    Negotiation: 80,
    Won: 100,
    Lost: 0
  };

  public async getDeals(stage?: string, ownerId?: string): Promise<Deal[]> {
    let q = this.dealRepo.query();
    if (stage && stage !== 'All') q = q.where('stage', '=', stage);
    if (ownerId) q = q.where('ownerId', '=', ownerId);
    return q.orderBy('amount', 'desc').get();
  }

  public async getDealById(id: string): Promise<Deal> {
    const deal = this.dealRepo.findById(id);
    if (!deal) throw new NotFoundError(`Deal with ID '${id}' not found`);
    return deal;
  }

  public async createDeal(dto: {
    title: string;
    accountId: string;
    amount: number;
    stage?: DealStage;
    expectedCloseDate: string;
    ownerId: string;
    primaryContactId?: string;
  }, actorId?: string): Promise<Deal> {
    if (!dto.title || !dto.accountId || dto.amount === undefined || !dto.expectedCloseDate) {
      throw new ValidationError('Title, account, amount, and close date are required');
    }

    const stage = dto.stage || 'Discovery';
    const probability = this.stageProbabilities[stage] || 20;

    const created = this.dealRepo.create({
      title: dto.title.trim(),
      accountId: dto.accountId,
      amount: Number(dto.amount),
      currency: 'USD',
      stage,
      probability,
      expectedCloseDate: dto.expectedCloseDate,
      ownerId: dto.ownerId,
      primaryContactId: dto.primaryContactId
    });

    await eventBus.emit('deal.created', created, actorId);
    logger.audit('DEAL_CREATE', { entityId: created.id, amount: created.amount, actorId }, 'DEAL_SERVICE');

    return created;
  }

  public async updateDealStage(id: string, newStage: DealStage, actorId?: string): Promise<Deal> {
    const deal = await this.getDealById(id);
    const probability = this.stageProbabilities[newStage];
    
    const updates: Partial<Deal> = {
      stage: newStage,
      probability,
      closedAt: ['Won', 'Lost'].includes(newStage) ? new Date().toISOString() : undefined
    };

    const updated = this.dealRepo.update(id, updates);
    if (!updated) throw new NotFoundError(`Deal '${id}' not found`);

    await eventBus.emit('deal.stage_changed', { dealId: id, from: deal.stage, to: newStage, amount: deal.amount }, actorId);
    
    if (newStage === 'Won') {
      await eventBus.emit('deal.won', updated, actorId);
    }

    return updated;
  }

  public async getPipelineMetrics(): Promise<DealPipelineMetricsDTO> {
    const allDeals = this.dealRepo.findAll();
    let totalValue = 0;
    let weightedValue = 0;
    let wonCount = 0;
    let closedCount = 0;

    const countByStage: Record<DealStage, { count: number; totalValue: number }> = {
      Discovery: { count: 0, totalValue: 0 },
      Demo: { count: 0, totalValue: 0 },
      Proposal: { count: 0, totalValue: 0 },
      Negotiation: { count: 0, totalValue: 0 },
      Won: { count: 0, totalValue: 0 },
      Lost: { count: 0, totalValue: 0 }
    };

    for (const d of allDeals) {
      totalValue += d.amount;
      weightedValue += (d.amount * (d.probability / 100));

      if (countByStage[d.stage]) {
        countByStage[d.stage].count++;
        countByStage[d.stage].totalValue += d.amount;
      }

      if (d.stage === 'Won') {
        wonCount++;
        closedCount++;
      } else if (d.stage === 'Lost') {
        closedCount++;
      }
    }

    const winRate = closedCount > 0 ? Math.round((wonCount / closedCount) * 100) : 0;
    const avgDeal = allDeals.length > 0 ? Math.round(totalValue / allDeals.length) : 0;

    return {
      totalPipelineValue: totalValue,
      weightedPipelineValue: Math.round(weightedValue),
      dealsCountByStage: countByStage,
      averageDealSize: avgDeal,
      winRatePercentage: winRate
    };
  }
}
