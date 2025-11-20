/**
 * API Response Types
 * These types reflect the actual API response structure from the backend
 */

/**
 * Pagination metadata returned by the API
 */
export type PaginationMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

/**
 * Base API response structure for Tasks endpoints
 * Uses "success" field and includes timestamp
 */
export type TasksApiResponse<T> = {
  success: boolean;
  data: T;
  message: string;
  timestamp: string;
  meta: PaginationMeta;
};

/**
 * Base API response structure for Projects and other Antd endpoints
 * Uses "succeeded" field and includes errors array
 */
export type ProjectsApiResponse<T> = {
  succeeded: boolean;
  message: string;
  data: T;
  errors: string[];
  meta: PaginationMeta;
};

/**
 * Generic API response type
 * Can be used for endpoints that follow either pattern
 */
export type ApiResponse<T> = {
  success?: boolean;
  succeeded?: boolean;
  data: T;
  message: string;
  timestamp?: string;
  errors?: string[];
  meta?: PaginationMeta;
};

/**
 * Single item response (for GET /api/v1/antd/projects/:id)
 */
export type SingleItemApiResponse<T> = Omit<ProjectsApiResponse<T>, 'meta'> & {
  meta?: PaginationMeta | null;
};
