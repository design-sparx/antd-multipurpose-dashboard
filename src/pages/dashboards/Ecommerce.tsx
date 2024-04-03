import {
  Alert,
  Button,
  ButtonProps,
  Col,
  Flex,
  Image,
  Popover,
  Progress,
  Row,
  Space,
  Table,
  Tag,
  TagProps,
  Typography,
} from 'antd';
import {
  Card,
  CustomerReviewsCard,
  PageHeader,
  RevenueCard,
  UserAvatar,
} from '../../components';
import { Area, Bullet, Pie } from '@ant-design/charts';
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  HomeOutlined,
  PieChartOutlined,
  QuestionOutlined,
  StarFilled,
  SyncOutlined,
} from '@ant-design/icons';
import { DASHBOARD_ITEMS } from '../../constants';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useStylesContext } from '../../context';
import { createElement, CSSProperties } from 'react';
import { useFetchData } from '../../hooks';
import { blue, green, red, yellow } from '@ant-design/colors';
import CountUp from 'react-countup';
import { numberWithCommas } from '../../utils';

const { Text, Title } = Typography;

const SalesChart = () => {
  const data = [
    {
      country: 'Online Store',
      date: 'Jan',
      value: 1390.5,
    },
    {
      country: 'Online Store',
      date: 'Feb',
      value: 1469.5,
    },
    {
      country: 'Online Store',
      date: 'Mar',
      value: 1521.7,
    },
    {
      country: 'Online Store',
      date: 'Apr',
      value: 1615.9,
    },
    {
      country: 'Online Store',
      date: 'May',
      value: 1703.7,
    },
    {
      country: 'Online Store',
      date: 'Jun',
      value: 1767.8,
    },
    {
      country: 'Online Store',
      date: 'Jul',
      value: 1806.2,
    },
    {
      country: 'Online Store',
      date: 'Aug',
      value: 1903.5,
    },
    {
      country: 'Online Store',
      date: 'Sept',
      value: 1986.6,
    },
    {
      country: 'Online Store',
      date: 'Oct',
      value: 1952,
    },
    {
      country: 'Online Store',
      date: 'Nov',
      value: 1910.4,
    },
    {
      country: 'Online Store',
      date: 'Dec',
      value: 2015.8,
    },
    {
      country: 'Facebook',
      date: 'Jan',
      value: 109.2,
    },
    {
      country: 'Facebook',
      date: 'Feb',
      value: 115.7,
    },
    {
      country: 'Facebook',
      date: 'Mar',
      value: 120.5,
    },
    {
      country: 'Facebook',
      date: 'Apr',
      value: 128,
    },
    {
      country: 'Facebook',
      date: 'May',
      value: 134.4,
    },
    {
      country: 'Facebook',
      date: 'Jun',
      value: 142.2,
    },
    {
      country: 'Facebook',
      date: 'Jul',
      value: 157.5,
    },
    {
      country: 'Facebook',
      date: 'Aug',
      value: 169.5,
    },
    {
      country: 'Facebook',
      date: 'Sept',
      value: 186.3,
    },
    {
      country: 'Facebook',
      date: 'Oct',
      value: 195.5,
    },
    {
      country: 'Facebook',
      date: 'Nov',
      value: 198,
    },
    {
      country: 'Facebook',
      date: 'Dec',
      value: 211.7,
    },
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
};

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
};

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
      content: ({ percent }: any) => `${(percent * 100).toFixed(0)}%`,
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
    render: (_: any, { product_name, brand }: any) => (
      <Flex gap="small" align="center">
        <Image src={brand} width={16} height={16} />
        <Text style={{ width: 160 }}>{product_name}</Text>
      </Flex>
    ),
  },
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
    render: (_: any) => <span className="text-capitalize">{_}</span>,
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: (_: any) => <span>$ {_}</span>,
  },
  {
    title: 'Avg rating',
    dataIndex: 'average_rating',
    key: 'average_rating',
    render: (_: any) => (
      <Flex align="center" gap="small">
        {_}
        <StarFilled style={{ fontSize: 12 }} />{' '}
      </Flex>
    ),
  },
];

const CATEGORIES_COLUMNS = [
  {
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: (_: any) => <span>$ {_}</span>,
  },
  {
    title: 'Avg rating',
    dataIndex: 'rating',
    key: 'rating',
    render: (_: any) => (
      <Flex align="center" gap="small">
        {_}
        <StarFilled style={{ fontSize: 12 }} />{' '}
      </Flex>
    ),
  },
];

