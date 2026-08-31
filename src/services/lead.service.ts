/**
 * Lead Qualification, Scoring & 1-Click Conversion Engine
 */

import { Repository } from '../database/repository';
import { Lead, ConvertLeadDTO, LeadStatus, LeadSource } from '../models/lead.model';
import { CustomerAccount } from '../models/customer.model';
import { Contact } from '../models/contact.model';
import { Deal } from '../models/deal.model';
import { ValidationError, NotFoundError } from '../core/errors';
import { eventBus } from '../core/events';
import { logger } from '../core/logger';

export class LeadService {
  private leadRepo = new Repository<Lead>('leads');
  private accountRepo = new Repository<CustomerAccount>('accounts');
  private contactRepo = new Repository<Contact>('contacts');
  private dealRepo = new Repository<Deal>('deals');

  public async getLeads(status?: string, source?: string, minScore?: number): Promise<Lead[]> {
    let q = this.leadRepo.query();
    if (status && status !== 'All') q = q.where('status', '=', status);
    if (source && source !== 'All') q = q.where('source', '=', source);
    if (minScore) q = q.where('score', '>=', minScore);
    return q.orderBy('score', 'desc').get();
  }

  public async getLeadById(id: string): Promise<Lead> {
    const lead = this.leadRepo.findById(id);
    if (!lead) throw new NotFoundError(`Lead with ID '${id}' not found`);
    return lead;
  }

  public async createLead(dto: {
    firstName: string;
    lastName: string;
    company: string;
    email: string;
    phone?: string;
    source: LeadSource;
    estimatedBudget?: number;
    ownerId?: string;
    qualificationNotes?: string;
  }, actorId?: string): Promise<Lead> {
    if (!dto.firstName || !dto.lastName || !dto.company || !dto.email) {
      throw new ValidationError('First name, last name, company, and email are required');
    }

    const calculatedScore = this.computeInitialLeadScore(dto.source, dto.estimatedBudget || 0, dto.email);

    const created = this.leadRepo.create({
      firstName: dto.firstName.trim(),
      lastName: dto.lastName.trim(),
      company: dto.company.trim(),
      email: dto.email.toLowerCase().trim(),
      phone: dto.phone,
      source: dto.source,
      status: 'New',
      score: calculatedScore,
      estimatedBudget: dto.estimatedBudget || 0,
      ownerId: dto.ownerId,
      qualificationNotes: dto.qualificationNotes
    });

    await eventBus.emit('lead.created', created, actorId);
    logger.audit('LEAD_CREATE', { entityId: created.id, entityType: 'Lead', actorId }, 'LEAD_SERVICE');

    return created;
  }

  public async updateLeadStatus(id: string, status: LeadStatus, actorId?: string): Promise<Lead> {
    const lead = await this.getLeadById(id);
    const updated = this.leadRepo.update(id, { status });
    if (!updated) throw new NotFoundError(`Lead '${id}' not found`);

    await eventBus.emit('lead.status_changed', { leadId: id, from: lead.status, to: status }, actorId);
    return updated;
  }

  public async convertLead(dto: ConvertLeadDTO, actorId?: string): Promise<{
    account: CustomerAccount;
    contact: Contact;
    deal?: Deal;
  }> {
    const lead = await this.getLeadById(dto.leadId);
    if (lead.status === 'Converted') {
      throw new ValidationError('Lead is already converted');
    }

    // 1. Create Corporate Account
    const account = this.accountRepo.create({
      name: dto.accountName || lead.company,
      domain: `${lead.company.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`,
      industry: 'General',
      tier: 'Standard',
      annualRevenue: lead.estimatedBudget * 2 || 0,
      employeeCount: 20,
      healthScore: 85,
      churnRisk: 'low',
      lifetimeValue: 0,
      ownerId: lead.ownerId,
      status: 'active',
      tags: ['Converted_Lead', lead.source],
      customFields: {}
    });

    // 2. Create Primary Contact
    const contact = this.contactRepo.create({
      accountId: account.id,
      firstName: lead.firstName,
      lastName: lead.lastName,
      email: lead.email,
      phone: lead.phone,
      title: 'Primary Decision Maker',
      isPrimary: true,
      status: 'active'
    });

    // 3. Create Deal if requested
    let deal: Deal | undefined;
    if (dto.createDeal) {
      deal = this.dealRepo.create({
        title: dto.dealTitle || `${lead.company} - Initial Solution License`,
        accountId: account.id,
        primaryContactId: contact.id,
        amount: dto.dealAmount || lead.estimatedBudget || 50000,
        currency: 'USD',
        stage: (dto.dealStage as any) || 'Discovery',
        probability: 30,
        expectedCloseDate: dto.expectedCloseDate || new Date(Date.now() + 60 * 86400000).toISOString().split('T')[0],
        ownerId: lead.ownerId || 'usr-sales-01'
      });
    }

    // Mark Lead as Converted
    this.leadRepo.update(lead.id, {
      status: 'Converted',
      convertedAccountId: account.id
    });

    await eventBus.emit('lead.converted', { leadId: lead.id, accountId: account.id, contactId: contact.id, dealId: deal?.id }, actorId);
    logger.audit('LEAD_CONVERT', { leadId: lead.id, accountId: account.id, actorId }, 'LEAD_SERVICE');

    return { account, contact, deal };
  }

  private computeInitialLeadScore(source: LeadSource, budget: number, email: string): number {
    let score = 40;
    if (source === 'Referral') score += 30;
    else if (source === 'Inbound') score += 25;
    else if (source === 'Website') score += 15;
    else if (source === 'Event') score += 20;

    if (budget > 100000) score += 25;
    else if (budget > 50000) score += 15;
    else if (budget > 10000) score += 5;

    // Corporate email check
    const isFree = /@(gmail|yahoo|hotmail|outlook)\./.test(email);
    if (!isFree) score += 10;

    return Math.min(100, score);
  }
}
