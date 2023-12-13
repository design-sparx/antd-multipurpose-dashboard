import React, { useEffect, useRef, useState } from "react";
import { ConfigProvider, Layout, Menu, MenuProps, SiderProps } from "antd";
import {
  AppstoreAddOutlined,
  BranchesOutlined,
  BugOutlined,
  IdcardOutlined,
  PieChartOutlined,
  SecurityScanOutlined,
  SnippetsOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Logo } from "../../components";
import { Link, useLocation } from "react-router-dom";
import {
  PATH_AUTH,
  PATH_CORPORATE,
  PATH_DASHBOARD,
  PATH_DOCS,
  PATH_ERROR,
  PATH_LANDING,
  PATH_SITEMAP,
  PATH_USER_PROFILE,
} from "../../constants";
import { COLOR } from "../../App.tsx";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group",
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
};

const items: MenuProps["items"] = [
  getItem("Dashboards", "dashboards", <PieChartOutlined />, [
    getItem(<Link to={PATH_DASHBOARD.default}>Default</Link>, "default", null),
    getItem(
      <Link to={PATH_DASHBOARD.projects}>Projects</Link>,
      "projects",
      null,
    ),
    getItem(
      <Link to={PATH_DASHBOARD.ecommerce}>eCommerce</Link>,
      "ecommerce",
      null,
    ),
    getItem(
      <Link to={PATH_DASHBOARD.marketing}>Marketing</Link>,
      "marketing",
      null,
    ),
    getItem(<Link to={PATH_DASHBOARD.social}>Social</Link>, "social", null),
    getItem(<Link to={PATH_DASHBOARD.bidding}>Bidding</Link>, "bidding", null),
    getItem(
      <Link to={PATH_DASHBOARD.learning}>Learning</Link>,
      "learning",
      null,
    ),
    getItem(
      <Link to={PATH_DASHBOARD.logistics}>Logistics</Link>,
      "logistics",
      null,
    ),
  ]),

  getItem(
    <Link to={PATH_SITEMAP.root}>Sitemap</Link>,
    "sitemap",
    <BranchesOutlined />,
  ),

  getItem("Pages", "pages", null, [], "group"),

  getItem("Corporate", "corporate", <IdcardOutlined />, [
    getItem(<Link to={PATH_CORPORATE.about}>About</Link>, "about", null),
    getItem(<Link to={PATH_CORPORATE.team}>Team</Link>, "team", null),
    getItem(<Link to={PATH_CORPORATE.faqs}>FAQ</Link>, "faqs", null),
    getItem(
      <Link to={PATH_CORPORATE.contact}>Contact us</Link>,
      "contact us",
      null,
    ),
    getItem(<Link to={PATH_CORPORATE.pricing}>Pricing</Link>, "pricing", null),
    getItem(<Link to={PATH_CORPORATE.license}>License</Link>, "license", null),
  ]),

  getItem("User profile", "user-profile", <UserOutlined />, [
    getItem(
      <Link to={PATH_USER_PROFILE.details}>Details</Link>,
      "details",
      null,
    ),
    getItem(
      <Link to={PATH_USER_PROFILE.preferences}>Preferences</Link>,
      "preferences",
      null,
    ),
    getItem(
      <Link to={PATH_USER_PROFILE.personalInformation}>Information</Link>,
      "personal-information",
      null,
    ),
    getItem(
      <Link to={PATH_USER_PROFILE.security}>Security</Link>,
      "security",
      null,
    ),
    getItem(
      <Link to={PATH_USER_PROFILE.activity}>Activity</Link>,
      "activity",
      null,
    ),
    getItem(
      <Link to={PATH_USER_PROFILE.action}>Actions</Link>,
      "actions",
      null,
    ),
    getItem(<Link to={PATH_USER_PROFILE.help}>Help</Link>, "help", null),
    getItem(
      <Link to={PATH_USER_PROFILE.feedback}>Feedback</Link>,
      "feedback",
      null,
    ),
  ]),

  /*getItem('Social', 'socials', <HeartOutlined/>, [
      getItem(<Link to={PATH_SOCIAL.feed}>Feed</Link>, 's-feed', null),
      getItem(<Link to={PATH_SOCIAL.activity}>Activity</Link>, 's-activity', null),
      getItem(<Link to={PATH_SOCIAL.followers}>Followers</Link>, 's-followers', null),
      getItem(<Link to={PATH_SOCIAL.settings}>Settings</Link>, 's-settings', null),
  ]),*/

  /*getItem('Blog', 'blog', <ReadOutlined/>, [
      getItem(<Link to={PATH_BLOG.root}>Home</Link>, 'b-home', null),
      getItem(<Link to={PATH_BLOG.details(1)}>Post</Link>, 'b-post', null),
  ]),*/

  /*getItem('Careers', 'careers', <ContactsOutlined/>, [
      getItem(<Link to={PATH_CAREERS.root}>List</Link>, 'careers-list', null),
      getItem(<Link to={PATH_CAREERS.new}>Apply</Link>, 'careers-apply', null),
  ]),*/

  /*getItem('Account', 'account', <UserOutlined/>, [
      getItem(<Link to={PATH_ACCOUNT.root}>Overview</Link>, 'account-overview', null),
      getItem(<Link to={PATH_ACCOUNT.settings}>Settings</Link>, 'account-settings', null),
      getItem(<Link to={PATH_ACCOUNT.security}>Security</Link>, 'account-security', null),
      getItem(<Link to={PATH_ACCOUNT.activity}>Activity</Link>, 'account-activity', null),
      getItem(<Link to={PATH_ACCOUNT.billing}>Billing</Link>, 'account-billing', null),
      getItem(<Link to={PATH_ACCOUNT.statements}>Statements</Link>, 'account-statements', null),
      getItem(<Link to={PATH_ACCOUNT.referral}>Referrals</Link>, 'account-referrals', null),
      getItem(<Link to={PATH_ACCOUNT.api}>API Keys</Link>, 'account-api', null),
      getItem(<Link to={PATH_ACCOUNT.logs}>Logs</Link>, 'account-logs', null),
  ]),*/

  getItem("Authentication", "authentication", <SecurityScanOutlined />, [
    getItem(<Link to={PATH_AUTH.signin}>Sign In</Link>, "auth-signin", null),
    getItem(<Link to={PATH_AUTH.signup}>Sign Up</Link>, "auth-signup", null),
    getItem(<Link to={PATH_AUTH.welcome}>Welcome</Link>, "auth-welcome", null),
    getItem(
      <Link to={PATH_AUTH.verifyEmail}>Verify email</Link>,
      "auth-verify",
      null,
    ),
    getItem(
      <Link to={PATH_AUTH.passwordReset}>Password reset</Link>,
      "auth-password-reset",
      null,
    ),
    // getItem(<Link to={PATH_AUTH.passwordConfirm}>Passsword confirmation</Link>, 'auth-password-confirmation', null),
    getItem(
      <Link to={PATH_AUTH.accountDelete}>Account deleted</Link>,
      "auth-account-deactivation",
      null,
    ),
  ]),

  getItem("Errors", "errors", <BugOutlined />, [
    getItem(<Link to={PATH_ERROR.error400}>400</Link>, "400", null),
    getItem(<Link to={PATH_ERROR.error403}>403</Link>, "403", null),
    getItem(<Link to={PATH_ERROR.error404}>404</Link>, "404", null),
    getItem(<Link to={PATH_ERROR.error500}>500</Link>, "500", null),
    getItem(<Link to={PATH_ERROR.error503}>503</Link>, "503", null),
  ]),

  /*getItem(
      'Apps',
      'apps',
      null,
      [],
      'group'),*/

  /*getItem('Projects', 'projects-m', <BookOutlined/>, [
      getItem(<Link to={PATH_PROJECTS.root}>List</Link>, 'projects-list', null),
      getItem(<Link to={PATH_PROJECTS.details(1)}>View</Link>, 'projects-view', null),
  ]),*/

  /*getItem('Contacts', 'contacts', <SolutionOutlined/>, [
      getItem(<Link to={PATH_CONTACTS.root}>Home</Link>, 'contact-home', null),
      getItem(<Link to={PATH_CONTACTS.new}>Add contact</Link>, 'contact-add', null),
      getItem(<Link to={PATH_CONTACTS.editDetails(1)}>Edit contact</Link>, 'contact-edit', null),
      getItem(<Link to={PATH_CONTACTS.details(1)}>View contact</Link>, 'contact-view', null),
  ]),*/

  /*getItem('User management', 'users-mgmt', <TeamOutlined/>, [
      getItem('Users', 'user-mgmt-users', null, [
          getItem(<Link to={PATH_USER_MGMT.users.all}>Users list</Link>, 'user-mgmt-users-list', null),
          getItem(<Link to={PATH_USER_MGMT.users.details('')}>View user</Link>, 'user-mgmt-view-users', null),
      ]),
      getItem('Roles', 'user-mgmt-roles', null, [
          getItem(<Link to={PATH_USER_MGMT.roles.all}>Roles list</Link>, 'user-mgmt-roles-list', null),
          getItem(<Link to={PATH_USER_MGMT.roles.details('')}>View role</Link>, 'user-mgmt-view-role', null),
      ]),
      getItem(<Link to={PATH_USER_MGMT.permissions}>Permissions</Link>, 'user-mgmt-users-perms', null),
  ]),*/

  /* getItem('Invoice', 'invoice', <ProfileOutlined/>, [
       getItem(<Link to={PATH_INVOICE.root}>Invoices</Link>, 'invoices-home', null),
       getItem('Templates', 'invoices-templates', null, [
           getItem(<Link to={PATH_INVOICE.details(1)}>Invoice 1</Link>, 'invoice-temp-1', null),
           getItem(<Link to={PATH_INVOICE.details(2)}>Invoice 2</Link>, 'invoice-temp-2', null),
           getItem(<Link to={PATH_INVOICE.details(3)}>Invoice 3</Link>, 'invoice-temp-3', null),
       ]),
       getItem(<Link to={PATH_INVOICE.new}>Create invoice</Link>, 'invoices-create', null),
   ]),*/

  /*getItem('File manager', 'file-manager', <FileOutlined/>, [
      getItem(<Link to={PATH_FILE.files}>Files</Link>, 'files-home', null),
      getItem(<Link to={PATH_FILE.blank}>Blank</Link>, 'files-blank', null),
  ]),*/

  /*getItem('Inbox', 'inbox', <MailOutlined/>, [
      getItem(<Link to={PATH_INBOX.root}>Messages</Link>, 'inbox-messages', null),
      getItem(<Link to={PATH_INBOX.new}>New message</Link>, 'inbox-new', null),
      getItem(<Link to={PATH_INBOX.details(1)}>View message</Link>, 'inbox-view', null),
  ]),*/

  // getItem(<Link to={PATH_CALENDAR.root}>Calendar</Link>, 'calendar', <CalendarOutlined/>),

  /*getItem('Subscriptions', 'subscriptions', <GroupOutlined/>, [
      getItem(<Link to={PATH_SUBSCRIPTION.list}>List</Link>, 'sub-list', null),
      getItem(<Link to={PATH_SUBSCRIPTION.new}>Add</Link>, 'sub-new', null),
      getItem(<Link to={PATH_SUBSCRIPTION.details(1)}>View</Link>, 'sub-details', null),
  ]),*/

  getItem("Help", "help", null, [], "group"),

  getItem(
    <Link to={PATH_DOCS.components} target="_blank">
      Components
    </Link>,
    "components",
    <AppstoreAddOutlined />,
  ),
  getItem(
    <Link to={PATH_DOCS.help} target="_blank">
      Documentation
    </Link>,
    "documentation",
    <SnippetsOutlined />,
  ),
];

