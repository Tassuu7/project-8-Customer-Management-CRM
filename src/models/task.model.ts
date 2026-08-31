/**
 * Operational Task & Action Item Models
 */

import { BaseEntity } from '../database/repository';

export type TaskPriority = 'Urgent' | 'High' | 'Medium' | 'Low';
export type TaskStatus = 'Pending' | 'In Progress' | 'Completed' | 'Cancelled';

export interface Task extends BaseEntity {
  title: string;
  description?: string;
  dueDate: string;
  priority: TaskPriority;
  status: TaskStatus;
  assigneeId: string;
  accountId?: string;
  completedAt?: string;
}
