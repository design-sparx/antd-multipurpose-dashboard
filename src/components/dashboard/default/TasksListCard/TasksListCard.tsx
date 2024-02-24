import {
  Alert,
  Badge,
  Button,
  Card as AntdCard,
  CardProps,
  Flex,
  List,
  Space,
  Tag,
  Typography,
} from 'antd';
import { Tasks } from '../../../../types';
import { CalendarOutlined, FlagOutlined } from '@ant-design/icons';
import { Card, Loader, UserAvatar } from '../../../index';

import './styles.css';

type Props = {
  data?: Tasks[];
  loading?: boolean;
  error?: any;
} & CardProps;

const TasksListCard = ({ data, error, loading, ...others }: Props) => {
  return (
    <Card
      title="Tasks"
      extra={<Button>View all</Button>}
      className="tasks-list-card card"
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
          grid={{
            gutter: 16,
            xs: 1,
            sm: 1,
            md: 2,
            lg: 2,
            xl: 3,
            xxl: 4,
          }}
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 6,
            align: 'center',
          }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.name} style={{ height: '100%' }}>
              <AntdCard
                hoverable
                bordered
                type="inner"
                style={{ height: '100%' }}
              >
                <Flex vertical gap="middle">
                  <Flex justify="space-between" align="center">
                    <Typography.Text strong className="text-capitalize">
                      {item.name.slice(0, 20)}...
                    </Typography.Text>
                    <Tag className="text-capitalize">{item.category}</Tag>
                  </Flex>
                  <Flex justify="space-between" align="center">
                    <Tag
                      icon={<FlagOutlined />}
                      color={item.color}
                      style={{ textTransform: 'capitalize' }}
                    >
                      {item.priority}
                    </Tag>
                    <Badge
                      className="text-capitalize"
                      status={
                        item.status.toLowerCase() === 'completed'
                          ? 'success'
                          : item.status.toLowerCase() === 'in progress'
                            ? 'processing'
                            : 'warning'
                      }
                      text={item.status}
                    />
                  </Flex>
                  <Space>
                    <CalendarOutlined />
                    <Typography.Text>{item.due_date}</Typography.Text>
                  </Space>
                  <UserAvatar fullName={item.assigned_to} size="middle" />
                </Flex>
              </AntdCard>
            </List.Item>
          )}
        />
      )}
    </Card>
  );
};

export default TasksListCard;
