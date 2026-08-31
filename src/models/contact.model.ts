/**
 * Business Contact Domain Models
 */

import { BaseEntity } from '../database/repository';

export interface Contact extends BaseEntity {
  accountId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  title?: string;
  department?: string;
  isPrimary: boolean;
  status: 'active' | 'inactive';
  linkedInUrl?: string;
}

export interface CreateContactDTO {
  accountId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  title?: string;
  department?: string;
  isPrimary?: boolean;
}
