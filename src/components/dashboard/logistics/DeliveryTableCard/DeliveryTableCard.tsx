import { Alert, Button, CardProps, Table, TableProps } from 'antd';
import { TruckDelivery } from '../../../../types';
import { ReactNode, useState } from 'react';
import { ColumnsType } from 'antd/es/table';
import { Card, UserAvatar } from '../../../index.ts';
import { numberWithCommas } from '../../../../utils';

type TabKeys = 'all' | 'in transit' | 'delayed' | 'delivered' | string;

type TabList = {
  key: TabKeys;
  tab: string;
}[];

const TAB_LIST: TabList = [
  {
    key: 'all',
    tab: 'All',
  },
  {
    key: 'in transit',
    tab: 'In Transit',
  },
  {
    key: 'delivered',
    tab: 'Delivered',
  },
  {
    key: 'delayed',
    tab: 'Delayed',
  },
];

const DELIVERY_TABLE_COLUMNS: ColumnsType<TruckDelivery> = [
  {
    title: 'Id',
    dataIndex: 'shipment_id',
    key: 'shipment_id',
    render: (text: any) => text.split('-')[0],
  },
  {
    title: 'Destination',
    dataIndex: 'destination_city',
    key: 'destination',
  },
  {
    title: 'Customer',
    dataIndex: 'customer_name',
    key: 'customer_name',
  },
  {
    title: 'Driver',
    dataIndex: 'driver_name',
    key: 'driver_name',
    render: (_: any) => <UserAvatar fullName={_} />,
  },
  {
    title: 'Status',
    dataIndex: 'delivery_status',
    key: 'delivery_status',
  },
  {
    title: 'Cost',
    dataIndex: 'shipment_cost',
    key: 'shipment_cost',
    render: (_: any) => <span>${numberWithCommas(_)}</span>,
  },
  {
    title: 'Delivery date',
    dataIndex: 'shipment_date',
    key: 'shipment_date',
  },
];

type DeliveryTableProps = {
  data?: TruckDelivery[];
} & TableProps<any>;

const DeliveryTable = ({ data, ...others }: DeliveryTableProps) => {
  return (
    <Table
      dataSource={data || []}
      columns={DELIVERY_TABLE_COLUMNS}
      className="overflow-scroll"
      {...others}
    />
  );
};

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

  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };

  return (
    <Card
      title="Deliveries"
      extra={<Button>See all</Button>}
      tabList={TAB_LIST}
      activeTabKey={activeTabKey}
      onTabChange={onTabChange}
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
        <DeliveryTable
          data={
            activeTabKey !== 'all'
              ? data?.filter(
                  (d) => d.delivery_status.toLowerCase() === activeTabKey
                )
              : data || []
          }
          loading={loading}
        />
      )}
    </Card>
  );
};
