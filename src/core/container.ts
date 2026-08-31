/**
 * Enterprise Lightweight IoC / Dependency Injection Container
 */

export type ServiceLifetime = 'singleton' | 'transient' | 'scoped';

export interface ServiceDescriptor<T = any> {
  token: string | symbol;
  factory: (container: Container) => T;
  lifetime: ServiceLifetime;
  instance?: T;
}

export class Container {
  private static instance: Container;
  private services = new Map<string | symbol, ServiceDescriptor>();
  private scopedInstances = new Map<string | symbol, any>();
  private resolvingTokens = new Set<string | symbol>();

  public static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  public register<T>(
    token: string | symbol,
    factory: (c: Container) => T,
    lifetime: ServiceLifetime = 'singleton'
  ): this {
    this.services.set(token, {
      token,
      factory,
      lifetime
    });
    return this;
  }

  public registerInstance<T>(token: string | symbol, instance: T): this {
    this.services.set(token, {
      token,
      factory: () => instance,
      lifetime: 'singleton',
      instance
    });
    return this;
  }

  public resolve<T>(token: string | symbol): T {
    const descriptor = this.services.get(token);
    if (!descriptor) {
      throw new Error(`[IoC Container] Service token not registered: ${String(token)}`);
    }

    if (this.resolvingTokens.has(token)) {
      throw new Error(`[IoC Container] Circular dependency detected resolving: ${String(token)}`);
    }

    if (descriptor.lifetime === 'singleton') {
      if (!descriptor.instance) {
        this.resolvingTokens.add(token);
        try {
          descriptor.instance = descriptor.factory(this);
        } finally {
          this.resolvingTokens.delete(token);
        }
      }
      return descriptor.instance as T;
    }

    if (descriptor.lifetime === 'scoped') {
      if (!this.scopedInstances.has(token)) {
        this.resolvingTokens.add(token);
        try {
          const instance = descriptor.factory(this);
          this.scopedInstances.set(token, instance);
        } finally {
          this.resolvingTokens.delete(token);
        }
      }
      return this.scopedInstances.get(token) as T;
    }

    // Transient lifetime
    this.resolvingTokens.add(token);
    try {
      return descriptor.factory(this) as T;
    } finally {
      this.resolvingTokens.delete(token);
    }
  }

  public has(token: string | symbol): boolean {
    return this.services.has(token);
  }

  public clearScope(): void {
    this.scopedInstances.clear();
  }

  public reset(): void {
    this.services.clear();
    this.scopedInstances.clear();
    this.resolvingTokens.clear();
  }
}

export const container = Container.getInstance();
