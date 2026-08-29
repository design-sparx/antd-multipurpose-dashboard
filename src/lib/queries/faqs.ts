/**
 * FAQs Query Module
 * Contains all FAQ-related types, API functions, and React Query hooks
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { apiRequest } from '../../services/api/apiClient';
import { API_ENDPOINTS } from '../../services/api/endpoints';

// ==================== TYPES ====================

export interface FaqDto {
  id?: string;
  category: string;
  question: string;
  answer: string;
  related_faqs: Array<unknown>;
}

// ==================== QUERY KEYS ====================

export const faqKeys = {
  all: ['faqs'] as const,
  lists: () => [...faqKeys.all, 'list'] as const,
  details: () => [...faqKeys.all, 'detail'] as const,
  detail: (id: string) => [...faqKeys.details(), id] as const,
};

// ==================== API FUNCTIONS ====================

const faqsApi = {
  getAll: () =>
    apiRequest.get<FaqDto[]>(API_ENDPOINTS.DASHBOARD.FAQS.LIST),
  getById: (id: string) =>
    apiRequest.get<FaqDto>(API_ENDPOINTS.DASHBOARD.FAQS.GET(id)),
};

// ==================== QUERY HOOKS ====================

export const useFaqs = (options?: UseQueryOptions<FaqDto[]>) => {
  return useQuery({
    queryKey: faqKeys.all,
    queryFn: faqsApi.getAll,
    ...options,
  });
};

export const useFaq = (id: string) => {
  return useQuery({
    queryKey: faqKeys.detail(id),
    queryFn: () => faqsApi.getById(id),
    enabled: !!id,
  });
};
