---
"antd-multi-dashboard": minor
---

- feat(theme): add MUI, Shadcn, and Serene native antd theme styles
- refactor(theme): render clean/bold/mui/shadcn/serene via antd ConfigProvider ThemeConfig (no CSS-in-JS); exempt glassmorphic/neumorphic which keep SurfaceTokens CSS rendering
- feat(theme): scope sidebar menu colors per style via nested ConfigProvider (SIDEBAR_MENU)
