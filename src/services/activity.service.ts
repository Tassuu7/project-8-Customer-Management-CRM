/**
 * Omnichannel Activity & Communication Service
 */

import { Repository } from '../database/repository';
import { Activity, ActivityType } from '../models/activity.model';
import { ValidationError, NotFoundError } from '../core/errors';
import { eventBus } from '../core/events';

export class ActivityService {
  private activityRepo: Repository<Activity>;

  constructor() {
    this.activityRepo = new Repository<Activity>('activities');
  }

  public async logActivity(
    type: ActivityType,
    title: string,
    userId: string,
    options: {
      description?: string;
      accountId?: string;
      contactId?: string;
      dealId?: string;
      durationMinutes?: number;
      outcome?: string;
      performedAt?: string;
    } = {}
  ): Promise<Activity> {
    if (!title || title.trim() === '') {
      throw new ValidationError('Activity title is required');
    }

    const created = this.activityRepo.create({
      type,
      title: title.trim(),
      description: options.description,
      accountId: options.accountId,
      contactId: options.contactId,
      dealId: options.dealId,
      userId,
      durationMinutes: options.durationMinutes || 0,
      outcome: options.outcome,
      performedAt: options.performedAt || new Date().toISOString()
    });

    await eventBus.emit('activity.logged', created, userId);
    return created;
  }

  public async getTimeline(accountId?: string, limit = 50): Promise<Activity[]> {
    let q = this.activityRepo.query();
    if (accountId) {
      q = q.where('accountId', '=', accountId);
    }
    return q.orderBy('performedAt', 'desc').limit(limit).get();
  }
}
