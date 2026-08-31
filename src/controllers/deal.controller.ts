/**
 * Deal & Pipeline Forecasting REST Controller
 */

import { Response, NextFunction } from 'express';
import { DealService } from '../services/deal.service';
import { HttpResponse } from '../core/http';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

export class DealController {
  private dealService = new DealService();

  public getDeals = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const stage = req.query.stage as string;
      const ownerId = req.query.ownerId as string;
      const deals = await this.dealService.getDeals(stage, ownerId);
      res.json(HttpResponse.success(deals));
    } catch (err) {
      next(err);
    }
  };

  public getDealById = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const deal = await this.dealService.getDealById(req.params.id);
      res.json(HttpResponse.success(deal));
    } catch (err) {
      next(err);
    }
  };

  public createDeal = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const created = await this.dealService.createDeal(req.body, req.user?.id);
      res.status(201).json(HttpResponse.success(created, 'Deal created successfully'));
    } catch (err) {
      next(err);
    }
  };

  public updateStage = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const updated = await this.dealService.updateDealStage(req.params.id, req.body.stage, req.user?.id);
      res.json(HttpResponse.success(updated, 'Deal stage updated'));
    } catch (err) {
      next(err);
    }
  };

  public getMetrics = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const metrics = await this.dealService.getPipelineMetrics();
      res.json(HttpResponse.success(metrics));
    } catch (err) {
      next(err);
    }
  };
}
