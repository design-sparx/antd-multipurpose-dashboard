import React, { useEffect, useRef, useState } from 'react';
import { ConfigProvider, Layout, Menu, MenuProps, SiderProps } from 'antd';
import {
  AppstoreAddOutlined,
  BarChartOutlined,
  BranchesOutlined,
  BugOutlined,
  DollarOutlined,
  FundProjectionScreenOutlined,
  GithubOutlined,
  HeartOutlined,
  IdcardOutlined,
  InfoCircleOutlined,
  LineChartOutlined,
  PictureOutlined,
  PieChartOutlined,
  ProductOutlined,
  RocketOutlined,
  SecurityScanOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
  SnippetsOutlined,
  TeamOutlined,
  TruckOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Logo } from '../../components';
import { Link, useLocation } from 'react-router-dom';
import {
  PATH_ABOUT,
  PATH_AUTH,
  PATH_CORPORATE,
  PATH_DASHBOARD,
  PATH_DOCS,
  PATH_ERROR,
  PATH_GITHUB,
  PATH_LANDING,
  PATH_SITEMAP,
  PATH_USER_PROFILE,
  PATH_GALLERY,
} from '../../constants';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { getThemeColors } from '../../theme/colors';
import { useDesignStyle } from '../../hooks/useDesignStyle';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
};

const items: MenuProps['items'] = [
  // ── DASHBOARDS ──
  getItem('Dashboards', 'section-dashboards', null, [], 'group'),

  getItem('Dashboards', 'dashboards', <PieChartOutlined />, [
    getItem(
      <Link to={PATH_DASHBOARD.default}>Default</Link>,
      'default',
      <BarChartOutlined />
    ),
    getItem(
      <Link to={PATH_DASHBOARD.projects}>Projects</Link>,
      'projects',
      <FundProjectionScreenOutlined />
    ),
    getItem(
      <Link to={PATH_DASHBOARD.ecommerce}>eCommerce</Link>,
      'ecommerce',
      <ShoppingCartOutlined />
    ),
    getItem(
      <Link to={PATH_DASHBOARD.marketing}>Marketing</Link>,
      'marketing',
      <RocketOutlined />
    ),
    getItem(
      <Link to={PATH_DASHBOARD.social}>Social</Link>,
      'social',
      <TeamOutlined />
    ),
    getItem(
      <Link to={PATH_DASHBOARD.bidding}>Bidding</Link>,
      'bidding',
      <ShopOutlined />
    ),
    getItem(
      <Link to={PATH_DASHBOARD.learning}>Learning</Link>,
      'learning',
      <SnippetsOutlined />
    ),
    getItem(
      <Link to={PATH_DASHBOARD.logistics}>Logistics</Link>,
      'logistics',
      <TruckOutlined />
    ),
    getItem(
      <Link to={PATH_DASHBOARD.analytics}>Analytics</Link>,
      'analytics',
      <LineChartOutlined />
    ),
    getItem(
      <Link to={PATH_DASHBOARD.healthcare}>Healthcare</Link>,
      'healthcare',
      <HeartOutlined />
    ),
    getItem(
      <Link to={PATH_DASHBOARD.finance}>Finance</Link>,
      'finance',
      <DollarOutlined />
    ),
  ]),

  // ── PAGES ──
  getItem('Pages', 'section-pages', null, [], 'group'),

  getItem(
    <Link to={PATH_ABOUT.root}>About</Link>,
    'about',
    <InfoCircleOutlined />
  ),
  getItem(
    <Link to={PATH_SITEMAP.root}>Sitemap</Link>,
    'sitemap',
    <BranchesOutlined />
  ),
  getItem('Corporate', 'corporate', <IdcardOutlined />, [
    getItem(<Link to={PATH_CORPORATE.about}>About</Link>, 'about', null),
    getItem(<Link to={PATH_CORPORATE.team}>Team</Link>, 'team', null),
    getItem(<Link to={PATH_CORPORATE.faqs}>FAQ</Link>, 'faqs', null),
    getItem(
      <Link to={PATH_CORPORATE.contact}>Contact us</Link>,
      'contact us',
      null
    ),
    getItem(<Link to={PATH_CORPORATE.pricing}>Pricing</Link>, 'pricing', null),
    getItem(<Link to={PATH_CORPORATE.license}>License</Link>, 'license', null),
  ]),
  getItem(
    <Link to={PATH_GALLERY.root}>Gallery</Link>,
    'gallery',
    <PictureOutlined />
  ),

  // ── USER ──
  getItem('User', 'section-user', null, [], 'group'),

  getItem('User profile', 'user-profile', <UserOutlined />, [
    getItem(
      <Link to={PATH_USER_PROFILE.details}>Details</Link>,
      'details',
      null
    ),
    getItem(
      <Link to={PATH_USER_PROFILE.preferences}>Preferences</Link>,
      'preferences',
      null
    ),
    getItem(
      <Link to={PATH_USER_PROFILE.personalInformation}>Information</Link>,
      'personal-information',
      null
    ),
    getItem(
      <Link to={PATH_USER_PROFILE.security}>Security</Link>,
      'security',
      null
    ),
    getItem(
      <Link to={PATH_USER_PROFILE.activity}>Activity</Link>,
      'activity',
      null
    ),
    getItem(
      <Link to={PATH_USER_PROFILE.action}>Actions</Link>,
      'actions',
      null
    ),
    getItem(<Link to={PATH_USER_PROFILE.help}>Help</Link>, 'help', null),
    getItem(
      <Link to={PATH_USER_PROFILE.feedback}>Feedback</Link>,
      'feedback',
      null
    ),
  ]),
  getItem('Authentication', 'authentication', <SecurityScanOutlined />, [
    getItem(<Link to={PATH_AUTH.signin}>Sign In</Link>, 'auth-signin', null),
    getItem(<Link to={PATH_AUTH.signup}>Sign Up</Link>, 'auth-signup', null),
    getItem(<Link to={PATH_AUTH.welcome}>Welcome</Link>, 'auth-welcome', null),
    getItem(
      <Link to={PATH_AUTH.verifyEmail}>Verify email</Link>,
      'auth-verify',
      null
    ),
    getItem(
      <Link to={PATH_AUTH.otpAuth}>OTP Verification</Link>,
      'auth-otp',
      null
    ),
    getItem(
      <Link to={PATH_AUTH.passwordReset}>Password reset</Link>,
      'auth-password-reset',
      null
    ),
    getItem(
      <Link to={PATH_AUTH.accountDelete}>Account deleted</Link>,
      'auth-account-deactivation',
      null
    ),
  ]),
  getItem('Errors', 'errors', <BugOutlined />, [
    getItem(<Link to={PATH_ERROR.error400}>400</Link>, '400', null),
    getItem(<Link to={PATH_ERROR.error403}>403</Link>, '403', null),
    getItem(<Link to={PATH_ERROR.error404}>404</Link>, '404', null),
    getItem(<Link to={PATH_ERROR.error500}>500</Link>, '500', null),
    getItem(<Link to={PATH_ERROR.error503}>503</Link>, '503', null),
  ]),

  // ── HELP ──
  getItem('Help', 'section-help', null, [], 'group'),

  getItem(
    <Link to={PATH_DOCS.productRoadmap} target="_blank">
      Roadmap
    </Link>,
    'product-roadmap',
    <ProductOutlined />
  ),
  getItem(
    <Link to={PATH_DOCS.components} target="_blank">
      Components
    </Link>,
    'components',
    <AppstoreAddOutlined />
  ),
  getItem(
    <Link to={PATH_DOCS.help} target="_blank">
      Documentation
    </Link>,
    'documentation',
    <SnippetsOutlined />
  ),
  getItem(
    <Link to={PATH_GITHUB.repo} target="_blank">
      Give us a star
    </Link>,
    'give-us-a-star',
    <GithubOutlined />
  ),
];

