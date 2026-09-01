import { theme as antdTheme } from 'antd';
import { DARK_PRIMARY_COLOR, PRIMARY_COLOR } from './colors';
import { DesignStyleName, getDesignTokens } from './design-styles';

export const getAntdThemeConfig = (
  activeStyle: DesignStyleName,
  themeMode: 'light' | 'dark'
) => {
  const tokens = getDesignTokens(activeStyle, themeMode);
  // Neumorphic needs matching container backgrounds
  const cardBgOverride =
    activeStyle === 'neumorphic' ? tokens.surfaceBg : undefined;
  // Link buttons (`Button type="link"`) default to antd's info color (~#1677ff,
  // ~4.0:1 on light/dark surfaces — fails WCAG AA) when `colorLink` is unset.
  // Drive them from the brand primary so they match the rest of the UI and pass.
  const brandColor = themeMode === 'dark' ? DARK_PRIMARY_COLOR : PRIMARY_COLOR;

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
      Carousel: {
        dotWidth: 8,
      },
      Table: {
        headerBg: 'none',
      },
      Timeline: {
        dotBg: 'none',
      },
      Typography: {
        linkHoverDecoration: 'underline',
      },
    },
    algorithm:
      themeMode === 'dark'
        ? antdTheme.darkAlgorithm
        : antdTheme.defaultAlgorithm,
  };
};
