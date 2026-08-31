/**
 * Standardized HTTP Response Envelopes & Query Helpers
 */

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
    filterCount?: number;
    executionTimeMs?: number;
  };
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  filter?: Record<string, any>;
}

export class HttpResponse {
  public static success<T>(data: T, message?: string, meta?: ApiResponse['meta']): ApiResponse<T> {
    return {
      success: true,
      message,
      data,
      meta
    };
  }

  public static paginated<T>(
    items: T[],
    total: number,
    page: number,
    limit: number,
    message?: string
  ): ApiResponse<T[]> {
    const totalPages = Math.ceil(total / limit) || 1;
    return {
      success: true,
      message,
      data: items,
      meta: {
        page,
        limit,
        total,
        totalPages
      }
    };
  }

  public static error(code: string, message: string, details?: any): ApiResponse<null> {
    return {
      success: false,
      error: {
        code,
        message,
        details
      }
    };
  }
}
