import { ThemeConfig } from 'antd';
import { theme as antdTheme } from 'antd';
import { DesignStyleName } from './design-styles';
import { DARK_PRIMARY_COLOR, PRIMARY_COLOR } from './colors';

/**
 * Per-style primary colors (light/dark). Each design style gets its own
 * befitting accent so switching styles changes the whole tone, not just the
 * surfaces. The user theme customizer may override these (null in the slice
 * means "use the active style's default").
 */
export type StylePrimaries = { light: string; dark: string };

export const STYLE_PRIMARIES: Record<DesignStyleName, StylePrimaries> = {
  clean: { light: PRIMARY_COLOR, dark: DARK_PRIMARY_COLOR },
  glassmorphic: { light: '#0ea5e9', dark: '#38bdf8' },
  neumorphic: { light: '#6e79d9', dark: '#8f97ee' },
  bold: { light: '#2059ff', dark: '#6f9bff' },
  mui: { light: '#1976d2', dark: '#90caf9' },
  shadcn: { light: '#262626', dark: '#e4e4e7' },
  serene: { light: '#b45309', dark: '#e0a458' },
};

export const getStylePrimary = (
  styleName: DesignStyleName,
  themeMode: 'light' | 'dark'
): string => STYLE_PRIMARIES[styleName][themeMode];

/**
 * Antd-native theme configs, one per design style (per light/dark mode).
 *
 * `clean` and `bold` are our own home-grown styles.
 * `mui`, `shadcn` and `serene` mirror the official antd ecosystem samples
 * (see theme.samples.txt) — adapted so the primary color and contrast rules
 * stay consistent with the rest of the app.
 *
 * `glassmorphic` and `neumorphic` are EXEMPT from this system: their look
 * relies on CSS effects (backdrop blur, soft inset shadows) that antd tokens
 * cannot express, so they keep their SurfaceTokens-driven rendering (see
 * design-styles.ts) and only inherit the base brand tokens here.
 *
 * Note: `Menu` component tokens here are shape/behavioral only (no sidebar
 * colors) — the sidebar's colors are scoped per style in `SIDEBAR_MENU` so the
 * dark bold sidebar doesn't leak white-text menus app-wide.
 */
export type AntdThemeMap = Record<
  DesignStyleName,
  { light: ThemeConfig; dark: ThemeConfig }
>;

// Shape-only Menu tokens shared by every native theme. Sidebar colors live in
// SIDEBAR_MENU (below) and are applied only to the app sidebar.
const SHAPE_MENU = {
  activeBarBorderWidth: 0,
  activeBarWidth: 0,
  itemBg: 'transparent',
  subMenuItemBg: 'transparent',
  itemBorderRadius: 6,
} as const;

const cleanLight: ThemeConfig = {
  algorithm: antdTheme.defaultAlgorithm,
  token: {
    colorPrimary: PRIMARY_COLOR,
    colorLink: PRIMARY_COLOR,
    colorLinkHover: PRIMARY_COLOR,
    colorLinkActive: PRIMARY_COLOR,
    borderRadius: 6,
  },
  components: {
    Menu: SHAPE_MENU,
  },
};

const cleanDark: ThemeConfig = {
  algorithm: antdTheme.darkAlgorithm,
  token: {
    colorPrimary: DARK_PRIMARY_COLOR,
    colorLink: DARK_PRIMARY_COLOR,
    colorLinkHover: DARK_PRIMARY_COLOR,
    colorLinkActive: DARK_PRIMARY_COLOR,
    borderRadius: 6,
  },
  components: {
    Menu: SHAPE_MENU,
  },
};

// Bold: sharp surfaces, vivid primary, hard offsets. Mirrors the app's existing
// bold SurfaceTokens (blue offset shadows) rather than the neon "neobrutalism"
// sample, to keep the brand color.
const boldLight: ThemeConfig = {
  algorithm: antdTheme.defaultAlgorithm,
  token: {
    colorPrimary: STYLE_PRIMARIES.bold.light,
    colorLink: STYLE_PRIMARIES.bold.light,
    colorLinkHover: STYLE_PRIMARIES.bold.light,
    colorLinkActive: STYLE_PRIMARIES.bold.light,
    borderRadius: 6,
    colorBgLayout: '#0a1628',
  },
  components: {
    Layout: {
      bodyBg: '#f4f7fb',
      siderBg: '#0a1628',
      headerBg: '#ffffff',
      headerColor: 'rgba(0, 0, 0, 0.88)',
      triggerBg: '#0d1b2f',
      triggerColor: '#ffffff',
    },
    Menu: {
      ...SHAPE_MENU,
      itemBorderRadius: 0,
    },
    Card: {
      colorBgContainer: '#ffffff',
    },
    Button: {
      primaryShadow: `0 4px 0 ${STYLE_PRIMARIES.bold.light}40`,
      defaultShadow: 'none',
      dangerShadow: 'none',
    },
  },
};

