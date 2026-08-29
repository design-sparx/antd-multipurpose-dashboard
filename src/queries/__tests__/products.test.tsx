import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

vi.mock('../../services/api/apiClient', () => ({
  apiRequest: {
    get: vi.fn().mockResolvedValue([
      {
        product_id: '1',
        product_name: 'Test Product',
        price: 100,
        quantity_sold: 50,
        customer_reviews: 4.5,
        average_rating: 4.5,
        is_featured: true,
      },
    ]),
  },
}));

import { useProducts } from '../../lib/queries';

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useProducts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return loading state initially', () => {
    const { result } = renderHook(() => useProducts(), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);
  });

  it('should fetch products successfully', async () => {
    const { result } = renderHook(() => useProducts(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data).toBeDefined();
    expect(Array.isArray(result.current.data)).toBe(true);
    expect(result.current.data).toHaveLength(1);
    expect(result.current.data?.[0].product_name).toBe('Test Product');
  });
});
