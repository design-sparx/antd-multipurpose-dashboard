import {Col, Row, RowProps} from "antd";
import {
    MarketingSocialStatsCard,
    MarketingStatsCard,
    VisitorsChartCard,
    CampaignsActivity,
    CampaignsAdsCard,
    AudienceLocationChart, PageHeader
} from "../../components";
import {HomeOutlined, PieChartOutlined} from "@ant-design/icons";
import {DASHBOARD_ITEMS} from "../../constants";
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet-async";

const ROW_PROPS: RowProps = {
    gutter: [
        {xs: 8, sm: 16, md: 24, lg: 32},
        {xs: 8, sm: 16, md: 24, lg: 32}
    ]
}

const MarketingDashboardPage = () => {
    return (
        <div>
            <Helmet>
                <title>Marketing | Antd Dashboard</title>
            </Helmet>
            <PageHeader
                title="marketing dashboard"
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
                        title: "marketing"
                    }
                ]}
            />
            <Row {...ROW_PROPS}>
                <Col xs={24} sm={12} lg={6}>
                    <MarketingStatsCard data={[274, 337, 81, 497]} title='impressions' diff={12.5} value={2216869}/>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <MarketingStatsCard data={[20, 40, 80, 50]} title='clicks' diff={-2.1} value={2216869}/>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <MarketingStatsCard data={[497, 81, 274, 337,]} title='revenue' diff={34.6} value='$9,321.92'/>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <MarketingStatsCard data={[337, 274, 497, 81]} title='cost' diff={6.3} value='$5,550.00'/>
                </Col>
                <Col xs={24} lg={12}>
                    <VisitorsChartCard/>
                </Col>
                <Col xs={24} lg={12}>
                    <MarketingSocialStatsCard/>
                </Col>
                <Col xs={24} lg={8}>
                    <CampaignsActivity/>
                </Col>
                <Col xs={24} lg={14}>
                    <CampaignsAdsCard/>
                </Col>
                <Col xs={24} lg={10}>
                    <AudienceLocationChart/>
                </Col>
            </Row>
        </div>
    );
};

export default MarketingDashboardPage;