const boldDark: ThemeConfig = {
  algorithm: antdTheme.darkAlgorithm,
  token: {
    colorPrimary: STYLE_PRIMARIES.bold.dark,
    colorLink: STYLE_PRIMARIES.bold.dark,
    colorLinkHover: STYLE_PRIMARIES.bold.dark,
    colorLinkActive: STYLE_PRIMARIES.bold.dark,
    borderRadius: 6,
    colorBgLayout: '#080818',
  },
  components: {
    Layout: {
      bodyBg: '#10101f',
      siderBg: '#080818',
      headerBg: '#141428',
      headerColor: 'rgba(255, 255, 255, 0.88)',
      triggerBg: '#0c0c1c',
      triggerColor: '#ffffff',
    },
    Menu: {
      ...SHAPE_MENU,
      itemBorderRadius: 0,
    },
    Card: {
      colorBgContainer: '#141428',
    },
    Button: {
      primaryShadow: `0 4px 0 ${STYLE_PRIMARIES.bold.dark}40`,
      defaultShadow: 'none',
      dangerShadow: 'none',
    },
  },
};

// MUI-styled theme (Material Design blue, cross-platform surfaces).
const muiLight: ThemeConfig = {
  algorithm: antdTheme.defaultAlgorithm,
  token: {
    colorPrimary: '#1976d2',
    colorLink: '#1976d2',
    colorLinkHover: '#42a5f5',
    colorLinkActive: '#1565c0',
    colorSuccess: '#2e7d32',
    colorWarning: '#ed6c02',
    colorError: '#d32f2f',
    colorInfo: '#0288d1',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    borderRadius: 4,
    controlHeight: 36,
  },
  components: {
    Layout: {
      bodyBg: '#fff',
      siderBg: '#fff',
      headerBg: '#fff',
      headerColor: 'rgba(0, 0, 0, 0.87)',
      triggerBg: '#f5f5f5',
      triggerColor: 'rgba(0, 0, 0, 0.87)',
    },
    Menu: SHAPE_MENU,
    Card: {
      borderRadiusLG: 4,
    },
  },
};

const muiDark: ThemeConfig = {
  algorithm: antdTheme.darkAlgorithm,
  token: {
    colorPrimary: '#90caf9',
    colorLink: '#90caf9',
    colorLinkHover: '#64b5f6',
    colorLinkActive: '#42a5f5',
    colorSuccess: '#81c784',
    colorWarning: '#ffb74d',
    colorError: '#ef5350',
    colorInfo: '#4fc3f7',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    borderRadius: 4,
    controlHeight: 36,
  },
  components: {
    Layout: {
      bodyBg: '#121212',
      siderBg: '#121212',
      headerBg: '#1e1e1e',
      headerColor: 'rgba(255, 255, 255, 0.87)',
      triggerBg: '#2c2c2c',
      triggerColor: 'rgba(255, 255, 255, 0.87)',
    },
    Menu: SHAPE_MENU,
    Card: {
      borderRadiusLG: 4,
    },
  },
};

// Shadcn-styled theme (neutral grayscale, minimal shadows).
const shadcnLight: ThemeConfig = {
  algorithm: antdTheme.defaultAlgorithm,
  token: {
    colorPrimary: STYLE_PRIMARIES.shadcn.light,
    colorLink: STYLE_PRIMARIES.shadcn.light,
    colorLinkHover: '#404040',
    colorLinkActive: '#171717',
    colorSuccess: '#22c55e',
    colorWarning: '#f97316',
    colorError: '#ef4444',
    colorInfo: STYLE_PRIMARIES.shadcn.light,
    colorTextBase: '#262626',
    colorBgBase: '#ffffff',
    colorBgLayout: '#fafafa',
    colorBorder: '#e5e5e5',
    colorBorderSecondary: '#f5f5f5',
    borderRadius: 10,
  },
  components: {
    Layout: {
      bodyBg: '#fafafa',
      siderBg: '#ffffff',
      headerBg: '#ffffff',
      headerColor: '#18181b',
      triggerBg: '#f4f4f5',
      triggerColor: '#18181b',
    },
    Menu: SHAPE_MENU,
    Button: {
      primaryShadow: 'none',
      defaultShadow: 'none',
      dangerShadow: 'none',
      borderRadius: 6,
    },
    Input: {
      activeShadow: 'none',
      borderRadius: 6,
    },
    Card: {
      borderRadiusLG: 14,
    },
  },
};

