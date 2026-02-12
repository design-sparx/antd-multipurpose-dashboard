import { Alert, Card, CardProps, Table } from 'antd';
import { MoreMenu } from '../../../index.ts';
import { ReactNode } from 'react';
import { useFetchData } from '../../../../hooks';
import { CountryOrder } from '../../../../types';

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

export const LatestOrdersCard = ({
  data,
  loading,
  error,
  ...others
}: Props) => {
  // Fetch country orders data with proper typing
  const {
    data: ordersDataRaw,
    loading: ordersDataLoading,
    error: ordersDataError,
  } = useFetchData<CountryOrder[]>('/mocks/CountryOrders.json');
  const ordersData = ordersDataRaw ?? [];

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
