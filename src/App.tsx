import { RouterProvider } from 'react-router-dom';
import { App as AntdApp, ConfigProvider, theme as antdTheme } from 'antd';
import { useEffect, useMemo } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { useSelector } from 'react-redux';

import { StylesContext } from './contexts';
import type { StylesContentProps } from './contexts/styles';
import routes from './routes/routes.tsx';
import { RootState } from './redux/store';
import { PRIMARY_COLOR } from './theme/colors';
import { DesignStyleName, getDesignTokens } from './theme/design-styles';
import './App.css';

// Static StylesContext value: shared row/carousel props used across layouts.
// Hoisted to module scope so context consumers don't re-render on every App render.
const STYLES_CONTEXT_VALUE: StylesContentProps = {
  rowProps: {
    gutter: [
      { xs: 8, sm: 16, md: 24, lg: 32 },
      { xs: 8, sm: 16, md: 24, lg: 32 },
    ],
  },
  carouselProps: {
    autoplay: true,
    dots: true,
    dotPosition: 'bottom',
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
  },
};

function getAntdThemeConfig(
  activeStyle: DesignStyleName,
  themeMode: 'light' | 'dark'
) {
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
}

function App() {
  const { mytheme } = useSelector((state: RootState) => state.theme);
  const { activeStyle } = useSelector((state: RootState) => state.designStyle);
  const themeMode = mytheme === 'dark' ? 'dark' : 'light';

  const antdThemeConfig = useMemo(
    () => getAntdThemeConfig(activeStyle, themeMode),
    [activeStyle, themeMode]
  );

  // Sync data-theme attribute for CSS dark mode targeting
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', themeMode);
  }, [themeMode]);

  return (
    <HelmetProvider>
      <ConfigProvider theme={antdThemeConfig}>
        <StylesContext.Provider value={STYLES_CONTEXT_VALUE}>
          <AntdApp>
            <RouterProvider router={routes} />
          </AntdApp>
        </StylesContext.Provider>
      </ConfigProvider>
    </HelmetProvider>
  );
}

export default App;
