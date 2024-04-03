import { Alert, Button, CardProps, List } from 'antd';
import { Card, Loader, NotificationsItem } from '../index.ts';
import { Notifications } from '../../types';

import './styles.css';

type Props = {
  data?: Notifications[];
  loading?: boolean;
  error?: any;
} & CardProps;

export const NotificationsCard = ({
  data,
  loading,
  error,
  ...others
}: Props) => {
  return (
    <Card
      title="Notifications"
      extra={<Button>View all</Button>}
      className="card notifications-list-card"
      {...others}
    >
      {error ? (
        <Alert
          message="Error"
          description={error.toString()}
          type="error"
          showIcon
        />
      ) : loading ? (
        <Loader />
      ) : (
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 5,
            align: 'center',
          }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.notification_id}>
              <NotificationsItem data={item} />
            </List.Item>
          )}
        />
      )}
    </Card>
  );
};
