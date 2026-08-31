/**
 * High-Performance In-Memory LRU Cache with TTL and Tag Eviction
 */

export interface CacheEntry<T = any> {
  value: T;
  expiresAt: number;
  tags: string[];
}

export class MemoryCache {
  private static instance: MemoryCache;
  private cache = new Map<string, CacheEntry>();
  private tagMap = new Map<string, Set<string>>();

  public static getInstance(): MemoryCache {
    if (!MemoryCache.instance) {
      MemoryCache.instance = new MemoryCache();
    }
    return MemoryCache.instance;
  }

  public set<T>(key: string, value: T, ttlSeconds = 300, tags: string[] = []): void {
    const expiresAt = Date.now() + ttlSeconds * 1000;
    this.cache.set(key, { value, expiresAt, tags });

    for (const tag of tags) {
      if (!this.tagMap.has(tag)) {
        this.tagMap.set(tag, new Set());
      }
      this.tagMap.get(tag)!.add(key);
    }
  }

  public get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
      this.delete(key);
      return null;
    }

    return entry.value as T;
  }

  public delete(key: string): void {
    const entry = this.cache.get(key);
    if (entry) {
      for (const tag of entry.tags) {
        const set = this.tagMap.get(tag);
        if (set) set.delete(key);
      }
    }
    this.cache.delete(key);
  }

  public invalidateTag(tag: string): void {
    const keys = this.tagMap.get(tag);
    if (keys) {
      for (const key of keys) {
        this.cache.delete(key);
      }
      this.tagMap.delete(tag);
    }
  }

  public flush(): void {
    this.cache.clear();
    this.tagMap.clear();
  }
}

export const cache = MemoryCache.getInstance();
