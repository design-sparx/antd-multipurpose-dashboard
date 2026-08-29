/**
 * Employees Query Module
 * Contains all employees-related types, API functions, and React Query hooks
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { apiRequest } from '../../services/api/apiClient';
import { API_ENDPOINTS } from '../../services/api/endpoints';

// ==================== TYPES ====================

export interface EmployeeDto {
  employee_id: string;
  title: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  avatar: string;
  role: string;
  age: number;
  email: string;
  country: string;
  favorite_color: string;
  hire_date: string;
  salary: number;
}

// ==================== QUERY KEYS ====================

export const employeeKeys = {
  all: ['employees'] as const,
  lists: () => [...employeeKeys.all, 'list'] as const,
  details: () => [...employeeKeys.all, 'detail'] as const,
  detail: (id: string) => [...employeeKeys.details(), id] as const,
};

// ==================== API FUNCTIONS ====================

const employeesApi = {
  getAll: () =>
    apiRequest.get<EmployeeDto[]>(API_ENDPOINTS.DASHBOARD.EMPLOYEES.LIST),
  getById: (id: string) =>
    apiRequest.get<EmployeeDto>(API_ENDPOINTS.DASHBOARD.EMPLOYEES.GET(id)),
};

// ==================== QUERY HOOKS ====================

export const useEmployees = (options?: UseQueryOptions<EmployeeDto[]>) => {
  return useQuery({
    queryKey: employeeKeys.all,
    queryFn: employeesApi.getAll,
    ...options,
  });
};

export const useEmployee = (id: string) => {
  return useQuery({
    queryKey: employeeKeys.detail(id),
    queryFn: () => employeesApi.getById(id),
    enabled: !!id,
  });
};
