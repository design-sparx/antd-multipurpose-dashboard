/**
 * Notifications Query Module
 * Contains all notifications-related types, API functions, and React Query hooks
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { apiRequest } from '../../services/api/apiClient';
import { API_ENDPOINTS } from '../../services/api/endpoints';

// ==================== TYPES ====================

export interface NotificationDto {
  notification_id?: string;
  user_id?: string;
  user?: string;
  notification_type?: string;
  notification_date?: string;
  notification_message?: string;
  is_read: boolean;
  is_deleted: boolean;
  notification_category?: string;
  notification_image?: string;
  color?: string;
}

// ==================== QUERY KEYS ====================

export const notificationKeys = {
  all: ['notifications'] as const,
  lists: () => [...notificationKeys.all, 'list'] as const,
  details: () => [...notificationKeys.all, 'detail'] as const,
  detail: (id: string) => [...notificationKeys.details(), id] as const,
};

// ==================== API FUNCTIONS ====================

const notificationsApi = {
  getAll: () =>
    apiRequest.get<NotificationDto[]>(API_ENDPOINTS.DASHBOARD.NOTIFICATIONS.LIST),
};

// ==================== QUERY HOOKS ====================

export const useNotifications = (
  options?: UseQueryOptions<NotificationDto[]>
) => {
  return useQuery({
    queryKey: notificationKeys.all,
    queryFn: notificationsApi.getAll,
    ...options,
  });
};
