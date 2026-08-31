/**
 * Lead Pipeline & Conversion REST Controller
 */

import { Response, NextFunction } from 'express';
import { LeadService } from '../services/lead.service';
import { HttpResponse } from '../core/http';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

export class LeadController {
  private leadService = new LeadService();

  public getLeads = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const status = req.query.status as string;
      const source = req.query.source as string;
      const minScore = req.query.minScore ? parseInt(req.query.minScore as string, 10) : undefined;

      const leads = await this.leadService.getLeads(status, source, minScore);
      res.json(HttpResponse.success(leads));
    } catch (err) {
      next(err);
    }
  };

  public getLeadById = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const lead = await this.leadService.getLeadById(req.params.id);
      res.json(HttpResponse.success(lead));
    } catch (err) {
      next(err);
    }
  };

  public createLead = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const created = await this.leadService.createLead(req.body, req.user?.id);
      res.status(201).json(HttpResponse.success(created, 'Lead created successfully'));
    } catch (err) {
      next(err);
    }
  };

  public updateStatus = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const updated = await this.leadService.updateLeadStatus(req.params.id, req.body.status, req.user?.id);
      res.json(HttpResponse.success(updated, 'Lead status updated'));
    } catch (err) {
      next(err);
    }
  };

  public convertLead = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const result = await this.leadService.convertLead({
        leadId: req.params.id,
        ...req.body
      }, req.user?.id);
      res.json(HttpResponse.success(result, 'Lead converted successfully'));
    } catch (err) {
      next(err);
    }
  };
}
