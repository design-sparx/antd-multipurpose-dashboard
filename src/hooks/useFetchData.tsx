import { useCallback, useEffect, useState } from 'react';
import apiClient from '../services/api/apiClient';

const useFetchData = <T = unknown,>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Use apiClient — always routes to mock JSON files
      const response = await apiClient.get(url);
      const json = response.data;

      // Check if the response has a nested 'data' property (API format)
      // Otherwise, use the response as-is (direct array format from mocks)
      if (
        json &&
        typeof json === 'object' &&
        'data' in json &&
        !Array.isArray(json)
      ) {
        setData(json.data);
      } else {
        setData(json);
      }
      setError(null);
    } catch (error) {
      console.error('[useFetchData] Error:', error);
      setError(error instanceof Error ? error.message : String(error));
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, loading };
};

export default useFetchData;
