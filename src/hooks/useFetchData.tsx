import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { buildApiUrl } from '../config/api.config';
import authService from '../services/auth.service';

/**
 * API Response wrapper format from backend
 */
interface ApiResponse<T = any> {
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
const isWrappedResponse = (json: any): json is ApiResponse => {
  return json && typeof json === 'object' && 'data' in json && 'succeeded' in json;
};

const useFetchData = (url: string) => {
  const [data, setData] = useState<any>([]);
  const [error, setError] = useState<any>(null);
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

      const json = await response.json();

      // Handle wrapped API response format from backend
      // Backend returns: { succeeded, message, data, errors, meta }
      // Mock files return: [ ... ] or { ... } directly
      if (isWrappedResponse(json)) {
        // This is a wrapped API response
        if (!json.succeeded) {
          // API returned an error
          const errorMessage = json.message || 'API request failed';
          const errors = json.errors?.length > 0 ? `\n${json.errors.join('\n')}` : '';
          throw new Error(errorMessage + errors);
        }
        // Extract the actual data
        console.log(`[useFetchData] Unwrapped API response: ${json.message}`);
        setData(json.data);
      } else {
        // This is direct data (mock files or unwrapped response)
        setData(json);
      }
    } catch (error) {
      console.error(`Error fetching data from ${url}:`, error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [url, useMockData, isAuthenticated]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, loading };
};

export default useFetchData;
