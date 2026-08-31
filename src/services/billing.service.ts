/**
 * Billing, Invoicing & Contract Revenue Service
 */

import { Repository } from '../database/repository';
import { Invoice, InvoiceItem, InvoiceStatus } from '../models/billing.model';
import { ValidationError, NotFoundError } from '../core/errors';
import { eventBus } from '../core/events';

export class BillingService {
  private invoiceRepo = new Repository<Invoice>('invoices');

  public async getInvoices(status?: string, accountId?: string): Promise<Invoice[]> {
    let q = this.invoiceRepo.query();
    if (status && status !== 'All') q = q.where('status', '=', status);
    if (accountId) q = q.where('accountId', '=', accountId);
    return q.orderBy('issueDate', 'desc').get();
  }

  public async getInvoiceById(id: string): Promise<Invoice> {
    const inv = this.invoiceRepo.findById(id);
    if (!inv) throw new NotFoundError(`Invoice '${id}' not found`);
    return inv;
  }

  public async createInvoice(dto: {
    accountId: string;
    dealId?: string;
    items: InvoiceItem[];
    taxRate?: number;
    discountAmount?: number;
    dueDate: string;
  }): Promise<Invoice> {
    if (!dto.accountId || !dto.items || dto.items.length === 0) {
      throw new ValidationError('Account ID and at least one line item are required');
    }

    const subtotal = dto.items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    const taxRate = dto.taxRate || 8.0;
    const taxAmount = (subtotal * taxRate) / 100;
    const discount = dto.discountAmount || 0;
    const total = Math.max(0, subtotal + taxAmount - discount);

    const invoiceNumber = `INV-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

    const created = this.invoiceRepo.create({
      invoiceNumber,
      accountId: dto.accountId,
      dealId: dto.dealId,
      subtotal,
      taxRate,
      taxAmount,
      discountAmount: discount,
      total,
      currency: 'USD',
      status: 'Sent',
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: dto.dueDate,
      items: dto.items
    });

    await eventBus.emit('invoice.created', created);
    return created;
  }

  public async markAsPaid(id: string): Promise<Invoice> {
    const updated = this.invoiceRepo.update(id, {
      status: 'Paid',
      paidAt: new Date().toISOString()
    });
    if (!updated) throw new NotFoundError(`Invoice '${id}' not found`);

    await eventBus.emit('invoice.paid', updated);
    return updated;
  }
}
