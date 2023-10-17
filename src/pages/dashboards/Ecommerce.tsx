import {Button, Col, Image, Popover, Progress, Row, RowProps, Space, Table, Tag, Typography} from "antd";
import {Card, CustomerReviewsCard, PageHeader, RevenueCard} from "../../components";
import {Area, Bullet} from "@ant-design/charts";
import {
    ArrowDownOutlined,
    ArrowUpOutlined,
    EyeOutlined,
    HomeOutlined, PieChartOutlined,
    QuestionOutlined,
    RightOutlined
} from "@ant-design/icons";
import {Pie} from "@ant-design/plots";
import TopSellingProductsData from "../../../public/mocks/TopProducts.json"
import TopCategoriesData from "../../../public/mocks/TopCategories.json"
import TopSellerData from "../../../public/mocks/TopSeller.json"
import RecentOrdersData from "../../../public/mocks/RecentOrders.json"
import {DASHBOARD_ITEMS} from "../../constants";
import {Link} from "react-router-dom";
import {Helmet} from "react-helmet-async";

const {Paragraph, Text, Title} = Typography

const SalesChart = () => {
    const data = [
        {
            "country": "Online Store",
            "date": "Jan",
            "value": 1390.5
        },
        {
            "country": "Online Store",
            "date": "Feb",
            "value": 1469.5
        },
        {
            "country": "Online Store",
            "date": "Mar",
            "value": 1521.7
        },
        {
            "country": "Online Store",
            "date": "Apr",
            "value": 1615.9
        },
        {
            "country": "Online Store",
            "date": "May",
            "value": 1703.7
        },
        {
            "country": "Online Store",
            "date": "Jun",
            "value": 1767.8
        },
        {
            "country": "Online Store",
            "date": "Jul",
            "value": 1806.2
        },
        {
            "country": "Online Store",
            "date": "Aug",
            "value": 1903.5
        },
        {
            "country": "Online Store",
            "date": "Sept",
            "value": 1986.6
        },
        {
            "country": "Online Store",
            "date": "Oct",
            "value": 1952
        },
        {
            "country": "Online Store",
            "date": "Nov",
            "value": 1910.4
        },
        {
            "country": "Online Store",
            "date": "Dec",
            "value": 2015.8
        },
        {
            "country": "Facebook",
            "date": "Jan",
            "value": 109.2
        },
        {
            "country": "Facebook",
            "date": "Feb",
            "value": 115.7
        },
        {
            "country": "Facebook",
            "date": "Mar",
            "value": 120.5
        },
        {
            "country": "Facebook",
            "date": "Apr",
            "value": 128
        },
        {
            "country": "Facebook",
            "date": "May",
            "value": 134.4
        },
        {
            "country": "Facebook",
            "date": "Jun",
            "value": 142.2
        },
        {
            "country": "Facebook",
            "date": "Jul",
            "value": 157.5
        },
        {
            "country": "Facebook",
            "date": "Aug",
            "value": 169.5
        },
        {
            "country": "Facebook",
            "date": "Sept",
            "value": 186.3
        },
        {
            "country": "Facebook",
            "date": "Oct",
            "value": 195.5
        },
        {
            "country": "Facebook",
            "date": "Nov",
            "value": 198
        },
        {
            "country": "Facebook",
            "date": "Dec",
            "value": 211.7
        }
    ];

    const config = {
        data,
        xField: 'date',
        yField: 'value',
        seriesField: 'country',
        slider: {
            start: 0.1,
            end: 0.9,
        },
    };

    return <Area {...config} />;
}

const CategoriesChart = () => {
    const data = [
        {
            type: 'Appliances',
            value: 27,
        },
        {
            type: 'Electronics',
            value: 25,
        },
        {
            type: 'Clothing',
            value: 18,
        },
        {
            type: 'Shoes',
            value: 15,
        },
        {
            type: 'Food',
            value: 10,
        },
        {
            type: 'Cosmetice',
            value: 5,
        },
    ];

    const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.5,
        label: {
            type: 'inner',
            offset: '-50%',
            content: '{value}%',
            style: {
                textAlign: 'center',
                fontSize: 16,
            },
        },
        interactions: [
            {
                type: 'element-selected',
            },
            {
                type: 'element-active',
            },
        ],
        statistic: {
            title: false,
            content: {
                style: {
                    whiteSpace: 'pre-wrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontSize: 18,
                },
                content: '18,935\nsales',
            },
        },
    };

    // @ts-ignore
    return <Pie {...config} />;
}

