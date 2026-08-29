/**
 * Licenses Query Module
 * Contains all license-related types, API functions, and React Query hooks
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { apiRequest } from '../../services/api/apiClient';
import { API_ENDPOINTS } from '../../services/api/endpoints';

// ==================== TYPES ====================

export interface LicenseDto {
  title: string;
  description: string;
}

// ==================== QUERY KEYS ====================

export const licenseKeys = {
  all: ['licenses'] as const,
  lists: () => [...licenseKeys.all, 'list'] as const,
  details: () => [...licenseKeys.all, 'detail'] as const,
  detail: (id: string) => [...licenseKeys.details(), id] as const,
};

// ==================== API FUNCTIONS ====================

const licensesApi = {
  getAll: () =>
    apiRequest.get<LicenseDto[]>(API_ENDPOINTS.DASHBOARD.LICENSES.LIST),
  getById: (id: string) =>
    apiRequest.get<LicenseDto>(API_ENDPOINTS.DASHBOARD.LICENSES.GET(id)),
};

// ==================== QUERY HOOKS ====================

export const useLicenses = (options?: UseQueryOptions<LicenseDto[]>) => {
  return useQuery({
    queryKey: licenseKeys.all,
    queryFn: licensesApi.getAll,
    ...options,
  });
};

export const useLicense = (id: string) => {
  return useQuery({
    queryKey: licenseKeys.detail(id),
    queryFn: () => licensesApi.getById(id),
    enabled: !!id,
  });
};
