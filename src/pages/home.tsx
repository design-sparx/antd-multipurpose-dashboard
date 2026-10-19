import { Button, Col, Flex, Masonry, Row, Tag, theme, Typography } from 'antd';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import {
  DashboardOutlined,
  AppstoreOutlined,
  BookOutlined,
  GithubOutlined,
  LoginOutlined,
  RocketFilled,
  SettingOutlined,
} from '@ant-design/icons';
import {
  PATH_AUTH,
  PATH_DASHBOARD,
  PATH_DOCS,
  PATH_GITHUB,
} from '../constants';
import { Card, Container, RecentReleases } from '../components';
import { Announcements } from '../components/shared/announcements/announcements';
import { CSSProperties } from 'react';

const { Title, Text } = Typography;

const DASHBOARDS = [
  {
    title: 'bidding',
    link: PATH_DASHBOARD.bidding,
    image: '/showcase/dashboard/bidding.png',
  },
  {
    title: 'default',
    link: PATH_DASHBOARD.default,
    image: '/showcase/dashboard/default.png',
  },
  {
    title: 'ecommerce',
    link: PATH_DASHBOARD.ecommerce,
    image: '/showcase/dashboard/ecommerce.png',
  },
  {
    title: 'learning',
    link: PATH_DASHBOARD.learning,
    image: '/showcase/dashboard/learning.png',
  },
  {
    title: 'logistics',
    link: PATH_DASHBOARD.logistics,
    image: '/showcase/dashboard/logistics.png',
  },
  {
    title: 'marketing',
    link: PATH_DASHBOARD.marketing,
    image: '/showcase/dashboard/marketing.png',
  },
  {
    title: 'projects',
    link: PATH_DASHBOARD.projects,
    image: '/showcase/dashboard/projects.png',
  },
  {
    title: 'social',
    link: PATH_DASHBOARD.social,
    image: '/showcase/dashboard/social.png',
  },
];

const BENEFITS = [
  {
    title: 'Ten dashboards',
    description:
      'Ready-to-use dashboard pages for analytics, ecommerce, marketing, social, and more.',
    icon: DashboardOutlined,
  },
  {
    title: 'Four design styles',
    description:
      'Clean, glassmorphic, neumorphic, and bold — each with its own primary color and tokens.',
    icon: SettingOutlined,
  },
  {
    title: '60+ components',
    description:
      'Ant Design v6 components, themed and responsive, ready to drop into any page.',
    icon: AppstoreOutlined,
  },
  {
    title: 'Storybook ready',
    description:
      'Every component is documented in Storybook with interactive controls and args.',
    icon: BookOutlined,
  },
];

const FILTER_PILLS = ['All', 'Releases', 'Security', 'Maintenance'];

