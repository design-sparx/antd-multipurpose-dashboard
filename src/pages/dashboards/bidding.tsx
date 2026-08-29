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
import {
  useLiveAuctions,
  useAuctionCreators,
  useBiddingTopSellers,
  useBiddingTransactions,
} from '../../lib/queries';
import { Bidding, AuctionCreator, AuctionSales, AuctionTransactions } from '../../types';

const ROW_PROPS: RowProps = {
  gutter: [
    { xs: 8, sm: 16, md: 24, lg: 32 },
    { xs: 8, sm: 16, md: 24, lg: 32 },
  ],
};

export const BiddingDashboardPage = () => {
  // Fetch live auction data with proper typing
  const {
    data: auctionDataRaw,
    isLoading: auctionDataLoading,
    error: auctionDataError,
  } = useLiveAuctions();
  const auctionData = auctionDataRaw ?? [];

  // Fetch auction creators data with proper typing
  const {
    data: auctionCreatorsDataRaw,
    isLoading: auctionCreatorsDataLoading,
    error: auctionCreatorsDataError,
  } = useAuctionCreators();
  const auctionCreatorsData = auctionCreatorsDataRaw ?? [];

  // Fetch top sellers data with proper typing
  const {
    data: topSellersDataRaw,
    isLoading: topSellersDataLoading,
    error: topSellersDataError,
  } = useBiddingTopSellers();
  const topSellersData = topSellersDataRaw ?? [];

  // Fetch transactions data with proper typing
  const {
    data: transactionsDataRaw,
    isLoading: transactionsDataLoading,
    error: transactionsDataError,
  } = useBiddingTransactions();
  const transactionsData = transactionsDataRaw ?? [];

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
        {/* Account status cards at top */}
        <Col xs={24} sm={12}>
          <Card
            title="Wallet"
            extra={
              <Popover content="Your account balance">
                <Button icon={<QuestionOutlined />} type="text" />
              </Popover>
            }
            style={{ height: '100%' }}
          >
            <Flex vertical gap="middle">
              <Typography.Title level={2} className="m-0">
                $4892.00
              </Typography.Title>
              <Button>Check Transactions</Button>
            </Flex>
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card
            title="Revenue"
            extra={
              <Popover content="Revenue is retrieved by your staked.">
                <Button icon={<QuestionOutlined />} type="text" />
              </Popover>
            }
            style={{ height: '100%' }}
          >
            <Flex vertical gap="middle">
              <Typography.Title level={2} className="m-0">
                $210.00
              </Typography.Title>
              <Button>Read</Button>
            </Flex>
          </Card>
        </Col>

        {/* Live auctions - full width */}
        <Col span={24}>
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
            data={auctionData as unknown as Bidding[]}
            loading={auctionDataLoading}
            error={auctionDataError?.toString()}
          />
        </Col>

        {/* Creators + Categories side by side */}
        <Col xs={24} xl={12}>
          <CreatorsCard
            data={auctionCreatorsData as unknown as AuctionCreator[]}
            loading={auctionCreatorsDataLoading}
            error={auctionCreatorsDataError?.toString()}
          />
        </Col>
        <Col xs={24} xl={12}>
          <BiddingCategoriesCard style={{ height: '100%' }} />
        </Col>
        <Col xs={24} xl={12}>
          <TopItemsCard
            data={topSellersData as unknown as AuctionSales[]}
            loading={topSellersDataLoading}
            error={topSellersDataError?.toString()}
            style={{ height: '100%' }}
          />
        </Col>
        <Col xs={24} xl={12}>
          <TransactionsCard
            data={transactionsData as unknown as AuctionTransactions[]}
            loading={transactionsDataLoading}
            error={transactionsDataError?.toString()}
            style={{ height: '100%' }}
          />
        </Col>
      </Row>
    </div>
  );
};
