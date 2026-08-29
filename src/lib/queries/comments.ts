/**
 * Comments Query Module
 * Contains all comments-related types, API functions, and React Query hooks
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { apiRequest } from '../../services/api/apiClient';
import { API_ENDPOINTS } from '../../services/api/endpoints';

// ==================== TYPES ====================

export interface CommentDto {
  id?: string;
  author?: string;
  user_id?: string;
  activity_type?: string;
  timestamp?: string;
  post_content?: string;
  platform?: string;
  user_location?: string;
  user_age: number;
  user_gender?: string;
  user_interests?: string;
  user_friends_count: number;
}

// ==================== QUERY KEYS ====================

export const commentKeys = {
  all: ['comments'] as const,
  lists: () => [...commentKeys.all, 'list'] as const,
  details: () => [...commentKeys.all, 'detail'] as const,
  detail: (id: string) => [...commentKeys.details(), id] as const,
};

// ==================== API FUNCTIONS ====================

const commentsApi = {
  getAll: () =>
    apiRequest.get<CommentDto[]>(API_ENDPOINTS.DASHBOARD.SOCIAL_COMMENTS.LIST),
};

// ==================== QUERY HOOKS ====================

export const useComments = (options?: UseQueryOptions<CommentDto[]>) => {
  return useQuery({
    queryKey: commentKeys.all,
    queryFn: commentsApi.getAll,
    ...options,
  });
};