const CustomerRateChart = () => {
    const data = [
        {
            title: '',
            ranges: [40, 70, 100],
            measures: [30, 70],
            target: 100,
        },
    ];
    const config = {
        data,
        measureField: 'measures',
        rangeField: 'ranges',
        targetField: 'target',
        xField: 'title',
        color: {
            range: ['#FFbcb8', '#FFe0b0', '#bfeec8'],
            measure: ['#5B8FF9', '#61DDAA'],
            target: '#39a3f4',
        },
        label: {
            measure: {
                position: 'middle',
                style: {
                    fill: '#fff',
                },
            },
        },
        xAxis: {
            line: null,
        },
        yAxis: false,
        tooltip: {
            showMarkers: false,
            shared: true,
        },
        // customize legend
        legend: {
            custom: true,
            position: 'bottom',
            items: [
                {
                    value: 'First time',
                    name: 'First time buying',
                    marker: {
                        symbol: 'square',
                        style: {
                            fill: '#5B8FF9',
                            r: 5,
                        },
                    },
                },
                {
                    value: 'Returning',
                    name: 'Returning',
                    marker: {
                        symbol: 'square',
                        style: {
                            fill: '#61DDAA',
                            r: 5,
                        },
                    },
                },
            ],
        },
    };
    // @ts-ignore
    return <Bullet {...config} />;
};

const OrdersStatusChart = () => {
    const data = [
        {
            type: 'Success',
            value: 27,
        },
        {
            type: 'Pending',
            value: 55,
        },
        {
            type: 'Failed',
            value: 18,
        },
    ];
    const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.9,
        label: {
            type: 'inner',
            offset: '-30%',
            content: ({percent}: any) => `${(percent * 100).toFixed(0)}%`,
            style: {
                fontSize: 14,
                textAlign: 'center',
            },
        },
        interactions: [
            {
                type: 'element-active',
            },
        ],
    };

    // @ts-ignore
    return <Pie {...config} />;
};

const PRODUCTS_COLUMNS = [
    {
        title: 'Name',
        dataIndex: 'product_name',
        key: 'product_name',
        render: (_: any, {product_name, brand}: any) => (
            <Space>
                <Image src={brand} width={16} height={16}/>
                <Text>{product_name}</Text>
            </Space>
        )
    },
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category'
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price'
    },
    {
        title: 'Avg rating',
        dataIndex: 'average_rating',
        key: 'average_rating'
    },
]

const CATEGORIES_COLUMNS = [
    {
        title: 'Category',
        dataIndex: 'category',
        key: 'category'
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price'
    },
    {
        title: 'Avg rating',
        dataIndex: 'rating',
        key: 'rating'
    },
]

const SELLER_COLUMNS = [
    {
        title: 'name',
        dataIndex: 'first_name',
        key: 'first_name',
        render: (_: any, {first_name, last_name}: any) => (
            <Space>
                <Image/>
                <Text>{first_name}{' '}{last_name}</Text>
            </Space>
        )
    },
    {
        title: 'Email',
        dataIndex: 'email',
        key: 'email'
    },
    {
        title: 'Region',
        dataIndex: 'sales_region',
        key: 'sales_region'
    },
    {
        title: 'Country',
        dataIndex: 'country',
        key: 'country'
    },
    {
        title: 'Sales volume',
        dataIndex: 'sales_volume',
        key: 'sales_volume'
    },
    {
        title: 'Total sales',
        dataIndex: 'total_sales',
        key: 'total_sales'
    },
    {
        title: 'Satisfaction rate',
        dataIndex: 'customer_satisfaction',
        key: 'customer_satisfaction',
        render: (_: any, {customer_satisfaction}: any) => (
            <Progress percent={customer_satisfaction}/>
        )
    },
]

const ORDERS_COLUMNS = [
    {
        title: 'ID',
        dataIndex: 'order_id',
        key: 'order_id'
    },
    {
        title: 'Name',
        dataIndex: 'customer_name',
        key: 'customer_name'
    },
    {
        title: 'Date',
        dataIndex: 'order_date',
        key: 'order_date'
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price'
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity'
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status'
    },
    {
        title: 'Country',
        dataIndex: 'country',
        key: 'country'
    },
    {
        title: 'Address',
        dataIndex: 'shipping_address',
        key: 'shipping_address'
    },
    {
        title: 'Tracking',
        dataIndex: 'tracking_number',
        key: 'tracking_number'
    },
]

const ROW_PROPS: RowProps = {
    gutter: [
        {xs: 8, sm: 16, md: 24, lg: 32},
        {xs: 8, sm: 16, md: 24, lg: 32}
    ]
}

