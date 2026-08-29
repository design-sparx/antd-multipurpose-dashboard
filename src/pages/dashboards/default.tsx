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
import { useTasks, useProjects, useNotifications } from '../../lib/queries';
import { Projects, Tasks, Notifications } from '../../types';
import { ACTIVITY_DATA, CARD_PROPS, TASKS_DATA } from './default-data';
import { DashboardFiltersDrawer } from './DashboardFiltersDrawer';
import { ProjectCarouselCard } from './ProjectCarouselCard';
import { StatCards } from './StatCards';

export const DefaultDashboardPage = () => {
  const stylesContext = useStylesContext();
  const [filterOpen, setFilterOpen] = useState(false);

  const { data: tasksListDataRaw, error: tasksListError, isLoading: tasksListLoading } =
    useTasks();
  const tasksListData = tasksListDataRaw ?? [];

  const { data: projectsDataRaw, error: projectsError, isLoading: projectsLoading } =
    useProjects();
  const projectsData = projectsDataRaw ?? [];

  const { data: notificationsDataRaw, error: notificationsError, isLoading: notificationsLoading } =
    useNotifications();
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
            data={tasksListData as unknown as Tasks[]}
            error={tasksListError?.toString()}
            loading={tasksListLoading}
          />
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <ProjectCarouselCard
            title="Ongoing projects"
            filterStatus={(o: Projects) => o.status.toLowerCase() === 'in progress'}
            projectsData={projectsData as unknown as Projects[]}
            projectsError={projectsError?.toString()}
            projectsLoading={projectsLoading}
          />
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <ProjectCarouselCard
            title="Queued projects"
            filterStatus={(o: Projects) => o.status.toLowerCase() === 'on hold'}
            projectsData={projectsData as unknown as Projects[]}
            projectsError={projectsError?.toString()}
            projectsLoading={projectsLoading}
          />
        </Col>
        <Col xs={24} lg={8}>
          <NotificationsCard
            data={notificationsData as unknown as Notifications[]}
            error={notificationsError?.toString()}
            loading={notificationsLoading}
          />
        </Col>
      </Row>
      <DashboardFiltersDrawer filterOpen={filterOpen} onClose={() => setFilterOpen(false)} />
    </div>
  );
};
