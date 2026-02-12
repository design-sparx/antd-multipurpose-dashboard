# AGENTS.md

This file provides guidance to agentic coding agents working with this Ant Design Multi-Purpose Dashboard codebase.

## Build, Lint, and Test Commands

### Essential Commands

```bash
# Development
pnpm dev                    # Start dev server on http://localhost:5173
pnpm build                  # TypeScript compile + Vite build for production
pnpm preview                # Preview production build locally

# Code Quality
pnpm lint                   # Run ESLint on TypeScript/TSX files (max 0 warnings)
pnpm prettier:write         # Format all files with Prettier

# Storybook
pnpm storybook              # Start Storybook dev server on port 6006
pnpm build-storybook        # Build static Storybook for deployment
```

### Testing

This project does not have traditional unit tests. The primary testing approach is:

- **Storybook**: Component testing and documentation via `.stories.tsx` files
- **Build validation**: TypeScript compilation ensures type safety
- **ESLint**: Static analysis for code quality
- **Manual testing**: Development server for interactive testing

Note: The GitHub Actions workflow references `yarn test` but this command is not defined in package.json. Testing is handled through Storybook and build processes.

## Code Style Guidelines

### Import Organization

Group imports in this specific order:

1. **External libraries** (React, Ant Design, third-party)
2. **Internal modules** (relative paths with `../../` notation)
3. **Types/interfaces**
4. **Assets/media**

```typescript
// 1. External libraries
import React from 'react';
import { Avatar, AvatarProps, Flex, theme, Typography } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';

// 2. Internal modules
import { getNameInitials, isColorLight } from '../../../utils';
import { ActivityTimeline } from '../../../types';

// 3. Types (if separate from internal modules)
import type { UserProps } from './UserAvatar.types';
```

### Component Structure

**File Organization:**

```
ComponentName/
├── ComponentName.tsx        # Main implementation
├── ComponentName.stories.tsx # Storybook stories
```

**Component Pattern:**

```typescript
import React from 'react';
import { Avatar, AvatarProps } from 'antd';

interface UserAvatarProps extends AvatarProps {
  fullName: string;
  textWidth?: number;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  fullName,
  textWidth,
  ...others
}) => {
  const { token } = theme.useToken();

  return (
    <Avatar {...others}>
      {getNameInitials(fullName)}
    </Avatar>
  );
};

export default UserAvatar;
```

**Rules:**

- Use PascalCase for component names and exports
- Define props interfaces above components with descriptive names
- Extend Ant Design component props when appropriate
- Use `const Component: React.FC<Props> =` pattern
- Destructure props: `({ prop1, prop2, ...others }: Props)`
- Pass remaining props with spread operator

### TypeScript Guidelines

**Type Safety:**

- Enable strict TypeScript configuration
- Define interfaces for all data structures
- Use generic type parameters for reusable functions: `useFetchData<T = any>`
- Prefer union types for constrained values: `TaskPriority = 0 | 1 | 2`
- Use explicit return types for functions
- Apply optional chaining and nullish coalescing: `data ?? []`

**API Types:**

```typescript
interface ApiResponse<T> {
  data: T;
  error?: string;
  loading?: boolean;
}

interface User {
  id: string;
  email: string;
  fullName?: string;
  avatar?: string;
}
```

### Naming Conventions

**Files and Directories:**

- kebab-case for folders: `user-avatar/`, `timeline-card/`
- PascalCase for component files: `UserAvatar.tsx`
- camelCase for hooks and utilities: `useFetchData.tsx`, `apiClient.ts`

**Variables and Functions:**

- camelCase for variables: `tasksListData`, `projectsError`
- PascalCase for components: `DefaultDashboardPage`, `TimelineCard`
- UPPER_SNAKE_CASE for constants: `DUMMY_USER`, `API_BASE_URL`
- Descriptive prop names: `fullName`, `textWidth`, `isAuthenticated`

### Error Handling

**Consistent Pattern:**

