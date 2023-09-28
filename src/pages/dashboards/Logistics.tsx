import {Col, Row, RowProps} from "antd";
import {
    BlockOutlined,
    CarOutlined,
    GroupOutlined,
    HomeOutlined,
    PieChartOutlined,
    ShoppingOutlined
} from "@ant-design/icons";
import {
    DailyPlanCard,
    DeliveryAnalyticsCard,
    DeliveryRequestCard,
    DeliveryTableCard,
    LogisticsStatsCard,
    PageHeader,
    TruckListCard
} from "../../components";
import TruckDeliveryData from "../../mocks/TruckDeliveries.json";
import DeliveryAnalyticsData from "../../mocks/DeliveryAnalytics.json";
import TrucksData from "../../mocks/Trucks.json"
import DeliveryRequests from "../../mocks/TruckDeliveryRequest.json";
import {DASHBOARD_ITEMS} from "../../constants";
import {Link} from "react-router-dom";

const STATS = [
    {
        icon: BlockOutlined,
        value: 1245,
        title: 'new packages',
        diff: 16
    },
    {
        icon: ShoppingOutlined,
        value: 8482,
        title: 'ready for shipping',
        diff: 18
    },
    {
        icon: CarOutlined,
        value: 747,
        title: 'in transit',
        diff: -20
    },
    {
        icon: GroupOutlined,
        value: 10747,
        title: 'delivered',
        diff: -4.1
    },
]

const PLAN_DATA = [
    {
        type: 'Shipment processed',
        value: 38,
    },
    {
        type: 'Orders processed',
        value: 52,
    },
    {
        type: 'Requests queue',
        value: 61,
    },
];

const ROW_PROPS: RowProps = {
    gutter: [
        {xs: 8, sm: 16, md: 24, lg: 32},
        {xs: 8, sm: 16, md: 24, lg: 32}
    ]
}

const LogisticsDashboardPage = () => {
    return (
        <div>
            <PageHeader
                title="logistics dashboard"
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
                        title: "logistics"
                    }
                ]}
            />
            <Row {...ROW_PROPS}>
                {STATS.map(s => (
                    <Col xs={24} sm={12} lg={6} key={s.title}>
                        <LogisticsStatsCard {...s}/>
                    </Col>
                ))}
                <Col xs={24} lg={12}>
                    <DeliveryAnalyticsCard data={DeliveryAnalyticsData}/>
                </Col>
                <Col xs={24} lg={12}>
                    <DailyPlanCard data={PLAN_DATA}/>
                </Col>
                <Col span={24}>
                    <DeliveryTableCard data={TruckDeliveryData}/>
                </Col>
                <Col xs={24} lg={12}>
                    <TruckListCard data={TrucksData}/>
                </Col>
                <Col xs={24} lg={12}>
                    <DeliveryRequestCard data={DeliveryRequests}/>
                </Col>
            </Row>
        </div>
    );
};

export default LogisticsDashboardPage;