/**
 * In-Memory Sliding Window Rate Limiter Middleware
 */

import { Request, Response, NextFunction } from 'express';
import { config } from '../core/config';
import { RateLimitExceededError } from '../core/errors';

const requestLog = new Map<string, number[]>();

export const rateLimiterMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (!config.rateLimit.enabled) return next();

  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  const windowStart = now - config.rateLimit.windowMs;

  const timestamps = (requestLog.get(ip) || []).filter(ts => ts > windowStart);
  if (timestamps.length >= config.rateLimit.maxRequests) {
    return next(new RateLimitExceededError('Too many requests, please try again later.'));
  }

  timestamps.push(now);
  requestLog.set(ip, timestamps);
  next();
};
