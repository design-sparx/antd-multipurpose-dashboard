import { theme as antdTheme, ThemeConfig } from 'antd';
import {
  DesignStyleName,
  getDesignTokens,
  isSurfaceStyle,
} from './design-styles';
import { ANTD_THEMES, getStylePrimary } from './antd-themes';

/**
 * User theme overrides (persisted). `null` values or missing keys mean "use
 * the design-style's default". Passed in from the Redux themeCustomization
 * slice by the App component.
 */
export interface ThemeOverrides {
  primaryLight?: string | null;
  primaryDark?: string | null;
  borderRadius?: number;
  compact?: boolean;
}

/**
 * App-wide component overrides that apply regardless of the active style.
 * These are merged UNDER the selected style's component config.
 */
const SHARED_COMPONENTS = {
  Carousel: {
    dotWidth: 8,
  },
  Typography: {
    linkHoverDecoration: 'underline',
  },
} as const;

export const getAntdThemeConfig = (
  activeStyle: DesignStyleName,
  themeMode: 'light' | 'dark',
  overrides?: ThemeOverrides
): ThemeConfig => {
  const surfaceTokens = getDesignTokens(activeStyle, themeMode);
  // Neumorphic needs matching container backgrounds
  const cardBgOverride =
    activeStyle === 'neumorphic' ? surfaceTokens?.surfaceBg : undefined;
  // Link buttons (`Button type="link"`) default to antd's info color (~#1677ff,
  // ~4.0:1 on light/dark surfaces — fails WCAG AA) when `colorLink` is unset.
  // Drive them from the active style's primary so they match the rest of the UI
  // and pass, unless the user pinned a custom primary.
  const stylePrimary = getStylePrimary(activeStyle, themeMode);
  const brandColor =
    themeMode === 'dark'
      ? overrides?.primaryDark ?? stylePrimary
      : overrides?.primaryLight ?? stylePrimary;
  const radius = overrides?.borderRadius ?? 6;
  const densityPad = overrides?.compact ? 28 : 36;

  const nativeTheme = ANTD_THEMES[activeStyle];

  if (isSurfaceStyle(activeStyle) || !nativeTheme) {
    // Exempt (or unknown) styles: base brand theme only. The distinctive look
    // comes from SurfaceTokens applied by the shared Card / layouts.
    return {
      token: {
        colorPrimary: brandColor,
        colorLink: brandColor,
        colorLinkHover: brandColor,
        colorLinkActive: brandColor,
        borderRadius: radius,
        controlHeight: densityPad,
        fontFamily: 'Lato, sans-serif',
      },
      components: {
        Calendar: {
          colorBgContainer: cardBgOverride || 'none',
        },
        ...SHARED_COMPONENTS,
        Table: {
          headerBg: 'none',
        },
        Timeline: {
          dotBg: 'none',
        },
      },
      algorithm:
        themeMode === 'dark'
          ? antdTheme.darkAlgorithm
          : antdTheme.defaultAlgorithm,
    };
  }

  // Native style: full antd ThemeConfig (token + components + algorithm) from
  // ANTD_THEMES, with the base brand tokens layered underneath so any unset
  // links still use the contrast-aware brand color. The style's own seed colors
  // (token) are set first; user overrides win on top only where provided.
  const themeConfig = nativeTheme[themeMode];

  const userTokenOverrides: ThemeConfig['token'] = {
    ...(overrides?.primaryLight != null || overrides?.primaryDark != null
      ? {
          colorPrimary: brandColor,
          colorLink: brandColor,
          colorLinkHover: brandColor,
          colorLinkActive: brandColor,
        }
      : {}),
    ...(overrides?.borderRadius != null ? { borderRadius: radius } : {}),
    ...(overrides?.compact != null ? { controlHeight: densityPad } : {}),
  };

  return {
    token: {
      ...themeConfig.token,
      ...userTokenOverrides,
    },
    components: {
      ...SHARED_COMPONENTS,
      ...themeConfig.components,
    },
    algorithm: themeConfig.algorithm,
  };
};
