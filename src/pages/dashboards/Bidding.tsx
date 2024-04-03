import {
  Button,
  Col,
  Flex,
  Popover,
  Row,
  RowProps,
  Select,
  Typography,
} from 'antd';
import {
  AuctionCarousel,
  BiddingCategoriesCard,
  Card,
  CreatorsCard,
  PageHeader,
  TopItemsCard,
  TransactionsCard,
} from '../../components';
import {
  HomeOutlined,
  PieChartOutlined,
  QuestionOutlined,
} from '@ant-design/icons';
import { DASHBOARD_ITEMS } from '../../constants';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useFetchData } from '../../hooks';

const ROW_PROPS: RowProps = {
  gutter: [
    { xs: 8, sm: 16, md: 24, lg: 32 },
    { xs: 8, sm: 16, md: 24, lg: 32 },
  ],
};

export const BiddingDashboardPage = () => {
  const {
    data: auctionData,
    loading: auctionDataLoading,
    error: auctionDataError,
  } = useFetchData('../mocks/LiveAuction.json');
  const {
    data: auctionCreatorsData,
    loading: auctionCreatorsDataLoading,
    error: auctionCreatorsDataError,
  } = useFetchData('../mocks/AuctionCreators.json');
  const {
    data: topSellersData,
    loading: topSellersDataLoading,
    error: topSellersDataError,
  } = useFetchData('../mocks/BiddingTopSellers.json');
  const {
    data: transactionsData,
    loading: transactionsDataLoading,
    error: transactionsDataError,
  } = useFetchData('../mocks/BiddingTransactions.json');

  return (
    <div>
      <Helmet>
        <title>Bidding | Antd Dashboard</title>
      </Helmet>
      <PageHeader
        title="bidding dashboard"
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
            title: 'bidding',
          },
        ]}
      />
      <Row {...ROW_PROPS}>
        <Col sm={24} md={24} xl={18}>
          <Flex align="center" justify="space-between">
            <Typography.Title level={4}>Live auctions</Typography.Title>
            <Select
              defaultValue="Popular"
              style={{ width: 120 }}
              options={[
                { value: 'Popular', label: 'Popular' },
                { value: 'Trending', label: 'Trending' },
                { value: 'Following', label: 'Following' },
                { value: 'Price', label: 'Price' },
              ]}
            />
          </Flex>
          <AuctionCarousel
            data={auctionData}
            loading={auctionDataLoading}
            error={auctionDataError}
          />
        </Col>
        <Col xs={24} md={24} xl={6}>
          <Typography.Title level={4}>Account status</Typography.Title>
          <Row {...ROW_PROPS}>
            <Col md={12} xl={24}>
              <Card
                title="Wallet"
                extra={
                  <Popover content="Your account balance">
                    <Button icon={<QuestionOutlined />} type="text" />
                  </Popover>
                }
              >
                <Flex vertical gap="middle">
                  <Typography.Title level={2} className="m-0">
                    $4892.00
                  </Typography.Title>
                  <Button>Check Transactions</Button>
                </Flex>
              </Card>
            </Col>
            <Col md={12} xl={24}>
              <Card
                title="Revenue"
                extra={
                  <Popover content="Revenue is retrieved by your staked.">
                    <Button icon={<QuestionOutlined />} type="text" />
                  </Popover>
                }
              >
                <Flex vertical gap="middle">
                  <Typography.Title level={2} className="m-0">
                    $210.00
                  </Typography.Title>
                  <Button>Read</Button>
                </Flex>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col xs={24} xl={12}>
          <CreatorsCard
            data={auctionCreatorsData}
            loading={auctionCreatorsDataLoading}
            error={auctionCreatorsDataError}
          />
        </Col>
        <Col xs={24} xl={12}>
          <BiddingCategoriesCard style={{ height: '100%' }} />
        </Col>
        <Col xs={24} xl={12}>
          <TopItemsCard
            data={topSellersData}
            loading={topSellersDataLoading}
            error={topSellersDataError}
            style={{ height: '100%' }}
          />
        </Col>
        <Col xs={24} xl={12}>
          <TransactionsCard
            data={transactionsData}
            loading={transactionsDataLoading}
            error={transactionsDataError}
            style={{ height: '100%' }}
          />
        </Col>
      </Row>
    </div>
  );
};
