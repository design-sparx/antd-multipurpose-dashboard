import {useRef} from "react";
import {
    GetStartedCard,
    NotificationsCard,
    ProjectsCard,
    TasksChartCard,
    TasksListCard,
    WeeklyActivityCard
} from "../../components";
import {Button, Card, Carousel, CarouselProps, Col, Row, RowProps, Space, Typography} from "antd";
import TasksListData from "../../mocks/TasksList.json";
import ProjectsData from "../../mocks/Projects.json";
import NotificationsData from "../../mocks/Notifications.json";

const ACTIVITY_DATA = [
    {
        "day": "Monday",
        "value": 10
    },
    {
        "day": "Tuesday",
        "value": 22
    },
    {
        "day": "Wednesday",
        "value": 25
    },
    {
        "day": "Thursday",
        "value": 26
    },
    {
        "day": "Friday",
        "value": 15
    },
    {
        "day": "Saturday",
        "value": 12
    },
    {
        "day": "Sunday",
        "value": 3
    }
]

const TASKS_DATA = [
    {
        "day": "Monday",
        "value": 33,
        "status": "new"
    },
    {
        "day": "Tuesday",
        "value": 44,
        "status": "new"
    },
    {
        "day": "Wednesday",
        "value": 35,
        "status": "new"
    },
    {
        "day": "Thursday",
        "value": 55,
        "status": "new"
    },
    {
        "day": "Friday",
        "value": 49,
        "status": "new"
    },
    {
        "day": "Saturday",
        "value": 63,
        "status": "new"
    },
    {
        "day": "Sunday",
        "value": 72,
        "status": "new"
    },
    {
        "day": "Monday",
        "value": 69,
        "status": "in progress"
    },
    {
        "day": "Tuesday",
        "value": 81,
        "status": "in progress"
    },
    {
        "day": "Wednesday",
        "value": 34,
        "status": "in progress"
    },
    {
        "day": "Thursday",
        "value": 25,
        "status": "in progress"
    },
    {
        "day": "Friday",
        "value": 39,
        "status": "in progress"
    },
    {
        "day": "Saturday",
        "value": 45,
        "status": "in progress"
    },
    {
        "day": "Sunday",
        "value": 60,
        "status": "in progress"
    },
]

const DefaultDashboardPage = () => {
    const sliderRef1 = useRef<any>()
    const sliderRef2 = useRef<any>()

    const settings: CarouselProps = {
        dots: true,
        autoplay: true,
        infinite: true,
        speed: 500,
        autoplaySpeed: 10000,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    const rowProps: RowProps = {
        gutter: [{xs: 8, sm: 16, md: 24, lg: 32}, {xs: 4, sm: 8, md: 12, lg: 16}]
    }

    const subRowProps: RowProps = {
        gutter: [{xs: 4, sm: 8, md: 12, lg: 16}, {xs: 4, sm: 8, md: 12, lg: 16}]
    }

    return (
        <div>
            <Typography>Analytics Overview</Typography>
            <Row {...rowProps}>
                <Col span={18}>
                    <Row {...rowProps}>
                        <Col span={24}>
                            <Row {...subRowProps}>
                                <Col span={18}>
                                    <GetStartedCard/>
                                </Col>
                                <Col span={6}>
                                    <Row {...subRowProps}>
                                        <Col span={24}>
                                            <Card>
                                                <Space direction="vertical" align="center" style={{width: '100%'}}>
                                                    <Typography.Title>10+</Typography.Title>
                                                    <Typography.Text>Projects</Typography.Text>
                                                </Space>
                                            </Card>
                                        </Col>
                                        <Col span={24}>
                                            <Card>
                                                <Space direction="vertical" align="center" style={{width: '100%'}}>
                                                    <Typography.Title>60+</Typography.Title>
                                                    <Typography.Text>Tasks</Typography.Text>
                                                </Space>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={12}>
                            <WeeklyActivityCard data={ACTIVITY_DATA}/>
                        </Col>
                        <Col span={12}>
                            <TasksChartCard data={TASKS_DATA}/>
                        </Col>
                        <Col span={24}>
                            <TasksListCard data={TasksListData}/>
                        </Col>
                    </Row>
                </Col>
                <Col span={6}>
                    <Row {...rowProps}>
                        <Col span={24}>
                            <Card
                                title="Ongoing projects"
                                extra={<Button>View all</Button>}
                                bordered={false}
                            >
                                <Carousel ref={sliderRef1} {...settings}>
                                    {ProjectsData
                                        .filter(o => o.status.toLowerCase() === "in progress")
                                        .slice(0, 4)
                                        .map(o => <ProjectsCard
                                            key={o.project_id}
                                            project={o} size="small"
                                            style={{margin: `0 8px`}}
                                        />)}
                                </Carousel>
                            </Card>
                        </Col>
                        <Col span={24}>
                            <Card
                                title="Projects in queue"
                                extra={<Button>View all</Button>}
                                bordered={false}
                            >
                                <Carousel ref={sliderRef2} {...settings}>
                                    {ProjectsData
                                        .filter(o => o.status.toLowerCase() === "on hold")
                                        .slice(0, 4)
                                        .map(o => <ProjectsCard
                                            key={o.project_id}
                                            project={o}
                                            size="small"
                                            style={{margin: `0 8px`}}
                                        />)}
                                </Carousel>
                            </Card>
                        </Col>
                        <Col span={24}>
                            <NotificationsCard data={NotificationsData}/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default DefaultDashboardPage;