const rootSubmenuKeys = ['dashboards', 'corporate', 'user-profile'];

type SideNavProps = SiderProps;

export const SIDER_WIDTH = 200;
export const SIDER_COLLAPSED_WIDTH = 64;

const SideNav = ({ ...others }: SideNavProps) => {
  const nodeRef = useRef(null);
  const { pathname } = useLocation();
  const [openKeys, setOpenKeys] = useState(['']);
  const [current, setCurrent] = useState('');
  const { mytheme } = useSelector((state: RootState) => state.theme);
  const colors = getThemeColors(mytheme as 'dark' | 'light');
  const { tokens, styleName } = useDesignStyle();

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };

  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  useEffect(() => {
    const paths = pathname.split('/');
    setOpenKeys(paths);
    setCurrent(paths[paths.length - 1]);
  }, [pathname]);

  // Determine menu text color based on style + theme
  const isBoldStyle = styleName === 'bold';
  const isDark = mytheme === 'dark';
  const menuTextColor = isBoldStyle
    ? isDark
      ? 'rgba(255, 255, 255, 0.85)'
      : 'rgba(255, 255, 255, 0.85)'
    : isDark
      ? 'rgba(255, 255, 255, 0.85)'
      : undefined;

  const isCollapsed = others.collapsed ?? false;

  return (
    <Sider
      ref={nodeRef}
      breakpoint="lg"
      collapsedWidth={SIDER_COLLAPSED_WIDTH}
      width={SIDER_WIDTH}
      {...others}
    >
      <Logo
        color="blue"
        asLink
        href={PATH_LANDING.root}
        justify="center"
        gap="small"
        imgSize={{ h: 28, w: 28 }}
        style={{ padding: '1rem 0' }}
        showText={!isCollapsed}
      />
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemBg: 'none',
              itemSelectedBg: isBoldStyle
                ? 'rgba(7, 110, 229, 0.2)'
                : isDark
                  ? 'rgba(7, 110, 229, 0.15)'
                  : colors[100],
              itemHoverBg: isBoldStyle
                ? 'rgba(255, 255, 255, 0.08)'
                : isDark
                  ? 'rgba(255, 255, 255, 0.08)'
                  : colors[50],
              itemSelectedColor: isBoldStyle
                ? '#4d8bff'
                : isDark
                  ? '#4d8bff'
                  : colors[600],
              itemColor: menuTextColor,
              subMenuItemBg: 'none',
              groupTitleColor: isDark ? 'rgba(255, 255, 255, 0.45)' : undefined,
            },
          },
        }}
      >
        <Menu
          mode="inline"
          inlineCollapsed={isCollapsed}
          items={items}
          onClick={onClick}
          openKeys={isCollapsed ? [] : openKeys}
          onOpenChange={onOpenChange}
          selectedKeys={[current]}
          style={
            {
              border: 'none',
              ...(tokens.menuItemHover.transition
                ? { '--menu-transition': tokens.menuItemHover.transition }
                : {}),
            } as React.CSSProperties
          }
        />
      </ConfigProvider>
    </Sider>
  );
};

export default SideNav;
