/**
 * Finance Query Module
 * Contains all finance-related types, API functions, and React Query hooks
 * Includes: invoices and expenses
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { apiRequest } from '../../services/api/apiClient';
import { API_ENDPOINTS } from '../../services/api/endpoints';

// ==================== INVOICE TYPES ====================

export interface InvoiceDto {
  id: number;
  invoice_number: string;
  client: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  issue_date: string;
  due_date: string;
  paid_date: string | null;
}

// ==================== EXPENSE TYPES ====================

export interface ExpenseDto {
  id: number;
  category: string;
  description: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending';
}

// ==================== QUERY KEYS ====================

export const invoiceKeys = {
  all: ['invoices'] as const,
  lists: () => [...invoiceKeys.all, 'list'] as const,
  details: () => [...invoiceKeys.all, 'detail'] as const,
  detail: (id: string) => [...invoiceKeys.details(), id] as const,
};

export const expenseKeys = {
  all: ['expenses'] as const,
  lists: () => [...expenseKeys.all, 'list'] as const,
  details: () => [...expenseKeys.all, 'detail'] as const,
  detail: (id: string) => [...expenseKeys.details(), id] as const,
};

// ==================== API FUNCTIONS ====================

const financeApi = {
  invoices: {
    getAll: () =>
      apiRequest.get<InvoiceDto[]>(API_ENDPOINTS.DASHBOARD.INVOICES.LIST),
    getById: (id: string) =>
      apiRequest.get<InvoiceDto>(API_ENDPOINTS.DASHBOARD.INVOICES.GET(id)),
  },
  expenses: {
    getAll: () =>
      apiRequest.get<ExpenseDto[]>(API_ENDPOINTS.DASHBOARD.EXPENSES.LIST),
    getById: (id: string) =>
      apiRequest.get<ExpenseDto>(API_ENDPOINTS.DASHBOARD.EXPENSES.GET(id)),
  },
};

// ==================== INVOICES QUERY HOOKS ====================

export const useInvoices = (options?: UseQueryOptions<InvoiceDto[]>) => {
  return useQuery({
    queryKey: invoiceKeys.all,
    queryFn: financeApi.invoices.getAll,
    ...options,
  });
};

export const useInvoice = (id: string) => {
  return useQuery({
    queryKey: invoiceKeys.detail(id),
    queryFn: () => financeApi.invoices.getById(id),
    enabled: !!id,
  });
};

// ==================== EXPENSES QUERY HOOKS ====================

export const useExpenses = (options?: UseQueryOptions<ExpenseDto[]>) => {
  return useQuery({
    queryKey: expenseKeys.all,
    queryFn: financeApi.expenses.getAll,
    ...options,
  });
};

export const useExpense = (id: string) => {
  return useQuery({
    queryKey: expenseKeys.detail(id),
    queryFn: () => financeApi.expenses.getById(id),
    enabled: !!id,
  });
};