const SELLER_COLUMNS = [
  {
    title: 'Name',
    dataIndex: 'first_name',
    key: 'first_name',
    render: (_: any, { first_name, last_name }: any) => (
      <UserAvatar fullName={`${first_name} ${last_name}`} />
    ),
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
    render: (_: any) => <Link to={`mailto:${_}`}>{_}</Link>,
  },
  {
    title: 'Region',
    dataIndex: 'sales_region',
    key: 'sales_region',
  },
  {
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
  },
  {
    title: 'Volume',
    dataIndex: 'sales_volume',
    key: 'sales_volume',
    render: (_: any) => <span>{numberWithCommas(Number(_))}</span>,
  },
  {
    title: 'Amount',
    dataIndex: 'total_sales',
    key: 'total_sales',
    render: (_: any) => <span>${numberWithCommas(Number(_))}</span>,
  },
  {
    title: 'Satisfaction rate',
    dataIndex: 'customer_satisfaction',
    key: 'customer_satisfaction',
    render: (_: any) => {
      let color;

      if (_ < 20) {
        color = red[5];
      } else if (_ > 21 && _ < 50) {
        color = yellow[6];
      } else if (_ > 51 && _ < 70) {
        color = blue[5];
      } else {
        color = green[6];
      }

      return <Progress percent={_} strokeColor={color} />;
    },
  },
];

const ORDERS_COLUMNS = [
  {
    title: 'Tracking No.',
    dataIndex: 'tracking_number',
    key: 'tracking_number',
  },
  {
    title: 'Customer',
    dataIndex: 'customer_name',
    key: 'customer_name',
    render: (_: any) => <UserAvatar fullName={_} />,
  },
  {
    title: 'Date',
    dataIndex: 'order_date',
    key: 'order_date',
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: (_: any) => <span>$ {_}</span>,
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: (_: any) => {
      let color: TagProps['color'], icon: any;

      if (_ === 'shipped') {
        color = 'magenta-inverse';
        icon = ClockCircleOutlined;
      } else if (_ === 'processing') {
        color = 'blue-inverse';
        icon = SyncOutlined;
      } else if (_ === 'delivered') {
        color = 'green-inverse';
        icon = CheckCircleOutlined;
      } else {
        color = 'volcano-inverse';
        icon = ExclamationCircleOutlined;
      }

      return (
        <Tag
          className="text-capitalize"
          color={color}
          icon={createElement(icon)}
        >
          {_}
        </Tag>
      );
    },
  },
  {
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
  },
  {
    title: 'Address',
    dataIndex: 'shipping_address',
    key: 'shipping_address',
  },
];

const POPOVER_BUTTON_PROPS: ButtonProps = {
  type: 'text',
};

const cardStyles: CSSProperties = {
  height: '100%',
};

