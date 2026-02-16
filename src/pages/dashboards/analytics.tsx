import { useRef, useState } from 'react';
import {
  Button,
  Carousel,
  CarouselProps,
  Checkbox,
  Col,
  DatePicker,
  Drawer,
  Flex,
  Row,
  Slider,
  Typography,
} from 'antd';
import type { CardProps } from 'antd';
import type { CarouselRef } from 'antd/es/carousel';
import {
  HomeOutlined,
  PieChartOutlined,
  FilterOutlined,
} from '@ant-design/icons';
import { DASHBOARD_ITEMS } from '../../constants';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useStylesContext } from '../../context';
import { PageHeader, Loader, Card } from '../../components/shared';
import {
  CampaignsCard,
  EarningsCard,
  LatestOrdersCard,
  RecentUsersCard,
  SubscribersChart,
  OrdersChart,
  WeeklyActivityCard,
} from '../../components/dashboard/default';
import { ProjectsCard } from '../../components/dashboard/shared';
import { NotificationsCard } from '../../components/notifications';
import { useFetchData } from '../../hooks';
import { Projects, Notifications } from '../../types';
import CountUp from 'react-countup';

const ACTIVITY_DATA = [
  { day: 'Monday', value: 4500 },
  { day: 'Tuesday', value: 5200 },
  { day: 'Wednesday', value: 4800 },
  { day: 'Thursday', value: 6100 },
  { day: 'Friday', value: 5500 },
  { day: 'Saturday', value: 3200 },
  { day: 'Sunday', value: 2900 },
];

const CAROUSEL_PROPS: CarouselProps = {
  slidesToShow: 1,
  slidesToScroll: 1,
};

const CARD_PROPS: CardProps = {
  style: { height: '100%' },
};

