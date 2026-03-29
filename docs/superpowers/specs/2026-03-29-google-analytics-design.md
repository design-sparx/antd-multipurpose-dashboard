# Google Analytics Integration Design

**Date:** 2026-03-29
**Status:** Approved
**Scope:** Add GA4 page view tracking and custom event tracking to the antd-multipurpose-dashboard app.

---

## Overview

Integrate Google Analytics 4 (GA4) using the `react-ga4` library. Track page views automatically on every route change, and provide a typed utility for manual event tracking throughout the app.

---

## Requirements

- Track page views on every route navigation
- Support custom event tracking (clicks, form submissions, etc.)
- GA Measurement ID stored in environment variable (`VITE_GA_MEASUREMENT_ID`)
- No consent management — GA loads immediately
- GA silently skipped in dev/Storybook when Measurement ID is absent

---

## Architecture

### 1. Dependency

```
pnpm add react-ga4
```

`react-ga4` ships with TypeScript types — no `@types/*` package needed.

### 2. Environment Variable

Add to `.env` (not committed):

```env
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 3. Initialization — `src/main.tsx`

Initialize GA once at app startup, before `ReactDOM.createRoot(...)`. Guard with presence check so local dev without the env var works silently.

```ts
import ReactGA from 'react-ga4';

const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID;
if (gaId) {
  ReactGA.initialize(gaId);
}
```

### 4. Page View Tracking — `src/routes/routes.tsx`

The existing `ScrollToTop` component already runs a `useEffect` on every `pathname` change. Add one line to send a pageview hit:

```ts
import ReactGA from 'react-ga4';

export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    ReactGA.send({ hitType: 'pageview', page: pathname });
  }, [pathname]);

  return null;
};
```

### 5. Custom Event Utility — `src/utils/analytics.ts`

A thin typed wrapper around `ReactGA.event()` for consistent event calls across the app.

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

**Usage:**

```ts
import { trackEvent } from '../utils/analytics';

trackEvent('click', 'Dashboard', 'Export Report');
trackEvent('submit', 'Auth', 'Sign In');
```

---

## Files Changed

| File                              | Change                                                    |
| --------------------------------- | --------------------------------------------------------- |
| `package.json` / `pnpm-lock.yaml` | Add `react-ga4` dependency                                |
| `.env`                            | Add `VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX` (not committed) |
| `src/main.tsx`                    | Initialize ReactGA with guard                             |
| `src/routes/routes.tsx`           | Add pageview send inside `ScrollToTop`                    |
| `src/utils/analytics.ts`          | New file — `trackEvent` utility                           |

---

## Dev Safety

- **Local dev without `.env` entry** → GA silently skipped, no errors
- **Storybook** → GA never loads (no env var), stories unaffected
- **Staging/Production with ID set** → GA loads and tracks normally
- **TypeScript** → `trackEvent` signature enforced at compile time
