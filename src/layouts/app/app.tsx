import {
  Badge,
  Breadcrumb,
  Button,
  Dropdown,
  Flex,
  FloatButton,
  Layout,
  MenuProps,
  message,
  Skeleton,
  theme,
  Tooltip,
  Typography,
} from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactNode, useEffect, useRef, useState } from 'react';
import {
  AppstoreOutlined,
  BgColorsOutlined,
  CustomerServiceOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  SearchOutlined,
  QuestionCircleOutlined,
  QuestionOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { AnimatePresence, motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import SideNav, { SIDER_WIDTH, SIDER_COLLAPSED_WIDTH } from './side-nav.tsx';
import HeaderNav from './header-nav.tsx';
import FooterNav from './footer-nav.tsx';
import {
  CommandPalette,
  MobileTabBar,
  NProgress,
  LoginModal,
  OnboardingTour,
  Accessibility,
  LanguageSwitcher,
  StyleSwitcher,
} from '../../components';
import { PATH_LANDING, PATH_USER_PROFILE } from '../../constants';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/auth/authSlice';
import { enableMockData } from '../../redux/data-mode/dataModeSlice';
import { RootState } from '../../redux/store.ts';
import { useDesignStyle } from '../../hooks/useDesignStyle';
const { Content } = Layout;

type AppLayoutProps = {
  children: ReactNode;
};

export const AppLayout = ({ children }: AppLayoutProps) => {
  const {
    token: { borderRadius },
  } = theme.useToken();
  const isMobile = useMediaQuery({ maxWidth: 769 });
  const [collapsed, setCollapsed] = useState(true);
  const [navFill, setNavFill] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const contentRef = useRef<HTMLElement>(null);
  const [styleDrawerOpen, setStyleDrawerOpen] = useState(false);
  const [tourOpen, setTourOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const floatBtnRef = useRef(null);
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const { tokens, styleName } = useDesignStyle();

  const handleLogout = async () => {
    message.open({
      type: 'loading',
      content: 'signing you out',
    });

    // If authenticated, logout from API
    if (isAuthenticated && user?.email) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await dispatch(logoutUser(user.email) as any);
    }

    // Switch back to mock data mode
    dispatch(enableMockData());

    setTimeout(() => {
      navigate(PATH_LANDING.root);
    }, 1000);
  };

  const items: MenuProps['items'] = [
    {
      key: 'user-profile-link',
      label: 'profile',
      icon: <UserOutlined />,
    },
    {
      key: 'user-settings-link',
      label: 'settings',
      icon: <SettingOutlined />,
      onClick: () => navigate(PATH_USER_PROFILE.settings),
    },
    {
      key: 'user-help-link',
      label: 'help center',
      icon: <QuestionOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: 'user-logout-link',
      label: 'logout',
      icon: <LogoutOutlined />,
      danger: true,
      onClick: handleLogout,
    },
  ];

  const commandPaletteItems = [
    {
      key: 'dashboard-default',
      label: 'Default Dashboard',
      path: '/dashboards/default',
      category: 'Dashboards',
    },
    {
      key: 'dashboard-projects',
      label: 'Projects Dashboard',
      path: '/dashboards/projects',
      category: 'Dashboards',
    },
    {
      key: 'dashboard-ecommerce',
      label: 'Ecommerce Dashboard',
      path: '/dashboards/ecommerce',
      category: 'Dashboards',
    },
    {
      key: 'dashboard-marketing',
      label: 'Marketing Dashboard',
      path: '/dashboards/marketing',
      category: 'Dashboards',
    },
    {
      key: 'dashboard-social',
      label: 'Social Dashboard',
      path: '/dashboards/social',
      category: 'Dashboards',
    },
    {
      key: 'dashboard-bidding',
      label: 'Bidding Dashboard',
      path: '/dashboards/bidding',
      category: 'Dashboards',
    },
    {
      key: 'dashboard-learning',
      label: 'Learning Dashboard',
      path: '/dashboards/learning',
      category: 'Dashboards',
    },
    {
      key: 'dashboard-logistics',
      label: 'Logistics Dashboard',
      path: '/dashboards/logistics',
      category: 'Dashboards',
    },
    {
      key: 'profile-details',
      label: 'Profile Details',
      path: '/user-profile/details',
      category: 'Profile',
    },
    {
      key: 'profile-settings',
      label: 'Settings',
      path: '/user-profile/settings',
      category: 'Profile',
    },
    {
      key: 'profile-security',
      label: 'Security',
      path: '/user-profile/security',
      category: 'Profile',
    },
    {
      key: 'corporate-about',
      label: 'About',
      path: '/corporate/about',
      category: 'Corporate',
    },
    {
      key: 'corporate-contact',
      label: 'Contact',
      path: '/corporate/contact',
      category: 'Corporate',
    },
    {
      key: 'corporate-pricing',
      label: 'Pricing',
      path: '/corporate/pricing',
      category: 'Corporate',
    },
    {
      key: 'corporate-faqs',
      label: 'FAQs',
      path: '/corporate/faqs',
      category: 'Corporate',
    },
  ];

  useEffect(() => {
    setCollapsed(isMobile);
  }, [isMobile]);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    const onScroll = () => {
      setNavFill(el.scrollTop > 5);
    };
    el.addEventListener('scroll', onScroll);
    return () => el.removeEventListener('scroll', onScroll);
  }, []);

  // Sidebar width: on mobile when collapsed, fully hidden (0); on desktop, icon rail (64px)
  const sidebarWidth = collapsed
    ? isMobile
      ? 0
      : SIDER_COLLAPSED_WIDTH
    : SIDER_WIDTH;
  const sidebarMargin = `${sidebarWidth}px`;

  // Compute header background based on design style
  const headerBg = navFill ? tokens.headerFilledBg : 'none';
  const headerBackdrop = navFill ? tokens.headerFilledBackdrop : 'none';
  const headerShadow = navFill ? tokens.headerFilledShadow : 'none';

  // Neumorphic uses its own background for the whole layout
  const layoutBg = styleName === 'neumorphic' ? tokens.surfaceBg : undefined;

  return (
    <>
      <NProgress isAnimating={isLoading} key={location.key} />
      <Accessibility />
      <Layout
        style={{
          height: '100vh',
          overflow: 'hidden',
          ...(layoutBg ? { backgroundColor: layoutBg } : {}),
        }}
      >
        <SideNav
          trigger={null}
          collapsible
          collapsed={collapsed}
          collapsedWidth={isMobile ? 0 : SIDER_COLLAPSED_WIDTH}
          width={SIDER_WIDTH}
          onCollapse={(value) => setCollapsed(value)}
          style={{
            overflow: 'auto',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
            background: tokens.sidebarBg,
            border: styleName !== 'clean' ? tokens.border : 'none',
            borderLeft: 'none',
            borderTop: 'none',
            borderBottom: 'none',
            backdropFilter: tokens.backdropFilter,
            WebkitBackdropFilter: tokens.backdropFilter,
            transition: 'all .2s',
          }}
        />
        <Layout
          style={{
            height: '100vh',
            overflow: 'hidden',
            ...(layoutBg ? { background: 'none' } : {}),
          }}
        >
          <HeaderNav
            style={{
              marginLeft: sidebarMargin,
              padding: navFill ? '0 1.5rem 0 0' : '0 2rem 0 0',
              height: navFill ? 48 : 64,
              background: headerBg,
              backdropFilter: headerBackdrop,
              WebkitBackdropFilter: headerBackdrop,
              boxShadow: headerShadow,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexShrink: 0,
              zIndex: 1,
              gap: 8,
              transition: 'all .25s',
            }}
          >
            {/* Left: collapse + breadcrumbs */}
            <Flex align="center" gap={8}>
              <Tooltip title={`${collapsed ? 'Expand' : 'Collapse'} Sidebar`}>
                <Button
                  type="text"
                  icon={
                    collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                  }
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    fontSize: '16px',
                    width: 40,
                    height: 40,
                  }}
                />
              </Tooltip>
              <Breadcrumb
                items={(() => {
                  const segments = location.pathname.split('/').filter(Boolean);
                  return [
                    { title: <HomeOutlined />, href: '/' },
                    ...segments.map((seg, i) => ({
                      title: seg.charAt(0).toUpperCase() + seg.slice(1),
                      ...(i < segments.length - 1
                        ? {
                            href: '/' + segments.slice(0, i + 1).join('/'),
                          }
                        : {}),
                    })),
                  ];
                })()}
              />
            </Flex>
            {/* Center: search */}
            {isMobile ? (
              <Tooltip title="Search">
                <Button
                  icon={<SearchOutlined />}
                  type="text"
                  size="large"
                  onClick={() => {
                    window.dispatchEvent(
                      new KeyboardEvent('keydown', {
                        key: 'k',
                        ctrlKey: true,
                      })
                    );
                  }}
                />
              </Tooltip>
            ) : (
              <CommandPalette items={commandPaletteItems} />
            )}
            {/* Right: actions */}
            <Flex align="center" gap="small">
              <Tooltip title="Apps">
                <Badge dot offset={[-4, 4]} status="processing">
                  <Button
                    icon={<AppstoreOutlined />}
                    type="text"
                    size="large"
                  />
                </Badge>
              </Tooltip>
              <Tooltip title="Messages">
                <Badge count={3} size="small" offset={[-4, 4]}>
                  <Button icon={<MessageOutlined />} type="text" size="large" />
                </Badge>
              </Tooltip>
              <LanguageSwitcher />
              <Dropdown menu={{ items }} trigger={['click']}>
                <Flex
                  align="center"
                  gap={8}
                  style={{
                    cursor: 'pointer',
                    padding: '4px 8px 4px 4px',
                    borderRadius: borderRadius + 16,
                    transition: 'background 0.2s ease',
                  }}
                >
                  <div style={{ position: 'relative' }}>
                    <img
                      src="/me.jpg"
                      alt="user profile photo"
                      height={36}
                      width={36}
                      style={{
                        borderRadius: '50%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 1,
                        right: 1,
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        background: '#52c41a',
                        border: '2px solid white',
                      }}
                    />
                  </div>
                  {!isMobile && (
                    <Typography.Text
                      strong
                      style={{ fontSize: 13, lineHeight: 1 }}
                    >
                      {user?.userName || user?.email?.split('@')[0] || 'Admin'}
                    </Typography.Text>
                  )}
                </Flex>
              </Dropdown>
            </Flex>
          </HeaderNav>
          <Content
            ref={contentRef}
            id="main-content"
            tabIndex={-1}
            style={{
              margin: `0 0 0 ${sidebarMargin}`,
              borderRadius,
              transition: 'all .25s',
              padding: isMobile ? '16px 16px 72px' : '24px 32px',
              flex: 1,
              overflowY: 'auto',
            }}
          >
            <AnimatePresence
              mode="wait"
              onExitComplete={() => setIsLoading(false)}
            >
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 30,
                  mass: 0.8,
                }}
                onAnimationStart={() => setIsLoading(true)}
                onAnimationComplete={() => setIsLoading(false)}
                style={{ background: 'none' }}
              >
                {isLoading ? (
                  <Flex vertical gap={16}>
                    <Skeleton.Input active block style={{ height: 32 }} />
                    <Flex gap={16}>
                      <Skeleton.Node
                        active
                        style={{ width: '100%', height: 180 }}
                      />
                      <Skeleton.Node
                        active
                        style={{ width: '100%', height: 180 }}
                      />
                      {!isMobile && (
                        <Skeleton.Node
                          active
                          style={{ width: '100%', height: 180 }}
                        />
                      )}
                    </Flex>
                    <Skeleton active paragraph={{ rows: 4 }} />
                  </Flex>
                ) : (
                  children
                )}
              </motion.div>
            </AnimatePresence>
          </Content>
          <FooterNav
            style={{
              textAlign: 'center',
              marginLeft: sidebarMargin,
              background: 'none',
              flexShrink: 0,
            }}
          />
        </Layout>
      </Layout>
      {isMobile && <MobileTabBar />}
      <div ref={floatBtnRef}>
        <FloatButton.Group
          trigger="click"
          icon={<CustomerServiceOutlined />}
          tooltip="Quick Actions"
        >
          <FloatButton.BackTop
            tooltip="Back to Top"
            target={() => contentRef.current || window}
          />
          <FloatButton
            icon={<BgColorsOutlined />}
            tooltip="Customize Style"
            onClick={() => setStyleDrawerOpen(true)}
          />
          <FloatButton
            icon={<QuestionCircleOutlined />}
            tooltip="Help & Tour"
            onClick={() => setTourOpen(true)}
          />
        </FloatButton.Group>
      </div>
      <StyleSwitcher
        open={styleDrawerOpen}
        onClose={() => setStyleDrawerOpen(false)}
      />
      <LoginModal />
      <OnboardingTour
        open={tourOpen}
        onClose={() => setTourOpen(false)}
        steps={[
          {
            target: () =>
              document.querySelector('.ant-layout-sider') as HTMLElement | null,
            title: 'Navigation Sidebar',
            description:
              'Access all dashboards, profiles, and settings from this sidebar. Click the hamburger menu to collapse or expand.',
          },
          {
            target: () =>
              document.querySelector('.ant-input-search') as HTMLElement | null,
            title: 'Quick Search',
            description:
              'Search for pages, users, or content. Or press Cmd+K for the command palette.',
          },
          {
            target: () =>
              document.querySelector('.ant-table') as HTMLElement | null,
            title: 'Data Tables',
            description:
              'Sort, filter, and paginate data. Use the export button to download as CSV or JSON.',
          },
          {
            target: () =>
              document.querySelector(
                '.ant-layout-header'
              ) as HTMLElement | null,
            title: 'Header Actions',
            description:
              'Access notifications, messages, and your profile settings from here.',
          },
        ]}
      />
    </>
  );
};
