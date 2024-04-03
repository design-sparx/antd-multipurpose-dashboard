import { Alert, Avatar, Button, CardProps, List, Typography } from 'antd';
import { CommunityGroup } from '../../../../types';
import { PlusOutlined } from '@ant-design/icons';
import { Card } from '../../../index.ts';
import { ReactNode } from 'react';

import './styles.css';

type Props = {
  data?: CommunityGroup[];
  loading?: boolean;
  error?: ReactNode;
} & CardProps;

export const CommunityGroupCard = ({
  data,
  loading,
  error,
  ...others
}: Props) => {
  return (
    <Card
      title="Community Groups"
      className="community-group-card card"
      extra={<Button icon={<PlusOutlined />} />}
      {...others}
    >
      {error ? (
        <Alert
          message="Error"
          description={error.toString()}
          type="error"
          showIcon
        />
      ) : (
        <List
          itemLayout="vertical"
          size="small"
          className="community-group-list"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 5,
            align: 'center',
          }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={item.image}
                    alt={item.name}
                    size="default"
                    style={{ backgroundColor: item.favorite_color }}
                  />
                }
                title={<Typography.Link>{item.name}</Typography.Link>}
                description={`${item.size} Members`}
              />
            </List.Item>
          )}
          loading={loading}
        />
      )}
    </Card>
  );
};
