/**
 * Customer / Account 360 Domain Models
 */

import { BaseEntity } from '../database/repository';
import { Contact } from './contact.model';
import { Deal } from './deal.model';
import { SupportTicket } from './ticket.model';
import { Activity } from './activity.model';

export type CustomerTier = 'Enterprise' | 'Growth' | 'Startup' | 'Standard';
export type ChurnRiskLevel = 'low' | 'medium' | 'high' | 'critical';

export interface CustomerAccount extends BaseEntity {
  name: string;
  domain?: string;
  industry?: string;
  tier: CustomerTier;
  annualRevenue: number;
  employeeCount: number;
  healthScore: number; // 0 - 100
  churnRisk: ChurnRiskLevel;
  lifetimeValue: number;
  ownerId?: string;
  parentAccountId?: string;
  status: 'active' | 'churned' | 'prospect' | 'onboarding';
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: string;
  };
  tags: string[];
  customFields: Record<string, any>;
}

export interface Customer360ViewDTO {
  account: CustomerAccount;
  contacts: Contact[];
  deals: Deal[];
  openTickets: SupportTicket[];
  recentActivities: Activity[];
  totalPipelineValue: number;
  totalWonRevenue: number;
  healthScoreBreakdown: {
    score: number;
    activityRecencyScore: number;
    supportTicketScore: number;
    dealProgressionScore: number;
    npsScore: number;
    recommendation: string;
  };
}

export interface CreateCustomerDTO {
  name: string;
  domain?: string;
  industry?: string;
  tier?: CustomerTier;
  annualRevenue?: number;
  employeeCount?: number;
  ownerId?: string;
  address?: CustomerAccount['address'];
  tags?: string[];
  customFields?: Record<string, any>;
}
