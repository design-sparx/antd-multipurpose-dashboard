import {
    CampaignsCard,
    CompanyUsersStats,
    EarningsCard,
    GetStartedCard,
    OrdersChart,
    SubscribersChart
} from "../../components";
import {Col, Row} from "antd";

const DefaultDasboardPage = () => {
    return (
        <div>
            <Row gutter={[{xs: 8, sm: 16, md: 24, lg: 32}, {xs: 4, sm: 8, md: 12, lg: 16}]}>
                <Col span={10}>
                    <GetStartedCard style={{height: '100%'}}/>
                </Col>
                <Col span={14}>
                    <EarningsCard style={{height: '100%'}}/>
                </Col>
                <Col span={8}>
                    <OrdersChart style={{height: '100%'}}/>
                </Col>
                <Col span={16}>
                    <SubscribersChart style={{height: '100%'}}/>
                </Col>
                <Col span={8}>
                    <CompanyUsersStats style={{height: '100%'}}/>
                </Col>
                <Col span={24}>
                    <CampaignsCard style={{height: '100%'}}/>
                </Col>
            </Row>
        </div>
    );
};

export default DefaultDasboardPage;