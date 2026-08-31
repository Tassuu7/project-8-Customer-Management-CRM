/**
 * Enterprise Multi-Channel Logger Module
 * Provides structured JSON logging, console output with colorized tags,
 * file-based rotation, and security audit log streams.
 */

import * as fs from 'fs';
import * as path from 'path';
import { config } from './config';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'audit';

export interface LogMetadata {
  userId?: string;
  tenantId?: string;
  ip?: string;
  method?: string;
  path?: string;
  action?: string;
  entityType?: string;
  entityId?: string;
  durationMs?: number;
  statusCode?: number;
  [key: string]: any;
}

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: string;
  metadata?: LogMetadata;
  error?: {
    message: string;
    stack?: string;
    name?: string;
  };
}

class Logger {
  private static instance: Logger;
  private logFilePath: string;
  private auditFilePath: string;
  private levelsOrder: Record<LogLevel, number> = {
    debug: 10,
    info: 20,
    warn: 30,
    audit: 35,
    error: 40
  };

  private constructor() {
    this.logFilePath = path.resolve(config.logging.filePath);
    this.auditFilePath = path.resolve(path.dirname(this.logFilePath), 'audit.log');
    this.ensureLogDirectory();
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private ensureLogDirectory(): void {
    const dir = path.dirname(this.logFilePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  private shouldLog(level: LogLevel): boolean {
    const currentConfigLevel = config.logging.level;
    const currentOrder = this.levelsOrder[currentConfigLevel] || 10;
    const incomingOrder = this.levelsOrder[level] || 10;
    return incomingOrder >= currentOrder;
  }

  private formatConsole(entry: LogEntry): string {
    const colors = {
      debug: '\x1b[36m', // Cyan
      info: '\x1b[32m',  // Green
      warn: '\x1b[33m',  // Yellow
      error: '\x1b[31m', // Red
      audit: '\x1b[35m', // Magenta
      reset: '\x1b[0m',
      dim: '\x1b[2m',
      bold: '\x1b[1m'
    };

    const color = colors[entry.level] || colors.info;
    const timeStr = `${colors.dim}${entry.timestamp}${colors.reset}`;
    const lvlStr = `${color}${colors.bold}[${entry.level.toUpperCase().padEnd(5)}]${colors.reset}`;
    const ctxStr = entry.context ? `${colors.dim}[${entry.context}]${colors.reset} ` : '';
    const msg = `${color}${entry.message}${colors.reset}`;

    let extra = '';
    if (entry.metadata && Object.keys(entry.metadata).length > 0) {
      extra = ` ${colors.dim}${JSON.stringify(entry.metadata)}${colors.reset}`;
    }

    let errStr = '';
    if (entry.error) {
      errStr = `\n  ${colors.error}${entry.error.name || 'Error'}: ${entry.error.message}\n${entry.error.stack || ''}${colors.reset}`;
    }

    return `${timeStr} ${lvlStr} ${ctxStr}${msg}${extra}${errStr}`;
  }

  private writeToFile(filePath: string, entry: LogEntry): void {
    try {
      const line = JSON.stringify(entry) + '\n';
      fs.appendFileSync(filePath, line, 'utf8');
    } catch (err) {
      // Fallback silent fail to prevent logging recursion
    }
  }

  private log(level: LogLevel, message: string, context?: string, metadata?: LogMetadata, error?: Error): void {
    if (!this.shouldLog(level) && level !== 'audit') return;

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
      metadata
    };

    if (error) {
      entry.error = {
        name: error.name,
        message: error.message,
        stack: error.stack
      };
    }

    // Console output
    if (config.logging.enableConsole) {
      console.log(this.formatConsole(entry));
    }

    // File stream output
    if (config.logging.enableFileStream) {
      this.writeToFile(this.logFilePath, entry);
    }

    // Dedicated audit trail stream
    if (level === 'audit' && config.logging.enableAuditStream) {
      this.writeToFile(this.auditFilePath, entry);
    }
  }

  public debug(message: string, context?: string, metadata?: LogMetadata): void {
    this.log('debug', message, context, metadata);
  }

  public info(message: string, context?: string, metadata?: LogMetadata): void {
    this.log('info', message, context, metadata);
  }

  public warn(message: string, context?: string, metadata?: LogMetadata): void {
    this.log('warn', message, context, metadata);
  }

  public error(message: string, error?: Error, context?: string, metadata?: LogMetadata): void {
    this.log('error', message, context, metadata, error);
  }

  public audit(action: string, metadata: LogMetadata, context = 'AUDIT'): void {
    this.log('audit', `[AUDIT_ACTION] ${action}`, context, metadata);
  }
}

export const logger = Logger.getInstance();
