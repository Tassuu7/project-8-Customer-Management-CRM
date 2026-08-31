/**
 * Customer & Account 360 Business Logic Service
 * Implements customer lifecycle, health score computation, churn risk analysis,
 * account hierarchy, lifetime value (LTV) calculation, and 360-degree timeline.
 */

import { Repository } from '../database/repository';
import { CustomerAccount, Customer360ViewDTO, CreateCustomerDTO, ChurnRiskLevel } from '../models/customer.model';
import { Contact } from '../models/contact.model';
import { Deal } from '../models/deal.model';
import { SupportTicket } from '../models/ticket.model';
import { Activity } from '../models/activity.model';
import { NotFoundError, ValidationError } from '../core/errors';
import { eventBus } from '../core/events';
import { logger } from '../core/logger';
import { config } from '../core/config';

export class CustomerService {
  private accountRepo: Repository<CustomerAccount>;
  private contactRepo: Repository<Contact>;
  private dealRepo: Repository<Deal>;
  private ticketRepo: Repository<SupportTicket>;
  private activityRepo: Repository<Activity>;

  constructor() {
    this.accountRepo = new Repository<CustomerAccount>('accounts');
    this.contactRepo = new Repository<Contact>('contacts');
    this.dealRepo = new Repository<Deal>('deals');
    this.ticketRepo = new Repository<SupportTicket>('tickets');
    this.activityRepo = new Repository<Activity>('activities');
  }

