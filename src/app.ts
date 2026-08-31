/**
 * Express Application Configuration
 */

import * as express from 'express';
import * as path from 'path';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import { config } from './core/config';
import { apiRouter } from './routes';
import { errorHandlerMiddleware } from './middleware/error.middleware';
import { rateLimiterMiddleware } from './middleware/rate-limiter.middleware';

export const createApp = (): express.Application => {
  const app = express();

  // Security & standard middleware
  app.use(helmet({
    contentSecurityPolicy: false // Allow modern inline frontend SPA assets
  }));
  app.use(cors({ origin: config.server.corsAllowedOrigins }));
  app.use(morgan('short'));
  app.use(express.json({ limit: config.server.bodyLimit }));
  app.use(express.urlencoded({ extended: true, limit: config.server.bodyLimit }));

  // Rate Limiter
  app.use(rateLimiterMiddleware);

  // Serve static Frontend SPA assets
  const publicPath = path.join(__dirname, 'frontend', 'public');
  app.use(express.static(publicPath));

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'healthy',
      app: config.appName,
      version: config.appVersion,
      timestamp: new Date().toISOString(),
      uptime: process.uptime()
    });
  });

  // Master API v1 router
  app.use('/api/v1', apiRouter);

  // Fallback to index.html for SPA client routing
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(publicPath, 'index.html'));
  });

  // Global Error Handler
  app.use(errorHandlerMiddleware);

  return app;
};
