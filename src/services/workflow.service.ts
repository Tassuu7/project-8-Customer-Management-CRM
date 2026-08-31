/**
 * Event-Driven Automation Workflow Engine
 */

import { Repository } from '../database/repository';
import { WorkflowRule, WorkflowCondition, WorkflowAction } from '../models/workflow.model';
import { ValidationError, NotFoundError } from '../core/errors';
import { eventBus } from '../core/events';
import { logger } from '../core/logger';

export class WorkflowService {
  private workflowRepo = new Repository<WorkflowRule>('workflows');

  constructor() {
    this.registerEventTriggers();
  }

  private registerEventTriggers(): void {
    const events = ['lead.created', 'ticket.created', 'ticket.sla_warning', 'deal.won', 'customer.created'];
    for (const evt of events) {
      eventBus.on(evt, async (payload) => {
        await this.evaluateWorkflowsForEvent(evt, payload);
      });
    }
  }

  public async getWorkflows(): Promise<WorkflowRule[]> {
    return this.workflowRepo.findAll();
  }

  public async createWorkflow(dto: {
    name: string;
    description?: string;
    triggerEvent: string;
    conditions: WorkflowCondition[];
    actions: WorkflowAction[];
  }): Promise<WorkflowRule> {
    if (!dto.name || !dto.triggerEvent || !dto.actions || dto.actions.length === 0) {
      throw new ValidationError('Name, trigger event, and actions are required');
    }

    return this.workflowRepo.create({
      name: dto.name.trim(),
      description: dto.description,
      triggerEvent: dto.triggerEvent,
      conditions: dto.conditions || [],
      actions: dto.actions,
      isActive: true,
      executionCount: 0
    });
  }

  public async toggleWorkflow(id: string, isActive: boolean): Promise<WorkflowRule> {
    const updated = this.workflowRepo.update(id, { isActive });
    if (!updated) throw new NotFoundError(`Workflow '${id}' not found`);
    return updated;
  }

  public async evaluateWorkflowsForEvent(eventName: string, payload: any): Promise<void> {
    const activeRules = this.workflowRepo.query()
      .where('triggerEvent', '=', eventName)
      .where('isActive', '=', true)
      .get();

    for (const rule of activeRules) {
      const match = this.evaluateConditions(rule.conditions, payload);
      if (match) {
        await this.executeActions(rule, payload);
      }
    }
  }

  private evaluateConditions(conditions: WorkflowCondition[], payload: any): boolean {
    if (!conditions || conditions.length === 0) return true;

    for (const cond of conditions) {
      const val = payload[cond.field];
      switch (cond.operator) {
        case '=':
          if (val !== cond.value) return false;
          break;
        case '!=':
          if (val === cond.value) return false;
          break;
        case '>=':
          if (Number(val) < Number(cond.value)) return false;
          break;
        case '<=':
          if (Number(val) > Number(cond.value)) return false;
          break;
        default:
          break;
      }
    }
    return true;
  }

  private async executeActions(rule: WorkflowRule, payload: any): Promise<void> {
    logger.info(`[WorkflowEngine] Executing automation '${rule.name}' for trigger '${rule.triggerEvent}'`, 'WORKFLOW');

    for (const act of rule.actions) {
      logger.info(`[WorkflowAction] Dispatched action: ${act.type}`, 'WORKFLOW', { target: act.targetUserId || act.recipient });
    }

    this.workflowRepo.update(rule.id, {
      executionCount: rule.executionCount + 1,
      lastExecutedAt: new Date().toISOString()
    });
  }
}
