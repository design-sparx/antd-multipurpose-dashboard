# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **Note**: For the full project documentation, architecture details, and development guidelines, see [AGENTS.md](./AGENTS.md).

## Quick Reference

### Commands

```bash
pnpm dev              # Start dev server
pnpm build            # Production build
pnpm test             # Run tests (watch mode)
pnpm test:run         # Run tests once (CI)
pnpm lint             # ESLint
pnpm prettier:write   # Format code
```

### Key Architecture Points

- **Auth**: `AuthContext` is the single source of truth (no Redux auth)
- **Data**: Mock-only via `public/mocks/*.json` + TanStack Query hooks in `src/lib/queries/`
- **State**: Redux (theme, designStyle) + React Context (auth, styles)
- **Routing**: React Router v6 with layout wrappers

### Testing

- Vitest + React Testing Library
- Test files: `*.test.ts` or `*.test.tsx`
- Setup: `src/test/setup.ts`
- Config: `vitest.config.ts`

See [AGENTS.md](./AGENTS.md) for complete documentation.
