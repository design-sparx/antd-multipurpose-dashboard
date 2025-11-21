/**
 * Sellers Query Module
 * Contains all sellers-related types, API functions, and React Query hooks
 */

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import { apiRequest } from '../../services/api/apiClient';
import { API_ENDPOINTS } from '../../services/api/endpoints';

// ==================== TYPES ====================

export interface SellerDto {
  seller_id?: string;
  seller?: string;
  region?: string;
  total_sales: number;
  orders_count: number;
  rating: number;
  avatar_url?: string;
}

export interface SellerDto2 {
  id?: string;
  name?: string;
  email?: string;
  region?: string;
  totalSales: number;
  ordersCount: number;
  rating: number;
  avatarUrl?: string;
  createdAt?: string;
}

export interface SellerCreateResponse {
  success: boolean;
  message?: string;
  data?: SellerDto2;
}

export interface SellerUpdateResponse {
  success: boolean;
  message?: string;
  data?: SellerDto2;
}

export interface SellerDeleteResponse {
  success: boolean;
  message?: string;
}

export interface SellerListResponse {
  success: boolean;
  data?: SellerDto[];
}

export interface SellerResponse {
  success: boolean;
  data?: SellerDto2;
}

// ==================== QUERY KEYS ====================

export const sellerKeys = {
  all: ['sellers'] as const,
  lists: () => [...sellerKeys.all, 'list'] as const,
  list: (filters?: string) => [...sellerKeys.lists(), { filters }] as const,
  details: () => [...sellerKeys.all, 'detail'] as const,
  detail: (id: string) => [...sellerKeys.details(), id] as const,
  top: () => [...sellerKeys.all, 'top'] as const,
};

// ==================== API FUNCTIONS ====================

const sellersApi = {
  getAll: () =>
    apiRequest.get<SellerDto[]>(API_ENDPOINTS.DASHBOARD.SELLERS.LIST),

  getTop: () =>
    apiRequest.get<SellerDto[]>(API_ENDPOINTS.DASHBOARD.SELLERS.TOP),

  getById: (id: string) =>
    apiRequest.get<SellerDto>(API_ENDPOINTS.DASHBOARD.SELLERS.GET(id)),

  create: (data: Partial<SellerDto>) =>
    apiRequest.post(API_ENDPOINTS.DASHBOARD.SELLERS.CREATE, data),

  update: (id: string, data: Partial<SellerDto>) =>
    apiRequest.put(API_ENDPOINTS.DASHBOARD.SELLERS.UPDATE(id), data),

  delete: (id: string) =>
    apiRequest.delete(API_ENDPOINTS.DASHBOARD.SELLERS.DELETE(id)),
};

// ==================== QUERY HOOKS ====================

export const useSellers = (options?: UseQueryOptions<SellerDto[]>) => {
  return useQuery({
    queryKey: sellerKeys.all,
    queryFn: sellersApi.getAll,
    ...options,
  });
};

export const useTopSellers = (options?: UseQueryOptions<SellerDto[]>) => {
  return useQuery({
    queryKey: sellerKeys.top(),
    queryFn: sellersApi.getTop,
    ...options,
  });
};

export const useSeller = (id: string) => {
  return useQuery({
    queryKey: sellerKeys.detail(id),
    queryFn: () => sellersApi.getById(id),
    enabled: !!id,
  });
};

// ==================== MUTATION HOOKS ====================

export const useCreateSeller = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sellersApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sellerKeys.all });
    },
  });
};

export const useUpdateSeller = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<SellerDto> }) =>
      sellersApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: sellerKeys.all });
      queryClient.invalidateQueries({
        queryKey: sellerKeys.detail(variables.id),
      });
    },
  });
};

export const useDeleteSeller = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sellersApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sellerKeys.all });
    },
  });
};
