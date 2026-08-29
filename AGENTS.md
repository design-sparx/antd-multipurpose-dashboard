# AGENTS.md

This file provides guidance to AI coding agents when working with code in this repository.

## Project Overview

A professional multi-purpose Admin & Dashboard template built with React, Vite, Ant Design 6, and TypeScript. Features 8 different dashboard variants (Default, Projects, E-commerce, Marketing, Social, Bidding, Learning, Logistics) with hundreds of pre-built components and pages.

**Live Demo**: https://antd-multipurpose-dashboard.netlify.app/
**Storybook**: https://6546507b657a74164abf2db6-iqmnggdrcl.chromatic.com/

## Common Commands

### Development

```bash
pnpm dev              # Start dev server on http://localhost:5173
pnpm build            # TypeScript compile + Vite build for production
pnpm preview          # Preview production build locally
```

### Code Quality

```bash
pnpm lint             # Run ESLint on TypeScript/TSX files
pnpm prettier:write   # Format all files with Prettier
```

### Storybook

```bash
pnpm storybook        # Start Storybook dev server on port 6006
pnpm build-storybook  # Build static Storybook for deployment
```

### Testing

```bash
pnpm test             # Run tests in watch mode
pnpm test:run         # Run tests once (CI)
```

Testing uses **Vitest** + **React Testing Library**:

- Test files: `*.test.ts` or `*.test.tsx`
- Setup file: `src/test/setup.ts` (imports `@testing-library/jest-dom`)
- Config: `vitest.config.ts` (jsdom environment)

### Git Hooks

- Pre-commit hook runs `lint-staged` (ESLint + Prettier on staged files). Lint must pass with 0 warnings.
- Commit messages must follow conventional commits format (enforced by commitlint)
- Format: `type(scope): message` where type is feat, fix, chore, docs, etc.

## Architecture

### State Management

The application uses a **dual state management approach**:

1. **Redux Toolkit** (`src/redux/`) - Global app state

   - `themeSlice`: Dark/light theme toggle (`mytheme`)
   - `designStyle`: Active design style (`clean`, `glassmorphic`, `neumorphic`, `bold`)
   - Uses `redux-persist` with localStorage for state persistence

2. **React Context** (`src/contexts/`) - Feature-specific state
   - `AuthContext`: Authentication methods (login, logout, register) and user state
   - `StylesContext`: Global component styling defaults (grid gaps, carousel props)

**Important**: `AuthContext` is the single source of truth for authentication. There is no Redux auth state.

### Routing Architecture

Routes are defined in `src/routes/routes.tsx` using React Router v6's `createBrowserRouter`:

- **Layout Wrappers**: All routes use layout components that provide navigation/UI chrome:

  - `GuestLayout`: Public pages (home)
  - `DashboardLayout`: All dashboard pages with sidebar + header navigation
  - `CorporateLayout`: Corporate pages (about, team, FAQs, pricing, contact, license)
  - `UserAccountLayout`: User profile settings pages

- **Protected Routes**: `ProtectedRoute` component (`src/utils/ProtectedRoute.tsx`) guards authenticated routes

  - Checks `AuthContext.isAuthenticated`
  - Redirects to `/auth/signin` if unauthenticated
  - Shows loading spinner during auth check
  - Supports `requireAuth={false}` for auth pages (redirects authenticated users away)

- **Scroll Restoration**: `ScrollToTop` component wraps all routes via `PageWrapper` HOC to smooth-scroll to top on navigation

### Authentication System

Multi-layered authentication with Firebase integration:

1. **AuthContext** (`src/contexts/AuthContext.tsx`)

   - Primary auth interface with methods: `login`, `register`, `logout`, `updateUser`
   - Manages user state and loading states
   - Custom hook: `useAuth()` for consuming auth state

2. **Auth Service** (`src/services/auth/authService.ts`)

   - Handles API calls for login, register, password reset, token refresh
   - Stores tokens via `tokenStorage` (localStorage wrapper)
   - Important: API returns `token` field (used as both access & refresh token if no `refreshToken` provided)

3. **Token Storage** (`src/services/auth/tokenStorage.ts`)

   - Manages access tokens, refresh tokens, and user data in localStorage
   - Keys: `accessToken`, `refreshToken`, `user`

4. **API Client Integration** (`src/services/api/apiClient.ts`)
   - Request interceptor automatically adds `Authorization: Bearer <token>` header
   - Response interceptor handles 401 errors with automatic token refresh
   - On auth failure, clears tokens and redirects to login

### Data Fetching Strategy

**Mock-only data system** — all data is served from JSON mock files:

