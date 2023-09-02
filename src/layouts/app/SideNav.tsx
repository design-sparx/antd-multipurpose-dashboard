import React from "react";
import {Layout, Menu, MenuProps, SiderProps} from "antd";
import {
    BookOutlined,
    BugOutlined, CalendarOutlined,
    ContactsOutlined, FileOutlined, GroupOutlined,
    HeartOutlined,
    HomeOutlined,
    IdcardOutlined, MailOutlined,
    PieChartOutlined, ProfileOutlined,
    ReadOutlined, SecurityScanOutlined, SolutionOutlined, TeamOutlined,
    UserOutlined,
} from "@ant-design/icons";
import {Logo} from "../../components";
import {Link} from "react-router-dom";
import {
    PATH_ACCOUNT, PATH_AUTH,
    PATH_BLOG, PATH_CALENDAR,
    PATH_CAREERS, PATH_CONTACTS,
    PATH_CORPORATE,
    PATH_DASHBOARD, PATH_ERROR, PATH_FILE, PATH_INBOX, PATH_INVOICE,
    PATH_LANDING, PATH_PROJECTS,
    PATH_SOCIAL, PATH_SUBSCRIPTION, PATH_USER_MGMT,
    PATH_USER_PROFILE
} from "../../constants";

const {Sider} = Layout

type MenuItem = Required<MenuProps>['items'][number];

const getItem = (label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[], type?: 'group',): MenuItem => {
    return {
        key,
        icon,
        children,
        label,
        type,
    } as MenuItem;
}