const shadcnDark: ThemeConfig = {
  algorithm: antdTheme.darkAlgorithm,
  token: {
    colorPrimary: STYLE_PRIMARIES.shadcn.dark,
    colorLink: STYLE_PRIMARIES.shadcn.dark,
    colorLinkHover: '#fafafa',
    colorLinkActive: '#a1a1aa',
    colorSuccess: '#22c55e',
    colorWarning: '#f97316',
    colorError: '#ef4444',
    colorInfo: STYLE_PRIMARIES.shadcn.dark,
    colorBgLayout: '#09090b',
    colorBorder: '#27272a',
    colorBorderSecondary: '#27272a',
    borderRadius: 10,
  },
  components: {
    Layout: {
      bodyBg: '#09090b',
      siderBg: '#09090b',
      headerBg: '#111113',
      headerColor: '#fafafa',
      triggerBg: '#1c1c1f',
      triggerColor: '#fafafa',
    },
    Menu: SHAPE_MENU,
    Button: {
      primaryShadow: 'none',
      defaultShadow: 'none',
      dangerShadow: 'none',
      borderRadius: 6,
    },
    Input: {
      activeShadow: 'none',
      borderRadius: 6,
    },
    Card: {
      borderRadiusLG: 14,
    },
  },
};

// Serene-styled theme (warm earth tones).
const sereneLight: ThemeConfig = {
  algorithm: antdTheme.defaultAlgorithm,
  token: {
    colorPrimary: STYLE_PRIMARIES.serene.light,
    colorLink: STYLE_PRIMARIES.serene.light,
    colorLinkHover: '#c2610f',
    colorLinkActive: '#8a3f06',
    colorSuccess: '#49795d',
    colorWarning: '#cc9433',
    colorError: '#be4237',
    colorInfo: '#507395',
    colorTextBase: '#2a231d',
    colorBgBase: '#f8f6f2',
    colorBgLayout: '#f8f6f2',
    colorBgContainer: '#fcfaf8',
    colorBorder: '#e2dcd5',
    borderRadius: 4,
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  components: {
    Layout: {
      bodyBg: '#f8f6f2',
      siderBg: '#2c241c',
      headerBg: '#fcfaf8',
      headerColor: '#2a231d',
      triggerBg: '#3c332a',
      triggerColor: '#e8e2d9',
    },
    Menu: {
      ...SHAPE_MENU,
      itemBorderRadius: 0,
    },
    Card: {
      borderRadiusLG: 4,
    },
    Table: {
      headerBg: '#f3efe8',
      headerColor: '#766a60',
      borderColor: '#e2dcd5',
    },
  },
};

const sereneDark: ThemeConfig = {
  algorithm: antdTheme.darkAlgorithm,
  token: {
    colorPrimary: STYLE_PRIMARIES.serene.dark,
    colorLink: STYLE_PRIMARIES.serene.dark,
    colorLinkHover: '#edb978',
    colorLinkActive: '#c27a31',
    colorSuccess: '#8fb9a0',
    colorWarning: '#d9bc7a',
    colorError: '#d98f84',
    colorInfo: '#8fa8be',
    colorBgLayout: '#171310',
    colorBgContainer: '#241e18',
    colorBorder: '#3a3128',
    borderRadius: 4,
    fontFamily:
      "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  },
  components: {
    Layout: {
      bodyBg: '#171310',
      siderBg: '#241e18',
      headerBg: '#241e18',
      headerColor: '#e8e2d9',
      triggerBg: '#332b23',
      triggerColor: '#e8e2d9',
    },
    Menu: {
      ...SHAPE_MENU,
      itemBorderRadius: 0,
    },
    Card: {
      borderRadiusLG: 4,
    },
    Table: {
      headerBg: '#332b23',
      headerColor: '#c7bbb0',
      borderColor: '#3a3128',
    },
  },
};

/**
 * Sidebar-scoped Menu color tokens per native style. Applied ONLY to the app
 * sidebar via a nested ConfigProvider (see side-nav.tsx) so the dark bold
 * sidebar's white menu text stays scoped and doesn't leak to app-wide menus.
 */
export type SidebarMenuMode = {
  light: NonNullable<ThemeConfig['components']>['Menu'];
  dark: NonNullable<ThemeConfig['components']>['Menu'];
};

export const SIDEBAR_MENU: Partial<Record<DesignStyleName, SidebarMenuMode>> = {
  clean: {
    light: {
      ...SHAPE_MENU,
      itemColor: 'rgba(0, 0, 0, 0.88)',
      itemSelectedBg: 'rgba(7, 110, 229, 0.1)',
      itemSelectedColor: PRIMARY_COLOR,
      groupTitleColor: 'rgba(0, 0, 0, 0.45)',
    },
    dark: {
      ...SHAPE_MENU,
      itemColor: 'rgba(255, 255, 255, 0.85)',
      itemSelectedBg: 'rgba(77, 139, 255, 0.16)',
      itemSelectedColor: '#7fb0ff',
      groupTitleColor: 'rgba(255, 255, 255, 0.45)',
    },
  },
  bold: {
    light: {
      ...SHAPE_MENU,
      itemBorderRadius: 0,
      itemColor: 'rgba(255, 255, 255, 0.85)',
      itemHoverBg: 'rgba(255, 255, 255, 0.08)',
      itemSelectedBg: `${STYLE_PRIMARIES.bold.light}40`,
      itemSelectedColor: '#8ab2ff',
      groupTitleColor: 'rgba(255, 255, 255, 0.45)',
    },
    dark: {
      ...SHAPE_MENU,
      itemBorderRadius: 0,
      itemColor: 'rgba(255, 255, 255, 0.85)',
      itemHoverBg: 'rgba(255, 255, 255, 0.08)',
      itemSelectedBg: `${STYLE_PRIMARIES.bold.dark}33`,
      itemSelectedColor: '#8ab2ff',
      groupTitleColor: 'rgba(255, 255, 255, 0.45)',
    },
  },
  mui: {
    light: {
      ...SHAPE_MENU,
      itemColor: 'rgba(0, 0, 0, 0.87)',
      itemHoverBg: 'rgba(0, 0, 0, 0.04)',
      itemSelectedBg: 'rgba(25, 118, 210, 0.08)',
      itemSelectedColor: '#1976d2',
      groupTitleColor: 'rgba(0, 0, 0, 0.6)',
    },
    dark: {
      ...SHAPE_MENU,
      itemColor: 'rgba(255, 255, 255, 0.85)',
      itemHoverBg: 'rgba(255, 255, 255, 0.08)',
      itemSelectedBg: 'rgba(144, 202, 249, 0.16)',
      itemSelectedColor: '#90caf9',
      groupTitleColor: 'rgba(255, 255, 255, 0.45)',
    },
  },
  shadcn: {
    light: {
      ...SHAPE_MENU,
      itemColor: '#18181b',
      itemHoverBg: '#f4f4f5',
      itemSelectedBg: '#f4f4f5',
      itemSelectedColor: '#18181b',
      groupTitleColor: '#a1a1aa',
    },
    dark: {
      ...SHAPE_MENU,
      itemColor: 'rgba(255, 255, 255, 0.85)',
      itemHoverBg: 'rgba(255, 255, 255, 0.08)',
      itemSelectedBg: '#27272a',
      itemSelectedColor: '#fafafa',
      groupTitleColor: 'rgba(255, 255, 255, 0.45)',
    },
  },
  serene: {
    light: {
      ...SHAPE_MENU,
      itemBorderRadius: 0,
      itemColor: 'rgba(232, 226, 217, 0.7)',
      itemHoverColor: '#e8e2d9',
      itemHoverBg: 'rgba(60, 51, 42, 0.4)',
      itemSelectedBg: '#3c332a',
      itemSelectedColor: '#ebe4d8',
      groupTitleColor: 'rgba(232, 226, 217, 0.45)',
    },
    dark: {
      ...SHAPE_MENU,
      itemBorderRadius: 0,
      itemColor: 'rgba(232, 226, 217, 0.7)',
      itemHoverColor: '#e8e2d9',
      itemHoverBg: 'rgba(60, 51, 42, 0.4)',
      itemSelectedBg: '#3c332a',
      itemSelectedColor: '#ebe4d8',
      groupTitleColor: 'rgba(232, 226, 217, 0.45)',
    },
  },
};

/**
 * Maps each native design style to its light/dark antd ThemeConfig.
 * Exempt styles (glassmorphic, neumorphic) are intentionally absent — they
 * render via SurfaceTokens (design-styles.ts), not ConfigProvider.
 */
export const ANTD_THEMES: Partial<AntdThemeMap> = {
  clean: { light: cleanLight, dark: cleanDark },
  bold: { light: boldLight, dark: boldDark },
  mui: { light: muiLight, dark: muiDark },
  shadcn: { light: shadcnLight, dark: shadcnDark },
  serene: { light: sereneLight, dark: sereneDark },
};
