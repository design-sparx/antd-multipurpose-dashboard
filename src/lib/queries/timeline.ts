/**
 * Timeline Activity Query Module
 * Contains timeline activity types and query hooks
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { apiRequest } from '../../services/api/apiClient';
import { ActivityTimeline } from '../../types';

// ==================== QUERY KEYS ====================

export const timelineKeys = {
  all: ['timeline'] as const,
  lists: () => [...timelineKeys.all, 'list'] as const,
  details: () => [...timelineKeys.all, 'detail'] as const,
  detail: (id: string) => [...timelineKeys.details(), id] as const,
};

// ==================== API FUNCTIONS ====================

const timelineApi = {
  getAll: () => apiRequest.get<ActivityTimeline[]>('../mocks/TimelineActivity.json'),
};

// ==================== QUERY HOOKS ====================

export const useTimeline = (options?: UseQueryOptions<ActivityTimeline[]>) => {
  return useQuery({
    queryKey: timelineKeys.all,
    queryFn: timelineApi.getAll,
    ...options,
  });
};
