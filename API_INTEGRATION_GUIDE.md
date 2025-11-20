# API Integration Guide

## Overview

This guide covers the complete API integration implementation for the Ant Design Multipurpose Dashboard, connecting it to the Admin Hub API backend.

---

## ✅ What's Been Implemented

### 1. **Core Infrastructure**

#### API Client (`src/services/api/apiClient.ts`)
- Axios-based HTTP client with interceptors
- Automatic JWT token injection on requests
- Token refresh on 401 errors
- Global error handling
- Request/response logging in development

#### Token Storage (`src/services/auth/tokenStorage.ts`)
- localStorage-based token management
- Access & refresh token storage
- User profile caching
- Authentication status checks

#### API Endpoints (`src/services/api/endpoints.ts`)
- Centralized endpoint constants
- 95 unique API paths organized by feature
- Type-safe endpoint functions

### 2. **Authentication System**

#### Auth Service (`src/services/auth/authService.ts`)
- `login(email, password)` - User authentication
- `register(userData)` - New user registration
- `logout()` - Session termination
- `refreshToken()` - Token renewal
- `forgotPassword(email)` - Password reset request
- `resetPassword(data)` - Password reset with token
- `changePassword(data)` - Password update

#### Auth Context (`src/contexts/AuthContext.tsx`)
- Global authentication state
- `user` - Current user profile
- `isAuthenticated` - Auth status
- `isLoading` - Loading state
- `login()`, `register()`, `logout()` - Auth actions

#### Protected Routes (`src/utils/ProtectedRoute.tsx`)
- Route guard component
- Redirects unauthenticated users to login
- Preserves intended destination
- Loading spinner during auth check

### 3. **Type Safety**

#### TypeScript Types (`src/types/api/`)
- **124 complete type definitions** generated from OpenAPI spec
- `auth.types.ts` - Authentication & user types
- `antd.types.ts` - Dashboard data types
- Includes all enums, DTOs, and response types

### 4. **Data Fetching Layer**

#### Antd Service (`src/services/dashboard/antdService.ts`)
Complete service methods for:
- **Products** - List, top, categories, CRUD
- **Orders** - List, recent, CRUD
- **Sellers** - List, top, CRUD
- **Projects** - List, CRUD
- **Clients** - List, CRUD
- **Tasks** - List, CRUD
- **Campaign Ads** - List, CRUD
- **Courses** - List, recommended
- **Exams** - List
- **Community Groups** - List
- **Social Media** - Activities, stats, scheduled posts
- **Bidding/Auction** - Live auctions, creators, transactions
- **Logistics** - Trucks, deliveries, analytics

#### React Query Hooks (`src/hooks/useAntdData.ts`)
Custom hooks for data fetching:
- `useProducts()`, `useTopProducts()`, `useProductCategories()`
- `useOrders()`, `useRecentOrders()`
- `useSellers()`, `useTopSellers()`
- `useProjects()`
- `useClients()`
- `useTasks()`
- Mutation hooks: `useCreateTask()`, `useUpdateTask()`, `useDeleteTask()`

### 5. **React Query Setup**

#### Configuration (`src/main.tsx`)
- QueryClientProvider configured
- 5-minute stale time
- Single retry on failure
- Disabled refetch on window focus
- Integrated with Redux and AuthProvider

### 6. **Environment Configuration**

#### Files Created
- `.env` - Active configuration
- `.env.example` - Template for deployment

#### Variables
```env
VITE_API_BASE_URL=https://admin-hub-api-production.up.railway.app/api/v1
VITE_USE_MOCK=false
VITE_APP_NAME=Admin Hub Dashboard
VITE_APP_VERSION=1.0.0
VITE_ENV=development
```

### 7. **Migrated Pages**

#### SignIn Page (`src/pages/authentication/SignIn.tsx`)
- ✅ Real API authentication
- ✅ Error handling with Alert component
- ✅ Email & password validation
- ✅ Loading states
- ✅ Redirect to intended destination

#### Default Dashboard (`src/pages/dashboards/Default.tsx`)
- ✅ Tasks fetched from API
- ✅ Projects fetched from API
- ✅ Dynamic counts (projects & tasks)
- ✅ Loading & error states
- ⚠️ Notifications still using mock data (no API endpoint)

---

## 🚀 How to Use

### Authentication Flow

```typescript
import { useAuth } from './hooks';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  const handleLogin = async () => {
    try {
      await login({ email: 'user@example.com', password: 'password123' });
      // User is now logged in, tokens stored automatically
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = async () => {
    await logout();
    // Tokens cleared, user redirected
  };

  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user?.firstName}!</p>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
```

### Fetching Data with React Query

```typescript
import { useProducts, useProjects } from './hooks';

function DashboardComponent() {
  // Fetch products
  const { data: products, isLoading, error } = useProducts();

  // Fetch projects
  const { data: projects } = useProjects();

  if (isLoading) return <Loader />;
  if (error) return <Alert type="error" message={error.message} />;

  return (
    <div>
      {products?.map(product => (
        <ProductCard key={product.product_id} product={product} />
      ))}
    </div>
  );
}
```

### Creating/Updating Data

