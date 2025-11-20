import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { buildApiUrl } from '../config/api.config';
import authService from '../services/auth.service';

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
      setData(json);
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
