/**
 * Audit Trail & Change-Data-Capture Models
 */

import { BaseEntity } from '../database/repository';

export interface AuditLogEntry extends BaseEntity {
  entityType: string;
  entityId: string;
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'EXPORT' | 'STATUS_CHANGE';
  actorId?: string;
  actorEmail?: string;
  ipAddress?: string;
  diff?: {
    previousState?: any;
    newState?: any;
  };
  timestamp: string;
}