```typescript
import { useCreateTask, useUpdateTask } from './hooks';

function TaskManager() {
  const createTask = useCreateTask();
  const updateTask = useUpdateTask();

  const handleCreate = async () => {
    await createTask.mutateAsync({
      title: 'New Task',
      description: 'Task description',
      status: 'todo',
      priority: 'high',
    });
    // Task created, list automatically refreshed
  };

  const handleUpdate = async (taskId: string) => {
    await updateTask.mutateAsync({
      id: taskId,
      data: { status: 'completed' },
    });
    // Task updated, cache invalidated
  };

  return <div>...</div>;
}
```

### Protected Routes

```typescript
import { ProtectedRoute } from './utils/ProtectedRoute';

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/auth/signin" element={<SignInPage />} />

      {/* Protected routes */}
      <Route
        path="/dashboards/*"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
```

---

## 📝 Migration Pattern

To migrate a page from mock data to real API:

### Before (Mock Data)
```typescript
const { data, error, loading } = useFetchData('../mocks/Products.json');
```

### After (Real API)
```typescript
import { useProducts } from '../../hooks';

const { data, error, isLoading } = useProducts();
```

### Complete Example

```typescript
// BEFORE - Using mock data
export const EcommerceDashboard = () => {
  const { data: products = [], error, loading } = useFetchData('../mocks/TopProducts.json');

  return (
    <div>
      {loading ? <Loader /> : <ProductList products={products} />}
    </div>
  );
};

// AFTER - Using real API
export const EcommerceDashboard = () => {
  const { data: products = [], error, isLoading } = useTopProducts();

  return (
    <div>
      {isLoading ? <Loader /> : <ProductList products={products} />}
    </div>
  );
};
```

---

## 🔄 API Response Handling

### Success Response
```json
{
  "success": true,
  "data": [...],
  "message": "Success"
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": ["Detailed error 1", "Detailed error 2"],
  "statusCode": 400
}
```

### Handling Errors
```typescript
import { handleApiError } from './services/api/apiClient';

try {
  await login({ email, password });
} catch (err) {
  const apiError = handleApiError(err);
  message.error(apiError.message);
}
```

---

## 📦 Remaining Dashboards to Migrate

### High Priority
1. **Ecommerce Dashboard** - Products, Orders, Sellers
2. **Projects Dashboard** - Projects, Clients
3. **Marketing Dashboard** - Campaign Ads

### Medium Priority
4. **Bidding Dashboard** - Auctions, Transactions
5. **Learning Dashboard** - Courses, Exams
6. **Logistics Dashboard** - Trucks, Deliveries
7. **Social Dashboard** - Social Media Stats

---

## 🔐 Security Features

1. **JWT Authentication** - Token-based auth with refresh
2. **Automatic Token Injection** - Headers added by interceptor
3. **Token Refresh** - Auto-retry on 401 with refresh token
4. **Secure Storage** - Tokens in localStorage (consider httpOnly cookies for production)
5. **Route Guards** - ProtectedRoute component
6. **CORS Handling** - Configured in API client

---

## 🧪 Testing Checklist

### Authentication
- [ ] Login with valid credentials
- [ ] Login with invalid credentials (error handling)
- [ ] Logout functionality
- [ ] Token refresh on expiry
- [ ] Protected route access (logged out)
- [ ] Redirect to intended page after login

### Data Fetching
- [ ] Default Dashboard loads projects & tasks
- [ ] Loading states display correctly
- [ ] Error states display correctly
- [ ] Data updates on refetch
- [ ] Cache works (no duplicate requests)

### Error Handling
- [ ] API errors show user-friendly messages
- [ ] Network errors handled gracefully
- [ ] 401 triggers token refresh
- [ ] 403 shows access denied
- [ ] 404 shows not found

---

## 🚧 Known Limitations

1. **Notifications** - Still using mock data (no API endpoint)
2. **Some dashboards** - Not yet migrated (in progress)
3. **Real-time updates** - Not implemented (consider WebSockets)
4. **Offline support** - Not implemented (consider service workers)

---

## 🎯 Next Steps

1. **Migrate Ecommerce Dashboard** - High priority
2. **Add route protection to all dashboard routes**
3. **Implement error boundaries** for better error handling
4. **Add loading skeletons** instead of spinners
5. **Implement data pagination** for large datasets
6. **Add search and filter** capabilities
7. **Consider implementing** React Query DevTools for debugging
8. **Add unit tests** for services and hooks
9. **Implement** refresh token rotation for better security
10. **Document API** integration patterns for team

---

## 📚 Resources

- **API Documentation**: [OpenAPI Spec](./v1.json)
- **React Query Docs**: https://tanstack.com/query/latest
- **Axios Docs**: https://axios-http.com/
- **Admin Hub API**: https://admin-hub-api-production.up.railway.app/scalar/

---

## 🤝 Support

For issues or questions:
1. Check the API documentation
2. Review error logs in browser console
3. Check network tab for API calls
4. Verify token storage in localStorage
5. Contact API team for backend issues

---

**Last Updated**: November 20, 2025
**Version**: 1.0.0
**Status**: ✅ Foundation Complete, 🚧 Dashboard Migration In Progress
