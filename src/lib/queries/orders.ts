/**
 * Orders Query Module
 * Contains all orders-related types, API functions, and React Query hooks
 */

import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';
import { apiRequest } from '../../services/api/apiClient';
import { API_ENDPOINTS } from '../../services/api/endpoints';

// ==================== ENUMS ====================

export enum OrderStatus {
  Pending = 'pending',
  Processing = 'processing',
  Shipped = 'shipped',
  Delivered = 'delivered',
  Cancelled = 'cancelled',
}

export enum PaymentMethod {
  CreditCard = 'credit_card',
  DebitCard = 'debit_card',
  PayPal = 'paypal',
  BankTransfer = 'bank_transfer',
  Cash = 'cash',
}

// ==================== TYPES ====================

export interface OrderDto {
  order_id?: string;
  product_name?: string;
  customer?: string;
  date?: string;
  amount: number;
  status?: string;
  payment_method?: string;
}

export interface OrderItemDto {
  productId?: string;
  productName?: string;
  quantity: number;
  price: number;
}

export interface OrderDto2 {
  id?: string;
  orderNumber?: string;
  customerId?: string;
  customerName?: string;
  items?: OrderItemDto[];
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  shippingAddress?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface OrderCreateResponse {
  success: boolean;
  message?: string;
  data?: OrderDto2;
}

export interface OrderUpdateResponse {
  success: boolean;
  message?: string;
  data?: OrderDto2;
}

export interface OrderDeleteResponse {
  success: boolean;
  message?: string;
}

export interface OrderListResponse {
  success: boolean;
  data?: OrderDto[];
  total: number;
}

export interface OrderResponse {
  success: boolean;
  data?: OrderDto2;
}

// ==================== QUERY KEYS ====================

export const orderKeys = {
  all: ['orders'] as const,
  lists: () => [...orderKeys.all, 'list'] as const,
  list: (filters?: string) => [...orderKeys.lists(), { filters }] as const,
  details: () => [...orderKeys.all, 'detail'] as const,
  detail: (id: string) => [...orderKeys.details(), id] as const,
  recent: () => [...orderKeys.all, 'recent'] as const,
};

// ==================== API FUNCTIONS ====================

const ordersApi = {
  getAll: () => apiRequest.get<OrderDto[]>(API_ENDPOINTS.DASHBOARD.ORDERS.LIST),

  getRecent: () =>
    apiRequest.get<OrderDto[]>(API_ENDPOINTS.DASHBOARD.ORDERS.RECENT),

  getById: (id: string) =>
    apiRequest.get<OrderDto>(API_ENDPOINTS.DASHBOARD.ORDERS.GET(id)),

  create: (data: Partial<OrderDto>) =>
    apiRequest.post(API_ENDPOINTS.DASHBOARD.ORDERS.CREATE, data),

  update: (id: string, data: Partial<OrderDto>) =>
    apiRequest.put(API_ENDPOINTS.DASHBOARD.ORDERS.UPDATE(id), data),

  delete: (id: string) =>
    apiRequest.delete(API_ENDPOINTS.DASHBOARD.ORDERS.DELETE(id)),
};

// ==================== QUERY HOOKS ====================

export const useOrders = (options?: UseQueryOptions<OrderDto[]>) => {
  return useQuery({
    queryKey: orderKeys.all,
    queryFn: ordersApi.getAll,
    ...options,
  });
};

export const useRecentOrders = (options?: UseQueryOptions<OrderDto[]>) => {
  return useQuery({
    queryKey: orderKeys.recent(),
    queryFn: ordersApi.getRecent,
    ...options,
  });
};

export const useOrder = (id: string) => {
  return useQuery({
    queryKey: orderKeys.detail(id),
    queryFn: () => ordersApi.getById(id),
    enabled: !!id,
  });
};

// ==================== MUTATION HOOKS ====================

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ordersApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.all });
    },
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<OrderDto> }) =>
      ordersApi.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: orderKeys.all });
      queryClient.invalidateQueries({ queryKey: orderKeys.detail(variables.id) });
    },
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ordersApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: orderKeys.all });
    },
  });
};
