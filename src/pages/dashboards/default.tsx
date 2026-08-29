import { useState } from 'react';
import {
  GetStartedCard,
  NotificationsCard,
  PageHeader,
  TasksChartCard,
  TasksListCard,
  WeeklyActivityCard,
} from '../../components';
import { Button, Col, Row } from 'antd';
import {
  HomeOutlined,
  PieChartOutlined,
  FilterOutlined,
} from '@ant-design/icons';
import { DASHBOARD_ITEMS } from '../../constants';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useStylesContext } from '../../contexts';
import { useFetchData } from '../../hooks';
import { Projects, Tasks, Notifications } from '../../types';
import { ACTIVITY_DATA, CARD_PROPS, TASKS_DATA } from './default-data';
import { DashboardFiltersDrawer } from './DashboardFiltersDrawer';
import { ProjectCarouselCard } from './ProjectCarouselCard';
import { StatCards } from './StatCards';

export const DefaultDashboardPage = () => {
  const stylesContext = useStylesContext();
  const [filterOpen, setFilterOpen] = useState(false);

  const { data: tasksListDataRaw, error: tasksListError, loading: tasksListLoading } =
    useFetchData<Tasks[]>('/antd/tasks');
  const tasksListData = tasksListDataRaw ?? [];

  const { data: projectsDataRaw, error: projectsError, loading: projectsLoading } =
    useFetchData<Projects[]>('/antd/projects');
  const projectsData = projectsDataRaw ?? [];

  const { data: notificationsDataRaw, error: notificationsError, loading: notificationsLoading } =
    useFetchData<Notifications[]>('/antd/notifications');
  const notificationsData = notificationsDataRaw ?? [];

  return (
    <div>
      <Helmet>
        <title>Default | Antd Dashboard</title>
      </Helmet>
      <PageHeader
        title="default dashboard"
        extra={[
          <Button
            key="filter"
            icon={<FilterOutlined />}
            onClick={() => setFilterOpen(true)}
          >
            Filters
          </Button>,
        ]}
        breadcrumbs={[
          { title: <><HomeOutlined /><span>home</span></>, path: '/' },
          {
            title: <><PieChartOutlined /><span>dashboards</span></>,
            menu: {
              items: DASHBOARD_ITEMS.map((d) => ({
                key: d.title,
                title: <Link to={d.path}>{d.title}</Link>,
              })),
            },
          },
          { title: 'default' },
        ]}
      />
      <Row {...stylesContext?.rowProps}>
        <Col xs={24} lg={16}>
          <GetStartedCard {...CARD_PROPS} />
        </Col>
        <Col xs={12} lg={4}>
          <StatCards />
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

        <Col xs={24} sm={12} lg={8}>
          <ProjectCarouselCard
            title="Ongoing projects"
            filterStatus={(o: Projects) => o.status.toLowerCase() === 'in progress'}
            projectsData={projectsData}
            projectsError={projectsError}
            projectsLoading={projectsLoading}
          />
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <ProjectCarouselCard
            title="Queued projects"
            filterStatus={(o: Projects) => o.status.toLowerCase() === 'on hold'}
            projectsData={projectsData}
            projectsError={projectsError}
            projectsLoading={projectsLoading}
          />
        </Col>
        <Col xs={24} lg={8}>
          <NotificationsCard
            data={notificationsData}
            error={notificationsError}
            loading={notificationsLoading}
          />
        </Col>
      </Row>
      <DashboardFiltersDrawer filterOpen={filterOpen} onClose={() => setFilterOpen(false)} />
    </div>
  );
};
