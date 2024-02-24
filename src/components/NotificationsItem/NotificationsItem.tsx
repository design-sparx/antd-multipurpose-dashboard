import { Notifications } from '../../types';
import { Avatar, Flex, FlexProps, Tag, Typography } from 'antd';
import {
  ContainerOutlined,
  MailOutlined,
  PhoneOutlined,
} from '@ant-design/icons';

type Props = {
  data: Notifications;
} & Omit<FlexProps, 'children'>;

const NotificationsItem = ({ data, ...others }: Props) => {
  const {
    notification_type,
    notification_category,
    notification_image,
    notification_date,
    notification_message,
    color,
  } = data;

  return (
    <Flex gap="small" {...others}>
      <Avatar src={notification_image} />
      <Flex vertical gap="small" style={{ flexGrow: 1 }}>
        <Flex align="center" justify="space-between">
          <Typography.Text>
            {notification_message.slice(0, 30)}...
          </Typography.Text>
          <Tag
            bordered={true}
            icon={
              notification_type === 'voice' ? (
                <PhoneOutlined />
              ) : notification_type === 'email' ? (
                <MailOutlined />
              ) : (
                <ContainerOutlined />
              )
            }
            style={{ textTransform: 'capitalize' }}
          >
            {notification_type}
          </Tag>
        </Flex>
        <Flex justify="space-between" align="center">
          <Tag bordered={true} color={color}>
            {notification_category}
          </Tag>
          <Typography.Text>{notification_date}</Typography.Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default NotificationsItem;