  public async getAllAccounts(page = 1, limit = 20, search?: string, tier?: string, churnRisk?: string) {
    let q = this.accountRepo.query();

    if (search && search.trim() !== '') {
      q = q.search(['name', 'domain', 'industry'], search);
    }
    if (tier && tier !== 'All') {
      q = q.where('tier', '=', tier);
    }
    if (churnRisk && churnRisk !== 'All') {
      q = q.where('churnRisk', '=', churnRisk);
    }

    const total = q.count();
    const items = q.orderBy('createdAt', 'desc')
      .offset((page - 1) * limit)
      .limit(limit)
      .get();

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1
    };
  }

  public async getAccountById(id: string): Promise<CustomerAccount> {
    const account = this.accountRepo.findById(id);
    if (!account) {
      throw new NotFoundError(`Customer account with ID '${id}' not found`);
    }
    return account;
  }

  public async getCustomer360View(id: string): Promise<Customer360ViewDTO> {
    const account = await this.getAccountById(id);
    
    // Fetch associated entities
    const contacts = this.contactRepo.query().where('accountId', '=', id).get();
    const deals = this.dealRepo.query().where('accountId', '=', id).get();
    const openTickets = this.ticketRepo.query()
      .where('accountId', '=', id)
      .whereIn('status', ['Open', 'In Progress', 'Waiting'])
      .get();
    const recentActivities = this.activityRepo.query()
      .where('accountId', '=', id)
      .orderBy('performedAt', 'desc')
      .limit(20)
      .get();

    const wonDeals = deals.filter(d => d.stage === 'Won');
    const totalWonRevenue = wonDeals.reduce((sum, d) => sum + d.amount, 0);
    const openDeals = deals.filter(d => !['Won', 'Lost'].includes(d.stage));
    const totalPipelineValue = openDeals.reduce((sum, d) => sum + (d.amount * (d.probability / 100)), 0);

    const healthBreakdown = this.calculateDetailedHealthScore(account, recentActivities, openTickets, deals);

    return {
      account,
      contacts,
      deals,
      openTickets,
      recentActivities,
      totalPipelineValue,
      totalWonRevenue,
      healthScoreBreakdown: healthBreakdown
    };
  }

  public async createAccount(dto: CreateCustomerDTO, actorId?: string): Promise<CustomerAccount> {
    if (!dto.name || dto.name.trim() === '') {
      throw new ValidationError('Customer account name is required');
    }

    const created = this.accountRepo.create({
      name: dto.name.trim(),
      domain: dto.domain,
      industry: dto.industry || 'General',
      tier: dto.tier || 'Standard',
      annualRevenue: dto.annualRevenue || 0,
      employeeCount: dto.employeeCount || 1,
      healthScore: 85,
      churnRisk: 'low',
      lifetimeValue: 0,
      ownerId: dto.ownerId,
      status: 'active',
      address: dto.address,
      tags: dto.tags || [],
      customFields: dto.customFields || {}
    });

    await eventBus.emit('customer.created', created, actorId);
    logger.audit('CUSTOMER_CREATE', { entityId: created.id, entityType: 'Account', actorId }, 'CUSTOMER_SERVICE');

    return created;
  }

  public async updateAccount(id: string, updates: Partial<CustomerAccount>, actorId?: string): Promise<CustomerAccount> {
    const existing = await this.getAccountById(id);
    const updated = this.accountRepo.update(id, updates);

    if (!updated) {
      throw new NotFoundError(`Account with ID '${id}' not found`);
    }

    await eventBus.emit('customer.updated', { previous: existing, current: updated }, actorId);
    logger.audit('CUSTOMER_UPDATE', { entityId: id, entityType: 'Account', actorId }, 'CUSTOMER_SERVICE');

    return updated;
  }

  public async deleteAccount(id: string, actorId?: string): Promise<boolean> {
    await this.getAccountById(id);
    const success = this.accountRepo.delete(id);

    if (success) {
      await eventBus.emit('customer.deleted', { id }, actorId);
      logger.audit('CUSTOMER_DELETE', { entityId: id, entityType: 'Account', actorId }, 'CUSTOMER_SERVICE');
    }
    return success;
  }

  public calculateDetailedHealthScore(
    account: CustomerAccount,
    activities: Activity[],
    openTickets: SupportTicket[],
    deals: Deal[]
  ) {
    const weights = config.crm.healthScoreWeightings;
    
    // 1. Activity Recency Score (0 - 100)
    let activityScore = 100;
    if (activities.length === 0) {
      activityScore = 20;
    } else {
      const lastActivityTime = new Date(activities[0].performedAt).getTime();
      const daysSinceLastActivity = (Date.now() - lastActivityTime) / (1000 * 3600 * 24);
      if (daysSinceLastActivity > 30) activityScore = 40;
      else if (daysSinceLastActivity > 14) activityScore = 70;
      else if (daysSinceLastActivity > 7) activityScore = 85;
      else activityScore = 100;
    }

    // 2. Support Ticket Health Score (0 - 100)
    let ticketScore = 100;
    const urgentTickets = openTickets.filter(t => t.priority === 'Urgent').length;
    const highTickets = openTickets.filter(t => t.priority === 'High').length;
    ticketScore -= (urgentTickets * 30 + highTickets * 15 + openTickets.length * 5);
    if (ticketScore < 0) ticketScore = 0;

    // 3. Deal Progression Score
    let dealScore = 80;
    const wonDeals = deals.filter(d => d.stage === 'Won');
    if (wonDeals.length > 0) dealScore = 100;

    // 4. NPS Score Simulation
    const npsScore = account.healthScore > 80 ? 95 : (account.healthScore < 60 ? 40 : 75);

    // Weighted composite
    const compositeScore = Math.round(
      activityScore * weights.activityRecency +
      ticketScore * weights.openTicketsCount +
      dealScore * weights.dealValue +
      npsScore * weights.npsScore +
      85 * weights.contractRenewalDays
    );

    let churnRisk: ChurnRiskLevel = 'low';
    let recommendation = 'Account is in healthy state. Engage for expansion and upsell.';
    if (compositeScore < 50) {
      churnRisk = 'critical';
      recommendation = 'Critical churn risk: Schedule immediate executive sponsor meeting and resolve blocker tickets.';
    } else if (compositeScore < 70) {
      churnRisk = 'high';
      recommendation = 'High risk detected: Escalate support items and schedule a customer success touchpoint.';
    } else if (compositeScore < 85) {
      churnRisk = 'medium';
      recommendation = 'Moderate engagement: Share new product features and maintain regular touchpoints.';
    }

    return {
      score: compositeScore,
      activityRecencyScore: activityScore,
      supportTicketScore: ticketScore,
      dealProgressionScore: dealScore,
      npsScore,
      churnRisk,
      recommendation
    };
  }
}
