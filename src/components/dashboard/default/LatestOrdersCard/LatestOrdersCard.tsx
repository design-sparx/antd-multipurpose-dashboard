import { Alert, Card, CardProps, Table } from 'antd';
import { MoreMenu } from '../../../index.ts';
import { ReactNode } from 'react';
import { useFetchData } from '../../../../hooks';

const COLUMNS = [
  {
    title: 'Customer name',
    dataIndex: 'customer_name',
    key: 'customer_name',
  },
  {
    title: 'Product',
    dataIndex: 'product_name',
    key: 'product_name',
  },
  {
    title: 'Orders',
    dataIndex: 'orders',
    key: 'orders',
  },
  {
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
  },
  {
    title: 'Shipping address',
    dataIndex: 'shipping_address',
    key: 'shipping_address',
  },
];

type Props = {
  data?: any;
  loading?: boolean;
  error?: ReactNode;
} & CardProps;

const LatestOrdersCard = ({ data, loading, error, ...others }: Props) => {
  const {
    data: ordersData,
    loading: ordersDataLoading,
    error: ordersDataError,
  } = useFetchData('/mocks/CountryOrders.json');

  return (
    <Card title={`Latest Orders`} extra={<MoreMenu />} {...others}>
      {ordersDataError || error ? (
        <Alert
          message="Error"
          description={error?.toString() || ordersDataError.toString()}
          type="error"
          showIcon
        />
      ) : (
        <Table
          columns={COLUMNS}
          dataSource={ordersData}
          loading={ordersDataLoading || loading}
        />
      )}
    </Card>
  );
};

export default LatestOrdersCard;
