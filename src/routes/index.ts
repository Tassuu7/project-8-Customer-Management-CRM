/**
 * Master API v1 Router Registration
 */

import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { CustomerController } from '../controllers/customer.controller';
import { LeadController } from '../controllers/lead.controller';
import { DealController } from '../controllers/deal.controller';
import { TicketController } from '../controllers/ticket.controller';
import { AnalyticsController } from '../controllers/analytics.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { ActivityService } from '../services/activity.service';
import { TaskService } from '../services/task.service';
import { BillingService } from '../services/billing.service';
import { WorkflowService } from '../services/workflow.service';
import { AuditService } from '../services/audit.service';
import { ExportImportService } from '../services/export-import.service';
import { HttpResponse } from '../core/http';

export const apiRouter = Router();

// Controllers & Services
const authCtrl = new AuthController();
const custCtrl = new CustomerController();
const leadCtrl = new LeadController();
const dealCtrl = new DealController();
const ticketCtrl = new TicketController();
const analyticsCtrl = new AnalyticsController();
const activityService = new ActivityService();
const taskService = new TaskService();
const billingService = new BillingService();
const workflowService = new WorkflowService();
const auditService = new AuditService();
const exportImportService = new ExportImportService();

// --- Auth Routes ---
apiRouter.post('/auth/login', authCtrl.login);
apiRouter.post('/auth/register', authCtrl.register);
apiRouter.get('/auth/me', authMiddleware, authCtrl.me);

// --- Customer / Account 360 Routes ---
apiRouter.get('/customers', authMiddleware, custCtrl.getAccounts);
apiRouter.get('/customers/:id', authMiddleware, custCtrl.getAccountById);
apiRouter.get('/customers/:id/360', authMiddleware, custCtrl.getCustomer360);
apiRouter.post('/customers', authMiddleware, custCtrl.createAccount);
apiRouter.put('/customers/:id', authMiddleware, custCtrl.updateAccount);
apiRouter.delete('/customers/:id', authMiddleware, custCtrl.deleteAccount);

// --- Lead Routes ---
apiRouter.get('/leads', authMiddleware, leadCtrl.getLeads);
apiRouter.get('/leads/:id', authMiddleware, leadCtrl.getLeadById);
apiRouter.post('/leads', authMiddleware, leadCtrl.createLead);
apiRouter.patch('/leads/:id/status', authMiddleware, leadCtrl.updateStatus);
apiRouter.post('/leads/:id/convert', authMiddleware, leadCtrl.convertLead);

// --- Deal & Pipeline Routes ---
apiRouter.get('/deals', authMiddleware, dealCtrl.getDeals);
apiRouter.get('/deals/metrics', authMiddleware, dealCtrl.getMetrics);
apiRouter.get('/deals/:id', authMiddleware, dealCtrl.getDealById);
apiRouter.post('/deals', authMiddleware, dealCtrl.createDeal);
apiRouter.patch('/deals/:id/stage', authMiddleware, dealCtrl.updateStage);

// --- Support Ticket Routes ---
apiRouter.get('/tickets', authMiddleware, ticketCtrl.getTickets);
apiRouter.get('/tickets/:id', authMiddleware, ticketCtrl.getTicketById);
apiRouter.get('/tickets/:id/thread', authMiddleware, ticketCtrl.getThread);
apiRouter.post('/tickets', authMiddleware, ticketCtrl.createTicket);
apiRouter.post('/tickets/:id/reply', authMiddleware, ticketCtrl.reply);
apiRouter.patch('/tickets/:id/status', authMiddleware, ticketCtrl.updateStatus);

// --- Analytics & Dashboard ---
apiRouter.get('/analytics/dashboard', authMiddleware, analyticsCtrl.getDashboard);

// --- Timeline & Activities ---
apiRouter.get('/activities/timeline', authMiddleware, async (req, res, next) => {
  try {
    const accId = req.query.accountId as string;
    const timeline = await activityService.getTimeline(accId);
    res.json(HttpResponse.success(timeline));
  } catch (e) { next(e); }
});
apiRouter.post('/activities', authMiddleware, async (req: any, res, next) => {
  try {
    const act = await activityService.logActivity(req.body.type, req.body.title, req.user.id, req.body);
    res.status(201).json(HttpResponse.success(act));
  } catch (e) { next(e); }
});

// --- Tasks ---
apiRouter.get('/tasks', authMiddleware, async (req, res, next) => {
  try {
    const tasks = await taskService.getTasks(req.query.assigneeId as string, req.query.status as string);
    res.json(HttpResponse.success(tasks));
  } catch (e) { next(e); }
});
apiRouter.post('/tasks', authMiddleware, async (req: any, res, next) => {
  try {
    const task = await taskService.createTask({ ...req.body, assigneeId: req.user.id });
    res.status(201).json(HttpResponse.success(task));
  } catch (e) { next(e); }
});
apiRouter.patch('/tasks/:id/status', authMiddleware, async (req, res, next) => {
  try {
    const task = await taskService.updateTaskStatus(req.params.id, req.body.status);
    res.json(HttpResponse.success(task));
  } catch (e) { next(e); }
});

// --- Billing ---
apiRouter.get('/billing/invoices', authMiddleware, async (req, res, next) => {
  try {
    const invs = await billingService.getInvoices(req.query.status as string, req.query.accountId as string);
    res.json(HttpResponse.success(invs));
  } catch (e) { next(e); }
});
apiRouter.post('/billing/invoices', authMiddleware, async (req, res, next) => {
  try {
    const inv = await billingService.createInvoice(req.body);
    res.status(201).json(HttpResponse.success(inv));
  } catch (e) { next(e); }
});
apiRouter.patch('/billing/invoices/:id/pay', authMiddleware, async (req, res, next) => {
  try {
    const inv = await billingService.markAsPaid(req.params.id);
    res.json(HttpResponse.success(inv));
  } catch (e) { next(e); }
});

// --- Workflows ---
apiRouter.get('/workflows', authMiddleware, async (req, res, next) => {
  try {
    const wf = await workflowService.getWorkflows();
    res.json(HttpResponse.success(wf));
  } catch (e) { next(e); }
});
apiRouter.post('/workflows', authMiddleware, async (req, res, next) => {
  try {
    const wf = await workflowService.createWorkflow(req.body);
    res.status(201).json(HttpResponse.success(wf));
  } catch (e) { next(e); }
});
apiRouter.patch('/workflows/:id/toggle', authMiddleware, async (req, res, next) => {
  try {
    const wf = await workflowService.toggleWorkflow(req.params.id, req.body.isActive);
    res.json(HttpResponse.success(wf));
  } catch (e) { next(e); }
});

// --- Audits ---
apiRouter.get('/audits', authMiddleware, async (req, res, next) => {
  try {
    const page = parseInt(req.query.page as string || '1', 10);
    const limit = parseInt(req.query.limit as string || '25', 10);
    const result = await auditService.getAuditLogs(req.query.entityType as string, req.query.action as string, page, limit);
    res.json(HttpResponse.paginated(result.items, result.total, result.page, result.limit));
  } catch (e) { next(e); }
});

// --- Export / Import ---
apiRouter.get('/export/customers/csv', authMiddleware, async (req, res, next) => {
  try {
    const csv = exportImportService.exportCustomersToCsv();
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=customers_export.csv');
    res.send(csv);
  } catch (e) { next(e); }
});
