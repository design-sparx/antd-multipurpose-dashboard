import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { tokenStorage } from '../../services/auth/tokenStorage';

// Dummy user type for mock mode
export interface User {
  email: string;
  userName: string;
  roles: string[];
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  loginModalOpen: boolean;
}

// Dummy user data
const DUMMY_USER: User = {
  email: 'demo@example.com',
  userName: 'Demo User',
  roles: ['admin'],
};

const DUMMY_TOKEN = 'dummy-jwt-token-mock-mode';

const initialState: AuthState = {
  user: tokenStorage.isAuthenticated()
    ? (tokenStorage.getUser() as User)
    : null,
  token: tokenStorage.getAccessToken(),
  isAuthenticated: tokenStorage.isAuthenticated(),
  isLoading: false,
  error: null,
  loginModalOpen: false,
};

// Dummy response types
interface AuthResponse {
  token: string;
  email: string;
  userName: string;
  roles: string[];
}

interface LoginRequest {
  email: string;
  password: string;
}

// Async thunks - DUMMY IMPLEMENTATIONS
export const loginUser = createAsyncThunk<AuthResponse, LoginRequest>(
  'auth/login',
  async (credentials) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    console.log('[Auth Slice - MOCK] Dummy login with:', credentials.email);

    // Store dummy token
    tokenStorage.setTokens(DUMMY_TOKEN, DUMMY_TOKEN);
    tokenStorage.setUser(DUMMY_USER as any);

    return {
      token: DUMMY_TOKEN,
      email: DUMMY_USER.email,
      userName: DUMMY_USER.userName,
      roles: DUMMY_USER.roles,
    };
  }
);

export const logoutUser = createAsyncThunk<void, string>(
  'auth/logout',
  async (email) => {
    console.log('[Auth Slice - MOCK] Dummy logout for:', email);
    tokenStorage.clearAuth();
  }
);

export const refreshToken = createAsyncThunk<string, void>(
  'auth/refreshToken',
  async () => {
    console.log('[Auth Slice - MOCK] Dummy token refresh');
    return DUMMY_TOKEN;
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
      tokenStorage.clearAuth();
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
        state.user = DUMMY_USER;
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

export const { setUser, setToken, clearAuth, setLoginModalOpen, clearError } =
  authSlice.actions;

export default authSlice.reducer;
