import { AppLayout } from '../app';
import {
  Col,
  ConfigProvider,
  Descriptions,
  DescriptionsProps,
  Image,
  Row,
  Tabs,
  TabsProps,
  theme,
  Typography,
} from 'antd';
import { Card } from '../../components';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { USER_PROFILE_ITEMS } from '../../constants';
import { useStylesContext } from '../../context';

const { Link } = Typography;

import './styles.css';
import { useEffect, useState } from 'react';

const DESCRIPTION_ITEMS: DescriptionsProps['items'] = [
  {
    key: 'full-name',
    label: 'Name',
    children: <span>Kelvin Kiptum Kiprop</span>,
  },
  {
    key: 'job-title',
    label: 'Job title',
    children: <span>Software Engineer</span>,
  },
  {
    key: 'email',
    label: 'Email',
    children: (
      <Link href="mailto:kelvin.kiprop96@gmail.com">
        kelvin.kiprop96@gmail.com
      </Link>
    ),
  },
  {
    key: 'telephone',
    label: 'Phone',
    children: <Link href="tel:+254706094433">+254 706 094 4433</Link>,
  },
  {
    key: 'github',
    label: 'Github',
    children: (
      <Link href="https://github.com/kelvink96" target="_blank">
        kelvink96
      </Link>
    ),
  },
  {
    key: 'twitter',
    label: 'Twitter',
    children: (
      <Link href="https://twitter.com/kelvink_96" target="_blank">
        @kelvink_96
      </Link>
    ),
  },
];

const TAB_ITEMS: TabsProps['items'] = USER_PROFILE_ITEMS.map((u) => ({
  key: u.title,
  label: u.title,
}));

export const UserAccountLayout = () => {
  const {
    token: { borderRadius },
  } = theme.useToken();
  const navigate = useNavigate();
  const stylesContext = useStylesContext();
  const location = useLocation();
  const [activeKey, setActiveKey] = useState(TAB_ITEMS[0].key);

  const onChange = (key: string) => {
    navigate(key);
  };

  useEffect(() => {
    console.log(location);
    const k =
      TAB_ITEMS.find((d) => location.pathname.includes(d.key))?.key || '';

    console.log(k);
    setActiveKey(k);
  }, [location]);

  return (
    <>
      <AppLayout>
        <Card
          className="user-profile-card-nav card"
          actions={[
            <ConfigProvider
              theme={{
                components: {
                  Tabs: {
                    colorBorderSecondary: 'none',
                  },
                },
              }}
            >
              <Tabs
                defaultActiveKey={activeKey}
                activeKey={activeKey}
                items={TAB_ITEMS}
                onChange={onChange}
                style={{ textTransform: 'capitalize' }}
              />
            </ConfigProvider>,
          ]}
        >
          <Row {...stylesContext?.rowProps}>
            <Col xs={24} sm={8} lg={4}>
              <Image
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                alt="user profile image"
                height="100%"
                width="100%"
                style={{ borderRadius }}
              />
            </Col>
            <Col xs={24} sm={16} lg={20}>
              <Descriptions
                title="User Info"
                items={DESCRIPTION_ITEMS}
                column={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4 }}
              />
            </Col>
          </Row>
        </Card>
        <div style={{ marginTop: '1.5rem' }}>
          <Outlet />
        </div>
      </AppLayout>
    </>
  );
};
