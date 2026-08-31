/**
 * Service Desk & Support Ticket REST Controller
 */

import { Response, NextFunction } from 'express';
import { TicketService } from '../services/ticket.service';
import { HttpResponse } from '../core/http';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

export class TicketController {
  private ticketService = new TicketService();

  public getTickets = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const status = req.query.status as string;
      const priority = req.query.priority as string;
      const accountId = req.query.accountId as string;

      const tickets = await this.ticketService.getTickets(status, priority, accountId);
      res.json(HttpResponse.success(tickets));
    } catch (err) {
      next(err);
    }
  };

  public getTicketById = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const ticket = await this.ticketService.getTicketById(req.params.id);
      res.json(HttpResponse.success(ticket));
    } catch (err) {
      next(err);
    }
  };

  public getThread = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const thread = await this.ticketService.getTicketThread(req.params.id);
      res.json(HttpResponse.success(thread));
    } catch (err) {
      next(err);
    }
  };

  public createTicket = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const created = await this.ticketService.createTicket(req.body, req.user?.id);
      res.status(201).json(HttpResponse.success(created, 'Ticket submitted successfully'));
    } catch (err) {
      next(err);
    }
  };

  public reply = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const msg = await this.ticketService.replyToTicket(
        req.params.id,
        req.user!.id,
        req.body.body,
        req.body.isInternalNote || false
      );
      res.status(201).json(HttpResponse.success(msg, 'Reply posted'));
    } catch (err) {
      next(err);
    }
  };

  public updateStatus = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const updated = await this.ticketService.updateTicketStatus(
        req.params.id,
        req.body.status,
        req.body.csatScore
      );
      res.json(HttpResponse.success(updated, 'Ticket status updated'));
    } catch (err) {
      next(err);
    }
  };
}