1. **Mock Data** (default)

   - Data served from `public/mocks/*.json` files
   - 36 different mock datasets covering all dashboard types
   - No live API mode — the dual-mode system has been removed

2. **Endpoint Mapping** (`src/services/api/endpoints.ts`)

   - Single source of truth for all API endpoint definitions
   - `API_ENDPOINTS` object with all resource paths

3. **API Client** (`src/services/api/apiClient.ts`)

   - Automatically routes requests to mock JSON files
   - Request interceptor converts endpoints to mock file paths
   - Handles auth token injection for live API compatibility

4. **TanStack Query Hooks** (`src/lib/queries/`)
   - All data fetching uses TanStack Query hooks
   - Hooks are re-exported from `src/hooks/index.ts`
   - Each hook wraps `apiRequest` and returns typed data

**Best practice**: When adding new data fetching, add mock JSON to `public/mocks/`, define endpoint in `src/services/api/endpoints.ts`, create a query hook in `src/lib/queries/`, and export from `src/hooks/index.ts`.

### Component Organization

Components are organized by domain in `src/components/`:

```
components/
├── BackBtn, Card, Logo, etc.          # Shared/generic components
├── corporate/                          # Corporate page components
│   └── BlogsListCard/
├── dashboard/
│   ├── default/                        # Default dashboard components
│   │   ├── CampaignsCard/
│   │   ├── EarningsCard/
│   │   ├── OrdersChart/
│   │   └── ...
│   ├── bidding/                        # NFT/Bidding dashboard
│   ├── ecommerce/                      # E-commerce dashboard
│   ├── learning/                       # Learning management dashboard
│   ├── logistics/                      # Logistics dashboard
│   └── marketing/                      # Marketing dashboard
```

Each component typically has:

- `ComponentName.tsx` - Implementation
- `ComponentName.stories.tsx` - Storybook stories (if applicable)

### Layouts

Four main layout templates in `src/layouts/`:

1. **DashboardLayout** (`dashboards/index.tsx`)

   - Used by all `/dashboards/*` routes
   - Includes SideNav (collapsible sidebar) + HeaderNav (top bar with user menu)
   - Responsive: Sidebar collapses on mobile

2. **CorporateLayout** (`corporate/index.tsx`)

   - Marketing/corporate pages (about, team, pricing, etc.)
   - Clean header + footer navigation

3. **UserAccountLayout** (`userAccount/index.tsx`)

   - User profile settings pages
   - Tabbed navigation for different profile sections

4. **GuestLayout** (`guest/Guest.tsx`)
   - Minimal layout for landing/home page

### Theming System

Ant Design theme configuration in `src/App.tsx`:

- **Primary Color**: Defined in `src/theme/colors.ts` as `PRIMARY_COLOR`
- **Theme Toggle**: Redux `themeSlice.mytheme` controls dark/light mode
  - `mytheme == 'dark'` applies `antdTheme.darkAlgorithm`
  - Otherwise uses `antdTheme.defaultAlgorithm`
- **Theme-aware Colors**: Use `getThemeColors(isDark)` from `theme/colors.ts` for dynamic colors
- **Legacy Colors**: `App.tsx` exports `COLOR` object for backward compatibility (consider migrating)
- **Component-specific Overrides**:
  - Calendar, Table: transparent backgrounds
  - Carousel: 8px dot width
  - Timeline: transparent dot background

### Design Style System

Four visual design styles in `src/theme/design-styles.ts`, controlled by Redux `designStyle.activeStyle`:

- `clean` — flat/minimal with solid backgrounds
- `glassmorphic` — frosted glass with blur/translucency
- `neumorphic` — soft extruded shadows
- `bold` — strong shadows, sharp edges, vivid accents

Each style exposes `SurfaceTokens` (surfaceBg, sidebarBg, border, shadow, backdropFilter, hoverShadow, menuItemHover, headerFilled\*) for both light and dark modes.

**Usage**: `const { tokens, styleName } = useDesignStyle()` from `src/hooks/useDesignStyle.ts`. Apply `tokens.surfaceBg`, `tokens.shadow`, etc. directly as inline styles on cards/surfaces.

### Query Hooks Layer

Domain-specific data fetching hooks live in `src/lib/queries/` and are re-exported from `src/hooks/index.ts`:

- `products`, `orders`, `sellers`, `projects`, `clients`, `tasks`, `campaigns`
- `learning` (courses, exams, study stats, community groups)
- `social` (activities, stats, scheduled posts)
- `bidding` (live auctions, creators, top sellers, transactions)
- `logistics` (trucks, deliveries, requests, analytics)
- `finance` (invoices, expenses)
- `healthcare` (patients, appointments, doctors, departments)
- `notifications`, `pricings`, `licenses`, `faqs`
- `employees`, `country-orders`, `channel-users`, `comments`
- `sessions`, `timeline`

