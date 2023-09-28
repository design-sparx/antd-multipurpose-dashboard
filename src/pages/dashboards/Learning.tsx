import {Col, Row, RowProps} from "antd";
import {
    FileProtectOutlined,
    FileSyncOutlined,
    HomeOutlined,
    PieChartOutlined,
    SafetyCertificateOutlined,
    UsergroupAddOutlined
} from "@ant-design/icons";
import {
    CommunityGroupCard,
    CoursesCard,
    CoursesCarousel,
    ExamsCard,
    LearningStatsCard,
    PageHeader,
    ProgressCard,
    StudyStatisticsCard
} from "../../components";
import CoursesData from "../../mocks/Courses.json"
import RecommendedCourseData from "../../mocks/RecommendedCourses.json"
import StudyStatisticsData from "../../mocks/StudyStatistics.json";
import ExamsData from "../../mocks/Exams.json";
import CommunityGroupsData from "../../mocks/CommunityGroups.json";
import {DASHBOARD_ITEMS} from "../../constants";
import {Link} from "react-router-dom";

const ROW_PROPS: RowProps = {
    gutter: [
        {xs: 8, sm: 16, md: 24, lg: 32},
        {xs: 8, sm: 16, md: 24, lg: 32}
    ]
}

const LearningDashboardPage = () => {
    return (
        <div>
            <PageHeader
                title="learning dashboard"
                breadcrumbs={[
                    {
                        title: (<><HomeOutlined/><span>home</span></>),
                        path: "/"
                    },
                    {
                        title: (<><PieChartOutlined/><span>dashboards</span></>),
                        menu: {
                            items: DASHBOARD_ITEMS.map(d => ({
                                key: d.title,
                                title: <Link to={d.path}>{d.title}</Link>,
                            }))
                        }
                    },
                    {
                        title: "learning"
                    }
                ]}
            />
            <Row {...ROW_PROPS}>
                <Col xs={24} lg={18}>
                    <Row {...ROW_PROPS}>
                        <Col xs={24} sm={12} lg={6}>
                            <LearningStatsCard
                                title="Courses in Progress"
                                value={18}
                                icon={FileSyncOutlined}
                                color="orange"
                                progress={30}
                            />
                        </Col>
                        <Col xs={24} sm={12} lg={6}>
                            <LearningStatsCard
                                title="Courses completed"
                                value={97}
                                icon={FileProtectOutlined}
                                color="green"
                                progress={90}
                            />
                        </Col>
                        <Col xs={24} sm={12} lg={6}>
                            <LearningStatsCard
                                title="Certificates earned"
                                value={62}
                                icon={SafetyCertificateOutlined}
                                color="blue"
                                progress={76}
                            />
                        </Col>
                        <Col xs={24} sm={12} lg={6}>
                            <LearningStatsCard
                                title="Community support"
                                value={245}
                                icon={UsergroupAddOutlined}
                                color="purple"
                                progress={78}
                            />
                        </Col>
                        <Col span={24}>
                            <CoursesCard data={CoursesData}/>
                        </Col>
                        <Col span={24}>
                            <StudyStatisticsCard data={StudyStatisticsData}/>
                        </Col>
                        <Col span={24}>
                            <CoursesCarousel data={RecommendedCourseData}/>
                        </Col>
                    </Row>
                </Col>
                <Col xs={24} lg={6}>
                    <Row {...ROW_PROPS}>
                        <Col span={24}>
                            <ProgressCard/>
                        </Col>
                        <Col span={24}>
                            <ExamsCard data={ExamsData}/>
                        </Col>
                        <Col span={24}>
                            <CommunityGroupCard data={CommunityGroupsData}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default LearningDashboardPage;