/**
 * Invoicing, Quotes & Contracts Models
 */

import { BaseEntity } from '../database/repository';

export interface InvoiceItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export type InvoiceStatus = 'Draft' | 'Sent' | 'Paid' | 'Overdue' | 'Void';

export interface Invoice extends BaseEntity {
  invoiceNumber: string;
  accountId: string;
  dealId?: string;
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  discountAmount: number;
  total: number;
  currency: string;
  status: InvoiceStatus;
  issueDate: string;
  dueDate: string;
  paidAt?: string;
  items: InvoiceItem[];
}
