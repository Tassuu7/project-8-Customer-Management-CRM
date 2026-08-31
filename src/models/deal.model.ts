/**
 * Deal & Opportunity Pipeline Models
 */

import { BaseEntity } from '../database/repository';

export type DealStage = 'Discovery' | 'Demo' | 'Proposal' | 'Negotiation' | 'Won' | 'Lost';

export interface Deal extends BaseEntity {
  title: string;
  accountId: string;
  primaryContactId?: string;
  amount: number;
  currency: string;
  stage: DealStage;
  probability: number; // 0 - 100%
  expectedCloseDate: string;
  closedAt?: string;
  lossReason?: string;
  ownerId: string;
}

export interface DealPipelineMetricsDTO {
  totalPipelineValue: number;
  weightedPipelineValue: number;
  dealsCountByStage: Record<DealStage, { count: number; totalValue: number }>;
  averageDealSize: number;
  winRatePercentage: number;
}