const EcommerceDashboardPage = () => {
    return (
        <div>
            <Helmet>
                <title>Ecommerce | Antd Dashboard</title>
            </Helmet>
            <PageHeader
                title="ecommerce dashboard"
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
                        title: "ecommerce"
                    }
                ]}
            />
            <Row {...ROW_PROPS}>
                <Col xs={24} lg={16}>
                    <Row {...ROW_PROPS}>
                        <Col xs={24} sm={12} lg={6}>
                            <RevenueCard title="Visitors" value="20,149" diff={5.54}/>
                        </Col>
                        <Col xs={24} sm={12} lg={6}>
                            <RevenueCard title="Customers" value="5,834" diff={-12.3}/>
                        </Col>
                        <Col xs={24} sm={12} lg={6}>
                            <RevenueCard title="Orders" value="3,270" diff={9.52}/>
                        </Col>
                        <Col xs={24} sm={12} lg={6}>
                            <RevenueCard title="Sales" value="$ 1.324K" diff={2.34}/>
                        </Col>
                        <Col xs={24} lg={12}>
                            <Card
                                title={
                                    <Space>
                                        <Title level={5}>Total sales</Title>
                                        <Popover content="Total sales over period x" title="Total sales">
                                            <Button icon={<QuestionOutlined/>}/>
                                        </Popover>
                                    </Space>
                                }
                                extra={
                                    <Button>View report{' '}
                                        <RightOutlined/>
                                    </Button>
                                }
                            >
                                <Space>
                                    <Title>$ 24,485.67</Title>
                                    <Tag color="success" icon={<ArrowUpOutlined/>}>8.7%</Tag>
                                </Space>
                                <SalesChart/>
                            </Card>
                        </Col>
                        <Col xs={24} lg={12}>
                            <Card
                                title={
                                    <Space>
                                        <Title level={5}>Categories</Title>
                                        <Popover content="Total sales over period x" title="Total sales">
                                            <Button icon={<QuestionOutlined/>}/>
                                        </Popover>
                                    </Space>
                                }
                                extra={
                                    <Button>View statistic{' '}
                                        <RightOutlined/>
                                    </Button>
                                }
                            >
                                <CategoriesChart/>
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col xs={24} lg={8}>
                    <CustomerReviewsCard/>
                </Col>
                <Col xs={24} lg={8}>
                    <Card
                        title={
                            <Space>
                                <Title level={5}>Order status</Title>
                                <Popover content="Total sales over period x" title="Total sales">
                                    <Button icon={<QuestionOutlined/>}/>
                                </Popover>
                            </Space>
                        }
                        extra={
                            <Button>Compare{' '}
                                <RightOutlined/>
                            </Button>
                        }
                    >
                        <OrdersStatusChart/>
                    </Card>
                </Col>
                <Col xs={24} lg={8}>
                    <Card
                        title={
                            <Space>
                                <Title level={5}>Conversion rate</Title>
                                <Popover content="Total sales over period x" title="Total sales">
                                    <Button icon={<QuestionOutlined/>}/>
                                </Popover>
                            </Space>
                        }
                        extra={
                            <Button>Compare{' '}
                                <RightOutlined/>
                            </Button>
                        }
                    >
                        <Typography.Title>8.48%</Typography.Title>
                        <Space align="start" style={{width: '100%', justifyContent: 'space-between'}}>
                            <Space direction="vertical">
                                <Paragraph>Added to cart</Paragraph>
                                <Text type="secondary">5 visits</Text>
                            </Space>
                            <Text>$27,483.70</Text>
                            <Tag color="success" icon={<ArrowUpOutlined/>}>16.8%</Tag>
                        </Space>
                        <Space align="start" style={{width: '100%', justifyContent: 'space-between'}}>
                            <Space direction="vertical">
                                <Paragraph>Reached to Checkout</Paragraph>
                                <Text type="secondary">23 visits</Text>
                            </Space>
                            <Text>$145,483.70</Text>
                            <Tag color="error" icon={<ArrowDownOutlined/>}>-46.8%</Tag>
                        </Space>
                    </Card>
                </Col>
                <Col xs={24} lg={8}>
                    <Card
                        title={
                            <Space>
                                <Title level={5}>Customer rate</Title>
                                <Popover content="Total sales over period x" title="Total sales">
                                    <Button icon={<QuestionOutlined/>}/>
                                </Popover>
                            </Space>
                        }
                        extra={
                            <Button>Live view{' '}
                                <EyeOutlined/>
                            </Button>
                        }
                    >
                        <div style={{height: 80, textAlign: 'center'}}>
                            <CustomerRateChart/>
                        </div>
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card title={
                        <Space>
                            <Title level={5}>Top selling products</Title>
                            <Popover content="Total sales over period x" title="Total sales">
                                <Button icon={<QuestionOutlined/>}/>
                            </Popover>
                        </Space>
                    }>
                        <Table columns={PRODUCTS_COLUMNS} dataSource={TopSellingProductsData}/>
                    </Card>
                </Col>
                <Col xs={24} lg={12}>
                    <Card
                        title={
                            <Space>
                                <Title level={5}>Top categories</Title>
                                <Popover content="Total sales over period x" title="Total sales">
                                    <Button icon={<QuestionOutlined/>}/>
                                </Popover>
                            </Space>
                        }
                    >
                        <Table columns={CATEGORIES_COLUMNS} dataSource={TopCategoriesData}/>
                    </Card>
                </Col>
                <Col span={24}>
                    <Card title={
                        <Space>
                            <Title level={5}>Top sellers</Title>
                            <Popover content="Total sales over period x" title="Total sales">
                                <Button icon={<QuestionOutlined/>}/>
                            </Popover>
                        </Space>
                    }>
                        <Table columns={SELLER_COLUMNS} dataSource={TopSellerData}/>
                    </Card>
                </Col>
                <Col span={24}>
                    <Card
                        title={
                            <Space>
                                <Title level={5}>Recent orders</Title>
                                <Popover content="Total sales over period x" title="Total sales">
                                    <Button icon={<QuestionOutlined/>}/>
                                </Popover>
                            </Space>
                        }
                    >
                        <Table columns={ORDERS_COLUMNS} dataSource={RecentOrdersData}/>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default EcommerceDashboardPage;