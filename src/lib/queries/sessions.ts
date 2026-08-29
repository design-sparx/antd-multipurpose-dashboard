/**
 * Sessions Query Module
 * Contains session activity types and query hooks
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { apiRequest } from '../../services/api/apiClient';
import { Session } from '../../types';

// ==================== QUERY KEYS ====================

export const sessionKeys = {
  all: ['sessions'] as const,
  lists: () => [...sessionKeys.all, 'list'] as const,
  details: () => [...sessionKeys.all, 'detail'] as const,
  detail: (id: string) => [...sessionKeys.details(), id] as const,
};

// ==================== API FUNCTIONS ====================

const sessionsApi = {
  getAll: () => apiRequest.get<Session[]>('../mocks/SessionActivity.json'),
  getById: (id: string) => apiRequest.get<Session>(`../mocks/SessionActivity/${id}.json`),
};

// ==================== QUERY HOOKS ====================

export const useSessions = (options?: UseQueryOptions<Session[]>) => {
  return useQuery({
    queryKey: sessionKeys.all,
    queryFn: sessionsApi.getAll,
    ...options,
  });
};

export const useSession = (id: string) => {
  return useQuery({
    queryKey: sessionKeys.detail(id),
    queryFn: () => sessionsApi.getById(id),
    enabled: !!id,
  });
};
