/**
 * Generic Base Repository Pattern
 * Provides high-level CRUD, search, pagination, and transaction safety.
 */

import { db, JsonDatabase } from './database';
import { QueryBuilder } from './query-builder';
import { CryptoUtils } from '../core/crypto';

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt?: string;
}

export class Repository<T extends BaseEntity> {
  protected database: JsonDatabase;
  protected tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
    this.database = db;
    this.database.ensureTable(tableName);
  }

  public create(entity: Omit<T, 'id' | 'createdAt'> & Partial<BaseEntity>): T {
    const now = new Date().toISOString();
    const newRecord: T = {
      ...entity,
      id: entity.id || CryptoUtils.generateUUID(),
      createdAt: entity.createdAt || now,
      updatedAt: now
    } as T;

    return this.database.insert(this.tableName, newRecord);
  }

  public createMany(entities: (Omit<T, 'id' | 'createdAt'> & Partial<BaseEntity>)[]): T[] {
    const now = new Date().toISOString();
    const records: T[] = entities.map(e => ({
      ...e,
      id: e.id || CryptoUtils.generateUUID(),
      createdAt: e.createdAt || now,
      updatedAt: now
    })) as T[];

    return this.database.insertMany(this.tableName, records);
  }

  public findById(id: string): T | null {
    return this.database.findById<T>(this.tableName, id);
  }

  public findAll(): T[] {
    return this.database.getTable<T>(this.tableName);
  }

  public query(): QueryBuilder<T> {
    return new QueryBuilder<T>(this.findAll());
  }

  public update(id: string, updates: Partial<T>): T | null {
    return this.database.update<T>(this.tableName, id, updates);
  }

  public delete(id: string): boolean {
    return this.database.delete(this.tableName, id);
  }

  public count(): number {
    return this.findAll().length;
  }

  public paginate(page = 1, limit = 20, searchFields?: (keyof T)[], searchTerm?: string) {
    let q = this.query();
    if (searchFields && searchTerm) {
      q = q.search(searchFields, searchTerm);
    }
    const total = q.count();
    const items = q.orderBy('createdAt' as keyof T, 'desc')
      .offset((page - 1) * limit)
      .limit(limit)
      .get();

    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1
    };
  }
}
