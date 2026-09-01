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

Antd-specific tooling (`@ant-design/cli`, used in CI / manually):

```bash
antd lint src --format json          # JSX/TSX usage linter (deprecated / a11y / usage / performance)
antd doctor                         # ecosystem compat check
antd info <Component> --format json # offline component API lookup
```

## Pre-commit / CI

- **pre-commit**: `pnpm exec lint-staged` (Prettier + ESLint `--fix` on staged files)
- **commit-msg**: `pnpm exec commitlint --edit $1` — conventional commits enforced (`type(scope): message`)
- **CI**: Node 20, `pnpm install --frozen-lockfile`, Chromatic on push/PR to `main`, Changesets release on push to `main`. The dedicated CI build+lint workflow (`ci.yml`) was removed to save action minutes — validate locally with `pnpm build` / `pnpm lint` too.
- Lint must pass with **0 warnings** before commit.
- **Lint currently fails with pre-existing errors** (`@typescript-eslint/no-explicit-any`, `ban-ts-comment`) — `pnpm lint` exits non-zero and blocks the pre-commit `eslint --fix` step on affected files. **Workaround**: use `git commit --no-verify` for changes that don't introduce new lint errors. Fix the underlying `any` usages as a separate task.

## Data & Auth Quirks

- **Auth is fully dummy/mock.** `src/services/auth/authService.ts` returns hardcoded demo data. No real backend auth flow works. The login flow is exposed via `<LoginModal>` in `src/components/auth/login-modal/` and triggered by the `open-login-modal` window event.
- **`useAuth()` is the single source of truth** for auth state (re-exported from `src/hooks`). It exposes `{ user, isLoading, login, logout, error }` and a local `useState<string | null>`-based error is used in the login modal (`setError(null)` / `setError(err.message)`). There is **no** `dispatch(clearError())` — `authSlice` was removed in batch 3 (#176).
- **Mock data is locked on — no live API path works.** `src/config/api.config.ts` hardcodes `USE_MOCK_DATA: true`; `src/redux/data-mode/dataModeSlice.ts` locks `useMockData` to `true` (the `toggleDataMode`/`setDataMode`/`enableRealData` actions are no-ops that re-lock to `true`). Env vars `VITE_USE_MOCK` / `VITE_USE_MOCK_DATA` (present in `.env` / `.env.example`) are **not** read by any code. Mock JSON lives in `public/mocks/`.
- **API client** (`src/services/api/apiClient.ts`) routes requests to mock files or live API based on Redux `dataMode.useMockData` (always `true` in practice). Mock-only endpoints (e.g., notifications) always use mock data.
- **Dual auth state**: Auth exists in both Redux (`src/redux/auth/authSlice.ts`, dummy) and Context (`src/contexts/AuthContext.tsx`, the source of truth). `ProtectedRoute` guards via `useAuth()`. Always use `useAuth()` (re-exported from `src/hooks`) — never read `authSlice` directly for auth checks.

## Architecture Notes

- **Routing**: `src/routes/routes.tsx` uses `createBrowserRouter`. `ProtectedRoute` guards auth. `PageWrapper` HOC wraps routes for scroll restoration.
- **Redux**: `theme`, `dataMode`, `auth`, `designStyle` slices. All persisted via `redux-persist` to `localStorage`.
- **Theme**: Ant Design v6 `ConfigProvider` in `src/App.tsx`; the theme object is built by `getAntdThemeConfig(activeStyle, themeMode)` in `src/theme/antd-theme.ts` and `useMemo`-cached on `[activeStyle, themeMode]`. Dark/light via `mytheme === 'dark'` (typed `'light' | 'dark'`); the `<html data-theme="dark|light">` attribute is synced by the `useDataTheme(themeMode)` hook (`src/hooks/useDataTheme.ts`, re-exported from `src/hooks`). Contrast-aware: `colorPrimary` is `#076ee5` (light) / `#4d8bff` (dark — `DARK_PRIMARY_COLOR` in `src/theme/colors.ts`; the light `#076ee5` drops to ~3.5:1 on dark surfaces) and `colorLink` is pinned to the brand primary so `Button type="link"` doesn't fall back to antd's default `colorInfo` (`~#1677ff`, ~4.0:1, fails AA). Use `getDesignTokens(activeStyle, themeMode)` for design-style-aware colors.
- **App shell / providers**: `src/main.tsx` composes the provider tree via a `Providers` component (`QueryClientProvider` → `PersistGate` → `Provider` → `AuthProvider` → `App`). The `StylesContext` value (`rowProps`/`carouselProps`) is a static, module-level constant in `App.tsx` so the 15+ `useStylesContext()` consumers don't re-render on every render.
- **Design styles**: `clean`, `glassmorphic`, `neumorphic`, `bold` — controlled by Redux `designStyle.activeStyle`.
- **Query hooks**: Domain hooks live in `src/lib/queries/` and re-export from `src/hooks/index.ts`. Import from `../hooks`.
- **App context**: `App.useApp()` is the only way to call `message`, `notification`, `modal` so they inherit the active `ConfigProvider` theme. The static `message.*` / `notification.*` imports are removed (#191).

## Antd v6 Component Migration Map

Use `antd lint src` (and `antd info <Component> --format json`) to check for newly-deprecated props. Verified working replacements:

| Component | Old (do not use) | New |
| --- | --- | --- |
| `Alert` | `message=`, `onClose=` | `title=`, `closable={{ onClose: ... }}` |
| `Space` | `direction="vertical"` / `"horizontal"` | `vertical` (boolean) / remove (default is horizontal) |
| `Drawer` | `width=`, `height=` | `size=` |
| `Tag` | `bordered={true}` / `{false}` | `variant="filled"` / `"outlined"` |
| `Modal` | `maskClosable={false}` | `mask={{ closable: false }}` |
| `Collapse` | `expandIconPosition="start"` | `expandIconPlacement="start"` |
| `Divider` | `type="vertical"` | `orientation="vertical"` |
| `Card` | `bodyStyle={{...}}` | `styles={{ body: {...} }}` |
| `Button` | `iconPosition="end"` | `iconPlacement="end"` |

**`BorderBeam`** is a `v6.4.0+` feature. The current antd is `^6.6.2` in `package.json`. Do **not** add a local shim — bump the antd version if you need it. `BorderBeam` wraps a single DOM element with `position: relative` and uses `ref` resolution at mount; child structure changes after mount are not picked up.

## Style Rules

- **Ant Design v6**: prefer `styles={{ body: {...} }}` and `classNames={{ root, body, ... }}` over deprecated `bodyStyle` / inline styles. The shared `Card` (`src/components/shared/card/card.tsx`) already composes `classNames={{ root: 'card design-style-{clean|glassmorphic|neumorphic|bold}' }}` and applies design-style tokens — extend it, don't bypass it.
- **Container / section pattern** (used everywhere on the home page and corporate pages): wrap a section in `<Container>` and put a `<Row gutter={...}>` of `<Col>`s inside. **Do not** use native `<section>` or wrapper `<div>`s with hand-rolled section padding — `Container` handles responsive widths and `sectionStyles` is the established idiom.
- **Inline styles are for per-instance computed values only** (media-query-driven, theme tokens from `theme.useToken()`, dynamic values like `--announcement-stagger: ${index}`). Everything else lives in `className` utilities (e.g. `text-center`, `m-0`, `text-capitalize`) or co-located `styles.css` (matching the `card/styles.css` pattern).
- **Don't add CSS for things antd already styles.** Antd v6 `Button`, `Tag`, `Card`, etc. have full theming and variants — use them directly (e.g. `<Button type="primary" href=...>` for CTAs, not a custom-styled `<a>` with a `.cta` class). Co-located `styles.css` is only for custom layouts, animations, or genuinely new visual treatments.
- **No `useState` mount-gates for animations.** Use `classNames` API + per-index CSS class (e.g. `.announcement-card--0..7` with `--announcement-stagger`) and `prefers-reduced-motion: no-preference` / `reduce` guards.
- **Prettier**: `semi: true`, `trailingComma: es5`, `singleQuote: true`, default `endOfLine: 'lf'`.
- **Import order**: External libs → internal (`../../`) → types.
- **TypeScript**: strict, `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`. Path alias `@mocks/*` → `public/mocks/*`.
- **Line endings**: LF only. Enforced by `.gitattributes`. Don't commit CRLF files (Windows `git` will warn "LF will be replaced by CRLF" — fix with `prettier --write`).

## Storybook

- Stories run inside a Redux `Provider` + `StylesContext.Provider` (see `.storybook/preview.tsx`).
- `react-refresh/only-export-components` rule is **warn** level. Story files must not break this rule.

## Announcements Feature

- `src/components/shared/announcements/` — section built from the shared `Card` + `Container` + antd `Row/Col/Flex/Tag/Button/Empty/Typography` + `BorderBeam`. No native `<section>`, no wrapper divs.
- `src/data/announcements.json` — typed feed (`{ id, title, body, tag?, publishedAt, cta? }`). Sort by date desc; format dates with `formatRelativeDate()` from `src/lib/hooks/use-announcements.ts`.
- Co-located `styles.css` for the stagger-reveal animation.
- Re-exports: `Announcements` from `src/components/shared/index.ts`; `useAnnouncements` / `formatRelativeDate` from `src/hooks/index.ts`.

## Shared Components

### `Logo` (`src/components/shared/logo/logo.tsx`)

- **Props**: `color?`, `bgColor?`, `imgSrc?` (default `/logo-no-background.png`), `imgAlt?`, `brandName?` (default `'Antd Admin'`), `imgHeight?` (default 48), `asLink?`, `href?` (default `/`), `showText?` (default `true`).
- Uses `Typography.Text` + `ellipsis` (NOT `Typography.Title` — brand text isn't a heading; `ellipsis` gives free `text-overflow` in the collapsed sidebar).
- Wraps the brand text in a chip using `theme.useToken().borderRadius` for the radius.
- **Do not** spread `FlexProps` onto `<Logo>` — wrap in `<Flex>` instead when you need justify/padding/gap on the root (see `side-nav.tsx`).

### `GuestFooter` (`src/components/shared/guest-footer/`)

- 3-col layout: Brand + Star-on-GitHub CTA, Product links (Docs, Roadmap, Changelog), Community links (Source, Issues, Discussions) + meta row with MIT notice, "Back to top" button, and `design-sparx` link.
- Re-exports from `src/components/shared/index.ts`.
- For inline anchors **use the same paths as the `PATH_*` constants in `src/constants/routes.ts`** — don't hardcode GitHub URLs.
- "Back to top" uses the `goToTop()` util in `src/utils/index.ts:168` (smooth scroll, `window.scrollTo({ top: 0, behavior: 'smooth' })`).
- **CTA buttons: use antd `<Button type="primary" href=... target="_blank" rel="noopener noreferrer" icon=...>`, NOT a custom-styled `<a>`.** Antd v6 buttons support `href` natively — see how `Star on GitHub` is rendered in `guest-footer.tsx`.
- Storybook: `fullscreen` layout decorator.

## FloatButton Group Pitfall

`<FloatButton.Group>`'s main icon is the menu's open/close trigger. An `onClick` on the group fires on **every** click of that icon — both opening AND closing the menu. **Move action handlers to child `FloatButton`s, not the group** (PR #196 footgun). See `guest.tsx` for the correct pattern: group icon opens menu, first child toggles theme, second child is `FloatButton.BackTop`.

## Versioning

- Changesets (`pnpm changeset`) for versioning. Base branch is `main`.

## Git Workflow

- **Base branches**: `main` (release) and `dev` (work-in-progress). PRs go `dev → main`. The `dev` branch frequently diverges from `main`; rebase before opening a PR to avoid GitHub reporting `CONFLICTING`.
- **Rebase conflict playbook** (worked example: PR #196 rebased onto `main` after #188 landed):
  1. `git fetch origin && git rebase origin/main`
  2. Resolve `.gitignore` / `AGENTS.md` / `pnpm-lock.yaml` first — take `main`'s versions and let `pnpm install` regenerate the lockfile (`pnpm install` without `--frozen-lockfile`).
  3. For app files that conflict because both sides renamed the same deprecated prop (e.g. `message=`→`title=`), keep the rename and drop the markers. For structural changes (e.g. `login-modal.tsx` was rewritten in main to use `useAuth()` instead of Redux), prefer **main's structural version** and layer the rename on top.
  4. For `App.tsx` and `app.tsx` style files: keep **both** `useAuth()` (for `user`/`logout`) **and** `App.useApp()` (for `message`/`notification`/`modal`) — they serve different purposes.
  5. Run `antd lint src` and `tsc --noEmit` after resolution; Prettier the changed files (`prettier --write $(git diff --name-only origin/main..HEAD)`).
  6. `git push --force-with-lease origin dev` (safe force-push: refuses if upstream moved).

- **When to use `--no-verify`**: pre-commit `lint-staged` → `eslint --fix` blocks on pre-existing `no-explicit-any` errors. Use `--no-verify` only when your diff doesn't introduce new lint errors. Check with `npx eslint src -f json` first.
