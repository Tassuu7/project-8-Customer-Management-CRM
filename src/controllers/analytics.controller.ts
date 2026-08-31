/**
 * BI Analytics & Executive Dashboard REST Controller
 */

import { Response, NextFunction } from 'express';
import { AnalyticsService } from '../services/analytics.service';
import { HttpResponse } from '../core/http';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

export class AnalyticsController {
  private analyticsService = new AnalyticsService();

  public getDashboard = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const data = await this.analyticsService.getExecutiveDashboardMetrics();
      res.json(HttpResponse.success(data));
    } catch (err) {
      next(err);
    }
  };
}
