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
pnpm lint                   # Run ESLint (max 0 warnings)
pnpm prettier:write         # Format all files with Prettier

# Storybook
pnpm storybook              # Start Storybook on port 6006
pnpm build-storybook        # Build Storybook for deployment

# Single Test (no unit tests - use Storybook + build validation)
```

Note: This project has no traditional unit tests. Testing is done via Storybook component testing and TypeScript build validation.

## Code Style Guidelines

### Import Organization

Order imports: 1) External libs (React, antd), 2) Internal modules (`../../`), 3) Types.

```typescript
import React from 'react';
import { Avatar, Flex, theme } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import { getNameInitials } from '../../../utils';
import type { UserProps } from './UserAvatar.types';
```

### Component Pattern

```typescript
interface UserAvatarProps {
  fullName: string;
  textWidth?: number;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ fullName, textWidth, ...others }) => {
  const { token } = theme.useToken();
  return <Avatar {...others}>{getNameInitials(fullName)}</Avatar>;
};

export default UserAvatar;
```

Rules: PascalCase names, extend antd props, destructure props, use spread operator.

### TypeScript Guidelines

- Use strict TypeScript with interfaces for data structures
- Use generic types: `useFetchData<T = any>`
- Prefer union types: `TaskStatus = 'pending' | 'completed'`
- Use nullish coalescing: `data ?? []`

### Naming Conventions

- Folders: kebab-case (`user-avatar/`)
- Components: PascalCase (`UserAvatar.tsx`)
- Hooks/utils: camelCase (`useFetchData.ts`)
- Constants: UPPER_SNAKE_CASE

### Error Handling

```typescript
const { data, error, loading } = useFetchData(url);

if (error) return <Alert message="Error" description={error.toString()} type="error" showIcon />;
if (loading) return <Loader />;
return <Component data={data} />;
```

Rules: try-catch async, use `{ data, error, loading }` pattern, use antd Alert.

### Styling Patterns

- Use `theme.useToken()` for theme-aware colors
- Use antd components (Flex, Typography, Row/Col)
- Inline styles for dynamic values: `style={{ backgroundColor: colorPrimary }}`

## Important Architecture Notes

### Authentication
- Dual auth: Redux (`authSlice`) + Context (`AuthContext`)
- **Always use `AuthContext`** for auth operations
- State persists via `redux-persist`

### Data Fetching
- Dual-mode: mock JSON vs live API
- Toggle via `dispatch(toggleDataMode())` or `VITE_USE_MOCK_DATA`
- Mock data: `/public/mocks/`, endpoints: `src/config/api.config.ts`

### Routing
- Dashboard routes: `DashboardLayout` with SideNav + HeaderNav
- Protected routes: `ProtectedRoute` component
- Scroll restoration: `PageWrapper` HOC

### Theming
- Primary color: `src/theme/colors.ts`
- Theme toggle: Redux `themeSlice.mytheme`
- Config: `src/App.tsx`

### Component Structure

```
src/components/
├── dashboard/default/    # Dashboard widgets
├── dashboard/ecommerce/
├── corporate/          # Corporate pages
├── shared/             # Reusable (Card, PageHeader, etc.)
src/pages/              # Page components
src/layouts/           # Layout components
```

## Git & Quality

- Pre-commit: `lint-staged` + Prettier
- Commit format: `type(scope): message` (feat, fix, chore, docs)
- Run `pnpm lint` before committing

## Environment Variables

Create `.env` (not committed):
```env
VITE_API_BASE_URL=http://localhost:5000
VITE_USE_MOCK_DATA=true
```

## New Features (v6)

This project uses **Ant Design v6.3.0**. Key v6 features:
- Masonry component: `import Masonry from 'antd/es/masonry'`
- Semantic structure: `classNames={{ root: 'custom' }}`, `styles={{ body: {...} }}`
- InputNumber spinner: `<InputNumber controls />`
- Deprecated: `bodyStyle` → `styles.body`, `BlockOutlined` → `StopOutlined`
