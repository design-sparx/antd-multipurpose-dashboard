/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

import { apiRequest } from '../api/apiClient';
import { API_ENDPOINTS } from '../api/endpoints';
import { tokenStorage } from './tokenStorage';
import type {
  LoginDto,
  RegisterDto,
  LoginResponse,
  RefreshTokenResponse,
  ForgotPasswordRequestDto,
  ResetPasswordRequestDto,
  ChangePasswordRequestDto,
  ApiResponseOfObject,
} from '../../types/api';

export const authService = {
  /**
   * Login with email and password
   */
  login: async (credentials: LoginDto): Promise<LoginResponse> => {
    const response = await apiRequest.post<LoginResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );

    // Store tokens and user data
    if (response.accessToken && response.refreshToken) {
      tokenStorage.setTokens(response.accessToken, response.refreshToken);
      tokenStorage.setUser(response.user);
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
  resetPassword: async (data: ResetPasswordRequestDto): Promise<ApiResponseOfObject> => {
    const response = await apiRequest.post<ApiResponseOfObject>(
      API_ENDPOINTS.AUTH.RESET_PASSWORD,
      data
    );
    return response;
  },

  /**
   * Change password for authenticated user
   */
  changePassword: async (data: ChangePasswordRequestDto): Promise<ApiResponseOfObject> => {
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
