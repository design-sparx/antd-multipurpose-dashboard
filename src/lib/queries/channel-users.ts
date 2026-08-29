/**
 * Channel Users Query Module
 * Contains all channel user-related types, API functions, and React Query hooks
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { apiRequest } from '../../services/api/apiClient';
import { API_ENDPOINTS } from '../../services/api/endpoints';

// ==================== TYPES ====================

export interface ChannelUserDto {
  user_id: number;
  first_name: string;
  last_name: string;
  age: number;
  email: string;
  country: string;
  postal_code: string;
  favorite_color: string;
}

// ==================== QUERY KEYS ====================

export const channelUserKeys = {
  all: ['channel-users'] as const,
  lists: () => [...channelUserKeys.all, 'list'] as const,
  details: () => [...channelUserKeys.all, 'detail'] as const,
  detail: (id: string) => [...channelUserKeys.details(), id] as const,
};

// ==================== API FUNCTIONS ====================

const channelUsersApi = {
  getAll: () =>
    apiRequest.get<ChannelUserDto[]>(API_ENDPOINTS.DASHBOARD.CHANNEL_USERS.LIST),
};

// ==================== QUERY HOOKS ====================

export const useChannelUsers = (
  options?: UseQueryOptions<ChannelUserDto[]>
) => {
  return useQuery({
    queryKey: channelUserKeys.all,
    queryFn: channelUsersApi.getAll,
    ...options,
  });
};
