/**
 * Enterprise Application Configuration Module
 * Manages environment profiles, security tokens, runtime configurations,
 * database options, caching, and rate limiting rules.
 */

export interface AppConfig {
  env: 'development' | 'production' | 'test' | 'staging';
  appName: string;
  appVersion: string;
  appUrl: string;
  server: {
    port: number;
    host: string;
    trustProxy: boolean;
    shutdownTimeoutMs: number;
    corsAllowedOrigins: string[];
    bodyLimit: string;
  };
  auth: {
    jwtSecret: string;
    jwtExpirationSec: number;
    refreshTokenExpirationSec: number;
    bcryptRounds: number;
    maxLoginAttempts: number;
    lockoutDurationSec: number;
    sessionIdleTimeoutSec: number;
  };
  database: {
    storageType: 'file' | 'memory' | 'sqlite';
    storagePath: string;
    autoSaveIntervalMs: number;
    enableWalMode: boolean;
    backupDir: string;
    maxBackupHistory: number;
  };
  rateLimit: {
    enabled: boolean;
    windowMs: number;
    maxRequests: number;
    skipSuccessfulRequests: boolean;
  };
  logging: {
    level: 'debug' | 'info' | 'warn' | 'error';
    filePath: string;
    enableConsole: boolean;
    enableFileStream: boolean;
    enableAuditStream: boolean;
    maxFileSizeMb: number;
    maxFiles: number;
  };
  cache: {
    defaultTtlSec: number;
    maxEntries: number;
    checkPeriodSec: number;
  };
  crm: {
    defaultCurrency: string;
    leadQualificationThreshold: number;
    slaResolutionWarningHours: number;
    healthScoreWeightings: {
      activityRecency: number;
      openTicketsCount: number;
      dealValue: number;
      npsScore: number;
      contractRenewalDays: number;
    };
  };
}

class ConfigurationManager {
  private static instance: ConfigurationManager;
  private config: AppConfig;

  private constructor() {
    this.config = this.loadConfig();
  }

  public static getInstance(): ConfigurationManager {
    if (!ConfigurationManager.instance) {
      ConfigurationManager.instance = new ConfigurationManager();
    }
    return ConfigurationManager.instance;
  }

  public getConfig(): AppConfig {
    return this.config;
  }

  public get<K extends keyof AppConfig>(key: K): AppConfig[K] {
    return this.config[key];
  }

  public isDevelopment(): boolean {
    return this.config.env === 'development';
  }

  public isProduction(): boolean {
    return this.config.env === 'production';
  }

  public isTest(): boolean {
    return this.config.env === 'test';
  }

  private loadConfig(): AppConfig {
    const env = (process.env.NODE_ENV || 'development').toLowerCase() as AppConfig['env'];
    const port = parseInt(process.env.PORT || '5080', 10);
    const host = process.env.HOST || '0.0.0.0';

    return {
      env,
      appName: process.env.APP_NAME || 'OmniCustomer-360-CRM',
      appVersion: '2.4.0',
      appUrl: process.env.APP_URL || `http://localhost:${port}`,
      server: {
        port,
        host,
        trustProxy: process.env.TRUST_PROXY === 'true',
        shutdownTimeoutMs: 10000,
        corsAllowedOrigins: (process.env.CORS_ORIGINS || '*').split(',').map(s => s.trim()),
        bodyLimit: '10mb'
      },
      auth: {
        jwtSecret: process.env.JWT_SECRET || 'crm-enterprise-secret-key-development-seed-2026',
        jwtExpirationSec: parseInt(process.env.JWT_EXPIRATION || '86400', 10),
        refreshTokenExpirationSec: parseInt(process.env.REFRESH_TOKEN_EXPIRATION || '604800', 10),
        bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || '10', 10),
        maxLoginAttempts: 5,
        lockoutDurationSec: 900,
        sessionIdleTimeoutSec: 7200
      },
      database: {
        storageType: (process.env.DB_STORAGE_TYPE || 'file') as 'file' | 'memory' | 'sqlite',
        storagePath: process.env.DB_STORAGE_PATH || './data/crm_storage.json',
        autoSaveIntervalMs: parseInt(process.env.DB_AUTO_SAVE_INTERVAL_MS || '3000', 10),
        enableWalMode: true,
        backupDir: './data/backups',
        maxBackupHistory: 10
      },
      rateLimit: {
        enabled: process.env.ENABLE_RATE_LIMIT !== 'false',
        windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10),
        maxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '1000', 10),
        skipSuccessfulRequests: false
      },
      logging: {
        level: (process.env.LOG_LEVEL || 'debug') as AppConfig['logging']['level'],
        filePath: process.env.LOG_FILE_PATH || './logs/app.log',
        enableConsole: process.env.LOG_ENABLE_CONSOLE !== 'false',
        enableFileStream: true,
        enableAuditStream: true,
        maxFileSizeMb: 20,
        maxFiles: 5
      },
      cache: {
        defaultTtlSec: 300,
        maxEntries: 5000,
        checkPeriodSec: 60
      },
      crm: {
        defaultCurrency: 'USD',
        leadQualificationThreshold: 70,
        slaResolutionWarningHours: 4,
        healthScoreWeightings: {
          activityRecency: 0.25,
          openTicketsCount: 0.20,
          dealValue: 0.20,
          npsScore: 0.20,
          contractRenewalDays: 0.15
        }
      }
    };
  }
}

export const config = ConfigurationManager.getInstance().getConfig();
export const configManager = ConfigurationManager.getInstance();
