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
import { store } from '../../redux/store';
import {
  convertToMockEndpoint,
  isMockOnlyEndpoint,
} from './mockEndpointMapper';

// API Configuration
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'https://admin-hub-api-production.up.railway.app/api/v1';

/**
 * Create axios instance with default configuration
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request Interceptor
 * - Checks dataMode to route to mock or real API
 * - Adds authorization token to all requests
 */
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get current data mode from Redux store
    const state = store.getState();
    const useMockData = state.dataMode?.useMockData ?? false;

    // DEBUG: Log the actual state value
    console.log('[API Client Debug] Redux State:', {
      fullState: state,
      dataModeState: state.dataMode,
      useMockData: useMockData,
      storeExists: !!store,
    });

    // Get the request URL
    const requestUrl = config.url || '';

    // Check if this is a mock-only endpoint (always use mock)
    const forceMock = isMockOnlyEndpoint(requestUrl);

    // Determine if we should use mock data
    const shouldUseMock = forceMock || useMockData;

    if (shouldUseMock) {
      // Convert to mock endpoint
      const mockEndpoint = convertToMockEndpoint(requestUrl);

      if (mockEndpoint) {
        // Update config to use mock endpoint
        config.url = mockEndpoint;
        config.baseURL = ''; // Clear base URL for mock files (served from public/)

        // Don't send auth token for mock requests
        if (config.headers) {
          delete config.headers.Authorization;
        }

        if (import.meta.env.DEV) {
          console.log(
            `[API Request - Mock Mode] ${config.method?.toUpperCase()}`,
            {
              original: requestUrl,
              mock: mockEndpoint,
              forcedMock: forceMock,
            }
          );
        }

        return config;
      }
    }

    // For live mode or when no mock mapping exists
    const token = tokenStorage.getAccessToken();

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log request in development
    if (import.meta.env.DEV) {
      console.log(
        `[API Request - Live Mode] ${config.method?.toUpperCase()} ${config.url}`,
        {
          params: config.params,
          data: config.data,
          hasToken: !!token,
          tokenPreview: token ? `${token.substring(0, 20)}...` : 'NO TOKEN',
        }
      );
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
    // Log response in development
    if (import.meta.env.DEV) {
      console.log(
        `[API Response] ${response.config.method?.toUpperCase()} ${
          response.config.url
        }`,
        response.data
      );
    }

    return response;
  },
  async (error: AxiosError<ApiErrorResponse>) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // Log error in development
    if (import.meta.env.DEV) {
      console.error('[API Response Error]', {
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
        url: error.config?.url,
      });
    }

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
        const response = await axios.post(
          `${API_BASE_URL}/auth/refresh-token`,
          {
            refreshToken,
          }
        );

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

    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      console.error(
        '[Access Denied] You do not have permission to access this resource'
      );
    }

    // Handle 404 Not Found
    if (error.response?.status === 404) {
      console.error('[Not Found] The requested resource was not found');
    }

    // Handle 500 Internal Server Error
    if (error.response?.status === 500) {
      console.error('[Server Error] An internal server error occurred');
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
  get: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    apiClient.get<T>(url, config).then((response) => response.data),

  post: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    apiClient.post<T>(url, data, config).then((response) => response.data),

  put: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    apiClient.put<T>(url, data, config).then((response) => response.data),

  patch: <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> =>
    apiClient.patch<T>(url, data, config).then((response) => response.data),

  delete: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    apiClient.delete<T>(url, config).then((response) => response.data),
};

export default apiClient;