const AnalyticsDashboard = () => {
  const stylesContext = useStylesContext();
  const sliderRef1 = useRef<CarouselRef>(null);
  const sliderRef2 = useRef<CarouselRef>(null);
  const [filterOpen, setFilterOpen] = useState(false);

  const {
    data: projectsDataRaw,
    error: projectsError,
    loading: projectsLoading,
  } = useFetchData<Projects[]>('/antd/projects');

  const {
    data: notificationsDataRaw,
    error: notificationsError,
    loading: notificationsLoading,
  } = useFetchData<Notifications[]>('/antd/notifications');

  const projectsData = projectsDataRaw ?? [];
  const notificationsData = notificationsDataRaw ?? [];

  return (
    <div>
      <Helmet>
        <title>Analytics Dashboard</title>
      </Helmet>
      <PageHeader
        title="analytics dashboard"
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
            title: 'analytics',
          },
        ]}
        extra={[
          <Button
            key="filter"
            icon={<FilterOutlined />}
            onClick={() => setFilterOpen(true)}
          >
            Filters
          </Button>,
        ]}
      />

      <Row {...stylesContext?.rowProps}>
        {/* KPI cards - top row for immediate visibility */}
        <Col xs={12} sm={12} lg={6}>
          <Card {...CARD_PROPS}>
            <Flex vertical align="center" gap="small">
              <Typography.Title
                level={3}
                style={{ margin: 0, color: '#1890ff' }}
              >
                <CountUp end={12345} />
              </Typography.Title>
              <Typography.Text type="secondary">Total Users</Typography.Text>
            </Flex>
          </Card>
        </Col>
        <Col xs={12} sm={12} lg={6}>
          <Card {...CARD_PROPS}>
            <Flex vertical align="center" gap="small">
              <Typography.Title
                level={3}
                style={{ margin: 0, color: '#52c41a' }}
              >
                <CountUp end={8.5} decimals={1} suffix="%" />
              </Typography.Title>
              <Typography.Text type="secondary">
                Conversion Rate
              </Typography.Text>
            </Flex>
          </Card>
        </Col>
        <Col xs={12} sm={12} lg={6}>
          <Card {...CARD_PROPS}>
            <Flex vertical align="center" gap="small">
              <Typography.Title
                level={3}
                style={{ margin: 0, color: '#faad14' }}
              >
                <CountUp end={2} />:<CountUp end={45} />
              </Typography.Title>
              <Typography.Text type="secondary">Avg. Session</Typography.Text>
            </Flex>
          </Card>
        </Col>
        <Col xs={12} sm={12} lg={6}>
          <Card {...CARD_PROPS}>
            <Flex vertical align="center" gap="small">
              <Typography.Title
                level={3}
                style={{ margin: 0, color: '#f5222d' }}
              >
                <CountUp end={65} suffix="%" />
              </Typography.Title>
              <Typography.Text type="secondary">Bounce Rate</Typography.Text>
            </Flex>
          </Card>
        </Col>

        {/* Charts row - subscribers and orders side by side */}
        <Col xs={24} lg={12}>
          <SubscribersChart />
        </Col>
        <Col xs={24} lg={12}>
          <OrdersChart />
        </Col>

        {/* Weekly activity and earnings side by side */}
        <Col xs={24} lg={16}>
          <WeeklyActivityCard data={ACTIVITY_DATA} />
        </Col>
        <Col xs={24} lg={8}>
          <EarningsCard
            data={[
              { type: 'Direct', value: 4500 },
              { type: 'Referral', value: 3200 },
              { type: 'Social', value: 2800 },
              { type: 'Organic', value: 5100 },
            ]}
            title="Earnings"
            diff={12.5}
          />
        </Col>

        {/* Campaigns table - full width */}
        <Col xs={24}>
          <CampaignsCard />
        </Col>

        {/* Users and orders tables side by side */}
        <Col xs={24} lg={12}>
          <RecentUsersCard />
        </Col>
        <Col xs={24} lg={12}>
          <LatestOrdersCard />
        </Col>

        {/* Projects and notifications row */}
        <Col xs={24} sm={12} lg={8}>
          <Card
            title="Ongoing Projects"
            extra={<Button type="link">View all</Button>}
            variant="borderless"
            {...CARD_PROPS}
          >
            {projectsError ? (
              <Typography.Text type="danger">
                Error loading data
              </Typography.Text>
            ) : projectsLoading ? (
              <Loader />
            ) : (
              <Carousel
                ref={sliderRef1}
                {...stylesContext?.carouselProps}
                {...CAROUSEL_PROPS}
              >
                {projectsData
                  .filter(
                    (o: Projects) => o.status.toLowerCase() === 'in progress'
                  )
                  .slice(0, 4)
                  .map((o: Projects) => (
                    <ProjectsCard
                      key={o.project_id}
                      project={o}
                      size="small"
                      style={{ margin: '0 8px' }}
                    />
                  ))}
              </Carousel>
            )}
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card
            title="Queued Projects"
            extra={<Button type="link">View all</Button>}
            variant="borderless"
            {...CARD_PROPS}
          >
            {projectsError ? (
              <Typography.Text type="danger">
                Error loading data
              </Typography.Text>
            ) : projectsLoading ? (
              <Loader />
            ) : (
              <Carousel
                ref={sliderRef2}
                {...stylesContext?.carouselProps}
                {...CAROUSEL_PROPS}
              >
                {projectsData
                  .filter((o: Projects) => o.status.toLowerCase() === 'on hold')
                  .slice(0, 4)
                  .map((o: Projects) => (
                    <ProjectsCard
                      key={o.project_id}
                      project={o}
                      size="small"
                      style={{ margin: '0 8px' }}
                    />
                  ))}
              </Carousel>
            )}
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <NotificationsCard
            data={notificationsData}
            error={notificationsError}
            loading={notificationsLoading}
          />
        </Col>
      </Row>

      <Drawer
        title="Dashboard Filters"
        placement="right"
        onClose={() => setFilterOpen(false)}
        open={filterOpen}
        width={320}
        styles={{ body: { padding: 16 } }}
      >
        <Flex vertical gap="large">
          <Flex vertical gap="small">
            <Typography.Text strong>Date Range</Typography.Text>
            <DatePicker.RangePicker style={{ width: '100%' }} />
          </Flex>

          <Flex vertical gap="small">
            <Typography.Text strong>Traffic Source</Typography.Text>
            <Checkbox.Group>
              <Flex vertical>
                <Checkbox value="organic">Organic</Checkbox>
                <Checkbox value="direct">Direct</Checkbox>
                <Checkbox value="referral">Referral</Checkbox>
                <Checkbox value="social">Social</Checkbox>
              </Flex>
            </Checkbox.Group>
          </Flex>

          <Flex vertical gap="small">
            <Typography.Text strong>User Segment</Typography.Text>
            <Checkbox.Group>
              <Flex vertical>
                <Checkbox value="new">New Users</Checkbox>
                <Checkbox value="returning">Returning</Checkbox>
                <Checkbox value="premium">Premium</Checkbox>
              </Flex>
            </Checkbox.Group>
          </Flex>

          <Flex vertical gap="small">
            <Typography.Text strong>Bounce Rate Range</Typography.Text>
            <Slider range defaultValue={[20, 80]} />
          </Flex>

          <Button type="primary" block onClick={() => setFilterOpen(false)}>
            Apply Filters
          </Button>
        </Flex>
      </Drawer>
    </div>
  );
};

export default AnalyticsDashboard;
