/**
 * Sales Lead & Qualification Models
 */

import { BaseEntity } from '../database/repository';

export type LeadSource = 'Inbound' | 'Outbound' | 'Referral' | 'Website' | 'Event' | 'Partner';
export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Unqualified' | 'Converted';

export interface Lead extends BaseEntity {
  firstName: string;
  lastName: string;
  company: string;
  email: string;
  phone?: string;
  source: LeadSource;
  status: LeadStatus;
  score: number; // 0 - 100
  estimatedBudget: number;
  ownerId?: string;
  qualificationNotes?: string;
  convertedAccountId?: string;
}

export interface ConvertLeadDTO {
  leadId: string;
  accountName?: string;
  createDeal: boolean;
  dealTitle?: string;
  dealAmount?: number;
  dealStage?: string;
  expectedCloseDate?: string;
}
