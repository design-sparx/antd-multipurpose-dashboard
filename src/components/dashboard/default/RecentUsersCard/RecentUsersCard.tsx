import { Alert, Card, CardProps, Table, Typography } from 'antd';
import { MoreMenu } from '../../../index.ts';
import { useFetchData } from '../../../../hooks';
import { ReactNode } from 'react';

const COLUMNS = [
  {
    title: 'Names',
    dataIndex: 'first_name',
    key: 'name',
    render: (_: any, { first_name, last_name }: any) => (
      <Typography.Text>
        {first_name} {last_name}
      </Typography.Text>
    ),
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
  },
  {
    title: 'Country',
    dataIndex: 'country',
    key: 'country',
  },
  {
    title: 'Birth date',
    dataIndex: 'birthdate',
    key: 'birthdate',
  },
];

type Props = { data?: any; loading?: boolean; error?: ReactNode } & CardProps;

const RecentUsersCard = ({ data, loading, error, ...others }: Props) => {
  const {
    data: usersData,
    loading: usersDataLoading,
    error: usersDataError,
  } = useFetchData('/mocks/ChannelUsers.json');

  return (
    <Card title={`Recent Users`} extra={<MoreMenu />} {...others}>
      {usersDataError || error ? (
        <Alert
          message="Error"
          description={error?.toString() || usersDataError.toString()}
          type="error"
          showIcon
        />
      ) : (
        <Table
          columns={COLUMNS}
          dataSource={usersData}
          loading={usersDataLoading || loading}
        />
      )}
    </Card>
  );
};

export default RecentUsersCard;
