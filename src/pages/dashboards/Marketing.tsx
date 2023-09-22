import {Col, Row} from "antd";
import {
    MarketingSocialStatsCard,
    MarketingStatsCard,
    VisitorsChartCard,
    CampaignsActivity,
    CampaignsAdsCard,
    AudienceLocationChart
} from "../../components";

const MarketingDashboardPage = () => {
    return (
        <div>
            <Row gutter={[{xs: 8, sm: 16, md: 24, lg: 32}, {xs: 4, sm: 8, md: 12, lg: 16}]}>
                <Col span={6}>
                    <MarketingStatsCard data={[274, 337, 81, 497]} title='impressions' diff={12.5} value={2216869}/>
                </Col>
                <Col span={6}>
                    <MarketingStatsCard data={[20, 40, 80, 50]} title='clicks' diff={-2.1} value={2216869}/>
                </Col>
                <Col span={6}>
                    <MarketingStatsCard data={[497, 81, 274, 337,]} title='revenue' diff={34.6} value='$9,321.92'/>
                </Col>
                <Col span={6}>
                    <MarketingStatsCard data={[337, 274, 497, 81]} title='cost' diff={6.3} value='$5,550.00'/>
                </Col>
                <Col span={12}>
                    <VisitorsChartCard/>
                </Col>
                <Col span={4}>
                    <MarketingSocialStatsCard/>
                </Col>
                <Col span={8}>
                    <CampaignsActivity/>
                </Col>
                <Col span={14}>
                    <CampaignsAdsCard/>
                </Col>
                <Col span={10}>
                    <AudienceLocationChart/>
                </Col>
            </Row>
        </div>
    );
};

export default MarketingDashboardPage;