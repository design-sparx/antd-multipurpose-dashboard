import { useCallback, useEffect, useState } from 'react';

const useFetchData = <T = any,>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(url);
      const json = await response.json();

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
    } catch (error) {
      setError(error);
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
