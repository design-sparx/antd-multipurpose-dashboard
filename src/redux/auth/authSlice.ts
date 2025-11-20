import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import authService, { LoginRequest, AuthResponse, User } from '../../services/auth.service';

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  loginModalOpen: boolean;
}

const initialState: AuthState = {
  user: authService.getUserFromToken(),
  token: authService.getToken(),
  isAuthenticated: authService.isAuthenticated(),
  isLoading: false,
  error: null,
  loginModalOpen: false,
};

// Async thunks
export const loginUser = createAsyncThunk<AuthResponse, LoginRequest>(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

export const logoutUser = createAsyncThunk<void, string>(
  'auth/logout',
  async (email, { rejectWithValue }) => {
    try {
      await authService.logout(email);
    } catch (error: any) {
      return rejectWithValue(error.message || 'Logout failed');
    }
  }
);

export const refreshToken = createAsyncThunk<string, void>(
  'auth/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const token = await authService.refreshToken();
      if (!token) {
        throw new Error('Failed to refresh token');
      }
      return token;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Token refresh failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      authService.clearTokens();
    },
    setLoginModalOpen: (state, action: PayloadAction<boolean>) => {
      state.loginModalOpen = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = {
          email: action.payload.email,
          userName: action.payload.userName,
          roles: action.payload.roles,
        };
        state.loginModalOpen = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
        state.error = action.payload as string;
      });

    // Logout
    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        // Still clear auth even if logout API fails
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
        state.error = action.payload as string;
      });

    // Refresh Token
    builder
      .addCase(refreshToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload;
        state.user = authService.getUserFromToken();
        state.isAuthenticated = true;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
      });
  },
});

export const { setUser, setToken, clearAuth, setLoginModalOpen, clearError } = authSlice.actions;

export default authSlice.reducer;
