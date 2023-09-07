import {
    CampaignsCard,
    RecentUsersCard,
    EarningsCard,
    GetStartedCard,
    OrdersChart,
    SubscribersChart, LatestOrdersCard, TimelineCard
} from "../../components";
import {Col, Row} from "antd";

const DefaultDashboardPage = () => {
    const earningsData = [
        {
            type: 'Sales',
            value: 3838,
        },
        {
            type: 'YouTube',
            value: 2722,
        },
        {
            type: 'Courses',
            value: 2411,
        },
        {
            type: 'Others',
            value: 5163,
        },
    ];

    return (
        <div>
            <Row gutter={[{xs: 8, sm: 16, md: 24, lg: 32}, {xs: 4, sm: 8, md: 12, lg: 16}]}>
                <Col span={10}>
                    <GetStartedCard style={{height: '100%'}}/>
                </Col>
                <Col span={14}>
                    <EarningsCard data={earningsData} title="Revenue stream" diff={3.1} style={{height: '100%'}}/>
                </Col>
                <Col span={8}>
                    <OrdersChart style={{height: '100%'}}/>
                </Col>
                <Col span={16}>
                    <SubscribersChart style={{height: '100%'}}/>
                </Col>
                <Col span={12}>
                    <RecentUsersCard style={{height: '100%'}}/>
                </Col>
                <Col span={12}>
                    <LatestOrdersCard style={{height: '100%'}}/>
                </Col>
                <Col span={16}>
                    <CampaignsCard style={{height: '100%'}}/>
                </Col>
                <Col span={8}>
                    <TimelineCard style={{height: '100%'}}/>
                </Col>
            </Row>
        </div>
    );
};

export default DefaultDashboardPage;