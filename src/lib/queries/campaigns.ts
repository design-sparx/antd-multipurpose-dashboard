/**
 * Campaigns Query Module
 * Contains all campaign-related types, API functions, and React Query hooks
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

export interface CampaignAdDto {
  campaign_id?: string;
  campaign_name?: string;
  platform?: string;
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  status?: string;
  start_date?: string;
  end_date?: string;
}

export interface CampaignAdDto2 {
  id?: string;
  name?: string;
  platform?: string;
  budget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  status?: string;
  startDate?: string;
  endDate?: string;
}

export interface CampaignAdCreateResponse {
  success: boolean;
  message?: string;
  data?: CampaignAdDto2;
}

export interface CampaignAdUpdateResponse {
  success: boolean;
  message?: string;
  data?: CampaignAdDto2;
}

export interface CampaignAdDeleteResponse {
  success: boolean;
  message?: string;
}

export interface CampaignAdListResponse {
  success: boolean;
  data?: CampaignAdDto[];
}

export interface CampaignAdResponse {
  success: boolean;
  data?: CampaignAdDto2;
}

// ==================== QUERY KEYS ====================

export const campaignKeys = {
  all: ['campaigns'] as const,
  lists: () => [...campaignKeys.all, 'list'] as const,
  list: (filters?: string) => [...campaignKeys.lists(), { filters }] as const,
  details: () => [...campaignKeys.all, 'detail'] as const,
  detail: (id: string) => [...campaignKeys.details(), id] as const,
};

// ==================== API FUNCTIONS ====================

const campaignsApi = {
  getAll: () =>
    apiRequest.get<CampaignAdDto[]>(API_ENDPOINTS.DASHBOARD.CAMPAIGN_ADS.LIST),

  getById: (id: string) =>
    apiRequest.get<CampaignAdDto>(API_ENDPOINTS.DASHBOARD.CAMPAIGN_ADS.GET(id)),

  create: (data: Partial<CampaignAdDto>) =>
    apiRequest.post(API_ENDPOINTS.DASHBOARD.CAMPAIGN_ADS.CREATE, data),

  update: (id: string, data: Partial<CampaignAdDto>) =>
    apiRequest.put(API_ENDPOINTS.DASHBOARD.CAMPAIGN_ADS.UPDATE(id), data),

  delete: (id: string) =>
    apiRequest.delete(API_ENDPOINTS.DASHBOARD.CAMPAIGN_ADS.DELETE(id)),
};

// ==================== QUERY HOOKS ====================

export const useCampaigns = (options?: UseQueryOptions<CampaignAdDto[]>) => {
  return useQuery({
    queryKey: campaignKeys.all,
    queryFn: campaignsApi.getAll,
    ...options,
  });
};

export const useCampaign = (id: string) => {
  return useQuery({
    queryKey: campaignKeys.detail(id),
    queryFn: () => campaignsApi.getById(id),
    enabled: !!id,
  });
};

// ==================== MUTATION HOOKS ====================

export const useCreateCampaign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: campaignsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: campaignKeys.all });
    },
  });
};

export const useUpdateCampaign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CampaignAdDto> }) =>
      campaignsApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: campaignKeys.all });
      queryClient.invalidateQueries({
        queryKey: campaignKeys.detail(variables.id),
      });
    },
  });
};

export const useDeleteCampaign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: campaignsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: campaignKeys.all });
    },
  });
};
