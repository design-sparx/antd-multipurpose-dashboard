import {Button, Col, Row, Select, Space, Typography} from "antd";
import {AuctionCarousel, BiddingCategoriesCard, Card, CreatorsCard, TopItemsCard, TransactionsCard} from "../../components";
import LiveAuctionData from "../../mocks/LiveAuction.json";
import AuctionCreatorsData from "../../mocks/AuctionCreators.json"
import TopSellingItemsData from "../../mocks/BiddingTopSellers.json"
import TransactionsData from "../../mocks/BiddingTransactions.json"

const BiddingDashboardPage = () => {
    return (
        <div>
            <Row gutter={[{xs: 8, sm: 16, md: 24, lg: 32}, {xs: 4, sm: 8, md: 12, lg: 16}]}>
                <Col span={24}>
                    <Space align="center">
                        <Typography.Title level={4}>Live auction</Typography.Title>
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
                    </Space>
                    <AuctionCarousel data={LiveAuctionData}/>
                </Col>
                <Col span={8}>
                    <Card title="Wallet">
                        <Typography.Title>$4892.00</Typography.Title>
                        <Typography.Text>Your account balance</Typography.Text>
                        <Button>Check Transactions</Button>
                    </Card>
                    <Card title="Revenue">
                        <Typography.Title>$210.00</Typography.Title>
                        <Typography.Text>Revenue is retrieved by your staked.</Typography.Text>
                        <Button>Read</Button>
                    </Card>
                </Col>
                <Col span={8}>
                    <CreatorsCard data={AuctionCreatorsData}/>
                </Col>
                <Col span={8}>
                    <BiddingCategoriesCard/>
                </Col>
                <Col span={24}>
                    <TopItemsCard data={TopSellingItemsData}/>
                </Col>
                <Col span={24}>
                    <TransactionsCard data={TransactionsData}/>
                </Col>
            </Row>
        </div>
    );
};

export default BiddingDashboardPage;