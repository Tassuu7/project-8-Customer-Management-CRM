/**
 * Omnichannel Activity, Communications & Timeline Models
 */

import { BaseEntity } from '../database/repository';

export type ActivityType = 'Call' | 'Email' | 'Meeting' | 'Note' | 'Task' | 'Event';

export interface Activity extends BaseEntity {
  type: ActivityType;
  title: string;
  description?: string;
  accountId?: string;
  contactId?: string;
  dealId?: string;
  userId: string;
  durationMinutes: number;
  outcome?: string;
  performedAt: string;
}
