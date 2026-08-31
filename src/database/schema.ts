/**
 * Enterprise Relational Database Schema Definitions
 * Defines metadata, primary keys, indexes, and relations for all CRM domain entities.
 */

export interface TableColumnSchema {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'date' | 'json' | 'array';
  primaryKey?: boolean;
  required?: boolean;
  unique?: boolean;
  indexed?: boolean;
  foreignKey?: {
    table: string;
    column: string;
    onDelete?: 'CASCADE' | 'SET_NULL' | 'RESTRICT';
  };
  defaultValue?: any;
}

export interface TableSchema {
  name: string;
  description: string;
  columns: TableColumnSchema[];
}

export const CRM_TABLE_SCHEMAS: Record<string, TableSchema> = {
  users: {
    name: 'users',
    description: 'System users with authentication credentials and role assignments',
    columns: [
      { name: 'id', type: 'string', primaryKey: true },
      { name: 'email', type: 'string', required: true, unique: true, indexed: true },
      { name: 'passwordHash', type: 'string', required: true },
      { name: 'firstName', type: 'string', required: true },
      { name: 'lastName', type: 'string', required: true },
      { name: 'roleId', type: 'string', required: true, indexed: true, foreignKey: { table: 'roles', column: 'id' } },
      { name: 'status', type: 'string', required: true, defaultValue: 'active' },
      { name: 'avatarUrl', type: 'string' },
      { name: 'department', type: 'string' },
      { name: 'lastLoginAt', type: 'date' },
      { name: 'createdAt', type: 'date', required: true },
      { name: 'updatedAt', type: 'date', required: true }
    ]
  },
  roles: {
    name: 'roles',
    description: 'RBAC Role definitions and permission sets',
    columns: [
      { name: 'id', type: 'string', primaryKey: true },
      { name: 'name', type: 'string', required: true, unique: true },
      { name: 'description', type: 'string' },
      { name: 'permissions', type: 'array', required: true },
      { name: 'isSystem', type: 'boolean', defaultValue: false },
      { name: 'createdAt', type: 'date', required: true }
    ]
  },
  accounts: {
    name: 'accounts',
    description: 'Corporate customer accounts (Companies / Organizations)',
    columns: [
      { name: 'id', type: 'string', primaryKey: true },
      { name: 'name', type: 'string', required: true, indexed: true },
      { name: 'domain', type: 'string', indexed: true },
      { name: 'industry', type: 'string', indexed: true },
      { name: 'tier', type: 'string', required: true, defaultValue: 'Standard' }, // Enterprise, Growth, Startup, Standard
      { name: 'annualRevenue', type: 'number', defaultValue: 0 },
      { name: 'employeeCount', type: 'number', defaultValue: 1 },
      { name: 'healthScore', type: 'number', defaultValue: 85 }, // 0 to 100
      { name: 'churnRisk', type: 'string', defaultValue: 'low' }, // low, medium, high, critical
      { name: 'lifetimeValue', type: 'number', defaultValue: 0 },
      { name: 'ownerId', type: 'string', indexed: true, foreignKey: { table: 'users', column: 'id' } },
      { name: 'parentAccountId', type: 'string', foreignKey: { table: 'accounts', column: 'id' } },
      { name: 'status', type: 'string', required: true, defaultValue: 'active' },
      { name: 'address', type: 'json' },
      { name: 'tags', type: 'array', defaultValue: [] },
      { name: 'customFields', type: 'json', defaultValue: {} },
      { name: 'createdAt', type: 'date', required: true },
      { name: 'updatedAt', type: 'date', required: true }
    ]
  },
  contacts: {
    name: 'contacts',
    description: 'Individual business contacts linked to customer accounts',
    columns: [
      { name: 'id', type: 'string', primaryKey: true },
      { name: 'accountId', type: 'string', required: true, indexed: true, foreignKey: { table: 'accounts', column: 'id' } },
      { name: 'firstName', type: 'string', required: true },
      { name: 'lastName', type: 'string', required: true },
      { name: 'email', type: 'string', required: true, indexed: true },
      { name: 'phone', type: 'string' },
      { name: 'title', type: 'string' },
      { name: 'department', type: 'string' },
      { name: 'isPrimary', type: 'boolean', defaultValue: false },
      { name: 'status', type: 'string', defaultValue: 'active' },
      { name: 'linkedInUrl', type: 'string' },
      { name: 'createdAt', type: 'date', required: true },
      { name: 'updatedAt', type: 'date', required: true }
    ]
  },
  leads: {
    name: 'leads',
    description: 'Prospective sales leads with scoring and qualification stages',
    columns: [
      { name: 'id', type: 'string', primaryKey: true },
      { name: 'firstName', type: 'string', required: true },
      { name: 'lastName', type: 'string', required: true },
      { name: 'company', type: 'string', required: true, indexed: true },
      { name: 'email', type: 'string', required: true, indexed: true },
      { name: 'phone', type: 'string' },
      { name: 'source', type: 'string', required: true }, // Inbound, Outbound, Referral, Website, Event
      { name: 'status', type: 'string', required: true, defaultValue: 'New' }, // New, Contacted, Qualified, Unqualified, Converted
      { name: 'score', type: 'number', defaultValue: 50 }, // 0 to 100
      { name: 'estimatedBudget', type: 'number', defaultValue: 0 },
      { name: 'ownerId', type: 'string', indexed: true, foreignKey: { table: 'users', column: 'id' } },
      { name: 'qualificationNotes', type: 'string' },
      { name: 'convertedAccountId', type: 'string', foreignKey: { table: 'accounts', column: 'id' } },
      { name: 'createdAt', type: 'date', required: true },
      { name: 'updatedAt', type: 'date', required: true }
    ]
  },
  deals: {
    name: 'deals',
    description: 'Sales pipeline opportunities across stages',
    columns: [
      { name: 'id', type: 'string', primaryKey: true },
      { name: 'title', type: 'string', required: true },
      { name: 'accountId', type: 'string', required: true, indexed: true, foreignKey: { table: 'accounts', column: 'id' } },
      { name: 'primaryContactId', type: 'string', foreignKey: { table: 'contacts', column: 'id' } },
      { name: 'amount', type: 'number', required: true },
      { name: 'currency', type: 'string', defaultValue: 'USD' },
      { name: 'stage', type: 'string', required: true, indexed: true }, // Discovery, Demo, Proposal, Negotiation, Won, Lost
      { name: 'probability', type: 'number', required: true }, // 0 - 100%
      { name: 'expectedCloseDate', type: 'date', required: true },
      { name: 'closedAt', type: 'date' },
      { name: 'lossReason', type: 'string' },
      { name: 'ownerId', type: 'string', required: true, indexed: true, foreignKey: { table: 'users', column: 'id' } },
      { name: 'createdAt', type: 'date', required: true },
      { name: 'updatedAt', type: 'date', required: true }
    ]
  },
  tickets: {
    name: 'tickets',
    description: 'Customer service desk tickets with SLA monitoring and priority queues',
    columns: [
      { name: 'id', type: 'string', primaryKey: true },
      { name: 'ticketNumber', type: 'string', required: true, unique: true },
      { name: 'subject', type: 'string', required: true },
      { name: 'description', type: 'string', required: true },
      { name: 'accountId', type: 'string', required: true, indexed: true, foreignKey: { table: 'accounts', column: 'id' } },
      { name: 'contactId', type: 'string', foreignKey: { table: 'contacts', column: 'id' } },
      { name: 'assigneeId', type: 'string', indexed: true, foreignKey: { table: 'users', column: 'id' } },
      { name: 'priority', type: 'string', required: true, defaultValue: 'Medium' }, // Urgent, High, Medium, Low
      { name: 'status', type: 'string', required: true, defaultValue: 'Open' }, // Open, In Progress, Waiting, Resolved, Closed
      { name: 'channel', type: 'string', defaultValue: 'Portal' }, // Email, Phone, Chat, Portal
      { name: 'slaPolicyId', type: 'string', foreignKey: { table: 'sla_policies', column: 'id' } },
      { name: 'firstResponseDueAt', type: 'date' },
      { name: 'firstResponseAt', type: 'date' },
      { name: 'resolutionDueAt', type: 'date' },
      { name: 'resolvedAt', type: 'date' },
      { name: 'isSlaBreached', type: 'boolean', defaultValue: false },
      { name: 'csatScore', type: 'number' }, // 1 to 5
      { name: 'createdAt', type: 'date', required: true },
      { name: 'updatedAt', type: 'date', required: true }
    ]
  },
  ticket_messages: {
    name: 'ticket_messages',
    description: 'Conversational messages and internal team notes on support tickets',
    columns: [
      { name: 'id', type: 'string', primaryKey: true },
      { name: 'ticketId', type: 'string', required: true, indexed: true, foreignKey: { table: 'tickets', column: 'id' } },
      { name: 'senderId', type: 'string', required: true },
      { name: 'senderType', type: 'string', required: true }, // agent, customer, system
      { name: 'body', type: 'string', required: true },
      { name: 'isInternalNote', type: 'boolean', defaultValue: false },
      { name: 'attachments', type: 'array', defaultValue: [] },
      { name: 'createdAt', type: 'date', required: true }
    ]
  },
  activities: {
    name: 'activities',
    description: 'Customer 360 omnichannel activity logs (Calls, Emails, Meetings, Notes)',
    columns: [
      { name: 'id', type: 'string', primaryKey: true },
      { name: 'type', type: 'string', required: true }, // Call, Email, Meeting, Note, Task, Event
      { name: 'title', type: 'string', required: true },
      { name: 'description', type: 'string' },
      { name: 'accountId', type: 'string', indexed: true, foreignKey: { table: 'accounts', column: 'id' } },
      { name: 'contactId', type: 'string', foreignKey: { table: 'contacts', column: 'id' } },
      { name: 'dealId', type: 'string', foreignKey: { table: 'deals', column: 'id' } },
      { name: 'userId', type: 'string', required: true, indexed: true, foreignKey: { table: 'users', column: 'id' } },
      { name: 'durationMinutes', type: 'number', defaultValue: 0 },
      { name: 'outcome', type: 'string' },
      { name: 'performedAt', type: 'date', required: true },
      { name: 'createdAt', type: 'date', required: true }
    ]
  },
  tasks: {
    name: 'tasks',
    description: 'Operational tasks and scheduled action items',
    columns: [
      { name: 'id', type: 'string', primaryKey: true },
      { name: 'title', type: 'string', required: true },
      { name: 'description', type: 'string' },
      { name: 'dueDate', type: 'date', required: true, indexed: true },
      { name: 'priority', type: 'string', defaultValue: 'Medium' },
      { name: 'status', type: 'string', defaultValue: 'Pending' }, // Pending, In Progress, Completed, Cancelled
      { name: 'assigneeId', type: 'string', required: true, indexed: true, foreignKey: { table: 'users', column: 'id' } },
      { name: 'accountId', type: 'string', foreignKey: { table: 'accounts', column: 'id' } },
      { name: 'completedAt', type: 'date' },
      { name: 'createdAt', type: 'date', required: true },
      { name: 'updatedAt', type: 'date', required: true }
    ]
  },
  invoices: {
    name: 'invoices',
    description: 'Billing records, line items, and invoice payment statuses',
    columns: [
      { name: 'id', type: 'string', primaryKey: true },
      { name: 'invoiceNumber', type: 'string', required: true, unique: true },
      { name: 'accountId', type: 'string', required: true, indexed: true, foreignKey: { table: 'accounts', column: 'id' } },
      { name: 'dealId', type: 'string', foreignKey: { table: 'deals', column: 'id' } },
      { name: 'subtotal', type: 'number', required: true },
      { name: 'taxRate', type: 'number', defaultValue: 0 },
      { name: 'taxAmount', type: 'number', defaultValue: 0 },
      { name: 'discountAmount', type: 'number', defaultValue: 0 },
      { name: 'total', type: 'number', required: true },
      { name: 'currency', type: 'string', defaultValue: 'USD' },
      { name: 'status', type: 'string', defaultValue: 'Draft' }, // Draft, Sent, Paid, Overdue, Void
      { name: 'issueDate', type: 'date', required: true },
      { name: 'dueDate', type: 'date', required: true },
      { name: 'paidAt', type: 'date' },
      { name: 'items', type: 'array', required: true },
      { name: 'createdAt', type: 'date', required: true },
      { name: 'updatedAt', type: 'date', required: true }
    ]
  },
  workflows: {
    name: 'workflows',
    description: 'Event-driven automation rules and action pipelines',
    columns: [
      { name: 'id', type: 'string', primaryKey: true },
      { name: 'name', type: 'string', required: true },
      { name: 'description', type: 'string' },
      { name: 'triggerEvent', type: 'string', required: true },
      { name: 'conditions', type: 'array', defaultValue: [] },
      { name: 'actions', type: 'array', required: true },
      { name: 'isActive', type: 'boolean', defaultValue: true },
      { name: 'executionCount', type: 'number', defaultValue: 0 },
      { name: 'lastExecutedAt', type: 'date' },
      { name: 'createdAt', type: 'date', required: true },
      { name: 'updatedAt', type: 'date', required: true }
    ]
  },
  audit_logs: {
    name: 'audit_logs',
    description: 'Change-Data-Capture (CDC) immutable audit trail',
    columns: [
      { name: 'id', type: 'string', primaryKey: true },
      { name: 'entityType', type: 'string', required: true, indexed: true },
      { name: 'entityId', type: 'string', required: true, indexed: true },
      { name: 'action', type: 'string', required: true }, // CREATE, UPDATE, DELETE, LOGIN, EXPORT
      { name: 'actorId', type: 'string', indexed: true },
      { name: 'actorEmail', type: 'string' },
      { name: 'ipAddress', type: 'string' },
      { name: 'diff', type: 'json' },
      { name: 'timestamp', type: 'date', required: true, indexed: true }
    ]
  },
  custom_fields: {
    name: 'custom_fields',
    description: 'Dynamic schema custom field definitions',
    columns: [
      { name: 'id', type: 'string', primaryKey: true },
      { name: 'entityType', type: 'string', required: true, indexed: true },
      { name: 'name', type: 'string', required: true },
      { name: 'label', type: 'string', required: true },
      { name: 'fieldType', type: 'string', required: true }, // text, number, date, select, boolean
      { name: 'options', type: 'array' },
      { name: 'isRequired', type: 'boolean', defaultValue: false },
      { name: 'createdAt', type: 'date', required: true }
    ]
  }
};
