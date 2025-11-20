# Mock Data Toggle Feature

This document explains the Mock Data Toggle feature that allows users to switch between mock (demo) data and real API endpoints, similar to how trading websites offer demo and live trading modes.

## Overview

The application now includes a global toggle switch in the header that allows users to seamlessly switch between:

- **Demo Mode (Mock Data)**: Uses local JSON files from `/public/mocks/` for testing and demonstration purposes
- **Live Mode (Real API)**: Connects to actual backend API endpoints for production data

## Features

- **Global State Management**: Uses Redux for centralized state management with persistence
- **Automatic URL Resolution**: Intelligently maps mock file paths to real API endpoints
- **User-Friendly UI**: Toggle switch with clear visual indicators in the app header
- **Persistent Preference**: User's choice is saved in localStorage via Redux Persist
- **Environment Configuration**: Supports environment variables for different deployment scenarios
- **JWT Authentication**: Secure authentication for Live Mode with automatic login prompts
- **Token Management**: Automatic token refresh and session management
- **Seamless Auth Flow**: Auto-prompts for login when switching to Live Mode

## Authentication

### Live Mode Authentication

When switching to **Live Mode**, the application requires authentication to access real API endpoints. The authentication flow is:

1. **User clicks toggle** to switch from Demo to Live mode
2. **Login modal appears** if user is not authenticated
3. **User enters credentials** (or clicks "Use Demo Credentials")
4. **System authenticates** with the backend API
5. **JWT token is stored** securely in localStorage
6. **Mode switches to Live** automatically after successful login
7. **All API requests** include the Bearer token in headers

### Demo Credentials

For testing purposes, use these demo credentials:
- **Email**: `admin@adminhub.com`
- **Password**: `Admin@Pass1`

The login modal includes a "Use Demo Credentials" button for quick access.

### Token Management

- **JWT tokens** are stored in localStorage
- **Automatic token refresh** when tokens expire
- **Session persistence** across page reloads
- **Secure logout** clears tokens and switches back to Demo Mode

### Logout Behavior

When logging out:
1. API logout request is sent (if authenticated)
2. Tokens are cleared from localStorage
3. Application automatically switches back to Demo Mode
4. User is redirected to the landing page

## Architecture

### 1. API Configuration (`src/config/api.config.ts`)

Centralized configuration file that:
- Defines mock and production base URLs
- Maps resources to their respective endpoints
- Provides helper functions for URL building

**Key Functions:**
- `getEndpoint(resource, useMockData)`: Gets the appropriate endpoint for a resource
- `buildApiUrl(url, useMockData)`: Builds complete URLs based on the current mode

### 2. Redux State Management (`src/redux/dataMode/`)

Redux slice managing the data mode state:
- **State**: `useMockData` (boolean)
- **Actions**:
  - `toggleDataMode()`: Switches between mock and real data
  - `setDataMode(boolean)`: Sets a specific mode
  - `enableMockData()`: Enables demo mode
  - `enableRealData()`: Enables live mode

### 3. Updated Data Fetching Hook (`src/hooks/useFetchData.tsx`)

Enhanced to:
- Read the current data mode from Redux state
- Automatically fetch from the appropriate source
- Handle errors gracefully with proper logging
- Re-fetch data when the mode changes

### 4. UI Component (`src/components/DataModeToggle/`)

Reusable toggle component with:
- Switch control with icons (Database for Demo, API for Live)
- Tooltip showing the current mode
- Optional label showing "Demo Mode" or "Live Mode"
- Customizable size prop

## Usage

### For End Users

1. **Locate the Toggle**: Find the switch in the app header (next to the theme toggle)
2. **Switch Modes**:
   - Toggle **ON** (orange): Demo Mode - using mock data
   - Toggle **OFF** (green): Live Mode - using real API
3. **Visual Indicators**: The switch shows database icon for Demo and API icon for Live mode

### For Developers

#### Environment Variables

Create a `.env` file in the project root:

```env
# Use mock data by default (true/false)
VITE_USE_MOCK_DATA=true

# Production API base URL
VITE_API_BASE_URL=https://api.yourdomain.com/api
```

#### Adding New Endpoints

1. Update `src/config/api.config.ts`:

```typescript
export const API_ENDPOINTS = {
  // ... existing endpoints
  yourNewResource: {
    mock: '/YourMockData.json',
    prod: '/your-api-endpoint',
  },
};
```

2. Use the endpoint in your components:

```typescript
import useFetchData from '../hooks/useFetchData';

const { data, loading, error } = useFetchData('/mocks/YourMockData.json');
```

The hook will automatically use the correct endpoint based on the current mode.

#### Mock-Only Endpoints (Backend Not Implemented Yet)

For endpoints that don't have a backend implementation yet, use the `mockOnly` flag. These endpoints will **always return mock data, even in Live Mode**:

```typescript
export const API_ENDPOINTS = {
  notifications: {
    mock: '/Notifications.json',
    prod: '/notifications',
    mockOnly: true, // Backend endpoint not implemented yet
  },
};
```

**How it works:**
- In **Demo Mode**: Uses mock data (normal behavior)
- In **Live Mode**: Uses mock data + shows console warning
- Console warning: `⚠️ Endpoint "notifications" is mock-only (backend not implemented). Using mock data in Live Mode.`

