import { theme as antdTheme, ThemeConfig } from 'antd';
import { DARK_PRIMARY_COLOR, PRIMARY_COLOR } from './colors';
import {
  DesignStyleName,
  getDesignTokens,
  isSurfaceStyle,
} from './design-styles';
import { ANTD_THEMES } from './antd-themes';

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
  themeMode: 'light' | 'dark'
): ThemeConfig => {
  const surfaceTokens = getDesignTokens(activeStyle, themeMode);
  // Neumorphic needs matching container backgrounds
  const cardBgOverride =
    activeStyle === 'neumorphic' ? surfaceTokens?.surfaceBg : undefined;
  // Link buttons (`Button type="link"`) default to antd's info color (~#1677ff,
  // ~4.0:1 on light/dark surfaces — fails WCAG AA) when `colorLink` is unset.
  // Drive them from the brand primary so they match the rest of the UI and pass.
  const brandColor = themeMode === 'dark' ? DARK_PRIMARY_COLOR : PRIMARY_COLOR;

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
        borderRadius: 6,
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
  // links still use the contrast-aware brand color.
  const themeConfig = nativeTheme[themeMode];

  return {
    token: {
      colorPrimary: brandColor,
      colorLink: brandColor,
      colorLinkHover: brandColor,
      colorLinkActive: brandColor,
      borderRadius: 6,
      fontFamily: 'Lato, sans-serif',
      ...themeConfig.token,
    },
    components: {
      ...SHARED_COMPONENTS,
      ...themeConfig.components,
    },
    algorithm: themeConfig.algorithm,
  };
};
