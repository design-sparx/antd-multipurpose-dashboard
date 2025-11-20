/**
 * Authentication API Types
 * Generated from Admin Hub API OpenAPI Specification
 */

// ==================== AUTH REQUEST/RESPONSE TYPES ====================

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterDto {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
}

export interface LoginResponse {
  token: string; // API returns "token" not "accessToken"
  expiration: string; // ISO date string
  user: {
    username: string;
    userId: string;
    email: string;
  };
  roles: string[];
  // These don't exist in the actual API response
  refreshToken?: string;
  tokenType?: string;
  expiresIn?: number;
}

export interface RefreshTokenRequestDto {
  refreshToken: string;
}

export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LogoutAuthRequestDto {
  refreshToken: string;
}

export interface ForgotPasswordRequestDto {
  email: string;
}

export interface ResetPasswordRequestDto {
  email: string;
  token: string;
  newPassword: string;
}

export interface ResetPasswordDto {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ChangePasswordRequestDto {
  currentPassword: string;
  newPassword: string;
}

// ==================== USER TYPES ====================

export interface UserProfileDto {
  id?: string; // Some endpoints use "id"
  userId?: string; // Login endpoint uses "userId"
  username?: string; // Login endpoint includes username
  email: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  avatarUrl?: string;
  roles?: string[];
  claims?: ClaimDto[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateUserDto {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  roles?: string[];
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  avatarUrl?: string;
}

export interface UpdateProfileDto {
  firstName?: string;
  lastName?: string;
  phoneNumber?: string;
  avatarUrl?: string;
}

export interface ClaimDto {
  type: string;
  value: string;
}

// ==================== API RESPONSE WRAPPER ====================

export interface ApiResponseOfObject<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: string[];
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  errors?: string[];
  statusCode?: number;
}
