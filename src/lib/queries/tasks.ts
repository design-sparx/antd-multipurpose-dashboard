/**
 * Tasks Query Module
 * Contains all tasks-related types, API functions, and React Query hooks
 */

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import { apiRequest } from '../../services/api/apiClient';
import { API_ENDPOINTS } from '../../services/api/endpoints';

// ==================== ENUMS ====================

export enum TaskStatus {
  Todo = 'todo',
  InProgress = 'in_progress',
  Completed = 'completed',
  Cancelled = 'cancelled',
}

export enum TaskPriority {
  Low = 'low',
  Medium = 'medium',
  High = 'high',
  Urgent = 'urgent',
}

export enum TaskCategory {
  Development = 'development',
  Design = 'design',
  Marketing = 'marketing',
  Sales = 'sales',
  Support = 'support',
  Other = 'other',
}

export enum TaskColor {
  Blue = 'blue',
  Green = 'green',
  Red = 'red',
  Orange = 'orange',
  Purple = 'purple',
  Gray = 'gray',
}

// ==================== TYPES ====================

export interface TaskDto {
  id?: string;
  title?: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  category: TaskCategory;
  assignedTo?: string;
  dueDate?: string;
  createdAt?: string;
  updatedAt?: string;
}

// ==================== QUERY KEYS ====================

export const taskKeys = {
  all: ['tasks'] as const,
  lists: () => [...taskKeys.all, 'list'] as const,
  list: (filters?: string) => [...taskKeys.lists(), { filters }] as const,
  details: () => [...taskKeys.all, 'detail'] as const,
  detail: (id: string) => [...taskKeys.details(), id] as const,
};

// ==================== API FUNCTIONS ====================

const tasksApi = {
  getAll: () => apiRequest.get<TaskDto[]>(API_ENDPOINTS.DASHBOARD.TASKS.LIST),

  getById: (id: string) =>
    apiRequest.get<TaskDto>(API_ENDPOINTS.DASHBOARD.TASKS.GET(id)),

  create: (data: Partial<TaskDto>) =>
    apiRequest.post(API_ENDPOINTS.DASHBOARD.TASKS.CREATE, data),

  update: (id: string, data: Partial<TaskDto>) =>
    apiRequest.put(API_ENDPOINTS.DASHBOARD.TASKS.UPDATE(id), data),

  delete: (id: string) =>
    apiRequest.delete(API_ENDPOINTS.DASHBOARD.TASKS.DELETE(id)),
};

// ==================== QUERY HOOKS ====================

export const useTasks = (options?: UseQueryOptions<TaskDto[]>) => {
  return useQuery({
    queryKey: taskKeys.all,
    queryFn: tasksApi.getAll,
    ...options,
  });
};

export const useTask = (id: string) => {
  return useQuery({
    queryKey: taskKeys.detail(id),
    queryFn: () => tasksApi.getById(id),
    enabled: !!id,
  });
};

// ==================== MUTATION HOOKS ====================

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tasksApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<TaskDto> }) =>
      tasksApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
      queryClient.invalidateQueries({ queryKey: taskKeys.detail(variables.id) });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: tasksApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.all });
    },
  });
};
