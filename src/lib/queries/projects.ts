/**
 * Projects Query Module
 * Contains all projects-related types, API functions, and React Query hooks
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

export enum ProjectState {
  Planning = 'planning',
  Active = 'active',
  OnHold = 'on_hold',
  Completed = 'completed',
  Cancelled = 'cancelled',
}

// ==================== TYPES ====================

export interface ProjectDto {
  project_id?: string;
  project_name?: string;
  client?: string;
  start_date?: string;
  end_date?: string;
  budget: number;
  status?: string;
  progress: number;
  team_size: number;
  priority?: string;
}

export interface ProjectDto2 {
  id?: string;
  name?: string;
  description?: string;
  clientId?: string;
  clientName?: string;
  startDate?: string;
  endDate?: string;
  budget: number;
  status: ProjectState;
  progress: number;
  teamSize: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectCreateResponse {
  success: boolean;
  message?: string;
  data?: ProjectDto2;
}

export interface ProjectUpdateResponse {
  success: boolean;
  message?: string;
  data?: ProjectDto2;
}

export interface ProjectDeleteResponse {
  success: boolean;
  message?: string;
}

export interface ProjectListResponse {
  success: boolean;
  data?: ProjectDto[];
}

export interface ProjectResponse {
  success: boolean;
  data?: ProjectDto2;
}

// ==================== QUERY KEYS ====================

export const projectKeys = {
  all: ['projects'] as const,
  lists: () => [...projectKeys.all, 'list'] as const,
  list: (filters?: string) => [...projectKeys.lists(), { filters }] as const,
  details: () => [...projectKeys.all, 'detail'] as const,
  detail: (id: string) => [...projectKeys.details(), id] as const,
};

// ==================== API FUNCTIONS ====================

const projectsApi = {
  getAll: () =>
    apiRequest.get<ProjectDto[]>(API_ENDPOINTS.DASHBOARD.PROJECTS.LIST),

  getById: (id: string) =>
    apiRequest.get<ProjectDto>(API_ENDPOINTS.DASHBOARD.PROJECTS.GET(id)),

  create: (data: Partial<ProjectDto>) =>
    apiRequest.post(API_ENDPOINTS.DASHBOARD.PROJECTS.CREATE, data),

  update: (id: string, data: Partial<ProjectDto>) =>
    apiRequest.put(API_ENDPOINTS.DASHBOARD.PROJECTS.UPDATE(id), data),

  delete: (id: string) =>
    apiRequest.delete(API_ENDPOINTS.DASHBOARD.PROJECTS.DELETE(id)),
};

// ==================== QUERY HOOKS ====================

export const useProjects = (options?: UseQueryOptions<ProjectDto[]>) => {
  return useQuery({
    queryKey: projectKeys.all,
    queryFn: projectsApi.getAll,
    ...options,
  });
};

export const useProject = (id: string) => {
  return useQuery({
    queryKey: projectKeys.detail(id),
    queryFn: () => projectsApi.getById(id),
    enabled: !!id,
  });
};

// ==================== MUTATION HOOKS ====================

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: projectsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ProjectDto> }) =>
      projectsApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
      queryClient.invalidateQueries({
        queryKey: projectKeys.detail(variables.id),
      });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: projectsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.all });
    },
  });
};
