import { ReactNode } from 'react';
import { Alert, Button, CardProps, Table, TableColumnsType } from 'antd';
import { AuctionCreator } from '../../../../types';
import { Card, UserAvatar } from '../../../index';
import { UserAddOutlined } from '@ant-design/icons';
import './styles.css';

const COLUMNS: TableColumnsType<AuctionCreator> = [
  {
    key: 'creators_name',
    dataIndex: 'first_name',
    title: 'Creator',
    render: (_, { first_name, last_name, favorite_color }) => (
      <UserAvatar
        fullName={`${first_name} ${last_name}`}
        color={favorite_color}
        verified
        textWidth="auto"
      />
    ),
  },
  {
    key: 'sold_items',
    dataIndex: 'sales_count',
    title: 'Items',
  },
  {
    key: 'creator_actions',
    dataIndex: 'actions',
    title: 'Actions',
    render: () => (
      <Button type="link" icon={<UserAddOutlined />}>
        Follow
      </Button>
    ),
  },
];

type Props = {
  data?: AuctionCreator[];
  loading?: boolean;
  error?: ReactNode;
} & CardProps;

export const CreatorsCard = ({ data, loading, error, ...others }: Props) => {
  return error ? (
    <Alert
      message="Error"
      description={error.toString()}
      type="error"
      showIcon
    />
  ) : (
    <Card
      title="creators"
      extra={<Button>See all creators</Button>}
      className="card"
      {...others}
    >
      <Table
        dataSource={data}
        columns={COLUMNS}
        size="middle"
        loading={loading}
        className="overflow-scroll"
      />
    </Card>
  );
};
