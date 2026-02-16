import { useState } from 'react';
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Drawer,
  Flex,
  Row,
  Slider,
  Typography,
  Tag,
  Table,
  Progress,
} from 'antd';
import type { TableColumnsType } from 'antd';
import {
  HomeOutlined,
  PieChartOutlined,
  FilterOutlined,
  DollarOutlined,
  RiseOutlined,
  FallOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { DASHBOARD_ITEMS } from '../../constants';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useStylesContext } from '../../context';
import { PageHeader, Loader, Card } from '../../components/shared';
import { useFetchData } from '../../hooks';
import { Invoice, Expense } from '../../types';
import CountUp from 'react-countup';

const FinanceDashboard = () => {
  const stylesContext = useStylesContext();
  const [filterOpen, setFilterOpen] = useState(false);

  const {
    data: invoicesDataRaw,
    error: invoicesError,
    loading: invoicesLoading,
  } = useFetchData<Invoice[]>('/antd/invoices');

  const {
    data: expensesDataRaw,
    error: expensesError,
    loading: expensesLoading,
  } = useFetchData<Expense[]>('/antd/expenses');

  const invoicesData = invoicesDataRaw ?? [];
  const expensesData = expensesDataRaw ?? [];

  const totalRevenue = invoicesData
    .filter((i) => i.status === 'paid')
    .reduce((sum, i) => sum + i.amount, 0);

  const pendingInvoices = invoicesData.filter((i) => i.status === 'pending');
  const overdueInvoices = invoicesData.filter((i) => i.status === 'overdue');
  const totalExpenses = expensesData.reduce((sum, e) => sum + e.amount, 0);
  const netProfit = totalRevenue - totalExpenses;

  const invoiceColumns: TableColumnsType<Invoice> = [
    {
      title: 'Invoice #',
      dataIndex: 'invoice_number',
      key: 'invoice_number',
    },
    {
      title: 'Client',
      dataIndex: 'client',
      key: 'client',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `$${amount.toLocaleString()}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag
          color={
            status === 'paid'
              ? 'green'
              : status === 'pending'
                ? 'orange'
                : 'red'
          }
        >
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Due Date',
      dataIndex: 'due_date',
      key: 'due_date',
    },
  ];

  const expenseColumns: TableColumnsType<Expense> = [
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => `$${amount.toLocaleString()}`,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'completed' ? 'green' : 'blue'}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
      case 'completed':
        return '#52c41a';
      case 'pending':
        return '#faad14';
      case 'overdue':
        return '#f5222d';
      default:
        return '#d9d9d9';
    }
  };

  return (
    <div>
      <Helmet>
        <title>Finance Dashboard</title>
      </Helmet>
      <PageHeader
        title="finance dashboard"
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
            title: 'finance',
          },
        ]}
        extra={[
          <Button
            key="filter"
            icon={<FilterOutlined />}
            onClick={() => setFilterOpen(true)}
          >
            Filters
          </Button>,
        ]}
      />

      <Row {...stylesContext?.rowProps}>
        {/* KPI cards - top row for immediate visibility */}
        <Col xs={12} sm={12} lg={6}>
          <Card style={{ height: '100%' }}>
            <Flex vertical align="center" gap="small">
              <DollarOutlined style={{ fontSize: 24, color: '#1890ff' }} />
              <Typography.Title level={3} style={{ margin: 0 }}>
                $<CountUp end={totalRevenue} separator="," />
              </Typography.Title>
              <Typography.Text type="secondary">Total Revenue</Typography.Text>
            </Flex>
          </Card>
        </Col>
        <Col xs={12} sm={12} lg={6}>
          <Card style={{ height: '100%' }}>
            <Flex vertical align="center" gap="small">
              <FallOutlined style={{ fontSize: 24, color: '#f5222d' }} />
              <Typography.Title level={3} style={{ margin: 0 }}>
                $<CountUp end={totalExpenses} separator="," />
              </Typography.Title>
              <Typography.Text type="secondary">Total Expenses</Typography.Text>
            </Flex>
          </Card>
        </Col>
        <Col xs={12} sm={12} lg={6}>
          <Card style={{ height: '100%' }}>
            <Flex vertical align="center" gap="small">
              <RiseOutlined style={{ fontSize: 24, color: '#52c41a' }} />
              <Typography.Title
                level={3}
                style={{
                  margin: 0,
                  color: netProfit >= 0 ? '#52c41a' : '#f5222d',
                }}
              >
                $<CountUp end={Math.abs(netProfit)} separator="," />
              </Typography.Title>
              <Typography.Text type="secondary">
                {netProfit >= 0 ? 'Net Profit' : 'Net Loss'}
              </Typography.Text>
            </Flex>
          </Card>
        </Col>
        <Col xs={12} sm={12} lg={6}>
          <Card style={{ height: '100%' }}>
            <Flex vertical align="center" gap="small">
              <ClockCircleOutlined style={{ fontSize: 24, color: '#faad14' }} />
              <Typography.Title level={3} style={{ margin: 0 }}>
                <CountUp
                  end={pendingInvoices.length + overdueInvoices.length}
                />
              </Typography.Title>
              <Typography.Text type="secondary">
                Pending Payments
              </Typography.Text>
            </Flex>
          </Card>
        </Col>

        {/* Invoice Management - full width */}
        <Col xs={24}>
          <Card
            title="Invoice Management"
            extra={
              <Flex gap="small">
                <Tag color="green">
                  Paid: {invoicesData.filter((i) => i.status === 'paid').length}
                </Tag>
                <Tag color="orange">Pending: {pendingInvoices.length}</Tag>
                <Tag color="red">Overdue: {overdueInvoices.length}</Tag>
              </Flex>
            }
          >
            {invoicesError ? (
              <Typography.Text type="danger">
                Error loading invoices
              </Typography.Text>
            ) : invoicesLoading ? (
              <Loader />
            ) : (
              <Table
                columns={invoiceColumns}
                dataSource={invoicesData}
                rowKey="id"
                pagination={{ pageSize: 5 }}
                size="small"
              />
            )}
          </Card>
        </Col>

        {/* Expense Breakdown + Invoice Status Overview side by side */}
        <Col xs={24} lg={12}>
          <Card title="Expense Breakdown" style={{ height: '100%' }}>
            {expensesError ? (
              <Typography.Text type="danger">
                Error loading data
              </Typography.Text>
            ) : expensesLoading ? (
              <Loader />
            ) : (
              <Flex vertical gap="middle">
                {expensesData.slice(0, 5).map((expense) => {
                  const percentage = (expense.amount / totalExpenses) * 100;
                  return (
                    <Flex key={expense.id} vertical gap={4}>
                      <Flex justify="space-between">
                        <Typography.Text strong>
                          {expense.category}
                        </Typography.Text>
                        <Typography.Text>
                          ${expense.amount.toLocaleString()}
                        </Typography.Text>
                      </Flex>
                      <Progress
                        percent={percentage}
                        strokeColor={getStatusColor(expense.status)}
                        showInfo={false}
                        size="small"
                      />
                    </Flex>
                  );
                })}
              </Flex>
            )}
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Invoice Status Overview" style={{ height: '100%' }}>
            <Flex vertical gap="middle">
              <Flex justify="space-between" align="middle">
                <Flex align="middle" gap="small">
                  <CheckCircleOutlined
                    style={{ color: '#52c41a', fontSize: 20 }}
                  />
                  <Typography.Text>Paid Invoices</Typography.Text>
                </Flex>
                <Typography.Title level={4} style={{ margin: 0 }}>
                  {invoicesData.filter((i) => i.status === 'paid').length}
                </Typography.Title>
              </Flex>
              <Flex justify="space-between" align="middle">
                <Flex align="middle" gap="small">
                  <ClockCircleOutlined
                    style={{ color: '#faad14', fontSize: 20 }}
                  />
                  <Typography.Text>Pending Invoices</Typography.Text>
                </Flex>
                <Typography.Title level={4} style={{ margin: 0 }}>
                  {pendingInvoices.length}
                </Typography.Title>
              </Flex>
              <Flex justify="space-between" align="middle">
                <Flex align="middle" gap="small">
                  <ExclamationCircleOutlined
                    style={{ color: '#f5222d', fontSize: 20 }}
                  />
                  <Typography.Text>Overdue Invoices</Typography.Text>
                </Flex>
                <Typography.Title level={4} style={{ margin: 0 }}>
                  {overdueInvoices.length}
                </Typography.Title>
              </Flex>
              <Card style={{ backgroundColor: '#f5f5f5' }}>
                <Flex vertical gap="small">
                  <Flex justify="space-between">
                    <Typography.Text>Total Outstanding</Typography.Text>
                    <Typography.Text strong>
                      $
                      {pendingInvoices
                        .reduce((sum, i) => sum + i.amount, 0)
                        .toLocaleString()}
                    </Typography.Text>
                  </Flex>
                  <Flex justify="space-between">
                    <Typography.Text>Overdue Amount</Typography.Text>
                    <Typography.Text strong type="danger">
                      $
                      {overdueInvoices
                        .reduce((sum, i) => sum + i.amount, 0)
                        .toLocaleString()}
                    </Typography.Text>
                  </Flex>
                </Flex>
              </Card>
            </Flex>
          </Card>
        </Col>

        {/* Recent Expenses - full width */}
        <Col xs={24}>
          <Card
            title="Recent Expenses"
            extra={<Button type="link">View All</Button>}
          >
            {expensesError ? (
              <Typography.Text type="danger">
                Error loading expenses
              </Typography.Text>
            ) : expensesLoading ? (
              <Loader />
            ) : (
              <Table
                columns={expenseColumns}
                dataSource={expensesData}
                rowKey="id"
                pagination={{ pageSize: 5 }}
                size="small"
              />
            )}
          </Card>
        </Col>

        {/* Quick Summary + Recent Activity + Top Expenses row */}
        <Col xs={24} sm={12} lg={8}>
          <Card title="Quick Summary" style={{ height: '100%' }}>
            <Flex vertical gap="middle">
              <Flex justify="space-between" align="middle">
                <Typography.Text>Revenue (MTD)</Typography.Text>
                <Typography.Title
                  level={4}
                  style={{ margin: 0, color: '#52c41a' }}
                >
                  $<CountUp end={totalRevenue} separator="," />
                </Typography.Title>
              </Flex>
              <Flex justify="space-between" align="middle">
                <Typography.Text>Expenses (MTD)</Typography.Text>
                <Typography.Title
                  level={4}
                  style={{ margin: 0, color: '#f5222d' }}
                >
                  $<CountUp end={totalExpenses} separator="," />
                </Typography.Title>
              </Flex>
              <Flex justify="space-between" align="middle">
                <Typography.Text>Net Profit</Typography.Text>
                <Typography.Title
                  level={4}
                  style={{
                    margin: 0,
                    color: netProfit >= 0 ? '#52c41a' : '#f5222d',
                  }}
                >
                  $<CountUp end={Math.abs(netProfit)} separator="," />
                </Typography.Title>
              </Flex>
              <Flex justify="space-between" align="middle">
                <Typography.Text>Collection Rate</Typography.Text>
                <Typography.Title level={4} style={{ margin: 0 }}>
                  {invoicesData.length > 0
                    ? Math.round(
                        (invoicesData.filter((i) => i.status === 'paid')
                          .length /
                          invoicesData.length) *
                          100
                      )
                    : 0}
                  %
                </Typography.Title>
              </Flex>
            </Flex>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Card title="Recent Activity" style={{ height: '100%' }}>
            <Flex vertical gap="small">
              {invoicesData.slice(0, 3).map((invoice) => (
                <Flex
                  key={invoice.id}
                  justify="space-between"
                  align="middle"
                  style={{
                    padding: '8px 0',
                    borderBottom: '1px solid #f0f0f0',
                  }}
                >
                  <Flex vertical gap={2}>
                    <Typography.Text strong style={{ fontSize: 12 }}>
                      {invoice.invoice_number}
                    </Typography.Text>
                    <Typography.Text type="secondary" style={{ fontSize: 11 }}>
                      {invoice.client}
                    </Typography.Text>
                  </Flex>
                  <Flex vertical align="end">
                    <Typography.Text strong>
                      ${invoice.amount.toLocaleString()}
                    </Typography.Text>
                    <Tag
                      color={
                        invoice.status === 'paid'
                          ? 'green'
                          : invoice.status === 'pending'
                            ? 'orange'
                            : 'red'
                      }
                      style={{ fontSize: 10 }}
                    >
                      {invoice.status}
                    </Tag>
                  </Flex>
                </Flex>
              ))}
            </Flex>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Top Expense Categories" style={{ height: '100%' }}>
            <Flex vertical gap="small">
              {expensesData.slice(0, 4).map((expense) => (
                <Flex
                  key={expense.id}
                  justify="space-between"
                  align="middle"
                  style={{ padding: '6px 0' }}
                >
                  <Typography.Text>{expense.category}</Typography.Text>
                  <Typography.Text strong>
                    ${expense.amount.toLocaleString()}
                  </Typography.Text>
                </Flex>
              ))}
            </Flex>
          </Card>
        </Col>
      </Row>

      <Drawer
        title="Dashboard Filters"
        placement="right"
        onClose={() => setFilterOpen(false)}
        open={filterOpen}
        width={320}
        styles={{ body: { padding: 16 } }}
      >
        <Flex vertical gap="large">
          <Flex vertical gap="small">
            <Typography.Text strong>Date Range</Typography.Text>
            <DatePicker.RangePicker style={{ width: '100%' }} />
          </Flex>

          <Flex vertical gap="small">
            <Typography.Text strong>Invoice Status</Typography.Text>
            <Checkbox.Group>
              <Flex vertical>
                <Checkbox value="paid">Paid</Checkbox>
                <Checkbox value="pending">Pending</Checkbox>
                <Checkbox value="overdue">Overdue</Checkbox>
              </Flex>
            </Checkbox.Group>
          </Flex>

          <Flex vertical gap="small">
            <Typography.Text strong>Expense Category</Typography.Text>
            <Checkbox.Group>
              <Flex vertical>
                <Checkbox value="payroll">Payroll</Checkbox>
                <Checkbox value="rent">Rent</Checkbox>
                <Checkbox value="marketing">Marketing</Checkbox>
                <Checkbox value="utilities">Utilities</Checkbox>
              </Flex>
            </Checkbox.Group>
          </Flex>

          <Flex vertical gap="small">
            <Typography.Text strong>Amount Range</Typography.Text>
            <Slider range defaultValue={[1000, 50000]} />
          </Flex>

          <Button type="primary" block onClick={() => setFilterOpen(false)}>
            Apply Filters
          </Button>
        </Flex>
      </Drawer>
    </div>
  );
};

export default FinanceDashboard;
