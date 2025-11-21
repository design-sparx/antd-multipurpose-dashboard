/**
 * Products Query Module
 * Contains all products-related types, API functions, and React Query hooks
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

export interface ProductDto {
  product_id?: string;
  product_name?: string;
  brand?: string;
  price: number;
  quantity_sold: number;
  category?: string;
  expiration_date?: string;
  customer_reviews: number;
  average_rating: number;
  is_featured: boolean;
  image_url?: string;
}

export interface ProductDto2 {
  id?: string;
  name?: string;
  description?: string;
  price: number;
  category?: string;
  imageUrl?: string;
  stock: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoryDto {
  category_id?: string;
  category_name?: string;
  product_count: number;
  total_sales: number;
  icon?: string;
}

export interface CategoryListResponse {
  success: boolean;
  data?: CategoryDto[];
}

export interface ProductCreateResponse {
  success: boolean;
  message?: string;
  data?: ProductDto2;
}

export interface ProductUpdateResponse {
  success: boolean;
  message?: string;
  data?: ProductDto2;
}

export interface ProductDeleteResponse {
  success: boolean;
  message?: string;
}

export interface ProductListResponse {
  success: boolean;
  data?: ProductDto[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ProductResponse {
  success: boolean;
  data?: ProductDto2;
}

// ==================== QUERY KEYS ====================

export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (filters?: string) => [...productKeys.lists(), { filters }] as const,
  details: () => [...productKeys.all, 'detail'] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
  top: () => [...productKeys.all, 'top'] as const,
  categories: () => [...productKeys.all, 'categories'] as const,
};

// ==================== API FUNCTIONS ====================

const productsApi = {
  getAll: () =>
    apiRequest.get<ProductDto[]>(API_ENDPOINTS.DASHBOARD.PRODUCTS.LIST),

  getTop: () =>
    apiRequest.get<ProductDto[]>(API_ENDPOINTS.DASHBOARD.PRODUCTS.TOP),

  getById: (id: string) =>
    apiRequest.get<ProductDto>(API_ENDPOINTS.DASHBOARD.PRODUCTS.GET(id)),

  getCategories: () =>
    apiRequest.get<CategoryListResponse>(
      API_ENDPOINTS.DASHBOARD.PRODUCTS.CATEGORIES
    ),

  create: (data: Partial<ProductDto>) =>
    apiRequest.post(API_ENDPOINTS.DASHBOARD.PRODUCTS.CREATE, data),

  update: (id: string, data: Partial<ProductDto>) =>
    apiRequest.put(API_ENDPOINTS.DASHBOARD.PRODUCTS.UPDATE(id), data),

  delete: (id: string) =>
    apiRequest.delete(API_ENDPOINTS.DASHBOARD.PRODUCTS.DELETE(id)),
};

// ==================== QUERY HOOKS ====================

export const useProducts = (options?: UseQueryOptions<ProductDto[]>) => {
  return useQuery({
    queryKey: productKeys.all,
    queryFn: productsApi.getAll,
    ...options,
  });
};

export const useTopProducts = (options?: UseQueryOptions<ProductDto[]>) => {
  return useQuery({
    queryKey: productKeys.top(),
    queryFn: productsApi.getTop,
    ...options,
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => productsApi.getById(id),
    enabled: !!id,
  });
};

export const useProductCategories = () => {
  return useQuery({
    queryKey: productKeys.categories(),
    queryFn: productsApi.getCategories,
  });
};

// ==================== MUTATION HOOKS ====================

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ProductDto> }) =>
      productsApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      queryClient.invalidateQueries({
        queryKey: productKeys.detail(variables.id),
      });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: productsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
  });
};
