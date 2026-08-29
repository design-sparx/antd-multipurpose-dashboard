/* eslint-disable */

/**
 * API Client
 * Axios instance with request/response interceptors for authentication and error handling
 */

import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { tokenStorage } from '../auth/tokenStorage';
import { ApiErrorResponse } from '../../types/api/generic';
import {
  convertToMockEndpoint,
  isMockOnlyEndpoint,
} from './mockEndpointMapper';

/**
 * Create axios instance with default configuration
 */
const apiClient: AxiosInstance = axios.create({
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request Interceptor
 * - Routes all requests to mock JSON files
 * - Adds authorization token to all requests
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get the request URL
    const requestUrl = config.url || '';

    // Check if this is a mock-only endpoint (always use mock)
    const forceMock = isMockOnlyEndpoint(requestUrl);

    // Convert to mock endpoint
    const mockEndpoint = convertToMockEndpoint(requestUrl);

    if (mockEndpoint || forceMock) {
      // Update config to use mock endpoint
      config.url = mockEndpoint || requestUrl;
      config.baseURL = ''; // Clear base URL for mock files (served from public/)

      // Don't send auth token for mock requests
      if (config.headers) {
        delete config.headers.Authorization;
      }

      return config;
    }

    // Fallback: use the URL as-is (for any non-mapped endpoints)
    config.baseURL = '';
    if (config.headers) {
      delete config.headers.Authorization;
    }

    return config;
  },
  (error: AxiosError) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor
 * Handles responses and errors globally
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // Handle 401 Unauthorized - Token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = tokenStorage.getRefreshToken();

        if (!refreshToken) {
          // No refresh token, logout user
          tokenStorage.clearAuth();
          window.location.href = '/auth/signin';
          return Promise.reject(error);
        }

        // Try to refresh token
        const response = await axios.post(`/api/v1/auth/refresh-token`, {
          refreshToken,
        });

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        // Store new tokens
        tokenStorage.setTokens(accessToken, newRefreshToken);

        // Retry original request with new token
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        }

        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed, logout user
        console.error('[Token Refresh Failed]', refreshError);
        tokenStorage.clearAuth();
        window.location.href = '/auth/signin';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

/**
 * Helper function to handle API errors consistently
 */
export const handleApiError = (error: unknown): ApiErrorResponse => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<ApiErrorResponse>;

    return {
      success: false,
      message:
        axiosError.response?.data?.message ||
        axiosError.message ||
        'An unexpected error occurred',
      errors: axiosError.response?.data?.errors,
      statusCode: axiosError.response?.status,
    };
  }

  return {
    success: false,
    message: 'An unexpected error occurred',
    statusCode: 500,
  };
};

/**
 * Type-safe API request wrapper
 */
export const apiRequest = {
  get: <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.get<T>(url, config).then((response) => response.data);
  },

  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.post<T>(url, data, config).then((response) => response.data);
  },

  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.put<T>(url, data, config).then((response) => response.data);
  },

  patch: <T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> => {
    return apiClient.patch<T>(url, data, config).then((response) => response.data);
  },

  delete: <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    return apiClient.delete<T>(url, config).then((response) => response.data);
  },
};

export default apiClient;
