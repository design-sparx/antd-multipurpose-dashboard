import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { buildApiUrl } from '../config/api.config';

const useFetchData = (url: string) => {
  const [data, setData] = useState<any>([]);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Get the current data mode from Redux
  const useMockData = useSelector((state: RootState) => state.dataMode.useMockData);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Build the appropriate URL based on the data mode
      const apiUrl = buildApiUrl(url, useMockData);

      const response = await fetch(apiUrl);

      if (!response.ok) {
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
  }, [url, useMockData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, loading };
};

export default useFetchData;
