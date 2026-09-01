import { theme as antdTheme } from 'antd';
import { PRIMARY_COLOR } from './colors';
import { DesignStyleName, getDesignTokens } from './design-styles';

export const getAntdThemeConfig = (
  activeStyle: DesignStyleName,
  themeMode: 'light' | 'dark'
) => {
  const tokens = getDesignTokens(activeStyle, themeMode);
  // Neumorphic needs matching container backgrounds
  const cardBgOverride =
    activeStyle === 'neumorphic' ? tokens.surfaceBg : undefined;

  return {
    token: {
      colorPrimary: PRIMARY_COLOR,
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
