import {Col, Row} from "antd";

const MarketingDashboardPage = () => {
    return (
        <div>
            <Row gutter={[{xs: 8, sm: 16, md: 24, lg: 32}, {xs: 4, sm: 8, md: 12, lg: 16}]}>
                <Col span={6}>
                    impression
                </Col>
                <Col span={6}>
                    clicks
                </Col>
                <Col span={6}>
                    revenue
                </Col>
                <Col span={6}>
                    cost
                </Col>
                <Col span={12}>
                    visitors from websites
                </Col>
                <Col span={4}>
                    socials stats
                </Col>
                <Col span={8}>
                    campaign activity
                </Col>
                <Col span={12}>
                    campaign performance by source
                </Col>
                <Col span={12}>
                    audience by location
                </Col>
            </Row>
        </div>
    );
};

export default MarketingDashboardPage;