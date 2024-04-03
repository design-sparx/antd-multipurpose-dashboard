import { Col, Flex, Row, Typography } from 'antd';
import { useStylesContext } from '../context';
import {
  BugOutlined,
  BulbOutlined,
  CodeOutlined,
  GithubOutlined,
  HomeOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Card, PageHeader } from '../components';
import { createElement } from 'react';
import { DASHBOARD_ITEMS } from '../constants';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

const SITES = [
  {
    title: 'github',
    description: 'source code of the website.',
    icon: GithubOutlined,
  },
  {
    title: 'Report Bug',
    description: 'something not working? Report a bug',
    icon: BugOutlined,
  },
  {
    title: 'Request Feature',
    description: 'Need something? Request a new feature.',
    icon: BulbOutlined,
  },
  {
    title: 'Contribute',
    description: 'Contribute to this project.',
    icon: CodeOutlined,
  },
];

export const AboutPage = () => {
  const context = useStylesContext();

  return (
    <div>
      <Flex vertical gap="middle">
        <PageHeader
          title="default dashboard"
          breadcrumbs={[
            {
              title: (
                <>
                  <HomeOutlined />
                  <span>home</span>
                </>
              ),
              path: '/',
            },
            {
              title: (
                <>
                  <PieChartOutlined />
                  <span>dashboards</span>
                </>
              ),
              menu: {
                items: DASHBOARD_ITEMS.map((d) => ({
                  key: d.title,
                  title: <Link to={d.path}>{d.title}</Link>,
                })),
              },
            },
            {
              title: 'about',
            },
          ]}
        />
        <Card>
          <Title>Antd Admin</Title>
          <Text>
            A dynamic and versatile multipurpose dashboard template built using
            React, Vite, Ant Design, and Storybook
          </Text>
        </Card>
        <Row {...context?.rowProps}>
          {SITES.map((s) => (
            <Col xs={24} sm={12} md={8} xl={6} key={`col-${s.title}`}>
              <Card>
                {createElement(s.icon)}
                <Title>{s.title}</Title>
                <Text>{s.description}</Text>
              </Card>
            </Col>
          ))}
        </Row>
      </Flex>
    </div>
  );
};
