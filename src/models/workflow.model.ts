/**
 * Automation Workflow Models
 */

import { BaseEntity } from '../database/repository';

export interface WorkflowCondition {
  field: string;
  operator: '=' | '!=' | '>' | '>=' | '<' | '<=' | 'IN' | 'CONTAINS';
  value: any;
}

export interface WorkflowAction {
  type: 'assign_user' | 'send_email' | 'send_notification' | 'create_task' | 'update_field' | 'escalate_ticket';
  targetUserId?: string;
  targetRole?: string;
  template?: string;
  recipient?: string;
  title?: string;
  dueDays?: number;
  field?: string;
  value?: any;
}

export interface WorkflowRule extends BaseEntity {
  name: string;
  description?: string;
  triggerEvent: string; // e.g. 'lead.created', 'ticket.sla_warning', 'deal.won'
  conditions: WorkflowCondition[];
  actions: WorkflowAction[];
  isActive: boolean;
  executionCount: number;
  lastExecutedAt?: string;
}
