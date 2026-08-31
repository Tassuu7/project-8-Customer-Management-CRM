/**
 * Authentication REST Controller
 */

import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';
import { HttpResponse } from '../core/http';
import { AuthenticatedRequest } from '../middleware/auth.middleware';

export class AuthController {
  private authService = new AuthService();

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const result = await this.authService.login(email, password, req.ip);
      res.json(HttpResponse.success(result, 'Authentication successful'));
    } catch (err) {
      next(err);
    }
  };

  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.authService.register(req.body);
      res.status(201).json(HttpResponse.success(result, 'User registered successfully'));
    } catch (err) {
      next(err);
    }
  };

  public me = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
      const user = await this.authService.getCurrentUser(req.user!.id);
      res.json(HttpResponse.success(user));
    } catch (err) {
      next(err);
    }
  };
}
