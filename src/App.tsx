import { RouterProvider } from 'react-router-dom';
import { App as AntdApp, ConfigProvider } from 'antd';
import { useMemo } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { shallowEqual, useSelector } from 'react-redux';

import { StylesContext } from './contexts';
import { useDataTheme } from './hooks';
import routes from './routes/routes.tsx';
import { RootState } from './redux/store';
import { getAntdThemeConfig } from './theme/antd-theme';
import type { StylesContentProps } from './contexts/styles';
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

function App() {
  const { mytheme, activeStyle } = useSelector(
    (state: RootState) => ({
      mytheme: state.theme.mytheme,
      activeStyle: state.designStyle.activeStyle,
    }),
    shallowEqual
  );
  const themeMode = mytheme === 'dark' ? 'dark' : 'light';

  const antdThemeConfig = useMemo(
    () => getAntdThemeConfig(activeStyle, themeMode),
    [activeStyle, themeMode]
  );

  useDataTheme(themeMode);

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