Import these via `import { useProducts, useOrders, ... } from '../hooks'`. Each hook wraps `apiRequest` and returns typed data with the appropriate mock/live endpoint.

### File Structure Notes

- **Pages**: `src/pages/` - Route components (8 dashboard pages + auth + corporate + profile)
- **Types**: `src/types/` - TypeScript interfaces (API types, component props)
- **Hooks**: `src/hooks/` - Custom React hooks (`useDesignStyle.ts`, `useKeyboardShortcuts.ts`, `useTablePagination.ts`, `useAccessibility.ts`, `useCountUp.ts`, `usePageContext.tsx`)
- **Utils**: `src/utils/` - Helper functions, API utilities
- **Assets**: `src/assets/` - Images, fonts, static files
- **Stories**: `src/stories/` - Storybook-specific files
- **Shared Dashboard Components**: `src/components/dashboard/shared/` - Cross-dashboard reusable components (PostsCard, ProjectsCard, RevenueCard)

### TypeScript Configuration

- Target: ES2020
- Module: ESNext with bundler resolution
- Strict mode enabled
- `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch` enforced

### Build Tools

- **Vite**: Modern build tool with React SWC plugin for fast HMR
- **TypeScript**: Type checking before build (`tsc && vite build`)
- **ESLint**: Configured for React, TypeScript, and Storybook
  - Plugin: `react-refresh` for HMR best practices
- **Prettier**: Code formatting (runs on pre-commit via lint-staged)
- **Husky**: Git hooks management

## Development Workflow

### Adding a New Dashboard Component

1. Create component folder in appropriate domain: `src/components/dashboard/{domain}/ComponentName/`
2. Implement `ComponentName.tsx` with TypeScript props interface
3. Create `ComponentName.stories.tsx` for Storybook documentation
4. If data is needed:
   - Add mock JSON to `public/mocks/NewData.json`
   - Define endpoint in `src/services/api/endpoints.ts`
   - Create a query hook in `src/lib/queries/` following existing patterns
   - Export the hook from `src/hooks/index.ts`

### Adding a New Page/Route

1. Create page component in `src/pages/`
2. Export from `src/pages/index.ts`
3. Add route in `src/routes/routes.tsx` under appropriate layout
4. Wrap with `<ProtectedRoute>` if authentication required
5. Update navigation (sidebar/header) if needed

### Working with Authentication

- Use `useAuth()` hook to access auth state: `const { user, isAuthenticated, login, logout } = useAuth()`
- Never directly manipulate tokens - use `authService` methods
- Auth state persists across page reloads via `redux-persist`
- Token refresh is automatic via API client interceptor

## Environment Variables

Create `.env` file (not committed):

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:5000    # Backend URL

# Firebase Configuration (if using Firebase auth)
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Code Style

### Naming Conventions

- Folders: kebab-case (`user-avatar/`)
- Components: PascalCase (`UserAvatar.tsx`)
- Hooks/utils: camelCase (`useDesignStyle`)
- Constants: UPPER_SNAKE_CASE

### Component Pattern

- PascalCase names, extend antd props via intersection types, destructure props with spread operator
- Use `theme.useToken()` for theme-aware colors
- Use antd layout components (Flex, Typography, Row/Col) over custom CSS

### Import Order

External libs (React, antd) → Internal modules (`../../`) → Types

### Ant Design v6 Notes

This project uses **Ant Design v6** (latest v6 line) with matching ecosystem packages:

- `antd` v6.3+
- `@ant-design/icons` v6+
- `@ant-design/colors` v7+
- `@ant-design/charts` v1+

Key v6 patterns:

- Semantic structure: `classNames={{ root: 'custom' }}`, `styles={{ body: {...} }}`
- Deprecated: `bodyStyle` → `styles.body`

## Important Caveats

1. **Single Auth State**: Auth exists only in `AuthContext`. There is no Redux auth state. Always use `useAuth()` for auth operations.

2. **API Response Format**: Backend API returns `token` (not `accessToken`). The auth service handles this mapping.

3. **Mock-Only Endpoints**: Some endpoints in `api.config.ts` have `mockOnly: true`. These always return mock data even in Live Mode because backend is not implemented.

4. **Router Outlet**: Auth and error routes use `<Outlet />` directly instead of layouts. Don't remove these.

5. **Theme Toggle Persistence**: Theme preference persists via redux-persist. Clearing localStorage will reset to default light theme.

6. **Storybook Context**: Storybook stories need proper context providers (React Router, Redux, Ant Design theme). Check `.storybook/preview.tsx` for setup.
