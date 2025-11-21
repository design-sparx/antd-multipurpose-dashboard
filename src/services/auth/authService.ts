/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

import { ApiResponseOfObject } from '../../types/api/generic.ts';
import {
  ChangePasswordRequestDto,
  ForgotPasswordRequestDto,
  LoginDto,
  LoginResponse,
  RefreshTokenResponse,
  RegisterDto,
  ResetPasswordRequestDto,
} from '../../types/api/auth.types';
import { apiRequest } from '../api/apiClient';
import { API_ENDPOINTS } from '../api/endpoints';
import { tokenStorage } from './tokenStorage';

export const authService = {
  /**
   * Login with email and password
   */
  login: async (credentials: LoginDto): Promise<LoginResponse> => {
    const response = await apiRequest.post<LoginResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );

    // Store tokens and user data (API returns "token" not "accessToken")
    if (response.token) {
      // Use the same token for both access and refresh since API doesn't provide separate refresh token
      const refreshToken = response.refreshToken || response.token;

      if (import.meta.env.DEV) {
        console.log('[Auth Service] Storing tokens:', {
          hasToken: !!response.token,
          tokenPreview: response.token.substring(0, 20) + '...',
          user: response.user,
        });
      }

      tokenStorage.setTokens(response.token, refreshToken);
      tokenStorage.setUser(response.user);

      // Verify storage
      if (import.meta.env.DEV) {
        console.log('[Auth Service] Tokens stored. Verification:', {
          storedToken: tokenStorage.getAccessToken()?.substring(0, 20) + '...',
          isAuthenticated: tokenStorage.isAuthenticated(),
        });
      }
    }

    return response;
  },

  /**
   * Register a new user
   */
  register: async (userData: RegisterDto): Promise<ApiResponseOfObject> => {
    const response = await apiRequest.post<ApiResponseOfObject>(
      API_ENDPOINTS.AUTH.REGISTER,
      userData
    );
    return response;
  },

  /**
   * Logout current user
   */
  logout: async (): Promise<void> => {
    const refreshToken = tokenStorage.getRefreshToken();

    try {
      if (refreshToken) {
        await apiRequest.post(API_ENDPOINTS.AUTH.LOGOUT, { refreshToken });
      }
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // Clear local storage regardless of API response
      tokenStorage.clearAuth();
    }
  },

  /**
   * Refresh access token
   */
  refreshToken: async (): Promise<RefreshTokenResponse> => {
    const refreshToken = tokenStorage.getRefreshToken();

    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const response = await apiRequest.post<RefreshTokenResponse>(
      API_ENDPOINTS.AUTH.REFRESH_TOKEN,
      { refreshToken }
    );

    // Update tokens
    if (response.accessToken && response.refreshToken) {
      tokenStorage.setTokens(response.accessToken, response.refreshToken);
    }

    return response;
  },

  /**
   * Request password reset email
   */
  forgotPassword: async (email: string): Promise<ApiResponseOfObject> => {
    const request: ForgotPasswordRequestDto = { email };
    const response = await apiRequest.post<ApiResponseOfObject>(
      API_ENDPOINTS.AUTH.FORGOT_PASSWORD,
      request
    );
    return response;
  },

  /**
   * Reset password with token
   */
  resetPassword: async (
    data: ResetPasswordRequestDto
  ): Promise<ApiResponseOfObject> => {
    const response = await apiRequest.post<ApiResponseOfObject>(
      API_ENDPOINTS.AUTH.RESET_PASSWORD,
      data
    );
    return response;
  },

  /**
   * Change password for authenticated user
   */
  changePassword: async (
    data: ChangePasswordRequestDto
  ): Promise<ApiResponseOfObject> => {
    const response = await apiRequest.post<ApiResponseOfObject>(
      API_ENDPOINTS.PROFILE.CHANGE_PASSWORD,
      data
    );
    return response;
  },

  /**
   * Get current user from storage
   */
  getCurrentUser: () => {
    return tokenStorage.getUser();
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: (): boolean => {
    return tokenStorage.isAuthenticated();
  },
};
