/**
 * Custom React Query hooks for Dashboard data
 */

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import { dashboardService } from '../services/dashboard';
import {
  ClientDto,
  OrderDto,
  ProductDto,
  ProjectDto,
  SellerDto,
  TaskDto,
} from '../types/api/dashboard.types';

// Query Keys
export const queryKeys = {
  products: {
    all: ['products'] as const,
    top: ['products', 'top'] as const,
    categories: ['products', 'categories'] as const,
    detail: (id: string) => ['products', id] as const,
  },
  orders: {
    all: ['orders'] as const,
    recent: ['orders', 'recent'] as const,
    detail: (id: string) => ['orders', id] as const,
  },
  sellers: {
    all: ['sellers'] as const,
    top: ['sellers', 'top'] as const,
    detail: (id: string) => ['sellers', id] as const,
  },
  projects: {
    all: ['projects'] as const,
    detail: (id: string) => ['projects', id] as const,
  },
  clients: {
    all: ['clients'] as const,
    detail: (id: string) => ['clients', id] as const,
  },
  tasks: {
    all: ['tasks'] as const,
    detail: (id: string) => ['tasks', id] as const,
  },
};

// ==================== PRODUCTS ====================

export const useProducts = (options?: UseQueryOptions<ProductDto[]>) => {
  return useQuery({
    queryKey: queryKeys.products.all,
    queryFn: () => dashboardService.products.getAll(),
    ...options,
  });
};

export const useTopProducts = (options?: UseQueryOptions<ProductDto[]>) => {
  return useQuery({
    queryKey: queryKeys.products.top,
    queryFn: () => dashboardService.products.getTop(),
    ...options,
  });
};

export const useProductCategories = () => {
  return useQuery({
    queryKey: queryKeys.products.categories,
    queryFn: () => dashboardService.products.getCategories(),
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: queryKeys.products.detail(id),
    queryFn: () => dashboardService.products.getById(id),
    enabled: !!id,
  });
};

// ==================== ORDERS ====================

export const useOrders = (options?: UseQueryOptions<OrderDto[]>) => {
  return useQuery({
    queryKey: queryKeys.orders.all,
    queryFn: () => dashboardService.orders.getAll(),
    ...options,
  });
};

export const useRecentOrders = (options?: UseQueryOptions<OrderDto[]>) => {
  return useQuery({
    queryKey: queryKeys.orders.recent,
    queryFn: () => dashboardService.orders.getRecent(),
    ...options,
  });
};

export const useOrder = (id: string) => {
  return useQuery({
    queryKey: queryKeys.orders.detail(id),
    queryFn: () => dashboardService.orders.getById(id),
    enabled: !!id,
  });
};

// ==================== SELLERS ====================

export const useSellers = (options?: UseQueryOptions<SellerDto[]>) => {
  return useQuery({
    queryKey: queryKeys.sellers.all,
    queryFn: () => dashboardService.sellers.getAll(),
    ...options,
  });
};

export const useTopSellers = (options?: UseQueryOptions<SellerDto[]>) => {
  return useQuery({
    queryKey: queryKeys.sellers.top,
    queryFn: () => dashboardService.sellers.getTop(),
    ...options,
  });
};

export const useSeller = (id: string) => {
  return useQuery({
    queryKey: queryKeys.sellers.detail(id),
    queryFn: () => dashboardService.sellers.getById(id),
    enabled: !!id,
  });
};

// ==================== PROJECTS ====================

export const useProjects = (options?: UseQueryOptions<ProjectDto[]>) => {
  return useQuery({
    queryKey: queryKeys.projects.all,
    queryFn: () => dashboardService.projects.getAll(),
    ...options,
  });
};

export const useProject = (id: string) => {
  return useQuery({
    queryKey: queryKeys.projects.detail(id),
    queryFn: () => dashboardService.projects.getById(id),
    enabled: !!id,
  });
};

// ==================== CLIENTS ====================

export const useClients = (options?: UseQueryOptions<ClientDto[]>) => {
  return useQuery({
    queryKey: queryKeys.clients.all,
    queryFn: () => dashboardService.clients.getAll(),
    ...options,
  });
};

export const useClient = (id: string) => {
  return useQuery({
    queryKey: queryKeys.clients.detail(id),
    queryFn: () => dashboardService.clients.getById(id),
    enabled: !!id,
  });
};

// ==================== TASKS ====================

export const useTasks = (options?: UseQueryOptions<TaskDto[]>) => {
  return useQuery({
    queryKey: queryKeys.tasks.all,
    queryFn: () => dashboardService.tasks.getAll(),
    ...options,
  });
};

export const useTask = (id: string) => {
  return useQuery({
    queryKey: queryKeys.tasks.detail(id),
    queryFn: () => dashboardService.tasks.getById(id),
    enabled: !!id,
  });
};

// ==================== MUTATIONS ====================

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<TaskDto>) => dashboardService.tasks.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks.all });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<TaskDto> }) =>
      dashboardService.tasks.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.tasks.detail(variables.id),
      });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => dashboardService.tasks.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks.all });
    },
  });
};
