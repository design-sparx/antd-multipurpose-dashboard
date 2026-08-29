/**
 * Pricings Query Module
 * Contains all pricing-related types, API functions, and React Query hooks
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { apiRequest } from '../../services/api/apiClient';
import { API_ENDPOINTS } from '../../services/api/endpoints';

// ==================== TYPES ====================

export interface PricingDto {
  plan: string;
  monthly: number;
  annually: number;
  savings_caption: string;
  features: string[];
  color: string;
  preferred?: boolean;
}

// ==================== QUERY KEYS ====================

export const pricingKeys = {
  all: ['pricings'] as const,
  lists: () => [...pricingKeys.all, 'list'] as const,
  details: () => [...pricingKeys.all, 'detail'] as const,
  detail: (id: string) => [...pricingKeys.details(), id] as const,
};

// ==================== API FUNCTIONS ====================

const pricingsApi = {
  getAll: () =>
    apiRequest.get<PricingDto[]>(API_ENDPOINTS.DASHBOARD.PRICINGS.LIST),
  getById: (id: string) =>
    apiRequest.get<PricingDto>(API_ENDPOINTS.DASHBOARD.PRICINGS.GET(id)),
};

// ==================== QUERY HOOKS ====================

export const usePricings = (options?: UseQueryOptions<PricingDto[]>) => {
  return useQuery({
    queryKey: pricingKeys.all,
    queryFn: pricingsApi.getAll,
    ...options,
  });
};

export const usePricing = (id: string) => {
  return useQuery({
    queryKey: pricingKeys.detail(id),
    queryFn: () => pricingsApi.getById(id),
    enabled: !!id,
  });
};
