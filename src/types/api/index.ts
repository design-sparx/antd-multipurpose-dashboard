/**
 * API Types Index
 * Central export for all API-related TypeScript types
 */

// Authentication & User types
export * from './auth.types';

// Ant Design Dashboard types
export * from './antd.types';

// Common API response types
export type { ApiResponseOfObject, ApiErrorResponse } from './auth.types';
export type { PaginationMeta, PaginatedResponse } from './antd.types';
