/**
 * JWT Authentication Middleware
 */

import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { config } from '../core/config';
import { UnauthorizedError } from '../core/errors';

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    roleId: string;
    permissions: string[];
  };
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Missing or malformed Bearer token'));
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, config.auth.jwtSecret) as any;
    req.user = {
      id: decoded.sub,
      email: decoded.email,
      roleId: decoded.roleId,
      permissions: decoded.permissions || []
    };
    next();
  } catch (err) {
    next(new UnauthorizedError('Invalid or expired authentication token'));
  }
};
