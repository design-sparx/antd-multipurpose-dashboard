import { Typography } from 'antd';
import { AdvancedTable } from '../../../shared/advanced-table/advanced-table';
import { Clients } from '../../../../types';
import { UserAvatar } from '../../../index.ts';

const COLUMNS = [
  {
    title: 'Client Name',
    dataIndex: 'client_name',
    key: 'c_name',
    sorter: true,
    render: (_: string, { first_name, last_name }: Clients) => (
      <UserAvatar fullName={`${first_name} ${last_name}`} />
    ),
  },
  {
    title: 'Amount',
    dataIndex: 'total_price',
    key: 'client_amount',
    sorter: true,
    render: (_: number) => <Typography.Text>${_}</Typography.Text>,
  },
];

type Props = {
  data: Clients[];
  title?: React.ReactNode;
};

export const ClientsTable = ({ data, title }: Props) => (
  <AdvancedTable
    columns={COLUMNS}
    dataSource={data}
    rowKey="client_id"
    title={title as string}
    exportable
  />
);
