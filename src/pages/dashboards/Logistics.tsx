import {Col, Row, Space} from "antd";
import {BlockOutlined, CarOutlined, GroupOutlined, ShoppingOutlined} from "@ant-design/icons";
import {
    DeliveryTableCard,
    LogisticsStatsCard,
    DeliveryAnalyticsCard,
    DailyPlanCard,
    TruckListCard,
    DeliveryRequestCard
} from "../../components";
import TruckDeliveryData from "../../mocks/TruckDeliveries.json";
import DeliveryAnalyticsData from "../../mocks/DeliveryAnalytics.json";
import TrucksData from "../../mocks/Trucks.json"
import DeliveryRequests from "../../mocks/TruckDeliveryRequest.json";

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

const LogisticsDashboardPage = () => {
    return (
        <div>
            <Space>

            </Space>
            <Row gutter={[{xs: 8, sm: 16, md: 24, lg: 32}, {xs: 4, sm: 8, md: 12, lg: 16}]}>
                {STATS.map(s => (
                    <Col span={6} key={s.title}>
                        <LogisticsStatsCard {...s}/>
                    </Col>
                ))}
                <Col span={12}>
                    <DeliveryAnalyticsCard data={DeliveryAnalyticsData}/>
                </Col>
                <Col span={12}>
                    <DailyPlanCard data={PLAN_DATA}/>
                </Col>
                <Col span={24}>
                    <DeliveryTableCard data={TruckDeliveryData}/>
                </Col>
                <Col span={12}>
                    <TruckListCard data={TrucksData}/>
                </Col>
                <Col span={12}>
                    <DeliveryRequestCard data={DeliveryRequests}/>
                </Col>
            </Row>
        </div>
    );
};

export default LogisticsDashboardPage;