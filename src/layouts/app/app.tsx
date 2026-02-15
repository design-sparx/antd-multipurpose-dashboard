import {
  Button,
  Dropdown,
  Flex,
  FloatButton,
  Layout,
  MenuProps,
  message,
  theme,
  Tooltip,
} from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { ReactNode, useEffect, useRef, useState } from 'react';
import {
  AppstoreOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  QuestionOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  CSSTransition,
  SwitchTransition,
  TransitionGroup,
} from 'react-transition-group';
import { useMediaQuery } from 'react-responsive';
import SideNav from './side-nav.tsx';
import HeaderNav from './header-nav.tsx';
import FooterNav from './footer-nav.tsx';
import {
  CommandPalette,
  NProgress,
  LoginModal,
  OnboardingTour,
  Accessibility,
  LanguageSwitcher,
} from '../../components';
import { PATH_LANDING, PATH_USER_PROFILE } from '../../constants';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/auth/authSlice';
import { enableMockData } from '../../redux/data-mode/dataModeSlice';
import { RootState } from '../../redux/store.ts';
const { Content } = Layout;

type AppLayoutProps = {
  children: ReactNode;
};

export const AppLayout = ({ children }: AppLayoutProps) => {
  const {
    token: { borderRadius, colorBgContainer },
  } = theme.useToken();
  const isMobile = useMediaQuery({ maxWidth: 769 });
  const [collapsed, setCollapsed] = useState(true);
  const [navFill, setNavFill] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const nodeRef = useRef(null);
  const floatBtnRef = useRef(null);
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

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
    window.addEventListener('scroll', () => {
      if (window.scrollY > 5) {
        setNavFill(true);
      } else {
        setNavFill(false);
      }
    });
  }, []);

  return (
    <>
      <NProgress isAnimating={isLoading} key={location.key} />
      <Accessibility />
      <Layout
        style={{
          minHeight: '100vh',
          // backgroundColor: 'white',
        }}
      >
        <SideNav
          trigger={null}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          style={{
            overflow: 'auto',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
            background: 'none',
            border: 'none',
            transition: 'all .2s',
          }}
        />
        <Layout
          style={
            {
              // background: 'none',
            }
          }
        >
          <HeaderNav
            style={{
              marginLeft: collapsed ? 0 : '200px',
              padding: '0 2rem 0 0',
              background: navFill ? `${colorBgContainer}80` : 'none',
              backdropFilter: navFill ? 'blur(8px)' : 'none',
              boxShadow: navFill ? '0 0 8px 2px rgba(0, 0, 0, 0.05)' : 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'sticky',
              top: 0,
              zIndex: 1,
              gap: 8,
              transition: 'all .25s',
            }}
          >
            <Flex align="center">
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
              <CommandPalette items={commandPaletteItems} />
            </Flex>
            <Flex align="center" gap="small">
              <Tooltip title="Apps">
                <Button icon={<AppstoreOutlined />} type="text" size="large" />
              </Tooltip>
              <Tooltip title="Messages">
                <Button icon={<MessageOutlined />} type="text" size="large" />
              </Tooltip>
              <LanguageSwitcher />
              <Dropdown menu={{ items }} trigger={['click']}>
                <Flex>
                  <img
                    src="/me.jpg"
                    alt="user profile photo"
                    height={36}
                    width={36}
                    style={{ borderRadius, objectFit: 'cover' }}
                  />
                </Flex>
              </Dropdown>
            </Flex>
          </HeaderNav>
          <Content
            id="main-content"
            tabIndex={-1}
            style={{
              margin: `0 0 0 ${collapsed ? 0 : '200px'}`,
              // background: '#ebedf0',
              borderRadius: collapsed ? 0 : borderRadius,
              transition: 'all .25s',
              padding: '24px 32px',
              minHeight: 360,
            }}
          >
            <TransitionGroup>
              <SwitchTransition>
                <CSSTransition
                  key={`css-transition-${location.key}`}
                  nodeRef={nodeRef}
                  onEnter={() => {
                    setIsLoading(true);
                  }}
                  onEntered={() => {
                    setIsLoading(false);
                  }}
                  timeout={300}
                  classNames="bottom-to-top"
                  unmountOnExit
                >
                  {() => (
                    <div ref={nodeRef} style={{ background: 'none' }}>
                      {children}
                    </div>
                  )}
                </CSSTransition>
              </SwitchTransition>
            </TransitionGroup>
            <div ref={floatBtnRef}>
              <FloatButton.BackTop />
            </div>
          </Content>
          <FooterNav
            style={{
              textAlign: 'center',
              marginLeft: collapsed ? 0 : '200px',
              background: 'none',
            }}
          />
        </Layout>
      </Layout>
      <LoginModal />
      <OnboardingTour
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
