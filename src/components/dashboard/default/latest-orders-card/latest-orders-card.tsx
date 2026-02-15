import { Alert, CardProps } from 'antd';
import { MoreMenu } from '../../../index.ts';
import { AdvancedTable } from '../../../shared/advanced-table/advanced-table';
import { ReactNode } from 'react';
import { useFetchData } from '../../../../hooks';
import { CountryOrder } from '../../../../types';

const COLUMNS = [
  {
    title: 'Customer name',
    dataIndex: 'customer_name',
    key: 'customer_name',
    sorter: true,
  },
  {
    title: 'Product',
    dataIndex: 'product_name',
    key: 'product_name',
    sorter: true,
  },
  {
    title: 'Orders',
    dataIndex: 'orders',
    key: 'orders',
    sorter: true,
  },
  {
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
    sorter: true,
  },
  {
    title: 'Shipping address',
    dataIndex: 'shipping_address',
    key: 'shipping_address',
  },
];

type Props = {
  data?: CountryOrder[];
  loading?: boolean;
  error?: ReactNode;
} & CardProps;

export const LatestOrdersCard = ({ loading, error, ...others }: Props) => {
  const {
    data: ordersDataRaw,
    loading: ordersDataLoading,
    error: ordersDataError,
  } = useFetchData<CountryOrder[]>('/mocks/CountryOrders.json');
  const ordersData = ordersDataRaw ?? [];

  return (
    <>
      {ordersDataError || error ? (
        <Alert
          message="Error"
          description={error?.toString() || ordersDataError.toString()}
          type="error"
          showIcon
        />
      ) : (
        <AdvancedTable
          columns={COLUMNS}
          dataSource={ordersData}
          loading={ordersDataLoading || loading}
          title="Latest Orders"
          extra={<MoreMenu />}
          exportable
          rowKey="id"
          {...others}
        />
      )}
    </>
  );
};
