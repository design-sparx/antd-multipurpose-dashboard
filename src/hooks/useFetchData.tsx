import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { buildApiUrl } from '../config/api.config';
import authService from '../services/auth.service';

/**
 * API Response wrapper format from backend
 */
interface ApiResponse<T> {
  succeeded: boolean;
  message: string;
  data: T;
  errors: string[];
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
    totalPages?: number;
  };
}

/**
 * Check if response is a wrapped API response
 */
function isWrappedResponse<T>(json: unknown): json is ApiResponse<T> {
  return (
    typeof json === 'object' &&
    json !== null &&
    'data' in json &&
    'succeeded' in json &&
    typeof (json as any).succeeded === 'boolean'
  );
}

/**
 * Hook for fetching data with automatic handling of mock vs live API responses
 *
 * @template T - The expected type of the data (e.g., Project[], User, etc.)
 * @param url - The URL to fetch from (mock or will be converted to live endpoint)
 * @returns Object containing data, error, and loading state
 *
 * @example
 * // For array data
 * const { data, loading, error } = useFetchData<Project[]>('/mocks/Projects.json');
 *
 * @example
 * // For object data
 * const { data, loading, error } = useFetchData<User>('/mocks/User.json');
 */
function useFetchData<T = unknown>(url: string): {
  data: T | null;
  error: Error | null;
  loading: boolean;
} {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  // Get the current data mode from Redux
  const useMockData = useSelector((state: RootState) => state.dataMode.useMockData);
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Build the appropriate URL based on the data mode
      const apiUrl = buildApiUrl(url, useMockData);

      // Build headers
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      // Add auth header if in live mode and user is authenticated
      if (!useMockData && isAuthenticated) {
        const authHeader = authService.getAuthHeader();
        Object.assign(headers, authHeader);
      }

      const response = await fetch(apiUrl, { headers });

      if (!response.ok) {
        // Handle 401 Unauthorized
        if (response.status === 401) {
          throw new Error('Authentication required. Please sign in.');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json: unknown = await response.json();

      // Handle wrapped API response format from backend
      // Backend returns: { succeeded, message, data, errors, meta }
      // Mock files return: T directly (array or object)
      if (isWrappedResponse<T>(json)) {
        // This is a wrapped API response
        if (!json.succeeded) {
          // API returned an error
          const errorMessage = json.message || 'API request failed';
          const errors = json.errors?.length > 0 ? `\n${json.errors.join('\n')}` : '';
          throw new Error(errorMessage + errors);
        }
        // Extract and set the actual data
        console.log(`[useFetchData] Unwrapped API response: ${json.message}`);
        setData(json.data);
      } else {
        // This is direct data (mock files or unwrapped response)
        // Cast is safe here because we're expecting either wrapped or direct data
        setData(json as T);
      }
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error(String(err));
      console.error(`Error fetching data from ${url}:`, errorObj);
      setError(errorObj);
    } finally {
      setLoading(false);
    }
  }, [url, useMockData, isAuthenticated]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    error,
    loading,
  };
}

export default useFetchData;
