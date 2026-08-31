/**
 * Operational Tasks & Scheduling Service
 */

import { Repository } from '../database/repository';
import { Task, TaskPriority, TaskStatus } from '../models/task.model';
import { ValidationError, NotFoundError } from '../core/errors';
import { eventBus } from '../core/events';

export class TaskService {
  private taskRepo = new Repository<Task>('tasks');

  public async getTasks(assigneeId?: string, status?: string): Promise<Task[]> {
    let q = this.taskRepo.query();
    if (assigneeId) q = q.where('assigneeId', '=', assigneeId);
    if (status && status !== 'All') q = q.where('status', '=', status);
    return q.orderBy('dueDate', 'asc').get();
  }

  public async createTask(dto: {
    title: string;
    description?: string;
    dueDate: string;
    priority?: TaskPriority;
    assigneeId: string;
    accountId?: string;
  }): Promise<Task> {
    if (!dto.title || !dto.dueDate || !dto.assigneeId) {
      throw new ValidationError('Title, due date, and assignee are required');
    }

    const created = this.taskRepo.create({
      title: dto.title.trim(),
      description: dto.description,
      dueDate: dto.dueDate,
      priority: dto.priority || 'Medium',
      status: 'Pending',
      assigneeId: dto.assigneeId,
      accountId: dto.accountId
    });

    await eventBus.emit('task.created', created);
    return created;
  }

  public async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const updates: Partial<Task> = {
      status,
      completedAt: status === 'Completed' ? new Date().toISOString() : undefined
    };

    const updated = this.taskRepo.update(id, updates);
    if (!updated) throw new NotFoundError(`Task with ID '${id}' not found`);

    await eventBus.emit('task.updated', updated);
    return updated;
  }
}