export const HomePage = () => {
  const {
    token: { colorPrimary, colorPrimaryHover },
  } = theme.useToken();
  const isMobile = useMediaQuery({ maxWidth: 769 });
  const isTablet = useMediaQuery({ maxWidth: 992 });

  const highlightVars = {
    '--text-highlight-from': colorPrimary,
    '--text-highlight-to': colorPrimaryHover,
  } as CSSProperties;

  const sectionStyles: CSSProperties = {
    paddingTop: isMobile ? 40 : 80,
    paddingBottom: isMobile ? 40 : 80,
    paddingRight: isMobile ? '1rem' : 0,
    paddingLeft: isMobile ? '1rem' : 0,
  };

  return (
    <div
      style={{
        ...highlightVars,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      {/* Hero */}
      <Flex
        vertical
        align="center"
        justify="center"
        style={{
          height: isTablet ? 600 : 650,
          width: '100%',
          padding: isMobile ? '2rem 1rem' : '3rem 0',
        }}
      >
        <Container>
          <Row style={{ alignItems: 'center' }}>
            <Col xs={24} lg={12}>
              <Text
                style={{
                  color: colorPrimary,
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: 0.05,
                  textTransform: 'uppercase',
                }}
              >
                <RocketFilled /> Kick start your project
              </Text>
              <Title
                level={1}
                style={{
                  fontSize: isMobile ? 40 : 48,
                  fontWeight: 800,
                  margin: '1.25rem 0 1rem',
                  lineHeight: 1.1,
                }}
              >
                A dynamic and versatile{' '}
                <span className="text-highlight">multipurpose dashboard</span>{' '}
                template built with{' '}
                <span className="text-highlight">React</span>,{' '}
                <span className="text-highlight">Vite</span>,{' '}
                <span className="text-highlight">Ant Design</span>, and{' '}
                <span className="text-highlight">Storybook</span>
              </Title>
              <Flex
                gap="middle"
                vertical={isMobile}
                style={{ marginTop: '0.5rem' }}
              >
                <Link to={PATH_AUTH.signin}>
                  <Button
                    icon={<LoginOutlined />}
                    type="primary"
                    size="large"
                    block={isMobile}
                    style={{ height: 52 }}
                  >
                    Live preview
                  </Button>
                </Link>
                <Link to={PATH_GITHUB.repo}>
                  <Button
                    icon={<GithubOutlined />}
                    type="default"
                    size="large"
                    block={isMobile}
                    style={{ height: 52 }}
                  >
                    Give us a star
                  </Button>
                </Link>
              </Flex>
            </Col>
            {!isTablet && (
              <Col
                xs={24}
                lg={12}
                style={{ display: 'flex', justifyContent: 'center' }}
              >
                <Card
                  hoverable
                  cover={
                    <img
                      src="/landing-frame.png"
                      alt="dashboard preview"
                      style={{ borderRadius: 16, width: '100%', maxWidth: 520 }}
                    />
                  }
                >
                  <Flex
                    vertical
                    align="center"
                    justify="center"
                    style={{ height: '100%', padding: 24 }}
                  >
                    <Text
                      className="m-0 text-capitalize"
                      style={{ fontWeight: 700 }}
                    >
                      Dashboard preview
                    </Text>
                  </Flex>
                </Card>
              </Col>
            )}
          </Row>
        </Container>
      </Flex>

      {/* Benefits */}
      <Container style={sectionStyles}>
        <Flex vertical align="center" style={{ marginBottom: '2rem' }}>
          <Title
            level={2}
            className="text-center"
            style={{ marginBottom: '0.5rem' }}
          >
            Everything you need to ship
          </Title>
        </Flex>
        <Row gutter={[16, 24]}>
          {BENEFITS.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <Col key={benefit.title} xs={24} md={12} lg={6}>
                <Card hoverable style={{ height: '100%' }}>
                  <Flex vertical gap="small">
                    <Icon style={{ fontSize: 32, color: colorPrimary }} />
                    <Title
                      level={4}
                      className="m-0"
                      style={{ fontWeight: 700 }}
                    >
                      {benefit.title}
                    </Title>
                    <Text type="secondary" style={{ fontSize: 14 }}>
                      {benefit.description}
                    </Text>
                  </Flex>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>

      {/* Dashboard grid — masonry */}
      <Container style={sectionStyles}>
        <Title
          level={2}
          className="text-center"
          style={{ marginBottom: '2rem' }}
        >
          8 dashboard pages available
        </Title>
        <Masonry
          items={DASHBOARDS.map((dashboard) => ({
            key: dashboard.title,
            data: dashboard,
          }))}
          columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
          gutter={16}
          itemRender={(item) => {
            const dashboard = item.data as (typeof DASHBOARDS)[number];
            return (
              <Link key={dashboard.title} to={dashboard.link}>
                <Card
                  hoverable
                  cover={<img src={dashboard.image} alt={dashboard.title} />}
                >
                  <Text className="m-0 text-capitalize">{dashboard.title}</Text>
                </Card>
              </Link>
            );
          }}
        />
      </Container>

      {/* What's New */}
      <Container style={sectionStyles}>
        <Flex vertical align="center" style={{ marginBottom: '1.5rem' }}>
          <Title
            level={2}
            className="text-center"
            style={{ marginBottom: '0.5rem' }}
          >
            What's New
          </Title>
          <Text
            className="text-center"
            type="secondary"
            style={{ maxWidth: 560, margin: '0 auto' }}
          >
            Latest releases, announcements, and security notes.
          </Text>
        </Flex>
        <Flex justify="center" gap={8} wrap>
          {FILTER_PILLS.map((label) => (
            <Tag key={label} variant="outlined" style={{ cursor: 'default' }}>
              {label}
            </Tag>
          ))}
        </Flex>
        <Flex vertical gap={16}>
          <RecentReleases />
          <Announcements />
        </Flex>
      </Container>

      {/* CTA */}
      <Container style={sectionStyles}>
        <Card
          style={{
            textAlign: 'center',
            padding: '3rem 1rem',
            borderRadius: 24,
          }}
        >
          <Title level={3} style={{ marginBottom: '1.5rem' }}>
            Ready to build your dashboard?
          </Title>
          <Flex
            gap="small"
            style={{ flexWrap: 'wrap', justifyContent: 'center' }}
          >
            <Link to={PATH_DASHBOARD.default}>
              <Button type="primary" size="large" block={isMobile}>
                Live preview
              </Button>
            </Link>
            <Link
              to={PATH_GITHUB.repo}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                type="default"
                size="large"
                block={isMobile}
                icon={<GithubOutlined />}
              >
                Give us a star
              </Button>
            </Link>
            <Button
              type="default"
              size="large"
              block={isMobile}
              onClick={() => window.open(PATH_DOCS.components, '_blank')}
            >
              Components
            </Button>
          </Flex>
        </Card>
      </Container>
    </div>
  );
};
