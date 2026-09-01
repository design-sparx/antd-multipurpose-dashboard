---
"antd-multi-dashboard": minor
---

- feat(releases): add releases page and recent-releases component-
- docs(agents): document theme-aware colors and app-shell provider refactor
- fix(theme): make Logo use theme-aware brand primary instead of hardcoded blue
- fix(theme): drive Button type=link color from brand primary for WCAG contrast
- fix(theme): use brighter primary (#4d8bff) in dark mode for WCAG AA contrast
- refactor(app): consolidate theme/design-style selectors; add PersistGate loading fallback
- refactor(app): extract antd theme config and useDataTheme hook
- refactor(app): hoist static StylesContext value, memoize antd theme config, tighten theme type
- docs(agents): document Logo API, GuestFooter, FloatButton.Group pitfall
