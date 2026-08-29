import { describe, it, expect, vi, beforeEach } from 'vitest';

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

import { tokenStorage } from '../tokenStorage';

describe('tokenStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should set and get access token', () => {
    tokenStorage.setAccessToken('test-token');
    expect(tokenStorage.getAccessToken()).toBe('test-token');
  });

  it('should set and get refresh token', () => {
    tokenStorage.setRefreshToken('refresh-token');
    expect(tokenStorage.getRefreshToken()).toBe('refresh-token');
  });

  it('should set and get both tokens', () => {
    tokenStorage.setTokens('access', 'refresh');
    expect(tokenStorage.getAccessToken()).toBe('access');
    expect(tokenStorage.getRefreshToken()).toBe('refresh');
  });

  it('should clear all auth data', () => {
    tokenStorage.setTokens('access', 'refresh');
    tokenStorage.setUser({
      id: '1',
      email: 'test@test.com',
      roles: ['user'],
      createdAt: '2024-01-01',
    });
    tokenStorage.clearAuth();
    expect(tokenStorage.getAccessToken()).toBeNull();
    expect(tokenStorage.getRefreshToken()).toBeNull();
    expect(tokenStorage.getUser()).toBeNull();
  });

  it('should return authentication status', () => {
    expect(tokenStorage.isAuthenticated()).toBe(false);
    tokenStorage.setAccessToken('token');
    expect(tokenStorage.isAuthenticated()).toBe(true);
  });
});
