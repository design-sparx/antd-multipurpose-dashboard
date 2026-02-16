import { CardProps, Typography, Image, Space, Alert } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { AuctionTransactions } from '../../../../types';
import { SwapRightOutlined } from '@ant-design/icons';
import { Card, AdvancedTable } from '../../../index.ts';
import { ReactNode } from 'react';

const TRANSACTIONS_COLUMNS: ColumnsType<AuctionTransactions> = [
  {
    title: 'Type',
    dataIndex: 'transaction_type',
    key: 'transaction_type',
    render: (value: string) => <span className="text-capitalize">{value}</span>,
  },
  {
    title: 'Image',
    dataIndex: 'image',
    key: 'image',
    render: (text: string, record: AuctionTransactions) => (
      <Image
        src={text}
        alt={record.product_id}
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
    render: (_: unknown, record: AuctionTransactions) => (
      <Space style={{ width: 240 }}>
        <Typography.Link>@{record.seller}</Typography.Link>
        <SwapRightOutlined
          style={{ color: record.profit > 0 ? 'green' : 'red' }}
        />
        <Typography.Link>@{record.buyer}</Typography.Link>
      </Space>
    ),
  },
  {
    title: 'Profit',
    dataIndex: 'profit',
    key: 'profit',
    render: (value: number) => <Typography.Text>${value}</Typography.Text>,
  },
  {
    title: 'Value',
    dataIndex: 'purchase_price',
    key: 'purchase_price',
    render: (value: number) => <Typography.Text>${value}</Typography.Text>,
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
      <AdvancedTable
        dataSource={data || []}
        columns={TRANSACTIONS_COLUMNS}
        loading={loading}
        rowKey="transaction_id"
        exportable
      />
    </Card>
  );
};
