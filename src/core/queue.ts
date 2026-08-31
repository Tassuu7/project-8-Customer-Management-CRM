/**
 * Asynchronous Background Job Queue with Retry Strategy & Priority Handling
 */

import { logger } from './logger';

export interface Job<T = any> {
  id: string;
  name: string;
  data: T;
  priority: number;
  attempts: number;
  maxAttempts: number;
  createdAt: string;
}

export type JobHandler<T = any> = (job: Job<T>) => Promise<void>;

export class JobQueue {
  private static instance: JobQueue;
  private queue: Job[] = [];
  private handlers = new Map<string, JobHandler>();
  private isProcessing = false;

  public static getInstance(): JobQueue {
    if (!JobQueue.instance) {
      JobQueue.instance = new JobQueue();
    }
    return JobQueue.instance;
  }

  public registerHandler<T>(name: string, handler: JobHandler<T>): void {
    this.handlers.set(name, handler);
  }

  public enqueue<T>(name: string, data: T, priority = 5, maxAttempts = 3): string {
    const job: Job<T> = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      data,
      priority,
      attempts: 0,
      maxAttempts,
      createdAt: new Date().toISOString()
    };

    this.queue.push(job);
    this.queue.sort((a, b) => b.priority - a.priority);
    this.triggerProcessing();
    return job.id;
  }

  private async triggerProcessing(): Promise<void> {
    if (this.isProcessing) return;
    this.isProcessing = true;

    while (this.queue.length > 0) {
      const job = this.queue.shift()!;
      const handler = this.handlers.get(job.name);

      if (!handler) {
        logger.warn(`[JobQueue] No handler registered for job: ${job.name}`);
        continue;
      }

      job.attempts++;
      try {
        await handler(job);
      } catch (err: any) {
        logger.error(`[JobQueue] Failed to execute job ${job.name} (attempt ${job.attempts})`, err);
        if (job.attempts < job.maxAttempts) {
          this.queue.push(job);
        }
      }
    }

    this.isProcessing = false;
  }
}

export const jobQueue = JobQueue.getInstance();
