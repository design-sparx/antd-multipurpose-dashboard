// Common API response types
// ==================== PAGINATION ====================

export interface PaginationMeta {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: PaginationMeta;
}

// ==================== API RESPONSE WRAPPER ====================

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ApiResponseOfObject<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: string[];
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: string[];
  statusCode?: number;
}
