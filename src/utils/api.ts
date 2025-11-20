/**
 * API Service Utilities
 * Helper functions for working with API responses
 */

import type {
  ApiResponse,
  TasksApiResponse,
  ProjectsApiResponse,
  PaginationMeta,
} from '../types';

/**
 * Check if a response is successful
 */
export const isApiSuccess = <T>(
  response: ApiResponse<T> | TasksApiResponse<T> | ProjectsApiResponse<T>
): boolean => {
  return Boolean(response.success || response.succeeded);
};

/**
 * Extract data from an API response
 * Safely handles both wrapped and unwrapped responses
 */
export const extractData = <T>(response: ApiResponse<T> | T): T => {
  if (
    response &&
    typeof response === 'object' &&
    'data' in response &&
    ('success' in response || 'succeeded' in response)
  ) {
    return (response as ApiResponse<T>).data;
  }
  return response as T;
};

/**
 * Extract pagination meta from an API response
 */
export const extractMeta = <T>(
  response: ApiResponse<T> | TasksApiResponse<T> | ProjectsApiResponse<T>
): PaginationMeta | undefined => {
  return response.meta;
};

/**
 * Extract error messages from an API response
 */
export const extractErrors = <T>(
  response: ProjectsApiResponse<T>
): string[] => {
  return response.errors || [];
};

/**
 * Build query parameters for API requests
 */
export const buildQueryParams = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });

  const queryString = searchParams.toString();
  return queryString ? `?${queryString}` : '';
};

/**
 * Task query parameters
 */
export type TasksQueryParams = {
  Page?: number;
  Limit?: number;
  Status?: number;
  Priority?: number;
  Category?: number;
  Color?: number;
  AssignedTo?: string;
  DueDateFrom?: string;
  DueDateTo?: string;
  MinDuration?: number;
  MaxDuration?: number;
  SortBy?: string;
  SortOrder?: 'asc' | 'desc';
};

/**
 * Projects query parameters
 */
export type ProjectsQueryParams = {
  Page?: number;
  Limit?: number;
  Status?: string;
  Priority?: string;
  ProjectManager?: string;
  ClientName?: string;
  ProjectType?: string;
  ProjectCategory?: string;
  StartDateFrom?: string;
  StartDateTo?: string;
  SortBy?: string;
  SortOrder?: 'asc' | 'desc';
};

/**
 * Example API service functions
 */
export const ApiService = {
  /**
   * Fetch tasks with query parameters
   */
  getTasks: async (params?: TasksQueryParams) => {
    const queryString = params ? buildQueryParams(params) : '';
    const response = await fetch(`/api/v1/antd/tasks${queryString}`);
    return response.json();
  },

  /**
   * Fetch projects with query parameters
   */
  getProjects: async (params?: ProjectsQueryParams) => {
    const queryString = params ? buildQueryParams(params) : '';
    const response = await fetch(`/api/v1/antd/projects${queryString}`);
    return response.json();
  },
};
