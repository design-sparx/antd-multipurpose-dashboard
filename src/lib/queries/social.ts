/**
 * Social Media Query Module
 * Contains all social media-related types, API functions, and React Query hooks
 * Includes: activities, stats, and scheduled posts
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { apiRequest } from '../../services/api/apiClient';
import { API_ENDPOINTS } from '../../services/api/endpoints';

// ==================== TYPES ====================

export interface SocialMediaActivityDto {
  activity_id?: string;
  platform?: string;
  post_type?: string;
  content?: string;
  likes: number;
  comments: number;
  shares: number;
  reach: number;
  engagement_rate: number;
  posted_date?: string;
}

export interface SocialMediaStatsDto {
  stat_id?: string;
  platform?: string;
  followers: number;
  posts: number;
  engagement_rate: number;
  reach: number;
  impressions: number;
}

export interface ScheduledPostDto {
  post_id?: string;
  platform?: string;
  content?: string;
  scheduled_time?: string;
  status?: string;
  media_urls?: string[];
  tags?: string[];
}

// ==================== QUERY KEYS ====================

export const socialActivityKeys = {
  all: ['social-activities'] as const,
  lists: () => [...socialActivityKeys.all, 'list'] as const,
  details: () => [...socialActivityKeys.all, 'detail'] as const,
  detail: (id: string) => [...socialActivityKeys.details(), id] as const,
};

export const socialStatsKeys = {
  all: ['social-stats'] as const,
  lists: () => [...socialStatsKeys.all, 'list'] as const,
  details: () => [...socialStatsKeys.all, 'detail'] as const,
  detail: (id: string) => [...socialStatsKeys.details(), id] as const,
};

export const scheduledPostKeys = {
  all: ['scheduled-posts'] as const,
  lists: () => [...scheduledPostKeys.all, 'list'] as const,
  details: () => [...scheduledPostKeys.all, 'detail'] as const,
  detail: (id: string) => [...scheduledPostKeys.details(), id] as const,
};

// ==================== API FUNCTIONS ====================

const socialApi = {
  activities: {
    getAll: () =>
      apiRequest.get<SocialMediaActivityDto[]>(
        API_ENDPOINTS.DASHBOARD.SOCIAL_MEDIA_ACTIVITIES.LIST
      ),
    getById: (id: string) =>
      apiRequest.get<SocialMediaActivityDto>(
        API_ENDPOINTS.DASHBOARD.SOCIAL_MEDIA_ACTIVITIES.GET(id)
      ),
  },
  stats: {
    getAll: () =>
      apiRequest.get<SocialMediaStatsDto[]>(
        API_ENDPOINTS.DASHBOARD.SOCIAL_MEDIA_STATS.LIST
      ),
    getById: (id: string) =>
      apiRequest.get<SocialMediaStatsDto>(
        API_ENDPOINTS.DASHBOARD.SOCIAL_MEDIA_STATS.GET(id)
      ),
  },
  scheduledPosts: {
    getAll: () =>
      apiRequest.get<ScheduledPostDto[]>(
        API_ENDPOINTS.DASHBOARD.SCHEDULED_POSTS.LIST
      ),
    getById: (id: string) =>
      apiRequest.get<ScheduledPostDto>(
        API_ENDPOINTS.DASHBOARD.SCHEDULED_POSTS.GET(id)
      ),
  },
};

// ==================== SOCIAL ACTIVITIES QUERY HOOKS ====================

export const useSocialActivities = (
  options?: UseQueryOptions<SocialMediaActivityDto[]>
) => {
  return useQuery({
    queryKey: socialActivityKeys.all,
    queryFn: socialApi.activities.getAll,
    ...options,
  });
};

export const useSocialActivity = (id: string) => {
  return useQuery({
    queryKey: socialActivityKeys.detail(id),
    queryFn: () => socialApi.activities.getById(id),
    enabled: !!id,
  });
};

// ==================== SOCIAL STATS QUERY HOOKS ====================

export const useSocialStats = (
  options?: UseQueryOptions<SocialMediaStatsDto[]>
) => {
  return useQuery({
    queryKey: socialStatsKeys.all,
    queryFn: socialApi.stats.getAll,
    ...options,
  });
};

export const useSocialStat = (id: string) => {
  return useQuery({
    queryKey: socialStatsKeys.detail(id),
    queryFn: () => socialApi.stats.getById(id),
    enabled: !!id,
  });
};

// ==================== SCHEDULED POSTS QUERY HOOKS ====================

export const useScheduledPosts = (
  options?: UseQueryOptions<ScheduledPostDto[]>
) => {
  return useQuery({
    queryKey: scheduledPostKeys.all,
    queryFn: socialApi.scheduledPosts.getAll,
    ...options,
  });
};

export const useScheduledPost = (id: string) => {
  return useQuery({
    queryKey: scheduledPostKeys.detail(id),
    queryFn: () => socialApi.scheduledPosts.getById(id),
    enabled: !!id,
  });
};
