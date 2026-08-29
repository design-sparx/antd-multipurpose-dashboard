/**
 * Healthcare Query Module
 * Contains all healthcare-related types, API functions, and React Query hooks
 * Includes: patients, appointments, doctors, and departments
 */

import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { apiRequest } from '../../services/api/apiClient';
import { API_ENDPOINTS } from '../../services/api/endpoints';

// ==================== PATIENT TYPES ====================

export interface PatientDto {
  id: number;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  condition: string;
  status: 'Active' | 'Recovering' | 'Critical' | 'Recovered' | 'Discharged';
  admission_date: string;
  room: string;
  doctor: string;
}

// ==================== APPOINTMENT TYPES ====================

export interface AppointmentDto {
  id: number;
  patient_name: string;
  doctor: string;
  department: string;
  time: string;
  date: string;
  status: 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
  type: string;
}

// ==================== DOCTOR TYPES ====================

export interface DoctorDto {
  id: number;
  name: string;
  department: string;
  specialization: string;
  experience: string;
  patients: number;
  rating: number;
  avatar: string;
  availability: 'Available' | 'On Leave' | 'Busy';
}

// ==================== DEPARTMENT TYPES ====================

export interface DepartmentDto {
  id: number;
  name: string;
  patients: number;
  doctors: number;
  beds: number;
  occupancy: number;
  color: string;
}

// ==================== QUERY KEYS ====================

export const patientKeys = {
  all: ['patients'] as const,
  lists: () => [...patientKeys.all, 'list'] as const,
  details: () => [...patientKeys.all, 'detail'] as const,
  detail: (id: string) => [...patientKeys.details(), id] as const,
};

export const appointmentKeys = {
  all: ['appointments'] as const,
  lists: () => [...appointmentKeys.all, 'list'] as const,
  details: () => [...appointmentKeys.all, 'detail'] as const,
  detail: (id: string) => [...appointmentKeys.details(), id] as const,
};

export const doctorKeys = {
  all: ['doctors'] as const,
  lists: () => [...doctorKeys.all, 'list'] as const,
  details: () => [...doctorKeys.all, 'detail'] as const,
  detail: (id: string) => [...doctorKeys.details(), id] as const,
};

export const departmentKeys = {
  all: ['departments'] as const,
  lists: () => [...departmentKeys.all, 'list'] as const,
  details: () => [...departmentKeys.all, 'detail'] as const,
  detail: (id: string) => [...departmentKeys.details(), id] as const,
};

// ==================== API FUNCTIONS ====================

const healthcareApi = {
  patients: {
    getAll: () =>
      apiRequest.get<PatientDto[]>(API_ENDPOINTS.DASHBOARD.PATIENTS.LIST),
    getById: (id: string) =>
      apiRequest.get<PatientDto>(API_ENDPOINTS.DASHBOARD.PATIENTS.GET(id)),
  },
  appointments: {
    getAll: () =>
      apiRequest.get<AppointmentDto[]>(API_ENDPOINTS.DASHBOARD.APPOINTMENTS.LIST),
    getById: (id: string) =>
      apiRequest.get<AppointmentDto>(API_ENDPOINTS.DASHBOARD.APPOINTMENTS.GET(id)),
  },
  doctors: {
    getAll: () =>
      apiRequest.get<DoctorDto[]>(API_ENDPOINTS.DASHBOARD.DOCTORS.LIST),
    getById: (id: string) =>
      apiRequest.get<DoctorDto>(API_ENDPOINTS.DASHBOARD.DOCTORS.GET(id)),
  },
  departments: {
    getAll: () =>
      apiRequest.get<DepartmentDto[]>(API_ENDPOINTS.DASHBOARD.DEPARTMENTS.LIST),
    getById: (id: string) =>
      apiRequest.get<DepartmentDto>(API_ENDPOINTS.DASHBOARD.DEPARTMENTS.GET(id)),
  },
};

// ==================== PATIENTS QUERY HOOKS ====================

export const usePatients = (options?: UseQueryOptions<PatientDto[]>) => {
  return useQuery({
    queryKey: patientKeys.all,
    queryFn: healthcareApi.patients.getAll,
    ...options,
  });
};

export const usePatient = (id: string) => {
  return useQuery({
    queryKey: patientKeys.detail(id),
    queryFn: () => healthcareApi.patients.getById(id),
    enabled: !!id,
  });
};

// ==================== APPOINTMENTS QUERY HOOKS ====================

export const useAppointments = (options?: UseQueryOptions<AppointmentDto[]>) => {
  return useQuery({
    queryKey: appointmentKeys.all,
    queryFn: healthcareApi.appointments.getAll,
    ...options,
  });
};

export const useAppointment = (id: string) => {
  return useQuery({
    queryKey: appointmentKeys.detail(id),
    queryFn: () => healthcareApi.appointments.getById(id),
    enabled: !!id,
  });
};

// ==================== DOCTORS QUERY HOOKS ====================

export const useDoctors = (options?: UseQueryOptions<DoctorDto[]>) => {
  return useQuery({
    queryKey: doctorKeys.all,
    queryFn: healthcareApi.doctors.getAll,
    ...options,
  });
};

export const useDoctor = (id: string) => {
  return useQuery({
    queryKey: doctorKeys.detail(id),
    queryFn: () => healthcareApi.doctors.getById(id),
    enabled: !!id,
  });
};

// ==================== DEPARTMENTS QUERY HOOKS ====================

export const useDepartments = (options?: UseQueryOptions<DepartmentDto[]>) => {
  return useQuery({
    queryKey: departmentKeys.all,
    queryFn: healthcareApi.departments.getAll,
    ...options,
  });
};

export const useDepartment = (id: string) => {
  return useQuery({
    queryKey: departmentKeys.detail(id),
    queryFn: () => healthcareApi.departments.getById(id),
    enabled: !!id,
  });
};
