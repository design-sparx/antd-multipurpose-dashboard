import {Button, Card, Col, Row, Segmented, Space} from "antd";
import {ClientsTable, ProjectsCard, ProjectsTable, RevenueCard} from "../../components";
import {Column} from "@ant-design/plots";
import Timeline from 'react-calendar-timeline'
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'
import ProjectsData from "../../mocks/Projects.json";
import ClientsData from "../../mocks/Clients.json"
import {Projects} from "../../types";
import {useState} from "react";
import {CloudUploadOutlined, PlusOutlined} from "@ant-design/icons";

const RevenueColumnChart = () => {
    const data = [
        {
            name: 'Income',
            period: 'Mon',
            value: 18.9,
        },
        {
            name: 'Income',
            period: 'Tue',
            value: 28.8,
        },
        {
            name: 'Income',
            period: 'Wed',
            value: 39.3,
        },
        {
            name: 'Income',
            period: 'Thur',
            value: 81.4,
        },
        {
            name: 'Income',
            period: 'Fri',
            value: 47,
        },
        {
            name: 'Income',
            period: 'Sat',
            value: 20.3,
        },
        {
            name: 'Income',
            period: 'Sun',
            value: 24,
        },
        {
            name: 'Spent',
            period: 'Mon',
            value: 12.4,
        },
        {
            name: 'Spent',
            period: 'Tue',
            value: 23.2,
        },
        {
            name: 'Spent',
            period: 'Wed',
            value: 34.5,
        },
        {
            name: 'Spent',
            period: 'Thur',
            value: 99.7,
        },
        {
            name: 'Spent',
            period: 'Fri',
            value: 52.6,
        },
        {
            name: 'Spent',
            period: 'Sat',
            value: 35.5,
        },
        {
            name: 'Spent',
            period: 'Sun',
            value: 37.4,
        },
    ];
    const config = {
        data,
        isGroup: true,
        xField: 'period',
        yField: 'value',
        seriesField: 'name',

        /** set color */
        color: ['#1ca9e6', '#f88c24'],

        /** Set spacing */
        // marginRatio: 0.1,
        label: {
            // Label data label position can be manually configured
            position: 'middle',
            // 'top', 'middle', 'bottom'
            // Configurable additional layout method
            layout: [
                // Column chart data label position automatically adjusted
                {
                    type: 'interval-adjust-position',
                }, // Data label anti-obstruction
                {
                    type: 'interval-hide-overlap',
                }, // Data label text color automatically adjusted
                {
                    type: 'adjust-color',
                },
            ],
        },
    };
    // @ts-ignore
    return <Column {...config} />;
};

const groups = [{id: 1, title: 'group 1'}, {id: 2, title: 'group 2'}]

const items = [
    {
        id: 1,
        group: 1,
        title: 'item 1',
        start_time: moment(),
        end_time: moment().add(1, 'hour')
    },
    {
        id: 2,
        group: 2,
        title: 'item 2',
        start_time: moment().add(-0.5, 'hour'),
        end_time: moment().add(0.5, 'hour')
    },
    {
        id: 3,
        group: 1,
        title: 'item 3',
        start_time: moment().add(2, 'hour'),
        end_time: moment().add(3, 'hour')
    }
]

const PROJECT_TABS = [
    {
        key: 'all',
        label: 'All projects',
    },
    {
        key: 'inProgress',
        label: 'Active',
    },
    {
        key: 'onHold',
        label: 'On Hold',
    },
];

const PROJECT_TABS_CONTENT: Record<string, React.ReactNode> = {
    all: <ProjectsTable data={ProjectsData}/>,
    inProgress: <ProjectsTable data={ProjectsData.filter(_ => _.status === 'in progress')}/>,
    onHold: <ProjectsTable data={ProjectsData.filter(_ => _.status === 'on hold')}/>,
};

const ProjectsDashboardPage = () => {
    const [projectTabsKey, setProjectsTabKey] = useState<string>('all');

    const onProjectsTabChange = (key: string) => {
        setProjectsTabKey(key);
    };

    return (
        <div>
            <Row gutter={[{xs: 8, sm: 16, md: 24, lg: 32}, {xs: 4, sm: 8, md: 12, lg: 16}]}>
                <Col span={6}>
                    <RevenueCard title="Total revenue" value='$ 1,556.30' diff={280}/>
                </Col>
                <Col span={6}>
                    <RevenueCard title="Spent this week" value='$ 1806.30' diff={180}/>
                </Col>
                <Col span={6}>
                    <RevenueCard title="Worked this week" value='35:12' diff={-10.00}/>
                </Col>
                <Col span={6}>
                    <RevenueCard title="Worked today" value='05:30:00' diff={-20.10}/>
                </Col>
                <Col span={24}>
                    <Card
                        title="Recently added projects"
                        extra={<Button>View all projects</Button>}
                    >
                        <Row gutter={[16, 16]}>
                            {ProjectsData.slice(0, 4).map((_: Projects) => {
                                return (
                                    <Col span={6} key={_.project_id}>
                                        <ProjectsCard project={_} type="inner"/>
                                    </Col>
                                )
                            })}
                        </Row>
                    </Card>
                </Col>
                <Col span={16}>
                    <Card
                        title="Project stats"
                        extra={<Segmented options={['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']}/>}
                    >
                        <RevenueColumnChart/>
                    </Card>
                </Col>
                <Col span={8}>
                    <Card title="Top clients">
                        <ClientsTable data={ClientsData.slice(0, 5)}/>
                    </Card>
                </Col>
                <Col span={24}>
                    <Card title="Daily activities" extra={<Button>See details activity</Button>}>
                        <Timeline
                            groups={groups}
                            items={items}
                            defaultTimeStart={moment().add(-12, 'hour')}
                            defaultTimeEnd={moment().add(12, 'hour')}
                        />
                    </Card>
                </Col>
                <Col span={24}>
                    <Card
                        title="Projects"
                        extra={
                            <Space>
                                <Button icon={<CloudUploadOutlined/>}>Import</Button>
                                <Button icon={<PlusOutlined/>}>New project</Button>
                            </Space>
                        }
                        tabList={PROJECT_TABS}
                        activeTabKey={projectTabsKey}
                        onTabChange={onProjectsTabChange}
                    >
                        {PROJECT_TABS_CONTENT[projectTabsKey]}
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default ProjectsDashboardPage;