import { Badge, Button, CardProps, Flex, List, Space, Typography } from 'antd';
import { DeliveryRequest } from '../../../../types';
import { Card, UserAvatar } from '../../../index.ts';

import './styles.css';
import { ReactNode } from 'react';
import { CalendarOutlined } from '@ant-design/icons';

type Props = {
  data?: DeliveryRequest[];
  loading?: boolean;
  error?: ReactNode;
} & CardProps;

const DeliveryRequestCard = ({ data, loading, error, ...others }: Props) => {
  return (
    <Card
      title="Recent request"
      className="delivery-request-card card"
      extra={<Button>See all</Button>}
      {...others}
    >
      <List
        size="large"
        className="delivery-request-list"
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
            <Space style={{ justifyContent: 'space-between', width: '100%' }}>
              <Flex vertical gap="small">
                <Typography.Text strong style={{ textTransform: 'capitalize' }}>
                  {item.name}
                </Typography.Text>
                <Badge
                  color="geekblue"
                  text={
                    <Typography.Text>
                      From: {item.delivery_location}
                    </Typography.Text>
                  }
                />
                <Badge
                  color="magenta"
                  text={
                    <Typography.Text>
                      To: {item.pickup_location}
                    </Typography.Text>
                  }
                />
              </Flex>
              <Flex vertical align="flex-end" gap="small">
                <Flex gap={4} align="center">
                  <CalendarOutlined />
                  <Typography.Text>{item.delivery_date}</Typography.Text>
                </Flex>
                <UserAvatar
                  fullName={item.driver_name}
                  align="flex-end"
                  textWidth="auto"
                />
                <Flex gap={4}>
                  <Typography.Text>Contact:</Typography.Text>
                  <Typography.Link href={`tel:${item.contact_number}`}>
                    {item.contact_number}
                  </Typography.Link>
                </Flex>
              </Flex>
            </Space>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default DeliveryRequestCard;
