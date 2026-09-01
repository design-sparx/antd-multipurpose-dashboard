import {
  Button,
  Drawer,
  Flex,
  FloatButton,
  Layout,
  theme,
  Tooltip,
} from 'antd';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  AppstoreAddOutlined,
  BgColorsOutlined,
  GithubOutlined,
  HistoryOutlined,
  LoginOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProductOutlined,
} from '@ant-design/icons';
import {
  BulbFilled,
  BulbOutlined,
  MoonOutlined,
  SunOutlined,
} from '@ant-design/icons';
import { useMediaQuery } from 'react-responsive';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  GuestFooter,
  Logo,
  NProgress,
  StyleSwitcher,
} from '../../components';
import { RootState } from '../../redux/store';
import { toggleTheme } from '../../redux/theme/themeSlice';
import {
  PATH_AUTH,
  PATH_CHANGELOG,
  PATH_DASHBOARD,
  PATH_DOCS,
  PATH_GITHUB,
  PATH_LANDING,
} from '../../constants';

const { Header, Content } = Layout;

export const GuestLayout = () => {
  const {
    token: { borderRadius, colorBgContainer },
  } = theme.useToken();
  const isMobile = useMediaQuery({ maxWidth: 769 });
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const [navFill, setNavFill] = useState(false);
  const [open, setOpen] = useState(false);
  const [styleDrawerOpen, setStyleDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  const isDark = useSelector(
    (state: RootState) => state.theme.mytheme === 'dark'
  );

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        setNavFill(true);
      } else {
        setNavFill(false);
      }
    });
  }, []);

  return (
    <>
      <NProgress isAnimating={isLoading} key={location.key} />
      <Layout
        className="layout"
        style={{
          minHeight: '100vh',
          // backgroundColor: 'white',
        }}
      >
        <Header
          style={{
            background: navFill ? `${colorBgContainer}CC` : 'none',
            backdropFilter: navFill ? 'blur(8px)' : 'none',
            boxShadow: navFill ? '0 0 8px 2px rgba(0, 0, 0, 0.05)' : 'none',
            position: 'sticky',
            top: 0,
            padding: isMobile ? '0 1rem' : '0 2rem',
            zIndex: 1,
          }}
        >
          <Container
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
            }}
          >
            <Logo asLink href={PATH_LANDING.root} />
            {!isMobile ? (
              <>
                <Flex gap="small">
                  <Link to={PATH_DOCS.productRoadmap} target="_blank">
                    <Button icon={<ProductOutlined />} type="link">
                      Product Roadmap
                    </Button>
                  </Link>
                  <Link to={PATH_DOCS.components} target="_blank">
                    <Button icon={<AppstoreAddOutlined />} type="link">
                      Components
                    </Button>
                  </Link>
                  <Link to={PATH_CHANGELOG.root}>
                    <Button icon={<HistoryOutlined />} type="link">
                      Changelog
                    </Button>
                  </Link>
                  <Link to={PATH_GITHUB.repo} target="_blank">
                    <Button icon={<GithubOutlined />} type="link">
                      Give us a star
                    </Button>
                  </Link>
                  <Link to={PATH_AUTH.signin}>
                    <Button icon={<LoginOutlined />} type="primary">
                      Live Preview
                    </Button>
                  </Link>
                </Flex>
              </>
            ) : (
              <Tooltip title={`${open ? 'Expand' : 'Collapse'} Sidebar`}>
                <Button
                  type="text"
                  icon={open ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                  onClick={showDrawer}
                  style={{
                    fontSize: '16px',
                    width: 48,
                    height: 48,
                  }}
                />
              </Tooltip>
            )}
          </Container>
        </Header>
        <Content
          style={{
            // background: 'rgba(255, 255, 255, 1)',
            borderRadius,
            transition: 'all .25s',
            paddingBottom: '10rem',
          }}
        >
          <AnimatePresence
            mode="wait"
            onExitComplete={() => setIsLoading(false)}
          >
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
                mass: 0.8,
              }}
              onAnimationStart={() => setIsLoading(true)}
              onAnimationComplete={() => setIsLoading(false)}
              className="site-layout-content"
              style={{ background: 'none' }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
          <FloatButton.Group
            trigger="click"
            icon={isDark ? <BulbFilled /> : <BulbOutlined />}
            tooltip="Theme & navigation"
            style={{ insetInlineEnd: 24 }}
          >
            <FloatButton
              icon={isDark ? <SunOutlined /> : <MoonOutlined />}
              tooltip={isDark ? 'Light mode' : 'Dark mode'}
              onClick={() => dispatch(toggleTheme())}
            />
            <FloatButton
              icon={<BgColorsOutlined />}
              tooltip="Customize Style"
              onClick={() => setStyleDrawerOpen(true)}
            />
            <FloatButton.BackTop tooltip="Back to top" />
          </FloatButton.Group>
        </Content>
        <GuestFooter />
      </Layout>
      <Drawer
        title="Menu"
        placement="left"
        onClose={onClose}
        open={open}
        size={300}
        styles={{
          body: { padding: 0 },
          header: { padding: '12px 16px' },
        }}
      >
        <>
          <Flex gap="small" vertical>
            <Link to={PATH_DOCS.productRoadmap} target="_blank">
              <Button icon={<ProductOutlined />} type="link">
                Roadmap
              </Button>
            </Link>
            <Link to={PATH_CHANGELOG.root}>
              <Button icon={<HistoryOutlined />} type="text">
                Changelog
              </Button>
            </Link>
            <Link to={PATH_DASHBOARD.default}>
              <Button icon={<LoginOutlined />} type="text">
                Live Preview
              </Button>
            </Link>
            <Link to={PATH_DOCS.components} target="_blank">
              <Button icon={<AppstoreAddOutlined />} type="text">
                Components
              </Button>
            </Link>
            <Link to={PATH_GITHUB.repo} target="_blank">
              <Button icon={<GithubOutlined />} type="text">
                Github
              </Button>
            </Link>
          </Flex>
        </>
      </Drawer>
      <StyleSwitcher
        open={styleDrawerOpen}
        onClose={() => setStyleDrawerOpen(false)}
      />
    </>
  );
};
