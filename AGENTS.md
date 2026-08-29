# AGENTS.md

Single-package React + Vite + Ant Design 6 dashboard app. No monorepo.

## Commands

```bash
pnpm dev                # Vite dev server on http://localhost:5173
pnpm build              # tsc && vite build (fails on TS errors)
pnpm lint               # ESLint --max-warnings 0 (zero warnings required)
pnpm prettier:write     # Prettier format all files
pnpm storybook          # Storybook on port 6006
pnpm build-storybook    # Static Storybook build
pnpm preview            # Preview production build
```

## Pre-commit / CI

- **pre-commit**: `pnpm exec lint-staged` (Prettier + ESLint `--fix` on staged files)
- **commit-msg**: `pnpm exec commitlint --edit $1` — conventional commits enforced (`type(scope): message`)
- **CI**: Node 20, `pnpm install --frozen-lockfile`, Chromatic on push/PR to `main`, Changesets release on push to `main`
- Lint must pass with **0 warnings** before commit.
- **Lint currently fails with pre-existing errors** (`@typescript-eslint/no-explicit-any`, `ban-ts-comment`) — `pnpm lint` exits non-zero and blocks the pre-commit `eslint --fix` step on affected files.

## Data & Auth Quirks

- **Auth is fully dummy/mock.** `src/services/auth/authService.ts` returns hardcoded demo data. No real backend auth flow works.
- **Mock data is locked on — no live API path works.** `src/config/api.config.ts` hardcodes `USE_MOCK_DATA: true`; `src/redux/data-mode/dataModeSlice.ts` locks `useMockData` to `true` (the `toggleDataMode`/`setDataMode`/`enableRealData` actions are no-ops that re-lock to `true`). Env vars `VITE_USE_MOCK` / `VITE_USE_MOCK_DATA` (present in `.env` / `.env.example`) are **not** read by any code. Mock JSON lives in `public/mocks/`.
- **API client** (`src/services/api/apiClient.ts`) routes requests to mock files or live API based on Redux `dataMode.useMockData` (always `true` in practice). Mock-only endpoints (e.g., notifications) always use mock data.
- **Dual auth state**: Auth exists in both Redux (`src/redux/auth/authSlice.ts`, dummy) and Context (`src/contexts/AuthContext.tsx`, the source of truth). `ProtectedRoute` guards via `useAuth()`. Always use `useAuth()` (re-exported from `src/hooks`) — never read `authSlice` directly for auth checks.

## Architecture Notes

- **Routing**: `src/routes/routes.tsx` uses `createBrowserRouter`. `ProtectedRoute` guards auth. `PageWrapper` HOC wraps routes for scroll restoration.
- **Redux**: `theme`, `dataMode`, `auth`, `designStyle` slices. All persisted via `redux-persist` to `localStorage`.
- **Theme**: Ant Design v6 `ConfigProvider` in `src/App.tsx`. Dark/light via `mytheme === 'dark'`; `App.tsx` also sets `<html data-theme="dark|light">` for CSS targeting (e.g. `[data-theme='dark'] .card`). Use `getDesignTokens(activeStyle, themeMode)` for design-style-aware colors.
- **Design styles**: `clean`, `glassmorphic`, `neumorphic`, `bold` — controlled by Redux `designStyle.activeStyle`.
- **Query hooks**: Domain hooks live in `src/lib/queries/` and re-export from `src/hooks/index.ts`. Import from `../hooks`.

## Style Rules

- **Ant Design v6**: `bodyStyle` is deprecated. Use `styles={{ body: {...} }}`, `classNames={{ root: '...' }}`.
- **Prettier**: `semi: true`, `trailingComma: es5`, `singleQuote: true`.
- **Import order**: External libs → internal (`../../`) → types.
- **TypeScript**: strict, `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`. Path alias `@mocks/*` → `public/mocks/*`.

## Storybook

- Stories run inside a Redux `Provider` + `StylesContext.Provider` (see `.storybook/preview.tsx`).
- `react-refresh/only-export-components` rule is **warn** level. Story files must not break this rule.

## Versioning

- Changesets (`pnpm changeset`) for versioning. Base branch is `main`.
