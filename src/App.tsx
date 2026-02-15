import { RouterProvider } from 'react-router-dom';
import { ConfigProvider, theme as antdTheme } from 'antd';

import { HelmetProvider } from 'react-helmet-async';
import { StylesContext } from './context';
import routes from './routes/routes.tsx';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { PRIMARY_COLOR } from './theme/colors';
import './App.css';

function App() {
  const { mytheme } = useSelector((state: RootState) => state.theme);

  return (
    <HelmetProvider>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: PRIMARY_COLOR,
            borderRadius: 6,
            fontFamily: 'Lato, sans-serif',
          },
          components: {
            Calendar: {
              colorBgContainer: 'none',
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
            mytheme === 'dark'
              ? antdTheme.darkAlgorithm
              : antdTheme.defaultAlgorithm,
        }}
      >
        <StylesContext.Provider
          value={{
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
          }}
        >
          <RouterProvider router={routes} />
        </StylesContext.Provider>
      </ConfigProvider>
    </HelmetProvider>
  );
}

export default App;