const items: MenuProps['items'] = [
    getItem(<Link to={PATH_LANDING.root}>Home</Link>, 'home', <HomeOutlined/>),

    getItem('Dashboards', 'dashboards', <PieChartOutlined/>, [
        getItem(<Link to={PATH_DASHBOARD.default}>Default</Link>, 'default', null),
        getItem(<Link to={PATH_DASHBOARD.projects}>Projects</Link>, 'projects', null),
        getItem(<Link to={PATH_DASHBOARD.ecommerce}>eCommerce</Link>, 'ecommerce', null),
        getItem(<Link to={PATH_DASHBOARD.marketing}>Marketing</Link>, 'marketing', null),
        getItem(<Link to={PATH_DASHBOARD.social}>Social</Link>, 'social', null),
        getItem(<Link to={PATH_DASHBOARD.bidding}>Bidding</Link>, 'bidding', null),
        getItem(<Link to={PATH_DASHBOARD.courses}>Learning</Link>, 'learning', null),
        getItem(<Link to={PATH_DASHBOARD.logistics}>Logistics</Link>, 'logistics', null),
    ]),

    getItem(
        'Pages',
        'pages',
        null,
        [],
        'group'),

    getItem('Corporate', 'corporate', <IdcardOutlined/>, [
        getItem(<Link to={PATH_CORPORATE.about}>About</Link>, 'about', null),
        getItem(<Link to={PATH_CORPORATE.team}>Team</Link>, 'team', null),
        getItem(<Link to={PATH_CORPORATE.faqs}>FAQ</Link>, 'faqs', null),
        getItem(<Link to={PATH_CORPORATE.contact}>Contact us</Link>, 'contact us', null),
        getItem(<Link to={PATH_CORPORATE.pricing}>Pricing</Link>, 'pricing', null),
        getItem(<Link to={PATH_CORPORATE.licence}>Licence</Link>, 'licence', null),
        getItem(<Link to={PATH_CORPORATE.sitemap}>Sitemap</Link>, 'sitemap', null),
    ]),

    getItem('User profile', 'user profile', <UserOutlined/>, [
        getItem(<Link to={PATH_USER_PROFILE.overview}>Overview</Link>, 'user-overview', null),
        getItem(<Link to={PATH_USER_PROFILE.projects}>Projects</Link>, 'user-projects', null),
        getItem(<Link to={PATH_USER_PROFILE.campaigns}>Campaigns</Link>, 'user-campaigns', null),
        getItem(<Link to={PATH_USER_PROFILE.documents}>Documents</Link>, 'user-documents', null),
        getItem(<Link to={PATH_USER_PROFILE.followers}>Followers</Link>, 'user-followers', null),
        getItem(<Link to={PATH_USER_PROFILE.activity}>Activity</Link>, 'user-activity', null),
    ]),

    getItem('Social', 'socials', <HeartOutlined/>, [
        getItem(<Link to={PATH_SOCIAL.feed}>Feed</Link>, 's-feed', null),
        getItem(<Link to={PATH_SOCIAL.activity}>Activity</Link>, 's-activity', null),
        getItem(<Link to={PATH_SOCIAL.followers}>Followers</Link>, 's-followers', null),
        getItem(<Link to={PATH_SOCIAL.settings}>Settings</Link>, 's-settings', null),
    ]),

    getItem('Blog', 'blog', <ReadOutlined/>, [
        getItem(<Link to={PATH_BLOG.root}>Home</Link>, 'b-home', null),
        getItem(<Link to={PATH_BLOG.details(1)}>Post</Link>, 'b-post', null),
    ]),

    getItem('Careers', 'careers', <ContactsOutlined/>, [
        getItem(<Link to={PATH_CAREERS.root}>List</Link>, 'careers-list', null),
        getItem(<Link to={PATH_CAREERS.new}>Apply</Link>, 'careers-apply', null),
    ]),

    getItem('Account', 'account', <UserOutlined/>, [
        getItem(<Link to={PATH_ACCOUNT.root}>Overview</Link>, 'account-overview', null),
        getItem(<Link to={PATH_ACCOUNT.settings}>Settings</Link>, 'account-settings', null),
        getItem(<Link to={PATH_ACCOUNT.security}>Security</Link>, 'account-security', null),
        getItem(<Link to={PATH_ACCOUNT.activity}>Activity</Link>, 'account-activity', null),
        getItem(<Link to={PATH_ACCOUNT.billing}>Billing</Link>, 'account-billing', null),
        getItem(<Link to={PATH_ACCOUNT.statements}>Statements</Link>, 'account-statements', null),
        getItem(<Link to={PATH_ACCOUNT.referral}>Referrals</Link>, 'account-referrals', null),
        getItem(<Link to={PATH_ACCOUNT.api}>API Keys</Link>, 'account-api', null),
        getItem(<Link to={PATH_ACCOUNT.logs}>Logs</Link>, 'account-logs', null),
    ]),

    getItem('Projects', 'projects-m', <BookOutlined/>, [
        getItem(<Link to={PATH_PROJECTS.root}>List</Link>, 'projects-list', null),
        getItem(<Link to={PATH_PROJECTS.details(1)}>View</Link>, 'projects-view', null),
    ]),

    getItem('Contacts', 'contacts', <SolutionOutlined/>, [
        getItem(<Link to={PATH_CONTACTS.root}>Home</Link>, 'contact-home', null),
        getItem(<Link to={PATH_CONTACTS.new}>Add contact</Link>, 'contact-add', null),
        getItem(<Link to={PATH_CONTACTS.editDetails(1)}>Edit contact</Link>, 'contact-edit', null),
        getItem(<Link to={PATH_CONTACTS.details(1)}>View contact</Link>, 'contact-view', null),
    ]),

    getItem('User management', 'users-mgmt', <TeamOutlined/>, [
        getItem('Users', 'user-mgmt-users', null, [
            getItem(<Link to={PATH_USER_MGMT.users.all}>Users list</Link>, 'user-mgmt-users-list', null),
            getItem(<Link to={PATH_USER_MGMT.users.details('')}>View user</Link>, 'user-mgmt-view-users', null),
        ]),
        getItem('Roles', 'user-mgmt-roles', null, [
            getItem(<Link to={PATH_USER_MGMT.roles.all}>Roles list</Link>, 'user-mgmt-roles-list', null),
            getItem(<Link to={PATH_USER_MGMT.roles.details('')}>View role</Link>, 'user-mgmt-view-role', null),
        ]),
        getItem(<Link to={PATH_USER_MGMT.permissions}>Permissions</Link>, 'user-mgmt-users-perms', null),
    ]),

    getItem('Invoice', 'invoice', <ProfileOutlined/>, [
        getItem(<Link to={PATH_INVOICE.root}>Invoices</Link>, 'invoices-home', null),
        getItem('Templates', 'invoices-templates', null, [
            getItem(<Link to={PATH_INVOICE.details(1)}>Invoice 1</Link>, 'invoice-temp-1', null),
            getItem(<Link to={PATH_INVOICE.details(2)}>Invoice 2</Link>, 'invoice-temp-2', null),
            getItem(<Link to={PATH_INVOICE.details(3)}>Invoice 3</Link>, 'invoice-temp-3', null),
        ]),
        getItem(<Link to={PATH_INVOICE.new}>Create invoice</Link>, 'invoices-create', null),
    ]),

    getItem('File manager', 'file-manager', <FileOutlined/>, [
        getItem(<Link to={PATH_FILE.files}>Files</Link>, 'files-home', null),
        getItem(<Link to={PATH_FILE.blank}>Blank</Link>, 'files-blank', null),
    ]),

    getItem('Inbox', 'inbox', <MailOutlined/>, [
        getItem(<Link to={PATH_INBOX.root}>Messages</Link>, 'inbox-messages', null),
        getItem(<Link to={PATH_INBOX.new}>New message</Link>, 'inbox-new', null),
        getItem(<Link to={PATH_INBOX.details(1)}>View message</Link>, 'inbox-view', null),
    ]),

    getItem(<Link to={PATH_CALENDAR.root}>Calendar</Link>, 'calendar', <CalendarOutlined/>),

    getItem('Subscriptions', 'subscriptions', <GroupOutlined/>, [
        getItem(<Link to={PATH_SUBSCRIPTION.list}>List</Link>, 'sub-list', null),
        getItem(<Link to={PATH_SUBSCRIPTION.new}>Add</Link>, 'sub-new', null),
        getItem(<Link to={PATH_SUBSCRIPTION.details(1)}>View</Link>, 'sub-details', null),
    ]),

    getItem('Authentication', 'authentication', <SecurityScanOutlined/>, [
        getItem(<Link to={PATH_AUTH.signin}>Sign In</Link>, 'auth-signin', null),
        getItem(<Link to={PATH_AUTH.signup}>Sign Up</Link>, 'auth-signup', null),
        getItem(<Link to={PATH_AUTH.welcome}>Welcome</Link>, 'auth-welcome', null),
        getItem(<Link to={PATH_AUTH.verifyEmail}>Verify email</Link>, 'auth-verify', null),
        getItem(<Link to={PATH_AUTH.passwordReset}>Password reset</Link>, 'auth-password-reset', null),
        getItem(<Link to={PATH_AUTH.passwordConfirm}>Passsword confirmation</Link>, 'auth-password-confirmation', null),
        getItem(<Link to={PATH_AUTH.accountDelete}>Account deactivation</Link>, 'auth-account-deactivation', null),
    ]),

    getItem('Errors', 'errors', <BugOutlined/>, [
        getItem(<Link to={PATH_ERROR.error403}>403</Link>, 'error-403', null),
        getItem(<Link to={PATH_ERROR.error403}>404</Link>, 'error-404', null),
        getItem(<Link to={PATH_ERROR.error500}>500</Link>, 'error-500', null),
    ]),
];

type SideNavProps = SiderProps

const SideNav = ({...others}: SideNavProps) => {
    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
    };

    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
                console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
            }}
            style={{
                overflow: 'auto',
                height: '100vh',
                position: 'fixed',
                left: 0,
                top: 0,
                bottom: 0,
            }}
            {...others}
        >
            <Logo
                color="white"
                style={{
                    display: 'flex',
                    gap: '8px',
                    justifyContent: 'center',
                    width: '100%',
                    alignItems: 'center',
                    padding: '1rem 0'
                }}
            />
            <Menu
                theme="dark"
                onClick={onClick}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                items={items}
            />
        </Sider>
    );
};

export default SideNav;