import { useCallback, useEffect, useState } from 'react';
import type { ApiResponse, PaginationMeta } from '../types';

/**
 * Configuration options for useFetchData hook
 */
type UseFetchDataOptions = {
  /**
   * If true, returns the raw API response without extracting the data field
   * @default false
   */
  unwrap?: boolean;
};

/**
 * Return type for useFetchData hook
 */
type UseFetchDataReturn<T> = {
  data: T;
  error: Error | null;
  loading: boolean;
  meta?: PaginationMeta;
  message?: string;
  success?: boolean;
};

/**
 * Custom hook to fetch data from API endpoints
 *
 * By default, this hook automatically extracts the `data` field from API responses
 * that follow the pattern: { success/succeeded, data, message, meta, ... }
 *
 * @param url - The URL to fetch data from
 * @param options - Configuration options
 * @returns Object containing data, error, loading state, and optional meta/message
 *
 * @example
 * // Automatically extracts data array
 * const { data, loading, error, meta } = useFetchData<Task[]>('/api/tasks');
 *
 * @example
 * // Get full API response
 * const { data, loading, error } = useFetchData<TasksApiResponse<Task[]>>('/api/tasks', { unwrap: false });
 */
const useFetchData = <T = any,>(
  url: string,
  options: UseFetchDataOptions = {}
): UseFetchDataReturn<T> => {
  const { unwrap = true } = options;

  const [data, setData] = useState<T>([] as T);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState<PaginationMeta | undefined>(undefined);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<boolean | undefined>(undefined);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();

      // Check if response follows API wrapper pattern
      // Must be a plain object (not an array) and have data field plus success/succeeded
      const isApiResponse =
        json &&
        typeof json === 'object' &&
        !Array.isArray(json) &&
        'data' in json &&
        ('success' in json || 'succeeded' in json);

      if (unwrap && isApiResponse) {
        // Extract data from API response wrapper
        const apiResponse = json as ApiResponse<T>;
        setData(apiResponse.data ?? ([] as T));
        setMeta(apiResponse.meta);
        setMessage(apiResponse.message);
        setSuccess(apiResponse.success ?? apiResponse.succeeded);
      } else {
        // Return raw response (for mock files that are just arrays)
        setData(json);
      }
    } catch (error) {
      setError(error instanceof Error ? error : new Error(String(error)));
    } finally {
      setLoading(false);
    }
  }, [url, unwrap]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, loading, meta, message, success };
};

export default useFetchData;
