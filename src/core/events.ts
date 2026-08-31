/**
 * Enterprise Typed Event Bus Module
 */

import { logger } from './logger';

export type EventListener<T = any> = (payload: T) => Promise<void> | void;

export interface EventSubscription {
  id: string;
  eventName: string;
  listener: EventListener;
  priority: number;
  once: boolean;
}

export interface DomainEvent<T = any> {
  id: string;
  eventName: string;
  timestamp: string;
  actorId?: string;
  tenantId?: string;
  payload: T;
}

class EventBus {
  private static instance: EventBus;
  private subscriptions = new Map<string, EventSubscription[]>();
  private history: DomainEvent[] = [];
  private maxHistoryLength = 500;

  private constructor() {}

  public static getInstance(): EventBus {
    if (!EventBus.instance) {
      EventBus.instance = new EventBus();
    }
    return EventBus.instance;
  }

  public on<T = any>(eventName: string, listener: EventListener<T>, priority = 100): () => void {
    const sub: EventSubscription = {
      id: Math.random().toString(36).substring(2, 9),
      eventName,
      listener,
      priority,
      once: false
    };

    if (!this.subscriptions.has(eventName)) {
      this.subscriptions.set(eventName, []);
    }

    const list = this.subscriptions.get(eventName)!;
    list.push(sub);
    list.sort((a, b) => b.priority - a.priority);

    return () => this.off(eventName, sub.id);
  }

  public once<T = any>(eventName: string, listener: EventListener<T>, priority = 100): () => void {
    const sub: EventSubscription = {
      id: Math.random().toString(36).substring(2, 9),
      eventName,
      listener,
      priority,
      once: true
    };

    if (!this.subscriptions.has(eventName)) {
      this.subscriptions.set(eventName, []);
    }

    const list = this.subscriptions.get(eventName)!;
    list.push(sub);
    list.sort((a, b) => b.priority - a.priority);

    return () => this.off(eventName, sub.id);
  }

  public off(eventName: string, subscriptionId: string): void {
    const list = this.subscriptions.get(eventName);
    if (!list) return;

    const filtered = list.filter(s => s.id !== subscriptionId);
    if (filtered.length === 0) {
      this.subscriptions.delete(eventName);
    } else {
      this.subscriptions.set(eventName, filtered);
    }
  }

  public async emit<T = any>(eventName: string, payload: T, actorId?: string): Promise<void> {
    const event: DomainEvent<T> = {
      id: Math.random().toString(36).substring(2, 11),
      eventName,
      timestamp: new Date().toISOString(),
      actorId,
      payload
    };

    this.recordHistory(event);

    const directListeners = this.subscriptions.get(eventName) || [];
    const wildcardListeners = this.getWildcardListeners(eventName);
    const allListeners = [...directListeners, ...wildcardListeners].sort(
      (a, b) => b.priority - a.priority
    );

    for (const sub of allListeners) {
      try {
        await sub.listener(payload);
        if (sub.once) {
          this.off(sub.eventName, sub.id);
        }
      } catch (err: any) {
        logger.error(`[EventBus] Error executing listener for event: ${eventName}`, err, 'EVENT_BUS', {
          subscriptionId: sub.id,
          payload
        });
      }
    }
  }

  private getWildcardListeners(eventName: string): EventSubscription[] {
    const result: EventSubscription[] = [];
    const parts = eventName.split('.');

    for (const [key, list] of this.subscriptions.entries()) {
      if (key.includes('*')) {
        const patternParts = key.split('.');
        if (this.matchPattern(parts, patternParts)) {
          result.push(...list);
        }
      }
    }
    return result;
  }

  private matchPattern(actual: string[], pattern: string[]): boolean {
    if (pattern.length === 1 && pattern[0] === '*') return true;
    if (actual.length !== pattern.length) return false;
    for (let i = 0; i < actual.length; i++) {
      if (pattern[i] !== '*' && pattern[i] !== actual[i]) {
        return false;
      }
    }
    return true;
  }

  private recordHistory(event: DomainEvent): void {
    this.history.push(event);
    if (this.history.length > this.maxHistoryLength) {
      this.history.shift();
    }
  }

  public getRecentEvents(limit = 50): DomainEvent[] {
    return this.history.slice(-limit);
  }
}

export const eventBus = EventBus.getInstance();
