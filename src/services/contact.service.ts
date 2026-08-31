/**
 * Contact Hierarchy & Profile Service
 */

import { Repository } from '../database/repository';
import { Contact, CreateContactDTO } from '../models/contact.model';
import { NotFoundError, ValidationError } from '../core/errors';
import { eventBus } from '../core/events';

export class ContactService {
  private contactRepo: Repository<Contact>;

  constructor() {
    this.contactRepo = new Repository<Contact>('contacts');
  }

  public async getContactsByAccount(accountId: string): Promise<Contact[]> {
    return this.contactRepo.query().where('accountId', '=', accountId).get();
  }

  public async getContactById(id: string): Promise<Contact> {
    const contact = this.contactRepo.findById(id);
    if (!contact) {
      throw new NotFoundError(`Contact with ID '${id}' not found`);
    }
    return contact;
  }

  public async createContact(dto: CreateContactDTO, actorId?: string): Promise<Contact> {
    if (!dto.firstName || !dto.lastName || !dto.email) {
      throw new ValidationError('First name, last name, and email are required');
    }

    const created = this.contactRepo.create({
      accountId: dto.accountId,
      firstName: dto.firstName.trim(),
      lastName: dto.lastName.trim(),
      email: dto.email.toLowerCase().trim(),
      phone: dto.phone,
      title: dto.title,
      department: dto.department,
      isPrimary: dto.isPrimary || false,
      status: 'active'
    });

    await eventBus.emit('contact.created', created, actorId);
    return created;
  }

  public async updateContact(id: string, updates: Partial<Contact>, actorId?: string): Promise<Contact> {
    const updated = this.contactRepo.update(id, updates);
    if (!updated) {
      throw new NotFoundError(`Contact with ID '${id}' not found`);
    }
    await eventBus.emit('contact.updated', updated, actorId);
    return updated;
  }

  public async deleteContact(id: string, actorId?: string): Promise<boolean> {
    const success = this.contactRepo.delete(id);
    if (success) {
      await eventBus.emit('contact.deleted', { id }, actorId);
    }
    return success;
  }
}
