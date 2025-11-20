/**
 * Custom React Query hooks for Antd Dashboard data
 */

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import { antdService } from '../services/dashboard';
import {
  AntdClientDto,
  AntdOrderDto,
  AntdProductDto,
  AntdProjectDto,
  AntdSellerDto,
  TaskDto,
} from '../types/api/antd.types';

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

export const useProducts = (options?: UseQueryOptions<AntdProductDto[]>) => {
  return useQuery({
    queryKey: queryKeys.products.all,
    queryFn: () => antdService.products.getAll(),
    ...options,
  });
};

export const useTopProducts = (options?: UseQueryOptions<AntdProductDto[]>) => {
  return useQuery({
    queryKey: queryKeys.products.top,
    queryFn: () => antdService.products.getTop(),
    ...options,
  });
};

export const useProductCategories = () => {
  return useQuery({
    queryKey: queryKeys.products.categories,
    queryFn: () => antdService.products.getCategories(),
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: queryKeys.products.detail(id),
    queryFn: () => antdService.products.getById(id),
    enabled: !!id,
  });
};

// ==================== ORDERS ====================

export const useOrders = (options?: UseQueryOptions<AntdOrderDto[]>) => {
  return useQuery({
    queryKey: queryKeys.orders.all,
    queryFn: () => antdService.orders.getAll(),
    ...options,
  });
};

export const useRecentOrders = (options?: UseQueryOptions<AntdOrderDto[]>) => {
  return useQuery({
    queryKey: queryKeys.orders.recent,
    queryFn: () => antdService.orders.getRecent(),
    ...options,
  });
};

export const useOrder = (id: string) => {
  return useQuery({
    queryKey: queryKeys.orders.detail(id),
    queryFn: () => antdService.orders.getById(id),
    enabled: !!id,
  });
};

// ==================== SELLERS ====================

export const useSellers = (options?: UseQueryOptions<AntdSellerDto[]>) => {
  return useQuery({
    queryKey: queryKeys.sellers.all,
    queryFn: () => antdService.sellers.getAll(),
    ...options,
  });
};

export const useTopSellers = (options?: UseQueryOptions<AntdSellerDto[]>) => {
  return useQuery({
    queryKey: queryKeys.sellers.top,
    queryFn: () => antdService.sellers.getTop(),
    ...options,
  });
};

export const useSeller = (id: string) => {
  return useQuery({
    queryKey: queryKeys.sellers.detail(id),
    queryFn: () => antdService.sellers.getById(id),
    enabled: !!id,
  });
};

// ==================== PROJECTS ====================

export const useProjects = (options?: UseQueryOptions<AntdProjectDto[]>) => {
  return useQuery({
    queryKey: queryKeys.projects.all,
    queryFn: () => antdService.projects.getAll(),
    ...options,
  });
};

export const useProject = (id: string) => {
  return useQuery({
    queryKey: queryKeys.projects.detail(id),
    queryFn: () => antdService.projects.getById(id),
    enabled: !!id,
  });
};

// ==================== CLIENTS ====================

export const useClients = (options?: UseQueryOptions<AntdClientDto[]>) => {
  return useQuery({
    queryKey: queryKeys.clients.all,
    queryFn: () => antdService.clients.getAll(),
    ...options,
  });
};

export const useClient = (id: string) => {
  return useQuery({
    queryKey: queryKeys.clients.detail(id),
    queryFn: () => antdService.clients.getById(id),
    enabled: !!id,
  });
};

// ==================== TASKS ====================

export const useTasks = (options?: UseQueryOptions<TaskDto[]>) => {
  return useQuery({
    queryKey: queryKeys.tasks.all,
    queryFn: () => antdService.tasks.getAll(),
    ...options,
  });
};

export const useTask = (id: string) => {
  return useQuery({
    queryKey: queryKeys.tasks.detail(id),
    queryFn: () => antdService.tasks.getById(id),
    enabled: !!id,
  });
};

// ==================== MUTATIONS ====================

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<TaskDto>) => antdService.tasks.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks.all });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<TaskDto> }) =>
      antdService.tasks.update(id, data),
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
    mutationFn: (id: string) => antdService.tasks.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.tasks.all });
    },
  });
};
