/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

import { API_CONFIG } from '../config/api.config';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  refreshToken?: string;
  email: string;
  userName?: string;
  roles?: string[];
  expiresAt?: string;
}

export interface User {
  email: string;
  userName?: string;
  roles?: string[];
}

class AuthService {
  private readonly AUTH_ENDPOINTS = {
    LOGIN: '/api/v1/auth/login',
    REGISTER: '/api/v1/auth/register',
    LOGOUT: '/api/v1/auth/logout',
    REFRESH: '/api/v1/auth/refresh-token',
    FORGOT_PASSWORD: '/api/v1/auth/forgot-password',
    RESET_PASSWORD: '/api/v1/auth/reset-password',
  };

  /**
   * Login user with email and password
   */
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await fetch(
        `${API_CONFIG.PROD_BASE_URL}${this.AUTH_ENDPOINTS.LOGIN}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        }
      );

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        throw new Error(error.message || `Authentication failed: ${response.status}`);
      }

      const data = await response.json();

      // Store token in localStorage
      this.setToken(data.token);
      if (data.refreshToken) {
        this.setRefreshToken(data.refreshToken);
      }

      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  /**
   * Logout user
   */
  async logout(email: string): Promise<void> {
    try {
      const token = this.getToken();
      if (!token) return;

      await fetch(`${API_CONFIG.PROD_BASE_URL}${this.AUTH_ENDPOINTS.LOGOUT}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email }),
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear tokens regardless of API call success
      this.clearTokens();
    }
  }

  /**
   * Refresh access token
   */
  async refreshToken(): Promise<string | null> {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) return null;

      const response = await fetch(
        `${API_CONFIG.PROD_BASE_URL}${this.AUTH_ENDPOINTS.REFRESH}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: refreshToken }),
        }
      );

      if (!response.ok) {
        this.clearTokens();
        return null;
      }

      const data = await response.json();
      this.setToken(data.token);

      return data.token;
    } catch (error) {
      console.error('Token refresh error:', error);
      this.clearTokens();
      return null;
    }
  }

  /**
   * Get stored access token
   */
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  /**
   * Get stored refresh token
   */
  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }

  /**
   * Set access token
   */
  setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  /**
   * Set refresh token
   */
  setRefreshToken(token: string): void {
    localStorage.setItem('refresh_token', token);
  }

  /**
   * Clear all stored tokens
   */
  clearTokens(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    if (!token) return false;

    // Optionally: Check if token is expired
    try {
      const payload = this.parseJwt(token);
      if (payload.exp) {
        const expirationTime = payload.exp * 1000; // Convert to milliseconds
        return Date.now() < expirationTime;
      }
    } catch (error) {
      console.error('Error parsing token:', error);
      return false;
    }

    return true;
  }

  /**
   * Parse JWT token to get payload
   */
  private parseJwt(token: string): any {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error parsing JWT:', error);
      return {};
    }
  }

  /**
   * Get user info from token
   */
  getUserFromToken(): User | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = this.parseJwt(token);
      return {
        email: payload.email || payload.sub,
        userName: payload.name || payload.userName,
        roles: payload.role || payload.roles || [],
      };
    } catch (error) {
      console.error('Error getting user from token:', error);
      return null;
    }
  }

  /**
   * Get authorization header
   */
  getAuthHeader(): Record<string, string> {
    const token = this.getToken();
    if (!token) return {};

    return {
      Authorization: `Bearer ${token}`,
    };
  }
}

export const authService = new AuthService();
export default authService;