const rootSubmenuKeys = ["dashboards", "corporate", "user-profile"];

type SideNavProps = SiderProps;

const SideNav = ({ ...others }: SideNavProps) => {
  const nodeRef = useRef(null);
  const { pathname } = useLocation();
  const [openKeys, setOpenKeys] = useState([""]);
  const [current, setCurrent] = useState("");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  useEffect(() => {
    const paths = pathname.split("/");
    setOpenKeys(paths);
    setCurrent(paths[paths.length - 1]);
  }, [pathname]);

  return (
    <Sider ref={nodeRef} breakpoint="lg" collapsedWidth="0" {...others}>
      <Logo
        color="black"
        asLink
        href={PATH_LANDING.root}
        justify="center"
        gap="small"
        imgSize={{ h: 36, w: 36 }}
        style={{ padding: "1rem 0" }}
      />
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemBg: "none",
              subMenuItemBg: COLOR["50"],
              itemSelectedBg: COLOR["100"],
              itemHoverBg: COLOR["100"],
              itemSelectedColor: COLOR["600"],
            },
          },
        }}
      >
        <Menu
          mode="inline"
          items={items}
          onClick={onClick}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          selectedKeys={[current]}
          style={{ border: "none" }}
        />
      </ConfigProvider>
    </Sider>
  );
};

export default SideNav;
