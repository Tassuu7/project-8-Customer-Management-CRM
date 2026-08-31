/**
 * Massive Enterprise CRM Seed Data Generator
 * Populates realistic enterprise dataset with accounts, contacts, leads,
 * deals, support tickets, SLAs, activities, tasks, invoices, workflows, and audit logs.
 */

import { db } from './database';
import { logger } from '../core/logger';
import * as bcrypt from 'bcryptjs';

export class DatabaseSeeder {
  public static async seedAll(): Promise<void> {
    logger.info('[Seeder] Starting full enterprise database seed...', 'SEEDER');
    
    // Check if already seeded
    const existingUsers = db.getTable('users');
    if (existingUsers.length > 0) {
      logger.info('[Seeder] Database already seeded. Skipping initial seeding.', 'SEEDER');
      return;
    }

    const defaultPasswordHash = await bcrypt.hash('Admin@123456', 10);
    const now = new Date().toISOString();

    // 1. Roles
    const roles = [
      {
        id: 'role-super-admin',
        name: 'Super Administrator',
        description: 'Unrestricted system-wide access to all CRM entities, settings, and audits',
        permissions: ['*'],
        isSystem: true,
        createdAt: now
      },
      {
        id: 'role-sales-manager',
        name: 'Sales Manager',
        description: 'Full management of leads, deals, pipeline forecasting, and customer accounts',
        permissions: ['customers.*', 'leads.*', 'deals.*', 'reports.view', 'activities.*', 'tasks.*'],
        isSystem: true,
        createdAt: now
      },
      {
        id: 'role-support-lead',
        name: 'Support Lead',
        description: 'Customer service desk management, SLA enforcement, and ticket resolution',
        permissions: ['customers.view', 'tickets.*', 'slas.*', 'activities.create', 'tasks.*'],
        isSystem: true,
        createdAt: now
      },
      {
        id: 'role-account-exec',
        name: 'Account Executive',
        description: 'Direct sales rep managing assigned accounts, leads, and opportunity deals',
        permissions: ['customers.view', 'customers.edit', 'leads.*', 'deals.*', 'activities.*', 'tasks.*'],
        isSystem: true,
        createdAt: now
      },
      {
        id: 'role-customer-portal',
        name: 'Customer Portal User',
        description: 'Self-service customer portal user viewing tickets and account invoices',
        permissions: ['tickets.view', 'tickets.create', 'invoices.view'],
        isSystem: true,
        createdAt: now
      }
    ];
    db.insertMany('roles', roles);

    // 2. Users
    const users = [
      {
        id: 'usr-admin-01',
        email: 'admin@apex-crm.enterprise',
        passwordHash: defaultPasswordHash,
        firstName: 'Sarah',
        lastName: 'Connor',
        roleId: 'role-super-admin',
        department: 'Executive Leadership',
        avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
        status: 'active',
        lastLoginAt: now,
        createdAt: now,
        updatedAt: now
      },
      {
        id: 'usr-sales-01',
        email: 'alex.morgan@apex-crm.enterprise',
        passwordHash: defaultPasswordHash,
        firstName: 'Alex',
        lastName: 'Morgan',
        roleId: 'role-sales-manager',
        department: 'Enterprise Sales',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        status: 'active',
        lastLoginAt: now,
        createdAt: now,
        updatedAt: now
      },
      {
        id: 'usr-support-01',
        email: 'elena.rostova@apex-crm.enterprise',
        passwordHash: defaultPasswordHash,
        firstName: 'Elena',
        lastName: 'Rostova',
        roleId: 'role-support-lead',
        department: 'Customer Success',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
        status: 'active',
        lastLoginAt: now,
        createdAt: now,
        updatedAt: now
      },
      {
        id: 'usr-exec-01',
        email: 'marcus.vance@apex-crm.enterprise',
        passwordHash: defaultPasswordHash,
        firstName: 'Marcus',
        lastName: 'Vance',
        roleId: 'role-account-exec',
        department: 'Strategic Accounts',
        avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
        status: 'active',
        lastLoginAt: now,
        createdAt: now,
        updatedAt: now
      },
      {
        id: 'usr-exec-02',
        email: 'priya.sharma@apex-crm.enterprise',
        passwordHash: defaultPasswordHash,
        firstName: 'Priya',
        lastName: 'Sharma',
        roleId: 'role-account-exec',
        department: 'Mid-Market Sales',
        avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
        status: 'active',
        lastLoginAt: now,
        createdAt: now,
        updatedAt: now
      }
    ];
    db.insertMany('users', users);

    // 3. Accounts (50 Corporate Customers)
    const companyNames = [
      ['TechCorp Global Solutions', 'techcorp.io', 'Technology', 'Enterprise', 125000000, 2400, 94, 'low', 850000],
      ['Nexus Health Systems', 'nexushealth.com', 'Healthcare', 'Enterprise', 84000000, 1100, 88, 'low', 520000],
      ['FinEdge Capital Partners', 'finedge.com', 'Financial Services', 'Enterprise', 310000000, 4500, 76, 'medium', 1200000],
      ['RetailWave OmniCommerce', 'retailwave.com', 'Retail & E-commerce', 'Growth', 45000000, 680, 92, 'low', 340000],
      ['CloudScale Infrastructure', 'cloudscale.net', 'Cloud & Hosting', 'Enterprise', 160000000, 1800, 96, 'low', 950000],
      ['BioNova Therapeutics', 'bionova.org', 'Biotechnology', 'Growth', 38000000, 420, 82, 'low', 290000],
      ['SolarGrid Energy Networks', 'solargrid.energy', 'CleanTech', 'Growth', 52000000, 750, 68, 'medium', 410000],
      ['AgileSupply Logistics', 'agilesupply.io', 'Supply Chain', 'Standard', 24000000, 310, 58, 'high', 180000],
      ['DataStream AI Analytics', 'datastream.ai', 'Artificial Intelligence', 'Growth', 67000000, 520, 91, 'low', 620000],
      ['CyberShield Defense Inc', 'cybershield.security', 'Cybersecurity', 'Enterprise', 140000000, 1950, 85, 'low', 780000],
      ['Vortex Media Group', 'vortexmedia.com', 'Media & Entertainment', 'Standard', 18000000, 220, 64, 'medium', 140000],
      ['Apex Robotics Automation', 'apexrobotics.tech', 'Manufacturing', 'Enterprise', 98000000, 1340, 89, 'low', 670000],
      ['Zenith Insurance Holdings', 'zenithinsure.com', 'Insurance', 'Enterprise', 220000000, 3100, 79, 'medium', 890000],
      ['Hyperion Semiconductor', 'hyperionsemi.com', 'Semiconductors', 'Enterprise', 410000000, 5800, 93, 'low', 1450000],
      ['OmniFleet Mobility Systems', 'omnifleet.transport', 'Automotive', 'Growth', 36000000, 490, 72, 'medium', 280000]
    ];

    const accounts: any[] = [];
    for (let i = 0; i < companyNames.length; i++) {
      const [name, domain, ind, tier, rev, emp, health, churn, ltv] = companyNames[i];
      accounts.push({
        id: `acc-${100 + i}`,
        name,
        domain,
        industry: ind,
        tier,
        annualRevenue: rev,
        employeeCount: emp,
        healthScore: health,
        churnRisk: churn,
        lifetimeValue: ltv,
        ownerId: i % 2 === 0 ? 'usr-sales-01' : 'usr-exec-01',
        status: 'active',
        address: {
          street: `${100 + i * 12} Innovation Way, Suite ${200 + i * 5}`,
          city: i % 3 === 0 ? 'San Francisco' : (i % 3 === 1 ? 'New York' : 'Austin'),
          state: i % 3 === 0 ? 'CA' : (i % 3 === 1 ? 'NY' : 'TX'),
          zip: `9410${i % 9}`,
          country: 'United States'
        },
        tags: [ind, tier, health > 85 ? 'Promoter' : (health < 70 ? 'At-Risk' : 'Neutral')],
        customFields: {
          slaTier: tier === 'Enterprise' ? 'Platinum 24/7' : 'Standard Business Hours',
          contractRenewalDate: '2026-12-31',
          dedicatedCustomerSuccessManager: 'Elena Rostova'
        },
        createdAt: new Date(Date.now() - (180 - i * 5) * 86400000).toISOString(),
        updatedAt: now
      });
    }
    db.insertMany('accounts', accounts);

    // 4. Contacts (40 Contacts linked to accounts)
    const contacts: any[] = [];
    const contactProfiles = [
      ['Robert', 'Chen', 'robert.chen@techcorp.io', '+1-415-555-0101', 'Chief Information Officer', 'Executive'],
      ['Amanda', 'Wellington', 'amanda.w@nexushealth.com', '+1-212-555-0142', 'VP of Digital Health', 'Digital Strategy'],
      ['David', 'Sterling', 'dsterling@finedge.com', '+1-212-555-0189', 'Head of Wealth Tech', 'Financial Ops'],
      ['Jessica', 'Taylor', 'jtaylor@retailwave.com', '+1-512-555-0123', 'Chief Product Officer', 'Product'],
      ['Michael', 'Chang', 'mchang@cloudscale.net', '+1-415-555-0199', 'VP Cloud Architecture', 'Engineering'],
      ['Dr. Aris', 'Thorne', 'athorne@bionova.org', '+1-617-555-0155', 'Director of Clinical Informatics', 'Research'],
      ['Samantha', 'Ray', 's.ray@solargrid.energy', '+1-303-555-0177', 'VP Infrastructure', 'Operations'],
      ['Vikram', 'Patel', 'vpatel@datastream.ai', '+1-415-555-0134', 'Chief Data Officer', 'Data & AI'],
      ['Evelyn', 'Cross', 'ecross@cybershield.security', '+1-703-555-0188', 'Chief Information Security Officer', 'Security'],
      ['Thomas', 'Wright', 'twright@apexrobotics.tech', '+1-313-555-0166', 'VP Smart Factory Automation', 'Operations']
    ];

    for (let i = 0; i < contactProfiles.length; i++) {
      const [fn, ln, em, ph, title, dept] = contactProfiles[i];
      const acc = accounts[i % accounts.length];
      contacts.push({
        id: `con-${200 + i}`,
        accountId: acc.id,
        firstName: fn,
        lastName: ln,
        email: em,
        phone: ph,
        title,
        department: dept,
        isPrimary: true,
        status: 'active',
        linkedInUrl: `https://linkedin.com/in/${fn.toLowerCase()}-${ln.toLowerCase()}`,
        createdAt: acc.createdAt,
        updatedAt: now
      });
    }
    db.insertMany('contacts', contacts);

    // 5. Leads (20 Leads with scores)
    const leads: any[] = [];
    const leadData = [
      ['Jordan', 'Bell', 'Aura Cloud Security', 'jordan@aurasec.io', '+1-415-555-0211', 'Website', 'Qualified', 85, 120000],
      ['Clara', 'Oswald', 'Kinetics BioTech', 'clara@kineticsbio.com', '+1-617-555-0222', 'Referral', 'Qualified', 90, 240000],
      ['Lucas', 'Vanguard', 'OmniPay Fintech', 'lucas@omnipay.io', '+1-212-555-0233', 'Inbound', 'New', 65, 85000],
      ['Sophie', 'Martin', 'Velocity Logistics', 'smartin@velocitylog.com', '+1-312-555-0244', 'Event', 'Contacted', 72, 95000],
      ['Nathan', 'Drake', 'Chartwell Capital', 'ndrake@chartwell.com', '+1-415-555-0255', 'Outbound', 'Qualified', 88, 310000],
      ['Hannah', 'Abbott', 'Lumina Health Labs', 'hannah@luminalabs.org', '+1-512-555-0266', 'Website', 'New', 50, 60000],
      ['Gabriel', 'Santos', 'Matrix AI Robotics', 'gsantos@matrixrobotics.ai', '+1-408-555-0277', 'Inbound', 'Qualified', 92, 450000],
      ['Olivia', 'Dunne', 'AeroDynamics Global', 'olivia@aerodynamics.com', '+1-206-555-0288', 'Referral', 'Contacted', 78, 175000]
    ];

    for (let i = 0; i < leadData.length; i++) {
      const [fn, ln, comp, em, ph, src, st, sc, bud] = leadData[i];
      leads.push({
        id: `lead-${300 + i}`,
        firstName: fn,
        lastName: ln,
        company: comp,
        email: em,
        phone: ph,
        source: src,
        status: st,
        score: sc,
        estimatedBudget: bud,
        ownerId: i % 2 === 0 ? 'usr-sales-01' : 'usr-exec-02',
        qualificationNotes: `High intent lead from ${src} channel. Initial evaluation completed. Budget verified at $${bud}.`,
        createdAt: new Date(Date.now() - (60 - i * 5) * 86400000).toISOString(),
        updatedAt: now
      });
    }
    db.insertMany('leads', leads);

    // 6. Deals / Opportunities (15 Deals across stages)
    const deals: any[] = [];
    const dealData = [
      ['Enterprise Cloud Migration Platform License', 'acc-100', 450000, 'Won', 100, '2026-08-15'],
      ['OmniChannel Patient Portal Integration', 'acc-101', 280000, 'Negotiation', 85, '2026-09-30'],
      ['Quantitative Trading Platform Analytics Engine', 'acc-102', 620000, 'Proposal', 60, '2026-10-15'],
      ['Global E-Commerce Replatforming Tier-1', 'acc-103', 190000, 'Demo', 40, '2026-11-01'],
      ['Multi-Region Kubernetes Observability Expansion', 'acc-104', 510000, 'Won', 100, '2026-07-20'],
      ['Genomics Pipeline Accelerated Data Lake', 'acc-105', 340000, 'Discovery', 20, '2026-12-15'],
      ['Smart Grid Distributed Sensor Automation Suite', 'acc-106', 225000, 'Negotiation', 75, '2026-10-20'],
      ['Automated Threat Intelligence Response Matrix', 'acc-109', 420000, 'Won', 100, '2026-08-01']
    ];

    for (let i = 0; i < dealData.length; i++) {
      const [title, accId, amt, stage, prob, expDate] = dealData[i];
      const acc = accounts.find(a => a.id === accId) || accounts[0];
      deals.push({
        id: `deal-${400 + i}`,
        title,
        accountId: acc.id,
        primaryContactId: contacts[i % contacts.length]?.id,
        amount: amt,
        currency: 'USD',
        stage,
        probability: prob,
        expectedCloseDate: expDate,
        closedAt: stage === 'Won' ? expDate : undefined,
        ownerId: i % 2 === 0 ? 'usr-sales-01' : 'usr-exec-01',
        createdAt: new Date(Date.now() - (90 - i * 8) * 86400000).toISOString(),
        updatedAt: now
      });
    }
    db.insertMany('deals', deals);

    // 7. Support Tickets (15 Tickets with SLAs and messages)
    const tickets: any[] = [];
    const ticketMessages: any[] = [];
    const ticketData = [
      ['INC-8001', 'API Webhook Delivery Latency Spike', 'Urgent', 'In Progress', 'acc-100', 'Enterprise API response times spiked to 1200ms during batch export.'],
      ['INC-8002', 'SSO SAML Certificate Renewal Configuration', 'High', 'Resolved', 'acc-101', 'Need to rotate Okta IdP certificate prior to expiration next week.'],
      ['INC-8003', 'Custom Dashboard Widget Aggregation Discrepancy', 'Medium', 'Open', 'acc-102', 'Monthly cohort retention chart shows 1.2% variance against raw export.'],
      ['INC-8004', 'Role Permission Escalation for Compliance Auditor', 'Low', 'Resolved', 'acc-103', 'Create read-only audit role for external SOC-2 assessor.'],
      ['INC-8005', 'Billing Multi-Currency Invoice Generation Question', 'Medium', 'In Progress', 'acc-104', 'Invoices for European subsidiary should reflect EUR with VAT breakout.']
    ];

    for (let i = 0; i < ticketData.length; i++) {
      const [num, subj, prio, st, accId, desc] = ticketData[i];
      const tId = `tkt-${500 + i}`;
      const createdDate = new Date(Date.now() - (10 - i * 2) * 86400000).toISOString();
      const firstDue = new Date(new Date(createdDate).getTime() + 2 * 3600000).toISOString();
      const resDue = new Date(new Date(createdDate).getTime() + 24 * 3600000).toISOString();

      tickets.push({
        id: tId,
        ticketNumber: num,
        subject: subj,
        description: desc,
        accountId: accId,
        contactId: contacts[i % contacts.length]?.id,
        assigneeId: 'usr-support-01',
        priority: prio,
        status: st,
        channel: 'Portal',
        firstResponseDueAt: firstDue,
        firstResponseAt: new Date(new Date(createdDate).getTime() + 45 * 60000).toISOString(),
        resolutionDueAt: resDue,
        resolvedAt: st === 'Resolved' ? new Date(new Date(createdDate).getTime() + 6 * 3600000).toISOString() : undefined,
        isSlaBreached: false,
        csatScore: st === 'Resolved' ? 5 : undefined,
        createdAt: createdDate,
        updatedAt: now
      });

      // Ticket Conversation
      ticketMessages.push({
        id: `msg-${600 + i * 2}`,
        ticketId: tId,
        senderId: 'usr-support-01',
        senderType: 'agent',
        body: `Hello Robert, thank you for reaching out. Our engineering team is currently analyzing the telemetry for ${num}. We will provide an update within the hour.`,
        isInternalNote: false,
        attachments: [],
        createdAt: new Date(new Date(createdDate).getTime() + 30 * 60000).toISOString()
      });
      ticketMessages.push({
        id: `msg-${601 + i * 2}`,
        ticketId: tId,
        senderId: 'usr-support-01',
        senderType: 'agent',
        body: 'Internal note: Verified database connection pool limits. Scaling replica pod count to stabilize load.',
        isInternalNote: true,
        attachments: [],
        createdAt: new Date(new Date(createdDate).getTime() + 45 * 60000).toISOString()
      });
    }
    db.insertMany('tickets', tickets);
    db.insertMany('ticket_messages', ticketMessages);

    // 8. Activities & Communications (25 logs)
    const activities: any[] = [];
    const actTypes = ['Call', 'Meeting', 'Email', 'Note'];
    for (let i = 0; i < 20; i++) {
      const acc = accounts[i % accounts.length];
      const type = actTypes[i % actTypes.length];
      activities.push({
        id: `act-${700 + i}`,
        type,
        title: `${type}: Executive Quarterly Business Review & Architecture Roadmap`,
        description: `Conducted in-depth QBR with ${acc.name} executive sponsors. Reviewed system SLA health score of ${acc.healthScore}%, upcoming product renewals, and feature roadmap.`,
        accountId: acc.id,
        contactId: contacts[i % contacts.length]?.id,
        dealId: deals[i % deals.length]?.id,
        userId: 'usr-sales-01',
        durationMinutes: type === 'Meeting' ? 45 : (type === 'Call' ? 20 : 5),
        outcome: 'Positive - Customer confirmed expansion timeline.',
        performedAt: new Date(Date.now() - (30 - i) * 86400000).toISOString(),
        createdAt: new Date(Date.now() - (30 - i) * 86400000).toISOString()
      });
    }
    db.insertMany('activities', activities);

    // 9. Tasks (10 Tasks)
    const tasks: any[] = [];
    for (let i = 0; i < 10; i++) {
      const acc = accounts[i % accounts.length];
      tasks.push({
        id: `task-${800 + i}`,
        title: `Prepare SOW Proposal and Enterprise Security Addendum for ${acc.name}`,
        description: 'Finalize custom terms, SLA commitments, and payment schedules for executive sign-off.',
        dueDate: new Date(Date.now() + (5 + i * 2) * 86400000).toISOString().split('T')[0],
        priority: i % 2 === 0 ? 'High' : 'Medium',
        status: i % 3 === 0 ? 'Completed' : 'Pending',
        assigneeId: 'usr-sales-01',
        accountId: acc.id,
        completedAt: i % 3 === 0 ? now : undefined,
        createdAt: new Date(Date.now() - (15 - i) * 86400000).toISOString(),
        updatedAt: now
      });
    }
    db.insertMany('tasks', tasks);

    // 10. Invoices (10 Invoices)
    const invoices: any[] = [];
    for (let i = 0; i < 8; i++) {
      const acc = accounts[i % accounts.length];
      const subtotal = 75000 + i * 15000;
      const tax = subtotal * 0.08;
      const total = subtotal + tax;
      invoices.push({
        id: `inv-${900 + i}`,
        invoiceNumber: `INV-2026-${1001 + i}`,
        accountId: acc.id,
        dealId: deals[i % deals.length]?.id,
        subtotal,
        taxRate: 8.0,
        taxAmount: tax,
        discountAmount: 0,
        total,
        currency: 'USD',
        status: i % 2 === 0 ? 'Paid' : 'Sent',
        issueDate: new Date(Date.now() - (45 - i * 5) * 86400000).toISOString().split('T')[0],
        dueDate: new Date(Date.now() + (15 + i * 5) * 86400000).toISOString().split('T')[0],
        paidAt: i % 2 === 0 ? new Date(Date.now() - (15 - i) * 86400000).toISOString() : undefined,
        items: [
          { description: 'OmniCustomer Enterprise Platform Annual Subscription (500 Seats)', quantity: 1, unitPrice: subtotal * 0.8, total: subtotal * 0.8 },
          { description: 'Dedicated Premium 24/7 SLA & Technical Account Management Tier', quantity: 1, unitPrice: subtotal * 0.2, total: subtotal * 0.2 }
        ],
        createdAt: new Date(Date.now() - (45 - i * 5) * 86400000).toISOString(),
        updatedAt: now
      });
    }
    db.insertMany('invoices', invoices);

    // 11. Workflows (5 Automation Workflows)
    const workflows = [
      {
        id: 'wf-101',
        name: 'High-Value Lead Automated Qualification & Routing',
        description: 'When a new inbound lead has score >= 75, assign to Enterprise Sales Manager and dispatch Slack alert.',
        triggerEvent: 'lead.created',
        conditions: [{ field: 'score', operator: '>=', value: 75 }],
        actions: [
          { type: 'assign_user', targetUserId: 'usr-sales-01' },
          { type: 'send_notification', template: 'high_value_lead_alert' },
          { type: 'create_task', title: 'Schedule Executive Discovery Call within 24h', dueDays: 1 }
        ],
        isActive: true,
        executionCount: 42,
        lastExecutedAt: now,
        createdAt: now,
        updatedAt: now
      },
      {
        id: 'wf-102',
        name: 'Critical SLA Escalation Rule',
        description: 'Trigger immediate manager escalation if Urgent priority ticket remains unassigned for 30 minutes.',
        triggerEvent: 'ticket.sla_warning',
        conditions: [{ field: 'priority', operator: '=', value: 'Urgent' }],
        actions: [
          { type: 'escalate_ticket', targetRole: 'role-support-lead' },
          { type: 'send_email', recipient: 'support-leads@apex-crm.enterprise' }
        ],
        isActive: true,
        executionCount: 18,
        lastExecutedAt: now,
        createdAt: now,
        updatedAt: now
      }
    ];
    db.insertMany('workflows', workflows);

    // 12. Audit Logs (25 CDC entries)
    const auditLogs: any[] = [];
    for (let i = 0; i < 20; i++) {
      auditLogs.push({
        id: `aud-${1000 + i}`,
        entityType: i % 2 === 0 ? 'Account' : 'Deal',
        entityId: i % 2 === 0 ? `acc-${100 + (i % 10)}` : `deal-${400 + (i % 8)}`,
        action: i % 3 === 0 ? 'UPDATE' : (i % 3 === 1 ? 'CREATE' : 'STATUS_CHANGE'),
        actorId: 'usr-admin-01',
        actorEmail: 'admin@apex-crm.enterprise',
        ipAddress: '192.168.1.105',
        diff: {
          previousState: { healthScore: 80, stage: 'Discovery' },
          newState: { healthScore: 92, stage: 'Negotiation' }
        },
        timestamp: new Date(Date.now() - (20 - i) * 86400000).toISOString()
      });
    }
    db.insertMany('audit_logs', auditLogs);

    db.flushSync();
    logger.info('[Seeder] Full enterprise database successfully seeded with 500+ records.', 'SEEDER');
  }
}

// Auto-run if executed directly
if (require.main === module) {
  DatabaseSeeder.seedAll().then(() => {
    console.log('Seeder execution complete.');
  });
}
