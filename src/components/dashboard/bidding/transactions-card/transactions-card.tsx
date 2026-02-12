import { CardProps, Table, Typography, Image, Space, Alert } from 'antd';
import { AuctionTransactions } from '../../../../types';
import { SwapRightOutlined } from '@ant-design/icons';
import { Card } from '../../../index.ts';
import { ReactNode } from 'react';

const TRANSACTIONS_COLUMNS = [
  {
    title: 'Type',
    dataIndex: 'transaction_type',
    key: 'transaction_type',
    render: (_: any) => <span className="text-capitalize">{_}</span>,
  },
  {
    title: 'Image',
    dataIndex: 'image',
    key: 'image',
    render: (text: any, { product_id }: any) => (
      <Image
        src={text}
        alt={product_id}
        width={24}
        height={24}
        preview={false}
      />
    ),
  },
  {
    title: 'From/To',
    dataIndex: 'seller',
    key: 'from_to',
    render: (_: any, { buyer, seller, profit }: any) => (
      <Space style={{ width: 240 }}>
        <Typography.Link>@{seller}</Typography.Link>
        <SwapRightOutlined style={{ color: profit > 0 ? 'green' : 'red' }} />
        <Typography.Link>@{buyer}</Typography.Link>
      </Space>
    ),
  },
  {
    title: 'Profit',
    dataIndex: 'profit',
    key: 'profit',
    render: (_: any, { profit }: any) => (
      <Typography.Text>${profit}</Typography.Text>
    ),
  },
  {
    title: 'Value',
    dataIndex: 'purchase_price',
    key: 'purchase_price',
    render: (text: any) => <Typography.Text>${text}</Typography.Text>,
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    key: 'quantity',
  },
  {
    title: 'Date',
    dataIndex: 'transaction_date',
    key: 'transaction_date',
  },
];

type Props = {
  data?: AuctionTransactions[];
  loading?: boolean;
  error?: ReactNode;
} & CardProps;

export const TransactionsCard = ({
  data,
  loading,
  error,
  ...others
}: Props) => {
  return error ? (
    <Alert
      message="Error"
      description={error.toString()}
      type="error"
      showIcon
    />
  ) : (
    <Card title="Recent transactions" {...others}>
      <Table
        dataSource={data}
        columns={TRANSACTIONS_COLUMNS}
        loading={loading}
        className="overflow-scroll"
      />
    </Card>
  );
};
