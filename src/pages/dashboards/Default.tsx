import { useRef } from 'react';
import {
  Card,
  GetStartedCard,
  Loader,
  NotificationsCard,
  PageHeader,
  ProjectsCard,
  TasksChartCard,
  TasksListCard,
  WeeklyActivityCard,
} from '../../components';
import {
  Alert,
  Button,
  CardProps,
  Carousel,
  CarouselProps,
  Col,
  Flex,
  Row,
  Typography,
} from 'antd';
import { HomeOutlined, PieChartOutlined } from '@ant-design/icons';
import { DASHBOARD_ITEMS } from '../../constants';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useStylesContext } from '../../context';
import { useFetchData } from '../../hooks';
import { Projects } from '../../types';
import CountUp from 'react-countup';

const ACTIVITY_DATA = [
  {
    day: 'Monday',
    value: 10,
  },
  {
    day: 'Tuesday',
    value: 22,
  },
  {
    day: 'Wednesday',
    value: 25,
  },
  {
    day: 'Thursday',
    value: 26,
  },
  {
    day: 'Friday',
    value: 15,
  },
  {
    day: 'Saturday',
    value: 12,
  },
  {
    day: 'Sunday',
    value: 3,
  },
];

const TASKS_DATA = [
  {
    day: 'Monday',
    value: 33,
    status: 'new',
  },
  {
    day: 'Tuesday',
    value: 44,
    status: 'new',
  },
  {
    day: 'Wednesday',
    value: 35,
    status: 'new',
  },
  {
    day: 'Thursday',
    value: 55,
    status: 'new',
  },
  {
    day: 'Friday',
    value: 49,
    status: 'new',
  },
  {
    day: 'Saturday',
    value: 63,
    status: 'new',
  },
  {
    day: 'Sunday',
    value: 72,
    status: 'new',
  },
  {
    day: 'Monday',
    value: 69,
    status: 'in progress',
  },
  {
    day: 'Tuesday',
    value: 81,
    status: 'in progress',
  },
  {
    day: 'Wednesday',
    value: 34,
    status: 'in progress',
  },
  {
    day: 'Thursday',
    value: 25,
    status: 'in progress',
  },
  {
    day: 'Friday',
    value: 39,
    status: 'in progress',
  },
  {
    day: 'Saturday',
    value: 45,
    status: 'in progress',
  },
  {
    day: 'Sunday',
    value: 60,
    status: 'in progress',
  },
];

const CAROUSEL_PROPS: CarouselProps = {
  slidesToShow: 1,
  slidesToScroll: 1,
};

const CARD_PROPS: CardProps = {
  style: {
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
};

export const DefaultDashboardPage = () => {
  const stylesContext = useStylesContext();
  const sliderRef1 = useRef<any>(null);
  const sliderRef2 = useRef<any>(null);
  const {
    data: tasksListData = [],
    error: tasksListError,
    loading: tasksListLoading,
  } = useFetchData('../mocks/TasksList.json');
  const {
    data: projectsData = [],
    error: projectsError,
    loading: projectsLoading,
  } = useFetchData('../mocks/Projects.json');
  const {
    data: notificationsData = [],
    error: notificationsError,
    loading: notificationsLoading,
  } = useFetchData('../mocks/Notifications.json');

  return (
    <div>
      <Helmet>
        <title>Default | Antd Dashboard</title>
      </Helmet>
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
            title: 'default',
          },
        ]}
      />
      <Row {...stylesContext?.rowProps}>
        <Col xs={24} lg={18}>
          <Row {...stylesContext?.rowProps}>
            <Col xs={24} md={24}>
              <Row {...stylesContext?.rowProps}>
                <Col xs={24} lg={18}>
                  <GetStartedCard {...CARD_PROPS} />
                </Col>
                <Col xs={24} lg={6}>
                  <Row {...stylesContext?.rowProps}>
                    <Col xs={12} lg={24}>
                      <Card>
                        <Flex vertical align="center" gap="middle">
                          <Typography.Title style={{ margin: 0 }}>
                            <CountUp end={10} />+
                          </Typography.Title>
                          <Typography.Text>Projects</Typography.Text>
                        </Flex>
                      </Card>
                    </Col>
                    <Col xs={12} lg={24}>
                      <Card>
                        <Flex vertical align="center" gap="middle">
                          <Typography.Title style={{ margin: 0 }}>
                            <CountUp end={60} />+
                          </Typography.Title>
                          <Typography.Text>Tasks</Typography.Text>
                        </Flex>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col xs={24} lg={12}>
              <WeeklyActivityCard data={ACTIVITY_DATA} />
            </Col>
            <Col xs={24} lg={12}>
              <TasksChartCard data={TASKS_DATA} />
            </Col>
            <Col span={24}>
              <TasksListCard
                data={tasksListData}
                error={tasksListError}
                loading={tasksListLoading}
              />
            </Col>
          </Row>
        </Col>
        <Col md={24} lg={6}>
          <Row {...stylesContext?.rowProps}>
            <Col span={24}>
              <Card
                title="Ongoing projects"
                extra={<Button>View all</Button>}
                bordered={false}
              >
                {projectsError ? (
                  <Alert
                    message="Error"
                    description={projectsError.toString()}
                    type="error"
                    showIcon
                  />
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
                        (o: Projects) =>
                          o.status.toLowerCase() === 'in progress'
                      )
                      .slice(0, 4)
                      .map((o: Projects) => (
                        <ProjectsCard
                          key={o.project_id}
                          project={o}
                          size="small"
                          style={{ margin: `0 8px` }}
                        />
                      ))}
                  </Carousel>
                )}
              </Card>
            </Col>
            <Col span={24}>
              <Card
                title="Queued projects"
                extra={<Button>View all</Button>}
                bordered={false}
              >
                {projectsError ? (
                  <Alert
                    message="Error"
                    description={projectsError.toString()}
                    type="error"
                    showIcon
                  />
                ) : projectsLoading ? (
                  <Loader />
                ) : (
                  <Carousel
                    ref={sliderRef2}
                    {...stylesContext?.carouselProps}
                    {...CAROUSEL_PROPS}
                  >
                    {projectsData
                      .filter(
                        (o: Projects) => o.status.toLowerCase() === 'on hold'
                      )
                      .slice(0, 4)
                      .map((o: Projects) => (
                        <ProjectsCard
                          key={o.project_id}
                          project={o}
                          size="small"
                          style={{ margin: `0 8px` }}
                        />
                      ))}
                  </Carousel>
                )}
              </Card>
            </Col>
            <Col span={24}>
              <NotificationsCard
                data={notificationsData}
                error={notificationsError}
                loading={notificationsLoading}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
