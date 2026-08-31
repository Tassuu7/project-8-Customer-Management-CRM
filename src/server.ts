/**
 * Production Server Bootstrap & Lifecyle Manager
 */

import { createApp } from './app';
import { config } from './core/config';
import { logger } from './core/logger';
import { MigrationRunner } from './database/migrations';
import { DatabaseSeeder } from './database/seeders';
import { db } from './database/database';

async function bootstrap() {
  logger.info('====================================================', 'BOOTSTRAP');
  logger.info(`Starting ${config.appName} v${config.appVersion}`, 'BOOTSTRAP');
  logger.info(`Environment: ${config.env} | Port: ${config.server.port}`, 'BOOTSTRAP');
  logger.info('====================================================', 'BOOTSTRAP');

  // 1. Run Migrations & verify database integrity
  MigrationRunner.runMigrations();

  // 2. Run Database Seeder for rich initial records
  await DatabaseSeeder.seedAll();

  // 3. Create Express Application
  const app = createApp();

  // 4. Start HTTP Server
  const server = app.listen(config.server.port, config.server.host, () => {
    logger.info(`Server successfully listening on unique local URL: http://localhost:${config.server.port}`, 'SERVER');
    logger.info(`API Base URL: http://localhost:${config.server.port}/api/v1`, 'SERVER');
    logger.info(`Customer 360 Dashboard: http://localhost:${config.server.port}/#dashboard`, 'SERVER');
  });

  // Graceful shutdown handling
  const shutdown = (signal: string) => {
    logger.info(`Received ${signal}. Performing graceful shutdown...`, 'SERVER');
    server.close(() => {
      db.flushSync();
      logger.info('Database flushed. HTTP server closed. Process exiting cleanly.', 'SERVER');
      process.exit(0);
    });

    setTimeout(() => {
      logger.error('Graceful shutdown timeout exceeded. Forcing exit.', undefined, 'SERVER');
      process.exit(1);
    }, config.server.shutdownTimeoutMs);
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

bootstrap().catch(err => {
  console.error('Fatal error during application startup:', err);
  process.exit(1);
});
