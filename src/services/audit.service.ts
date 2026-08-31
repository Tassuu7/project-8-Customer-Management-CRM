/**
 * Change-Data-Capture (CDC) Audit Log Query Service
 */

import { Repository } from '../database/repository';
import { AuditLogEntry } from '../models/audit.model';

export class AuditService {
  private auditRepo = new Repository<AuditLogEntry>('audit_logs');

  public async getAuditLogs(entityType?: string, action?: string, page = 1, limit = 25) {
    let q = this.auditRepo.query();
    if (entityType && entityType !== 'All') q = q.where('entityType', '=', entityType);
    if (action && action !== 'All') q = q.where('action', '=', action);

    const total = q.count();
    const items = q.orderBy('timestamp', 'desc')
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
}
