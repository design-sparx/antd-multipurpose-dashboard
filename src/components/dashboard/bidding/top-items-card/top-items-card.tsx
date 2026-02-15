import { Alert, CardProps, Flex, Image, Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { AuctionSales } from '../../../../types';
import { Card, AdvancedTable } from '../../../index.ts';
import { ReactNode } from 'react';
import { numberWithCommas } from '../../../../utils';

const SALES_COLUMNS: ColumnsType<AuctionSales> = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    render: (_: unknown, record: AuctionSales) => (
      <Flex align="center" gap="small">
        <Image src={record.image_url} height={24} width={24} preview={false} />
        <Flex vertical gap={4} style={{ width: 160 }}>
          <Typography.Text strong className="text-capitalize">
            {record.title}
          </Typography.Text>
          <Typography.Link>@{record.owner.split(' ')[0]}</Typography.Link>
        </Flex>
      </Flex>
    ),
  },
  {
    title: 'Sales count',
    dataIndex: 'volume',
    key: 'sales_count',
    render: (value: number) => (
      <Typography.Text>{numberWithCommas(Number(value))}</Typography.Text>
    ),
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: (value: number) => (
      <Typography.Text>${numberWithCommas(Number(value))}</Typography.Text>
    ),
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: 'Collection',
    dataIndex: 'collection',
    key: 'collection',
  },
  {
    title: 'Owners',
    dataIndex: 'owners_count',
    key: 'owners_count',
    render: (value: number) => (
      <Typography.Text>{numberWithCommas(Number(value))}</Typography.Text>
    ),
  },
];

type Props = {
  data?: AuctionSales[];
  loading?: boolean;
  error?: ReactNode;
} & CardProps;

export const TopItemsCard = ({ data, loading, error, ...others }: Props) => {
  return error ? (
    <Alert
      message="Error"
      description={error.toString()}
      type="error"
      showIcon
    />
  ) : (
    <Card title="Top selling items" {...others}>
      <AdvancedTable
        dataSource={data || []}
        columns={SALES_COLUMNS}
        loading={loading}
        rowKey="id"
        exportable
      />
    </Card>
  );
};
