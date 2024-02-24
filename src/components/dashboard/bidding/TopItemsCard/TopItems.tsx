import { Alert, CardProps, Flex, Image, Table, Typography } from 'antd';
import { AuctionSales } from '../../../../types';
import { Card } from '../../../index.ts';
import { ReactNode } from 'react';
import { numberWithCommas } from '../../../../utils';

const SALES_COLUMNS = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
    render: (_: any, { image_url, owner, title }: any) => (
      <Flex align="center" gap="small">
        <Image src={image_url} height={24} width={24} preview={false} />
        <Flex vertical gap={4} style={{ width: 160 }}>
          <Typography.Text strong className="text-capitalize">
            {title}
          </Typography.Text>
          <Typography.Link>@{owner.split(' ')[0]}</Typography.Link>
        </Flex>
      </Flex>
    ),
  },
  {
    title: 'Sales count',
    dataIndex: 'volume',
    key: 'sales_count',
    render: (_: any) => (
      <Typography.Text>{numberWithCommas(Number(_))}</Typography.Text>
    ),
  },
  {
    title: 'Price',
    dataIndex: 'price',
    key: 'price',
    render: (_: any) => (
      <Typography.Text>${numberWithCommas(Number(_))}</Typography.Text>
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
    render: (_: any) => (
      <Typography.Text>{numberWithCommas(Number(_))}</Typography.Text>
    ),
  },
];

type Props = {
  data?: AuctionSales[];
  loading?: boolean;
  error?: ReactNode;
} & CardProps;

const TopItemsCard = ({ data, loading, error, ...others }: Props) => {
  return error ? (
    <Alert
      message="Error"
      description={error.toString()}
      type="error"
      showIcon
    />
  ) : (
    <Card title="Top selling items" {...others}>
      <Table
        dataSource={data}
        columns={SALES_COLUMNS}
        loading={loading}
        className="overflow-scroll"
      />
    </Card>
  );
};

export default TopItemsCard;
