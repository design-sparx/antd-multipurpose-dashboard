import { Alert, Button, CardProps } from 'antd';
import { TruckDelivery } from '../../../../types';
import { ReactNode, useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import { Card, UserAvatar, AdvancedTable } from '../../../index.ts';
import { numberWithCommas } from '../../../../utils';

type TabKeys = 'all' | 'in transit' | 'delayed' | 'delivered' | string;

type TabList = {
  key: TabKeys;
  tab: string;
}[];

const TAB_LIST: TabList = [
  { key: 'all', tab: 'All' },
  { key: 'in transit', tab: 'In Transit' },
  { key: 'delivered', tab: 'Delivered' },
  { key: 'delayed', tab: 'Delayed' },
];

const DELIVERY_TABLE_COLUMNS: ColumnsType<TruckDelivery> = [
  {
    title: 'Id',
    dataIndex: 'shipment_id',
    key: 'shipment_id',
    sorter: true,
    render: (value: string) => value.split('-')[0],
  },
  {
    title: 'Destination',
    dataIndex: 'destination_city',
    key: 'destination',
    sorter: true,
  },
  {
    title: 'Customer',
    dataIndex: 'customer_name',
    key: 'customer_name',
    sorter: true,
  },
  {
    title: 'Driver',
    dataIndex: 'driver_name',
    key: 'driver_name',
    sorter: true,
    render: (value: string) => <UserAvatar fullName={value} />,
  },
  {
    title: 'Status',
    dataIndex: 'delivery_status',
    key: 'delivery_status',
    sorter: true,
  },
  {
    title: 'Cost',
    dataIndex: 'shipment_cost',
    key: 'shipment_cost',
    sorter: true,
    render: (value: number) => <span>${numberWithCommas(value)}</span>,
  },
  {
    title: 'Delivery date',
    dataIndex: 'shipment_date',
    key: 'shipment_date',
    sorter: true,
  },
];

type Props = {
  data?: TruckDelivery[];
  loading?: boolean;
  error?: ReactNode;
} & CardProps;

export const DeliveryTableCard = ({
  data,
  loading,
  error,
  ...others
}: Props) => {
  const [activeTabKey, setActiveTabKey] = useState<TabKeys>('all');

  const filteredData =
    activeTabKey !== 'all'
      ? data?.filter((d) => d.delivery_status.toLowerCase() === activeTabKey) ||
        []
      : data || [];

  return (
    <Card
      title="Deliveries"
      extra={<Button>See all</Button>}
      tabList={TAB_LIST}
      activeTabKey={activeTabKey}
      onTabChange={(key) => setActiveTabKey(key as TabKeys)}
      {...others}
    >
      {error ? (
        <Alert
          message="Error"
          description={error.toString()}
          type="error"
          showIcon
        />
      ) : (
        <AdvancedTable
          dataSource={filteredData}
          columns={DELIVERY_TABLE_COLUMNS}
          loading={loading}
          rowKey="shipment_id"
          exportable
        />
      )}
    </Card>
  );
};
