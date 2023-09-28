import {Button, Col, Row, RowProps, Select, Space, Typography} from "antd";
import {
    AuctionCarousel,
    BiddingCategoriesCard,
    Card,
    CreatorsCard,
    PageHeader,
    TopItemsCard,
    TransactionsCard
} from "../../components";
import LiveAuctionData from "../../mocks/LiveAuction.json";
import AuctionCreatorsData from "../../mocks/AuctionCreators.json"
import TopSellingItemsData from "../../mocks/BiddingTopSellers.json"
import TransactionsData from "../../mocks/BiddingTransactions.json"
import {HomeOutlined, PieChartOutlined} from "@ant-design/icons";
import {DASHBOARD_ITEMS} from "../../constants";
import {Link} from "react-router-dom";

const ROW_PROPS: RowProps = {
    gutter: [
        {xs: 8, sm: 16, md: 24, lg: 32},
        {xs: 8, sm: 16, md: 24, lg: 32}
    ]
}

const BiddingDashboardPage = () => {
    return (
        <div>
            <PageHeader
                title="bidding dashboard"
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
                        title: "bidding"
                    }
                ]}
            />
            <Row {...ROW_PROPS}>
                <Col span={24}>
                    <Space align="center">
                        <Typography.Title level={4}>Live auction</Typography.Title>
                        <Select
                            defaultValue="Popular"
                            style={{width: 120}}
                            options={[
                                {value: 'Popular', label: 'Popular'},
                                {value: 'Trending', label: 'Trending'},
                                {value: 'Following', label: 'Following'},
                                {value: 'Price', label: 'Price'},
                            ]}
                        />
                    </Space>
                    <AuctionCarousel data={LiveAuctionData}/>
                </Col>
                <Col xs={24} lg={8}>
                    <Row {...ROW_PROPS}>
                        <Col xs={24} sm={12} lg={24}>
                            <Card title="Wallet">
                                <Typography.Title>$4892.00</Typography.Title>
                                <Typography.Text>Your account balance</Typography.Text>
                                <Button>Check Transactions</Button>
                            </Card>
                        </Col>
                        <Col xs={24} sm={12} lg={24}>
                            <Card title="Revenue">
                                <Typography.Title>$210.00</Typography.Title>
                                <Typography.Text>Revenue is retrieved by your staked.</Typography.Text>
                                <Button>Read</Button>
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col xs={24} lg={8}>
                    <CreatorsCard data={AuctionCreatorsData}/>
                </Col>
                <Col xs={24} lg={8}>
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