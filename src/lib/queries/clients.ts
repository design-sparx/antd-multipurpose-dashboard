/**
 * Clients Query Module
 * Contains all clients-related types, API functions, and React Query hooks
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

export interface ClientDto {
  client_id?: string;
  client_name?: string;
  company?: string;
  email?: string;
  phone?: string;
  projects_count: number;
  total_value: number;
  status?: string;
}

export interface ClientDto2 {
  id?: string;
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  address?: string;
  projectsCount: number;
  totalValue: number;
  status?: string;
  createdAt?: string;
}

export interface ClientCreateResponse {
  success: boolean;
  message?: string;
  data?: ClientDto2;
}

export interface ClientUpdateResponse {
  success: boolean;
  message?: string;
  data?: ClientDto2;
}

export interface ClientDeleteResponse {
  success: boolean;
  message?: string;
}

export interface ClientListResponse {
  success: boolean;
  data?: ClientDto[];
}

export interface ClientResponse {
  success: boolean;
  data?: ClientDto2;
}

// ==================== QUERY KEYS ====================

export const clientKeys = {
  all: ['clients'] as const,
  lists: () => [...clientKeys.all, 'list'] as const,
  list: (filters?: string) => [...clientKeys.lists(), { filters }] as const,
  details: () => [...clientKeys.all, 'detail'] as const,
  detail: (id: string) => [...clientKeys.details(), id] as const,
};

// ==================== API FUNCTIONS ====================

const clientsApi = {
  getAll: () =>
    apiRequest.get<ClientDto[]>(API_ENDPOINTS.DASHBOARD.CLIENTS.LIST),

  getById: (id: string) =>
    apiRequest.get<ClientDto>(API_ENDPOINTS.DASHBOARD.CLIENTS.GET(id)),

  create: (data: Partial<ClientDto>) =>
    apiRequest.post(API_ENDPOINTS.DASHBOARD.CLIENTS.CREATE, data),

  update: (id: string, data: Partial<ClientDto>) =>
    apiRequest.put(API_ENDPOINTS.DASHBOARD.CLIENTS.UPDATE(id), data),

  delete: (id: string) =>
    apiRequest.delete(API_ENDPOINTS.DASHBOARD.CLIENTS.DELETE(id)),
};

// ==================== QUERY HOOKS ====================

export const useClients = (options?: UseQueryOptions<ClientDto[]>) => {
  return useQuery({
    queryKey: clientKeys.all,
    queryFn: clientsApi.getAll,
    ...options,
  });
};

export const useClient = (id: string) => {
  return useQuery({
    queryKey: clientKeys.detail(id),
    queryFn: () => clientsApi.getById(id),
    enabled: !!id,
  });
};

// ==================== MUTATION HOOKS ====================

export const useCreateClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clientsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: clientKeys.all });
    },
  });
};

export const useUpdateClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ClientDto> }) =>
      clientsApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: clientKeys.all });
      queryClient.invalidateQueries({
        queryKey: clientKeys.detail(variables.id),
      });
    },
  });
};

export const useDeleteClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: clientsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: clientKeys.all });
    },
  });
};
