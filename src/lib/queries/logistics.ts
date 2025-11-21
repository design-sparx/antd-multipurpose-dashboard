/**
 * Logistics Query Module
 * Contains all logistics-related types, API functions, and React Query hooks
 * Includes: trucks, deliveries, delivery requests, and delivery analytics
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

export interface TruckDto {
  truck_id?: string;
  license_plate?: string;
  model?: string;
  capacity: number;
  status?: string;
  driver?: string;
  current_location?: string;
}

export interface TruckDeliveryDto {
  delivery_id?: string;
  truck_id?: string;
  origin?: string;
  destination?: string;
  scheduled_date?: string;
  actual_delivery_date?: string;
  status?: string;
  distance?: number;
}

export interface TruckDeliveryRequestDto {
  request_id?: string;
  customer_id?: string;
  pickup_location?: string;
  delivery_location?: string;
  requested_date?: string;
  cargo?: string;
  status?: string;
  assigned_truck_id?: string;
}

export interface DeliveryAnalyticDto {
  analytic_id?: string;
  date?: string;
  total_deliveries: number;
  successful_deliveries: number;
  failed_deliveries: number;
  average_delivery_time: number;
  total_distance: number;
}

// ==================== QUERY KEYS ====================

export const truckKeys = {
  all: ['trucks'] as const,
  lists: () => [...truckKeys.all, 'list'] as const,
  details: () => [...truckKeys.all, 'detail'] as const,
  detail: (id: string) => [...truckKeys.details(), id] as const,
};

export const deliveryKeys = {
  all: ['deliveries'] as const,
  lists: () => [...deliveryKeys.all, 'list'] as const,
  details: () => [...deliveryKeys.all, 'detail'] as const,
  detail: (id: string) => [...deliveryKeys.details(), id] as const,
};

export const deliveryRequestKeys = {
  all: ['delivery-requests'] as const,
  lists: () => [...deliveryRequestKeys.all, 'list'] as const,
  details: () => [...deliveryRequestKeys.all, 'detail'] as const,
  detail: (id: string) => [...deliveryRequestKeys.details(), id] as const,
};

export const deliveryAnalyticsKeys = {
  all: ['delivery-analytics'] as const,
  lists: () => [...deliveryAnalyticsKeys.all, 'list'] as const,
  details: () => [...deliveryAnalyticsKeys.all, 'detail'] as const,
  detail: (id: string) => [...deliveryAnalyticsKeys.details(), id] as const,
};

// ==================== API FUNCTIONS ====================

const logisticsApi = {
  trucks: {
    getAll: () => apiRequest.get(API_ENDPOINTS.DASHBOARD.TRUCKS.LIST),
    getById: (id: string) =>
      apiRequest.get(API_ENDPOINTS.DASHBOARD.TRUCKS.GET(id)),
    create: (data: any) =>
      apiRequest.post(API_ENDPOINTS.DASHBOARD.TRUCKS.CREATE, data),
    update: (id: string, data: any) =>
      apiRequest.put(API_ENDPOINTS.DASHBOARD.TRUCKS.UPDATE(id), data),
    delete: (id: string) =>
      apiRequest.delete(API_ENDPOINTS.DASHBOARD.TRUCKS.DELETE(id)),
  },
  deliveries: {
    getAll: () => apiRequest.get(API_ENDPOINTS.DASHBOARD.TRUCK_DELIVERIES.LIST),
    getById: (id: string) =>
      apiRequest.get(API_ENDPOINTS.DASHBOARD.TRUCK_DELIVERIES.GET(id)),
    create: (data: any) =>
      apiRequest.post(API_ENDPOINTS.DASHBOARD.TRUCK_DELIVERIES.CREATE, data),
    update: (id: string, data: any) =>
      apiRequest.put(API_ENDPOINTS.DASHBOARD.TRUCK_DELIVERIES.UPDATE(id), data),
    delete: (id: string) =>
      apiRequest.delete(API_ENDPOINTS.DASHBOARD.TRUCK_DELIVERIES.DELETE(id)),
  },
  deliveryRequests: {
    getAll: () =>
      apiRequest.get(API_ENDPOINTS.DASHBOARD.TRUCK_DELIVERY_REQUESTS.LIST),
    getById: (id: string) =>
      apiRequest.get(API_ENDPOINTS.DASHBOARD.TRUCK_DELIVERY_REQUESTS.GET(id)),
    create: (data: any) =>
      apiRequest.post(
        API_ENDPOINTS.DASHBOARD.TRUCK_DELIVERY_REQUESTS.CREATE,
        data
      ),
    update: (id: string, data: any) =>
      apiRequest.put(
        API_ENDPOINTS.DASHBOARD.TRUCK_DELIVERY_REQUESTS.UPDATE(id),
        data
      ),
    delete: (id: string) =>
      apiRequest.delete(
        API_ENDPOINTS.DASHBOARD.TRUCK_DELIVERY_REQUESTS.DELETE(id)
      ),
  },
  analytics: {
    getAll: () =>
      apiRequest.get(API_ENDPOINTS.DASHBOARD.DELIVERY_ANALYTICS.LIST),
    getById: (id: string) =>
      apiRequest.get(API_ENDPOINTS.DASHBOARD.DELIVERY_ANALYTICS.GET(id)),
    create: (data: any) =>
      apiRequest.post(API_ENDPOINTS.DASHBOARD.DELIVERY_ANALYTICS.CREATE, data),
    update: (id: string, data: any) =>
      apiRequest.put(
        API_ENDPOINTS.DASHBOARD.DELIVERY_ANALYTICS.UPDATE(id),
        data
      ),
    delete: (id: string) =>
      apiRequest.delete(API_ENDPOINTS.DASHBOARD.DELIVERY_ANALYTICS.DELETE(id)),
  },
};

// ==================== TRUCKS QUERY HOOKS ====================

export const useTrucks = (options?: UseQueryOptions<any[]>) => {
  return useQuery({
    queryKey: truckKeys.all,
    queryFn: logisticsApi.trucks.getAll,
    ...options,
  });
};

export const useTruck = (id: string) => {
  return useQuery({
    queryKey: truckKeys.detail(id),
    queryFn: () => logisticsApi.trucks.getById(id),
    enabled: !!id,
  });
};

export const useCreateTruck = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logisticsApi.trucks.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: truckKeys.all });
    },
  });
};

export const useUpdateTruck = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      logisticsApi.trucks.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: truckKeys.all });
      queryClient.invalidateQueries({ queryKey: truckKeys.detail(variables.id) });
    },
  });
};

export const useDeleteTruck = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logisticsApi.trucks.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: truckKeys.all });
    },
  });
};

// ==================== DELIVERIES QUERY HOOKS ====================

export const useDeliveries = (options?: UseQueryOptions<any[]>) => {
  return useQuery({
    queryKey: deliveryKeys.all,
    queryFn: logisticsApi.deliveries.getAll,
    ...options,
  });
};

export const useDelivery = (id: string) => {
  return useQuery({
    queryKey: deliveryKeys.detail(id),
    queryFn: () => logisticsApi.deliveries.getById(id),
    enabled: !!id,
  });
};

export const useCreateDelivery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logisticsApi.deliveries.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: deliveryKeys.all });
    },
  });
};

export const useUpdateDelivery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      logisticsApi.deliveries.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: deliveryKeys.all });
      queryClient.invalidateQueries({
        queryKey: deliveryKeys.detail(variables.id),
      });
    },
  });
};

export const useDeleteDelivery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logisticsApi.deliveries.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: deliveryKeys.all });
    },
  });
};

// ==================== DELIVERY REQUESTS QUERY HOOKS ====================

export const useDeliveryRequests = (options?: UseQueryOptions<any[]>) => {
  return useQuery({
    queryKey: deliveryRequestKeys.all,
    queryFn: logisticsApi.deliveryRequests.getAll,
    ...options,
  });
};

export const useDeliveryRequest = (id: string) => {
  return useQuery({
    queryKey: deliveryRequestKeys.detail(id),
    queryFn: () => logisticsApi.deliveryRequests.getById(id),
    enabled: !!id,
  });
};

export const useCreateDeliveryRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logisticsApi.deliveryRequests.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: deliveryRequestKeys.all });
    },
  });
};

export const useUpdateDeliveryRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      logisticsApi.deliveryRequests.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: deliveryRequestKeys.all });
      queryClient.invalidateQueries({
        queryKey: deliveryRequestKeys.detail(variables.id),
      });
    },
  });
};

export const useDeleteDeliveryRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logisticsApi.deliveryRequests.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: deliveryRequestKeys.all });
    },
  });
};

// ==================== DELIVERY ANALYTICS QUERY HOOKS ====================

export const useDeliveryAnalytics = (options?: UseQueryOptions<any[]>) => {
  return useQuery({
    queryKey: deliveryAnalyticsKeys.all,
    queryFn: logisticsApi.analytics.getAll,
    ...options,
  });
};

export const useDeliveryAnalytic = (id: string) => {
  return useQuery({
    queryKey: deliveryAnalyticsKeys.detail(id),
    queryFn: () => logisticsApi.analytics.getById(id),
    enabled: !!id,
  });
};

export const useCreateDeliveryAnalytic = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logisticsApi.analytics.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: deliveryAnalyticsKeys.all });
    },
  });
};

export const useUpdateDeliveryAnalytic = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      logisticsApi.analytics.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: deliveryAnalyticsKeys.all });
      queryClient.invalidateQueries({
        queryKey: deliveryAnalyticsKeys.detail(variables.id),
      });
    },
  });
};

export const useDeleteDeliveryAnalytic = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logisticsApi.analytics.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: deliveryAnalyticsKeys.all });
    },
  });
};
