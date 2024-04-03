import { Col, Row } from 'antd';
import {
  FileProtectOutlined,
  FileSyncOutlined,
  HomeOutlined,
  PieChartOutlined,
  SafetyCertificateOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import {
  CommunityGroupCard,
  CoursesCard,
  CoursesCarousel,
  ExamsCard,
  LearningStatsCard,
  PageHeader,
  ProgressCard,
  StudyStatisticsCard,
} from '../../components';
import { DASHBOARD_ITEMS } from '../../constants';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useFetchData } from '../../hooks';
import { useStylesContext } from '../../context';

export const LearningDashboardPage = () => {
  const stylesContext = useStylesContext();
  const {
    data: coursesData,
    loading: coursesDataLoading,
    error: coursesDataError,
  } = useFetchData('../mocks/Courses.json');
  const {
    data: studyData,
    loading: studyDataLoading,
    error: studyDataError,
  } = useFetchData('../mocks/StudyStatistics.json');
  const {
    data: recommendedCoursesData,
    loading: recommendedCoursesDataLoading,
    error: recommendedCoursesDataError,
  } = useFetchData('../mocks/RecommendedCourses.json');
  const {
    data: examsData,
    loading: examsDataLoading,
    error: examsDataError,
  } = useFetchData('../mocks/Exams.json');
  const {
    data: communitiesData,
    loading: communitiesDataLoading,
    error: communitiesDataError,
  } = useFetchData('../mocks/CommunityGroups.json');

  return (
    <div>
      <Helmet>
        <title>Learning | Antd Dashboard</title>
      </Helmet>
      <PageHeader
        title="learning dashboard"
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
            title: 'learning',
          },
        ]}
      />
      <Row {...stylesContext?.rowProps}>
        <Col xs={24} xl={18}>
          <Row {...stylesContext?.rowProps}>
            <Col xs={24} sm={12} xl={6}>
              <LearningStatsCard
                title="Courses in Progress"
                value={18}
                icon={FileSyncOutlined}
                color="teal"
                progress={30}
                style={{ height: '100%' }}
              />
            </Col>
            <Col xs={24} sm={12} xl={6}>
              <LearningStatsCard
                title="Courses completed"
                value={97}
                icon={FileProtectOutlined}
                color="green"
                progress={90}
                style={{ height: '100%' }}
              />
            </Col>
            <Col xs={24} sm={12} xl={6}>
              <LearningStatsCard
                title="Certificates earned"
                value={62}
                icon={SafetyCertificateOutlined}
                color="blue"
                progress={76}
                style={{ height: '100%' }}
              />
            </Col>
            <Col xs={24} sm={12} xl={6}>
              <LearningStatsCard
                title="Community support"
                value={245}
                icon={UsergroupAddOutlined}
                color="purple"
                progress={78}
                style={{ height: '100%' }}
              />
            </Col>
            <Col xs={24} xl={12}>
              <ProgressCard style={{ height: '100%' }} />
            </Col>
            <Col xs={24} xl={12}>
              <StudyStatisticsCard
                data={studyData}
                loading={studyDataLoading}
                error={studyDataError}
              />
            </Col>
            <Col span={24}>
              <CoursesCard
                data={coursesData}
                loading={coursesDataLoading}
                error={coursesDataError}
              />
            </Col>
          </Row>
        </Col>
        <Col xs={24} xl={6}>
          <Row {...stylesContext?.rowProps}>
            <Col span={24}>
              <ExamsCard
                data={examsData}
                loading={examsDataLoading}
                error={examsDataError}
              />
            </Col>
            <Col span={24}>
              <CommunityGroupCard
                data={communitiesData}
                loading={communitiesDataLoading}
                error={communitiesDataError}
              />
            </Col>
            <Col span={24}>
              <CoursesCarousel
                data={recommendedCoursesData}
                loading={recommendedCoursesDataLoading}
                error={recommendedCoursesDataError}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};
