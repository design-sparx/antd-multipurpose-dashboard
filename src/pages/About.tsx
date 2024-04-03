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
import { DASHBOARD_ITEMS, PATH_GITHUB } from '../constants';
import { Link } from 'react-router-dom';

const { Title, Text } = Typography;

const SITES = [
  {
    title: 'GitHub',
    description: 'Source code of the website.',
    icon: GithubOutlined,
    link: PATH_GITHUB.repo,
  },
  {
    title: 'Report Bug',
    description: 'Something not working? Report a bug',
    icon: BugOutlined,
    link: PATH_GITHUB.repo + '/issues/new/choose',
  },
  {
    title: 'Request Feature',
    description: 'Need something? Request a new feature.',
    icon: BulbOutlined,
    link: PATH_GITHUB.repo + '/issues/new/choose',
  },
  {
    title: 'Contribute',
    description: 'Contribute to this project.',
    icon: CodeOutlined,
    link: PATH_GITHUB.repo + '/blob/main/CONTRIBUTING.md',
  },
];

export const AboutPage = () => {
  const context = useStylesContext();

  return (
    <div>
      <Flex vertical gap="middle">
        <PageHeader
          title="About"
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
          <Flex vertical gap="small">
            <Title level={3} className="m-0">
              Antd Admin
            </Title>
            <Text>
              A dynamic and versatile multipurpose dashboard template built
              using React, Vite, Ant Design, and Storybook
            </Text>
          </Flex>
        </Card>
        <Row {...context?.rowProps}>
          {SITES.map((s) => (
            <Col xs={24} sm={12} key={`col-${s.title}`}>
              <a href={s.link} target="_blank" rel="noopener noreferrer">
                <Card hoverable>
                  <Flex vertical gap="small">
                    {createElement(s.icon, { style: { fontSize: 24 } })}
                    <Title level={5} className="m-0">
                      {s.title}
                    </Title>
                    <Text>{s.description}</Text>
                  </Flex>
                </Card>
              </a>
            </Col>
          ))}
        </Row>
      </Flex>
    </div>
  );
};
