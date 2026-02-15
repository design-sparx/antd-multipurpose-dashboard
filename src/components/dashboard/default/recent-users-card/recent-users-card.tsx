import { Alert, CardProps, Typography } from 'antd';
import { MoreMenu } from '../../../index.ts';
import { AdvancedTable } from '../../../shared/advanced-table/advanced-table';
import { useFetchData } from '../../../../hooks';
import { ReactNode } from 'react';
import { ChannelUser } from '../../../../types';

const COLUMNS = [
  {
    title: 'Names',
    dataIndex: 'first_name',
    key: 'name',
    sorter: true,
    render: (_: unknown, record: ChannelUser) => (
      <Typography.Text>
        {record.first_name} {record.last_name}
      </Typography.Text>
    ),
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
    sorter: true,
    filters: [
      { text: 'Male', value: 'Male' },
      { text: 'Female', value: 'Female' },
    ],
  },
  {
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
    sorter: true,
  },
  {
    title: 'Birth date',
    dataIndex: 'birthdate',
    key: 'birthdate',
    sorter: true,
  },
];

type Props = {
  data?: ChannelUser[];
  loading?: boolean;
  error?: ReactNode;
} & CardProps;

export const RecentUsersCard = ({ loading, error, ...others }: Props) => {
  const {
    data: usersDataRaw,
    loading: usersDataLoading,
    error: usersDataError,
  } = useFetchData<ChannelUser[]>('/mocks/ChannelUsers.json');
  const usersData = usersDataRaw ?? [];

  return (
    <>
      {usersDataError || error ? (
        <Alert
          message="Error"
          description={error?.toString() || usersDataError.toString()}
          type="error"
          showIcon
        />
      ) : (
        <AdvancedTable
          columns={COLUMNS}
          dataSource={usersData}
          loading={usersDataLoading || loading}
          title="Recent Users"
          extra={<MoreMenu />}
          exportable
          rowKey="id"
          {...others}
        />
      )}
    </>
  );
};
