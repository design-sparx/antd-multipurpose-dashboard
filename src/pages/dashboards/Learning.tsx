import {Col, Row, Space} from "antd";
import {
    FileProtectOutlined,
    FileSyncOutlined,
    SafetyCertificateOutlined,
    UsergroupAddOutlined
} from "@ant-design/icons";
import {
    CoursesCard,
    CoursesCarousel,
    ProgressCard,
    StudyStatisticsCard,
    LearningStatsCard,
    ExamsCard,
    CommunityGroupCard
} from "../../components";
import CoursesData from "../../mocks/Courses.json"
import RecommendedCourseData from "../../mocks/RecommendedCourses.json"
import StudyStatisticsData from "../../mocks/StudyStatistics.json";
import ExamsData from "../../mocks/Exams.json";
import CommunityGroupsData from "../../mocks/CommunityGroups.json";

const LearningDashboardPage = () => {
    return (
        <div>
            <Row gutter={[{xs: 8, sm: 16, md: 24, lg: 32}, {xs: 4, sm: 8, md: 12, lg: 16}]}>
                <Col span={18}>
                    <Row gutter={[{xs: 8, sm: 16, md: 24, lg: 32}, {xs: 4, sm: 8, md: 12, lg: 16}]}>
                        <Col span={6}>
                            <LearningStatsCard
                                title="Courses in Progress"
                                value={18}
                                icon={FileSyncOutlined}
                                color="orange"
                                progress={30}
                            />
                        </Col>
                        <Col span={6}>
                            <LearningStatsCard
                                title="Courses completed"
                                value={97}
                                icon={FileProtectOutlined}
                                color="green"
                                progress={90}
                            />
                        </Col>
                        <Col span={6}>
                            <LearningStatsCard
                                title="Certificates earned"
                                value={62}
                                icon={SafetyCertificateOutlined}
                                color="blue"
                                progress={76}
                            />
                        </Col>
                        <Col span={6}>
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
                <Col span={6}>
                    <Space direction="vertical" style={{width: '100%'}}>
                        <ProgressCard/>
                        <ExamsCard data={ExamsData}/>
                        <CommunityGroupCard data={CommunityGroupsData}/>
                    </Space>
                </Col>
            </Row>
        </div>
    );
};

export default LearningDashboardPage;