**When to use mockOnly:**
- Backend endpoint is planned but not implemented yet
- Feature is UI-only and doesn't require backend support
- Testing UI while waiting for backend development
- Gradual migration from mock to live data

**Example use cases:**
- Notifications system not implemented on backend
- UI prototypes and demos
- Features in development
- Static content that doesn't change

**When backend is ready:**
Simply remove the `mockOnly: true` flag and the endpoint will start using the live API!

#### Using the Toggle Component

```typescript
import { DataModeToggle } from '../components';

// Basic usage
<DataModeToggle />

// With label
<DataModeToggle showLabel={true} />

// Small size
<DataModeToggle size="small" />
```

#### Accessing Current Mode in Code

```typescript
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const MyComponent = () => {
  const useMockData = useSelector((state: RootState) => state.dataMode.useMockData);

  // Use the mode for conditional logic
  if (useMockData) {
    // Demo mode behavior
  } else {
    // Live mode behavior
  }
};
```

#### Programmatically Changing Mode

```typescript
import { useDispatch } from 'react-redux';
import { toggleDataMode, enableMockData, enableRealData } from '../redux/dataMode/dataModeSlice';

const MyComponent = () => {
  const dispatch = useDispatch();

  // Toggle
  dispatch(toggleDataMode());

  // Set specific mode
  dispatch(enableMockData());  // Demo mode
  dispatch(enableRealData());  // Live mode
};
```

## File Structure

```
src/
├── config/
│   └── api.config.ts                    # API configuration and endpoint mappings
├── services/
│   └── auth.service.ts                  # Authentication service (login, logout, tokens)
├── redux/
│   ├── store.ts                         # Updated with dataMode and auth reducers
│   ├── dataMode/
│   │   └── dataModeSlice.ts            # Redux slice for data mode state
│   └── auth/
│       └── authSlice.ts                 # Redux slice for authentication state
├── hooks/
│   └── useFetchData.tsx                 # Updated to support mode switching and auth headers
└── components/
    ├── DataModeToggle/
    │   ├── DataModeToggle.tsx          # Toggle component with auth check
    │   └── index.ts                     # Export
    ├── LoginModal/
    │   ├── LoginModal.tsx               # Login modal component
    │   └── index.ts                     # Export
    └── index.ts                         # Updated exports
```

## Backend Implementation

When switching to Live Mode, the application expects your backend to provide the same data structure as the mock files. Reference the `BACKEND_IMPLEMENTATION_GUIDE.md` for detailed API endpoint specifications.

### Example Backend Endpoint

For a resource like "tasks" (`/mocks/TasksList.json`):

**Mock File Structure:**
```json
[
  {
    "id": 1,
    "title": "Task Name",
    "status": "completed",
    "priority": "high"
  }
]
```

**Expected API Endpoint:**
- **URL**: `GET /api/tasks`
- **Response**: Same JSON structure as mock file

## Benefits

1. **Development**: Test UI without backend dependencies
2. **Demonstration**: Show features to stakeholders with realistic data
3. **Testing**: QA can test with mock data before production
4. **Onboarding**: New users can explore the app safely
5. **Flexibility**: Switch between environments without code changes

## Technical Details

### State Persistence

The user's preference is automatically saved to localStorage using Redux Persist:
- **Key**: `root`
- **Storage**: `localStorage`
- **Persisted State**: Both theme and dataMode

### URL Resolution Logic

The `buildApiUrl` function intelligently handles:
1. **Absolute URLs**: Returned as-is (for external APIs)
2. **Mock Paths**: Extracted and mapped to production endpoints
3. **Relative URLs**: Prefixed with appropriate base URL
4. **Automatic Mapping**: Falls back to converting mock filenames to API paths

### Error Handling

The updated `useFetchData` hook includes:
- HTTP status code checking
- Detailed error logging with context
- User-friendly error states
- Automatic retry capability (can be extended)

## Future Enhancements

Potential improvements:
- Add loading indicators during mode switching
- Implement API endpoint health checks
- Add configuration for custom endpoint mappings
- Support for multiple backend environments (dev, staging, prod)
- Analytics tracking for mode usage
- Batch data refresh when switching modes

## Troubleshooting

### Issue: Data not loading after switching modes

**Solution**: Check browser console for error messages. Ensure:
1. Mock JSON files exist in `/public/mocks/`
2. Production API base URL is correct in `.env`
3. Backend endpoints return the expected data structure

### Issue: Toggle not visible in header

**Solution**: Clear browser cache and localStorage, then refresh the page.

### Issue: Mode resets after page refresh

**Solution**: Ensure Redux Persist is properly configured. Check that `persistor` is wrapped around the app in `main.tsx`.

## Contributing

When adding new data sources:
1. Add mock JSON file to `/public/mocks/`
2. Update `API_ENDPOINTS` in `api.config.ts`
3. Use `useFetchData` hook in components
4. Test both Demo and Live modes
5. Document the endpoint in the Backend Implementation Guide

## License

This feature is part of the Ant Design Multipurpose Dashboard project. See main project LICENSE for details.
