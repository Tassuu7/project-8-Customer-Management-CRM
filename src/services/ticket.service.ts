/**
 * Service Desk & Ticket Lifecycle Management Service
 */

import { Repository } from '../database/repository';
import { SupportTicket, TicketMessage, TicketPriority, TicketStatus } from '../models/ticket.model';
import { ValidationError, NotFoundError } from '../core/errors';
import { eventBus } from '../core/events';
import { logger } from '../core/logger';

export class TicketService {
  private ticketRepo = new Repository<SupportTicket>('tickets');
  private messageRepo = new Repository<TicketMessage>('ticket_messages');

  public async getTickets(status?: string, priority?: string, accountId?: string): Promise<SupportTicket[]> {
    let q = this.ticketRepo.query();
    if (status && status !== 'All') q = q.where('status', '=', status);
    if (priority && priority !== 'All') q = q.where('priority', '=', priority);
    if (accountId) q = q.where('accountId', '=', accountId);
    return q.orderBy('createdAt', 'desc').get();
  }

  public async getTicketById(id: string): Promise<SupportTicket> {
    const ticket = this.ticketRepo.findById(id);
    if (!ticket) throw new NotFoundError(`Ticket with ID '${id}' not found`);
    return ticket;
  }

  public async getTicketThread(ticketId: string): Promise<TicketMessage[]> {
    await this.getTicketById(ticketId);
    return this.messageRepo.query().where('ticketId', '=', ticketId).orderBy('createdAt', 'asc').get();
  }

  public async createTicket(dto: {
    subject: string;
    description: string;
    accountId: string;
    contactId?: string;
    priority?: TicketPriority;
    assigneeId?: string;
  }, actorId?: string): Promise<SupportTicket> {
    if (!dto.subject || !dto.description || !dto.accountId) {
      throw new ValidationError('Subject, description, and account ID are required');
    }

    const priority = dto.priority || 'Medium';
    const now = new Date();
    const firstDueHours = priority === 'Urgent' ? 1 : (priority === 'High' ? 4 : 8);
    const resDueHours = priority === 'Urgent' ? 6 : (priority === 'High' ? 24 : 48);

    const ticketNumber = `INC-${Math.floor(1000 + Math.random() * 9000)}`;

    const created = this.ticketRepo.create({
      ticketNumber,
      subject: dto.subject.trim(),
      description: dto.description.trim(),
      accountId: dto.accountId,
      contactId: dto.contactId,
      assigneeId: dto.assigneeId || 'usr-support-01',
      priority,
      status: 'Open',
      channel: 'Portal',
      firstResponseDueAt: new Date(now.getTime() + firstDueHours * 3600000).toISOString(),
      resolutionDueAt: new Date(now.getTime() + resDueHours * 3600000).toISOString(),
      isSlaBreached: false
    });

    // Add initial message
    this.messageRepo.create({
      ticketId: created.id,
      senderId: actorId || dto.assigneeId || 'usr-support-01',
      senderType: 'agent',
      body: dto.description,
      isInternalNote: false,
      attachments: []
    });

    await eventBus.emit('ticket.created', created, actorId);
    logger.audit('TICKET_CREATE', { ticketNumber, priority, actorId }, 'TICKET_SERVICE');

    return created;
  }

  public async replyToTicket(ticketId: string, senderId: string, body: string, isInternalNote = false): Promise<TicketMessage> {
    const ticket = await this.getTicketById(ticketId);
    if (!body || body.trim() === '') {
      throw new ValidationError('Reply body cannot be empty');
    }

    const msg = this.messageRepo.create({
      ticketId,
      senderId,
      senderType: 'agent',
      body: body.trim(),
      isInternalNote,
      attachments: []
    });

    if (!ticket.firstResponseAt && !isInternalNote) {
      this.ticketRepo.update(ticketId, {
        firstResponseAt: new Date().toISOString(),
        status: ticket.status === 'Open' ? 'In Progress' : ticket.status
      });
    }

    await eventBus.emit('ticket.reply', { ticketId, messageId: msg.id }, senderId);
    return msg;
  }

  public async updateTicketStatus(ticketId: string, status: TicketStatus, csatScore?: number): Promise<SupportTicket> {
    const ticket = await this.getTicketById(ticketId);
    const updates: Partial<SupportTicket> = {
      status,
      resolvedAt: status === 'Resolved' || status === 'Closed' ? new Date().toISOString() : undefined,
      csatScore: csatScore || ticket.csatScore
    };

    const updated = this.ticketRepo.update(ticketId, updates);
    if (!updated) throw new NotFoundError(`Ticket '${ticketId}' not found`);

    await eventBus.emit('ticket.status_changed', { ticketId, from: ticket.status, to: status });
    return updated;
  }
}