```typescript
const { data, error, loading } = useFetchData(url);

if (error) {
  return (
    <Alert
      message="Error"
      description={error.toString()}
      type="error"
      showIcon
    />
  );
}

if (loading) {
  return <Loader />;
}

return <ComponentContent data={data} />;
```

**Rules:**

- Use try-catch blocks in async functions
- Manage error state in hooks: `{ data, error, loading }`
- Use Ant Design Alert components for UI error display
- Provide user-friendly error messages with fallbacks
- Leverage global error handling via Axios interceptors

### Styling Patterns

**Ant Design Approach:**

- Heavy reliance on Ant Design components and design tokens
- Use `theme.useToken()` for dynamic theme-aware colors
- Apply inline styles for dynamic values: `style={{ backgroundColor: color }}`
- Utilize Ant Design utility components (Flex, Typography, etc.)
- Implement responsive grid with Row/Col system

**Example:**

```typescript
const {
  token: { colorPrimary },
} = theme.useToken();

return (
  <Flex gap="small" align="center" style={{ backgroundColor: colorPrimary }}>
    <Typography.Text>{content}</Typography.Text>
  </Flex>
);
```

### State Management

**Redux Usage:**

- Modern Redux Toolkit with `createSlice` and `createAsyncThunk`
- Use `redux-persist` for state persistence
- Follow established slice patterns: `themeSlice`, `authSlice`, `dataModeSlice`

**Context Usage:**

- Use React Context for feature-specific state (AuthContext, StylesContext)
- Custom hooks: `useAuth()`, `useStyles()`

### Git Hooks and Quality

**Pre-commit Hook:**

- Runs `lint-staged` automatically
- Formats changed files with Prettier
- Enforces code style consistency

**Commit Messages:**

- Must follow conventional commits format
- Format: `type(scope): message`
- Types: `feat`, `fix`, `chore`, `docs`, etc.

### Development Best Practices

**Console Logging:**

- Use consistent debug logging: `[ComponentName] message`
- Remove console logs in production code

**Component Composition:**

- Favor composition over inheritance
- Use render props and children effectively
- Create reusable, composable components

**Performance:**

- Leverage React.memo for expensive components
- Use useMemo and useCallback appropriately
- Optimize bundle size with dynamic imports

**Accessibility:**

- Ensure all interactive elements are keyboard accessible
- Use semantic HTML elements
- Provide appropriate ARIA labels when needed

### Environment Variables

Create `.env` file (not committed):

```env
VITE_API_BASE_URL=http://localhost:5000
VITE_USE_MOCK_DATA=true
VITE_FIREBASE_API_KEY=your_api_key
# ... other Firebase config
```

## Important Architecture Notes

### Authentication System

- Dual auth state: Redux (`authSlice`) + Context (`AuthContext`)
- **Always use `AuthContext` for auth operations** - it's the source of truth
- Auth state persists via `redux-persist`

### Data Fetching Strategy

- Dual-mode system: mock JSON files vs. live API
- Toggle via `dispatch(toggleDataMode())` or `VITE_USE_MOCK_DATA` env var
- Define both mock and prod endpoints in `src/config/api.config.ts`
- Use `apiRequest` from `apiClient.ts` for all API calls

### Routing Architecture

- All dashboard routes use `DashboardLayout` with SideNav + HeaderNav
- Protected routes use `ProtectedRoute` component
- Scroll restoration handled via `PageWrapper` HOC

### Theming System

- Primary color defined in `src/theme/colors.ts`
- Theme toggle via Redux `themeSlice.mytheme`
- Use `getThemeColors(isDark)` for dynamic colors
- Ant Design theme configuration in `src/App.tsx`

### Component Organization

Components organized by domain in `src/components/`:

- `dashboard/default/` - Default dashboard components
- `dashboard/ecommerce/` - E-commerce components
- `corporate/` - Corporate page components
- etc.

Each component typically has both implementation and Storybook stories.
