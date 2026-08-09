# Google Analytics Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate GA4 page view tracking and custom event tracking into the app using `react-ga4`.

**Architecture:** Install `react-ga4`, initialize it in `main.tsx` behind an env var guard, hook page views into the existing `ScrollToTop` component, and expose a typed `trackEvent()` utility for custom events.

**Tech Stack:** React 18, Vite, TypeScript, React Router v6, `react-ga4`

---

## File Map

| File                     | Action | Purpose                        |
| ------------------------ | ------ | ------------------------------ |
| `package.json`           | Modify | Add `react-ga4` dependency     |
| `.env`                   | Modify | Add `VITE_GA_MEASUREMENT_ID`   |
| `.env.example`           | Modify | Document the new env var       |
| `src/utils/analytics.ts` | Create | `trackEvent()` typed utility   |
| `src/utils/index.ts`     | Modify | Re-export analytics utility    |
| `src/main.tsx`           | Modify | Initialize ReactGA with guard  |
| `src/routes/routes.tsx`  | Modify | Send pageview in `ScrollToTop` |

---

## Task 1: Install `react-ga4`

**Files:**

- Modify: `package.json`

- [ ] **Step 1: Install the package**

```bash
pnpm add react-ga4
```

Expected output includes: `+ react-ga4 x.x.x`

- [ ] **Step 2: Verify TypeScript types are included**

```bash
cat node_modules/react-ga4/types/index.d.ts | head -10
```

Expected: shows TypeScript type declarations (no separate `@types/react-ga4` needed).

- [ ] **Step 3: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: add react-ga4 dependency"
```

---

## Task 2: Add environment variable

**Files:**

- Modify: `.env`
- Modify: `.env.example`

- [ ] **Step 1: Add the env var to `.env`**

Open `.env` and append this line (replace with your real Measurement ID):

```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

`.env` is gitignored — do not commit it.

- [ ] **Step 2: Document it in `.env.example`**

Open `.env.example`. The current content is:

```env
# API Configuration - MOCK MODE ONLY
# Application uses mock JSON data from /public/mocks/ directory
VITE_API_BASE_URL=http://localhost:5080
VITE_USE_MOCK_DATA=true
```

Add the GA entry so it becomes:

```env
# API Configuration - MOCK MODE ONLY
# Application uses mock JSON data from /public/mocks/ directory
VITE_API_BASE_URL=http://localhost:5080
VITE_USE_MOCK_DATA=true

# Google Analytics 4
# Get your Measurement ID from https://analytics.google.com > Admin > Data Streams
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

- [ ] **Step 3: Commit**

```bash
git add .env.example
git commit -m "chore: document VITE_GA_MEASUREMENT_ID env variable"
```

---

## Task 3: Create `trackEvent` utility

**Files:**

- Create: `src/utils/analytics.ts`
- Modify: `src/utils/index.ts`

- [ ] **Step 1: Create the utility file**

Create `src/utils/analytics.ts` with this content:

```ts
import ReactGA from 'react-ga4';

export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  ReactGA.event({ action, category, label, value });
};
```

- [ ] **Step 2: Re-export from the utils barrel**

Open `src/utils/index.ts`. It currently ends with:

```ts
export * from './api';
export * from './tasks';
export * from './export';
```

Add the analytics export so it becomes:

```ts
export * from './api';
export * from './tasks';
export * from './export';
export * from './analytics';
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
pnpm exec tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/utils/analytics.ts src/utils/index.ts
git commit -m "feat: add trackEvent analytics utility"
```

---

## Task 4: Initialize GA in `main.tsx`

**Files:**

- Modify: `src/main.tsx`

- [ ] **Step 1: Add the initialization**

Open `src/main.tsx`. The current imports are:

```ts
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './i18n';
import './index.css';
import { store, persistor } from './redux/store.ts';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
```

Add the ReactGA import and initialization block right after the imports (before `const queryClient = ...`):

```ts
import React from 'react';
import ReactDOM from 'react-dom/client';
import ReactGA from 'react-ga4';
import App from './App.tsx';
import './i18n';
import './index.css';
import { store, persistor } from './redux/store.ts';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
if (gaId) {
  ReactGA.initialize(gaId);
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
pnpm exec tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Verify dev server starts without errors**

```bash
pnpm dev
```

Open `http://localhost:5173` in a browser. Check the browser console — there should be no GA-related errors. If `VITE_GA_MEASUREMENT_ID` is set in `.env`, you should see a network request to `https://www.google-analytics.com/g/collect` in the Network tab.

- [ ] **Step 4: Commit**

```bash
git add src/main.tsx
git commit -m "feat: initialize Google Analytics in app entry point"
```

---

## Task 5: Track page views in `ScrollToTop`

**Files:**

- Modify: `src/routes/routes.tsx`

- [ ] **Step 1: Add the pageview send**

Open `src/routes/routes.tsx`. The current `ScrollToTop` component is:

```ts
import { createBrowserRouter, Outlet, useLocation } from 'react-router-dom';
...

export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]);

  return null;
};
```

Add the `ReactGA` import at the top of the file (after the existing imports):

```ts
import ReactGA from 'react-ga4';
```

Then update `ScrollToTop` to send a pageview on each pathname change:

```ts
export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    ReactGA.send({ hitType: 'pageview', page: pathname });
  }, [pathname]);

  return null;
};
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
pnpm exec tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Verify page view tracking works**

```bash
pnpm dev
```

1. Open `http://localhost:5173` in a browser with DevTools open on the Network tab, filtered to `collect`
2. Navigate between a few pages (e.g. sign in, then dashboards)
3. Each navigation should trigger a request to `https://www.google-analytics.com/g/collect` with `en=page_view` in the payload

- [ ] **Step 4: Lint check**

```bash
pnpm lint
```

Expected: no warnings or errors (the pre-commit hook requires 0 warnings).

- [ ] **Step 5: Commit**

```bash
git add src/routes/routes.tsx
git commit -m "feat: track page views in ScrollToTop component"
```

---

## Verification Checklist

After all tasks are complete:

- [ ] `pnpm exec tsc --noEmit` passes with no errors
- [ ] `pnpm lint` passes with 0 warnings
- [ ] `pnpm build` completes successfully
- [ ] Navigating between routes triggers `page_view` hits in the Network tab (when `VITE_GA_MEASUREMENT_ID` is set)
- [ ] Removing `VITE_GA_MEASUREMENT_ID` from `.env` and restarting dev server produces no console errors
- [ ] `trackEvent('click', 'Test', 'Label')` called in browser console triggers a `collect` network request
