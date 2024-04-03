import { Col, Row } from 'antd';
import {
  AudienceLocationChart,
  CampaignsActivity,
  CampaignsAdsCard,
  MarketingSocialStatsCard,
  MarketingStatsCard,
  PageHeader,
  VisitorsChartCard,
} from '../../components';
import { HomeOutlined, PieChartOutlined } from '@ant-design/icons';
import { DASHBOARD_ITEMS } from '../../constants';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useStylesContext } from '../../context';
import { useFetchData } from '../../hooks';

export const MarketingDashboardPage = () => {
  const stylesContext = useStylesContext();
  const {
    data: campaignAds,
    error: campaignAdsError,
    loading: campaignAdsLoading,
  } = useFetchData('../mocks/CampaignAds.json');

  return (
    <div>
      <Helmet>
        <title>Marketing | Antd Dashboard</title>
      </Helmet>
      <PageHeader
        title="marketing dashboard"
        breadcrumbs={[
          {
            title: (
              <>
                <HomeOutlined />
                <span>home</span>
              </>
            ),
            path: '/',
          },
          {
            title: (
              <>
                <PieChartOutlined />
                <span>dashboards</span>
              </>
            ),
            menu: {
              items: DASHBOARD_ITEMS.map((d) => ({
                key: d.title,
                title: <Link to={d.path}>{d.title}</Link>,
              })),
            },
          },
          {
            title: 'marketing',
          },
        ]}
      />
      <Row {...stylesContext?.rowProps}>
        <Col xs={24} sm={12} lg={6}>
          <MarketingStatsCard
            data={[274, 337, 81, 497]}
            title="impressions"
            diff={12.5}
            value={16826}
            style={{ height: '100%' }}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <MarketingStatsCard
            data={[20, 40, 80, 50]}
            title="clicks"
            diff={-2.1}
            value={2216869}
            style={{ height: '100%' }}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <MarketingStatsCard
            data={[497, 81, 274, 337]}
            title="revenue"
            diff={34.6}
            value={9321.92}
            asCurrency
            style={{ height: '100%' }}
          />
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <MarketingStatsCard
            data={[337, 274, 497, 81]}
            title="cost"
            diff={6.3}
            value={5550.0}
            asCurrency
            style={{ height: '100%' }}
          />
        </Col>
        <Col xs={24} lg={12}>
          <VisitorsChartCard />
        </Col>
        <Col xs={24} lg={12}>
          <MarketingSocialStatsCard style={{ height: '100%' }} />
        </Col>
        <Col xs={24} lg={12}>
          <AudienceLocationChart />
        </Col>
        <Col xs={24} lg={12}>
          <CampaignsActivity />
        </Col>
        <Col span={24}>
          <CampaignsAdsCard
            data={campaignAds}
            loading={campaignAdsLoading}
            error={campaignAdsError}
          />
        </Col>
      </Row>
    </div>
  );
};
