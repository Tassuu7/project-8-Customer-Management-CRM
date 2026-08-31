/**
 * Role-Based Access Control (RBAC) Guard Middleware
 */

import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './auth.middleware';
import { ForbiddenError } from '../core/errors';

export const requirePermission = (permission: string) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new ForbiddenError('Authentication required'));
    }

    const userPerms = req.user.permissions;
    if (userPerms.includes('*') || userPerms.includes(permission)) {
      return next();
    }

    // Check wildcard match e.g. customers.*
    const [domain] = permission.split('.');
    if (userPerms.includes(`${domain}.*`)) {
      return next();
    }

    return next(new ForbiddenError(`Missing required permission: ${permission}`));
  };
};
