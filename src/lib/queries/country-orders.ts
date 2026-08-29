/**
 * Country Orders Query Module
 * Contains all country order-related types, API functions, and React Query hooks
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { apiRequest } from '../../services/api/apiClient';
import { API_ENDPOINTS } from '../../services/api/endpoints';

// ==================== TYPES ====================

export interface CountryOrderDto {
  country: string;
  orders: number;
  revenue: string;
  customer_name: string;
  customer_email: string;
  shipping_address: string;
  product_name: string;
  order_date: string;
}

// ==================== QUERY KEYS ====================

export const countryOrderKeys = {
  all: ['country-orders'] as const,
  lists: () => [...countryOrderKeys.all, 'list'] as const,
  details: () => [...countryOrderKeys.all, 'detail'] as const,
  detail: (id: string) => [...countryOrderKeys.details(), id] as const,
};

// ==================== API FUNCTIONS ====================

const countryOrdersApi = {
  getAll: () =>
    apiRequest.get<CountryOrderDto[]>(API_ENDPOINTS.DASHBOARD.COUNTRY_ORDERS.LIST),
};

// ==================== QUERY HOOKS ====================

export const useCountryOrders = (
  options?: UseQueryOptions<CountryOrderDto[]>
) => {
  return useQuery({
    queryKey: countryOrderKeys.all,
    queryFn: countryOrdersApi.getAll,
    ...options,
  });
};
