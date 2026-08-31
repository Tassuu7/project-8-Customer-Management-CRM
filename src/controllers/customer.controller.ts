/**
 * Customer 360 REST Controller
 */

import { Response, NextFunction } from 'express';
import { CustomerService } from '../services/customer.service';
import { HttpResponse } from '../core/http';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

export class CustomerController {
  private customerService = new CustomerService();

  public getAccounts = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const page = parseInt(req.query.page as string || '1', 10);
      const limit = parseInt(req.query.limit as string || '20', 10);
      const search = req.query.search as string;
      const tier = req.query.tier as string;
      const churnRisk = req.query.churnRisk as string;

      const result = await this.customerService.getAllAccounts(page, limit, search, tier, churnRisk);
      res.json(HttpResponse.paginated(result.items, result.total, result.page, result.limit));
    } catch (err) {
      next(err);
    }
  };

  public getAccountById = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const account = await this.customerService.getAccountById(req.params.id);
      res.json(HttpResponse.success(account));
    } catch (err) {
      next(err);
    }
  };

  public getCustomer360 = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const view = await this.customerService.getCustomer360View(req.params.id);
      res.json(HttpResponse.success(view));
    } catch (err) {
      next(err);
    }
  };

  public createAccount = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const created = await this.customerService.createAccount(req.body, req.user?.id);
      res.status(201).json(HttpResponse.success(created, 'Customer created successfully'));
    } catch (err) {
      next(err);
    }
  };

  public updateAccount = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const updated = await this.customerService.updateAccount(req.params.id, req.body, req.user?.id);
      res.json(HttpResponse.success(updated, 'Customer updated successfully'));
    } catch (err) {
      next(err);
    }
  };

  public deleteAccount = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      await this.customerService.deleteAccount(req.params.id, req.user?.id);
      res.json(HttpResponse.success({ deleted: true }, 'Customer deleted successfully'));
    } catch (err) {
      next(err);
    }
  };
}
