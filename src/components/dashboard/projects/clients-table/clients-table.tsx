import { Table, TableProps, Typography } from 'antd';
import { Clients } from '../../../../types';
import { UserAvatar } from '../../../index.ts';

const COLUMNS = [
  {
    title: 'Client Name',
    dataIndex: 'client_name',
    key: 'c_name',
    render: (_: any, { first_name, last_name }: Clients) => (
      <UserAvatar fullName={`${first_name} ${last_name}`} />
    ),
  },
  {
    title: 'Amount',
    dataIndex: 'total_price',
    key: 'client_amount',
    render: (_: any) => <Typography.Text>${_}</Typography.Text>,
  },
];

type Props = {
  data: Clients[];
} & Omit<TableProps<Clients>, 'dataSource' | 'columns'>;

export const ClientsTable = ({ data, ...others }: Props) => (
  <Table<Clients>
    dataSource={data}
    columns={COLUMNS}
    key="client_table"
    rowKey="client_id"
    size="middle"
    className="overflow-scroll"
    {...others}
  />
);
