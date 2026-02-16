import { Typography } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { AdvancedTable } from '../../../shared/advanced-table/advanced-table';
import { Clients } from '../../../../types';
import { UserAvatar } from '../../../index.ts';

const COLUMNS: ColumnsType<Clients> = [
  {
    title: 'Client Name',
    dataIndex: 'client_name',
    key: 'c_name',
    sorter: true,
    render: (_: string, record: Clients) => (
      <UserAvatar fullName={`${record.first_name} ${record.last_name}`} />
    ),
  },
  {
    title: 'Amount',
    dataIndex: 'total_price',
    key: 'client_amount',
    sorter: true,
    render: (value: number) => <Typography.Text>${value}</Typography.Text>,
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