export const EcommerceDashboardPage = () => {
  const stylesContext = useStylesContext();
  const {
    data: topProducts,
    error: topProductsError,
    loading: topProductsLoading,
  } = useFetchData('../mocks/TopProducts.json');
  const {
    data: topCategories,
    error: topCategoriesError,
    loading: topCategoriesLoading,
  } = useFetchData('../mocks/TopCategories.json');
  const {
    data: topSellers,
    error: topSellersError,
    loading: topSellersLoading,
  } = useFetchData('../mocks/TopSeller.json');
  const {
    data: recentOrders,
    error: recentOrdersError,
    loading: recentOrdersLoading,
  } = useFetchData('../mocks/RecentOrders.json');

  return (
    <div>
      <Helmet>
        <title>Ecommerce | Antd Dashboard</title>
      </Helmet>
      <PageHeader
        title="ecommerce dashboard"
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
            title: 'ecommerce',
          },
        ]}
      />
      <Row {...stylesContext?.rowProps}>
        <Col sm={24} lg={16}>
          <Row {...stylesContext?.rowProps}>
            <Col xs={24} sm={12}>
              <RevenueCard
                title="Visitors"
                value={20149}
                diff={5.54}
                height={180}
                justify="space-between"
              />
            </Col>
            <Col xs={24} sm={12}>
              <RevenueCard
                title="Customers"
                value={5834}
                diff={-12.3}
                height={180}
                justify="space-between"
              />
            </Col>
            <Col xs={24} sm={12}>
              <RevenueCard
                title="Orders"
                value={3270}
                diff={9.52}
                height={180}
                justify="space-between"
              />
            </Col>
            <Col xs={24} sm={12}>
              <RevenueCard
                title="Sales"
                value="$ 1.324K"
                diff={2.34}
                height={180}
                justify="space-between"
              />
            </Col>
          </Row>
        </Col>
        <Col sm={24} lg={8}>
          <CustomerReviewsCard />
        </Col>
        <Col xs={24} lg={12}>
          <Card
            title="Overall sales"
            extra={
              <Popover content="Total sales over period x" title="Total sales">
                <Button icon={<QuestionOutlined />} {...POPOVER_BUTTON_PROPS} />
              </Popover>
            }
            style={cardStyles}
          >
            <Flex vertical gap="middle">
              <Space>
                <Title level={3} style={{ margin: 0 }}>
                  $ <CountUp end={24485.67} />
                </Title>
                <Tag color="green-inverse" icon={<ArrowUpOutlined />}>
                  8.7%
                </Tag>
              </Space>
              <SalesChart />
            </Flex>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card
            title="Categories"
            extra={
              <Popover content="Sales per categories" title="Categories sales">
                <Button icon={<QuestionOutlined />} {...POPOVER_BUTTON_PROPS} />
              </Popover>
            }
            style={cardStyles}
          >
            <CategoriesChart />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card
            title="Orders by status"
            extra={
              <Popover content="Orders by status" title="Orders">
                <Button icon={<QuestionOutlined />} {...POPOVER_BUTTON_PROPS} />
              </Popover>
            }
            style={cardStyles}
          >
            <OrdersStatusChart />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Flex vertical gap="middle">
            <Card
              title="Conversion rate"
              extra={
                <Popover
                  content="Customer conversion rate"
                  title="Conversion rate"
                >
                  <Button
                    icon={<QuestionOutlined />}
                    {...POPOVER_BUTTON_PROPS}
                  />
                </Popover>
              }
            >
              <Flex vertical gap="middle" justify="center">
                <Typography.Title style={{ margin: 0 }}>8.48%</Typography.Title>
                <Row>
                  <Col sm={24} lg={8}>
                    <Space direction="vertical">
                      <Text>Added to cart</Text>
                      <Text type="secondary">5 visits</Text>
                    </Space>
                  </Col>
                  <Col sm={24} lg={8}>
                    <Text className="text-end" strong>
                      $ <CountUp end={27483.7} decimals={2} />
                    </Text>
                  </Col>
                  <Col sm={24} lg={8}>
                    <Tag color="green-inverse" icon={<ArrowUpOutlined />}>
                      16.8%
                    </Tag>
                  </Col>
                </Row>
                <Row>
                  <Col sm={24} lg={8}>
                    <Space direction="vertical">
                      <Text>Reached to Checkout</Text>
                      <Text type="secondary">23 visits</Text>
                    </Space>
                  </Col>
                  <Col sm={24} lg={8}>
                    <Text className="text-end" strong>
                      $ <CountUp end={145483.7} decimals={2} />
                    </Text>
                  </Col>
                  <Col sm={24} lg={8}>
                    <Tag color="red-inverse" icon={<ArrowDownOutlined />}>
                      -46.8%
                    </Tag>
                  </Col>
                </Row>
              </Flex>
            </Card>
            <Card title="Customer rate">
              <div style={{ height: 80, textAlign: 'center' }}>
                <CustomerRateChart />
              </div>
            </Card>
          </Flex>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Popular products" style={cardStyles}>
            {topProductsError ? (
              <Alert
                message="Error"
                description={topProductsError.toString()}
                type="error"
                showIcon
              />
            ) : (
              <Table
                columns={PRODUCTS_COLUMNS}
                dataSource={topProducts}
                loading={topProductsLoading}
                className="overflow-scroll"
              />
            )}
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Popular categories" style={cardStyles}>
            {topCategoriesError ? (
              <Alert
                message="Error"
                description={topCategoriesError.toString()}
                type="error"
                showIcon
              />
            ) : (
              <Table
                columns={CATEGORIES_COLUMNS}
                dataSource={topCategories}
                loading={topCategoriesLoading}
                className="overflow-scroll"
              />
            )}
          </Card>
        </Col>
        <Col span={24}>
          <Card title="Top sellers">
            {topSellersError ? (
              <Alert
                message="Error"
                description={topSellersError.toString()}
                type="error"
                showIcon
              />
            ) : (
              <Table
                columns={SELLER_COLUMNS}
                dataSource={topSellers}
                loading={topSellersLoading}
                className="overflow-scroll"
              />
            )}
          </Card>
        </Col>
        <Col span={24}>
          <Card title="Recent orders">
            {recentOrdersError ? (
              <Alert
                message="Error"
                description={recentOrdersError.toString()}
                type="error"
                showIcon
              />
            ) : (
              <Table
                columns={ORDERS_COLUMNS}
                dataSource={recentOrders}
                loading={recentOrdersLoading}
                className="overflow-scroll"
              />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};
