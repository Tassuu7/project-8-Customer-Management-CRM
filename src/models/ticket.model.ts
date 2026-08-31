/**
 * Support Ticket & Customer Service Models
 */

import { BaseEntity } from '../database/repository';

export type TicketPriority = 'Urgent' | 'High' | 'Medium' | 'Low';
export type TicketStatus = 'Open' | 'In Progress' | 'Waiting' | 'Resolved' | 'Closed';
export type TicketChannel = 'Email' | 'Phone' | 'Chat' | 'Portal';

export interface SupportTicket extends BaseEntity {
  ticketNumber: string;
  subject: string;
  description: string;
  accountId: string;
  contactId?: string;
  assigneeId?: string;
  priority: TicketPriority;
  status: TicketStatus;
  channel: TicketChannel;
  slaPolicyId?: string;
  firstResponseDueAt?: string;
  firstResponseAt?: string;
  resolutionDueAt?: string;
  resolvedAt?: string;
  isSlaBreached: boolean;
  csatScore?: number; // 1 - 5
}

export interface TicketMessage extends BaseEntity {
  ticketId: string;
  senderId: string;
  senderType: 'agent' | 'customer' | 'system';
  body: string;
  isInternalNote: boolean;
  attachments: string[];
}
