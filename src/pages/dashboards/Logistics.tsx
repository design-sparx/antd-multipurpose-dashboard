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
import {DASHBOARD_ITEMS} from "../../constants";
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet-async";
import {useFetchData} from "../../hooks";

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
    const {
        data: trucksDeliveryData,
        loading: trucksDeliveryDataLoading,
        error: trucksDeliveryDataError
    } = useFetchData('../mocks/TruckDeliveries.json')
    const {
        data: deliveryAnalyticsData,
        loading: deliveryAnalyticsDataLoading,
        error: deliveryAnalyticsDataError
    } = useFetchData('../mocks/DeliveryAnalytics.json')
    const {
        data: trucksData,
        loading: trucksDataLoading,
        error: trucksDataError
    } = useFetchData('../mocks/Trucks.json')
    const {
        data: trucksDeliveryRequestData,
        loading: trucksDeliveryRequestDataLoading,
        error: trucksDeliveryRequestDataError
    } = useFetchData('../mocks/TruckDeliveryRequest.json')

    return (
        <div>
            <Helmet>
                <title>Logistics | Antd Dashboard</title>
            </Helmet>
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
                    <DeliveryAnalyticsCard
                        data={deliveryAnalyticsData}
                        loading={deliveryAnalyticsDataLoading}
                        error={deliveryAnalyticsDataError}
                    />
                </Col>
                <Col xs={24} lg={12}>
                    <DailyPlanCard data={PLAN_DATA}/>
                </Col>
                <Col span={24}>
                    <DeliveryTableCard
                        data={trucksDeliveryData}
                        error={trucksDeliveryDataError}
                        loading={trucksDeliveryDataLoading}
                    />
                </Col>
                <Col xs={24} lg={12}>
                    <TruckListCard data={trucksData} loading={trucksDataLoading} error={trucksDataError}/>
                </Col>
                <Col xs={24} lg={12}>
                    <DeliveryRequestCard
                        data={trucksDeliveryRequestData}
                        loading={trucksDeliveryRequestDataLoading}
                        error={trucksDeliveryRequestDataError}
                    />
                </Col>
            </Row>
        </div>
    );
};

export default LogisticsDashboardPage;