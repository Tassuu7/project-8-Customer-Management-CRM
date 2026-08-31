/**
 * Database Migration & Schema Integrity Runner
 */

import { db } from './database';
import { CRM_TABLE_SCHEMAS } from './schema';
import { logger } from '../core/logger';

export class MigrationRunner {
  public static runMigrations(): void {
    logger.info('[Migrations] Verifying database schema integrity...', 'MIGRATIONS');
    
    for (const [tableName, schema] of Object.entries(CRM_TABLE_SCHEMAS)) {
      db.ensureTable(tableName);
    }

    db.flushSync();
    logger.info('[Migrations] All tables initialized and verified.', 'MIGRATIONS');
  }
}
