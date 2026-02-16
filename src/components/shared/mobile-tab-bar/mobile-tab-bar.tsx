import { useState } from 'react';
import { Drawer, theme } from 'antd';
import {
  AppstoreOutlined,
  BellOutlined,
  HomeOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import SideNav from '../../../layouts/app/side-nav';
import { useDesignStyle } from '../../../hooks/useDesignStyle';
import { SIDER_WIDTH } from '../../../layouts/app/side-nav';

type TabItem = {
  key: string;
  icon: React.ReactNode;
  label: string;
  action: 'navigate' | 'menu' | 'search';
  path?: string;
};

const tabs: TabItem[] = [
  {
    key: 'home',
    icon: <HomeOutlined />,
    label: 'Home',
    action: 'navigate',
    path: '/dashboards/default',
  },
  {
    key: 'search',
    icon: <SearchOutlined />,
    label: 'Search',
    action: 'search',
  },
  {
    key: 'menu',
    icon: <AppstoreOutlined />,
    label: 'Menu',
    action: 'menu',
  },
  {
    key: 'notifications',
    icon: <BellOutlined />,
    label: 'Alerts',
    action: 'navigate',
    path: '/dashboards/default',
  },
  {
    key: 'profile',
    icon: <UserOutlined />,
    label: 'Profile',
    action: 'navigate',
    path: '/user-profile/details',
  },
];

export const MobileTabBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { tokens } = useDesignStyle();
  const {
    token: { colorPrimary, colorTextSecondary, colorBgContainer, colorBorder },
  } = theme.useToken();

  const getActiveKey = () => {
    if (pathname.includes('/user-profile')) return 'profile';
    if (pathname.includes('/dashboards')) return 'home';
    return '';
  };

  const activeKey = getActiveKey();

  const handleTabClick = (tab: TabItem) => {
    if (tab.action === 'navigate' && tab.path) {
      navigate(tab.path);
    } else if (tab.action === 'menu') {
      setMenuOpen(true);
    } else if (tab.action === 'search') {
      window.dispatchEvent(
        new KeyboardEvent('keydown', { key: 'k', ctrlKey: true })
      );
    }
  };

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          height: 56,
          background: colorBgContainer,
          borderTop: `1px solid ${colorBorder}`,
          paddingBottom: 'env(safe-area-inset-bottom)',
        }}
      >
        {tabs.map((tab) => {
          const isActive = tab.key === activeKey;
          return (
            <button
              key={tab.key}
              onClick={() => handleTabClick(tab)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 2,
                flex: 1,
                height: '100%',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                color: isActive ? colorPrimary : colorTextSecondary,
                fontSize: 20,
                padding: 0,
                transition: 'color 0.2s ease',
              }}
            >
              {tab.icon}
              <span style={{ fontSize: 10, lineHeight: 1 }}>{tab.label}</span>
            </button>
          );
        })}
      </nav>
      <Drawer
        title="Navigation"
        placement="bottom"
        onClose={() => setMenuOpen(false)}
        open={menuOpen}
        height="70vh"
        styles={{
          body: { padding: 0, overflow: 'auto' },
        }}
      >
        <SideNav
          trigger={null}
          collapsible={false}
          collapsed={false}
          width={SIDER_WIDTH}
          style={{
            background: tokens.sidebarBg,
            border: 'none',
            position: 'relative',
            height: '100%',
            minWidth: '100%',
          }}
        />
      </Drawer>
    </>
  );
};
