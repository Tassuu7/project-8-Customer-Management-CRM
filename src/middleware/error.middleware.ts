/**
 * Global Error Handler Middleware
 */

import { Request, Response, NextFunction } from 'express';
import { AppError } from '../core/errors';
import { logger } from '../core/logger';
import { HttpResponse } from '../core/http';

export const errorHandlerMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    logger.warn(`[HTTP ${err.statusCode}] ${err.errorCode}: ${err.message}`, 'HTTP_ERROR', { path: req.path });
    return res.status(err.statusCode).json(HttpResponse.error(err.errorCode, err.message, err.details));
  }

  logger.error(`[UnhandledException] ${err.message}`, err, 'HTTP_FATAL', { path: req.path });
  return res.status(500).json(HttpResponse.error('INTERNAL_SERVER_ERROR', 'An unexpected internal error occurred'));
};
