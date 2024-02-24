import { Alert, CardProps, Flex, Typography } from 'antd';
import {
  CommentOutlined,
  LikeOutlined,
  UserAddOutlined,
  UserOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import { ReactElement, ReactNode } from 'react';
import { Card, Loader } from '../../../index';
import CountUp from 'react-countup';

type Props = {
  title: 'followers' | 'following' | 'likes' | 'comments' | string;
  value?: number;
  error?: ReactNode;
  loading?: boolean;
} & CardProps;

const SocialStatsCard = ({
  value,
  title,
  loading,
  error,
  ...others
}: Props) => {
  const Icon = (): ReactElement => {
    let i;
    switch (title) {
      case 'following':
        i = <UserAddOutlined style={{ fontSize: 30 }} />;
        break;
      case 'followers':
        i = <UserSwitchOutlined style={{ fontSize: 30 }} />;
        break;
      case 'likes':
        i = <LikeOutlined style={{ fontSize: 30 }} />;
        break;
      case 'comments':
        i = <CommentOutlined style={{ fontSize: 30 }} />;
        break;
      default:
        i = <UserOutlined style={{ fontSize: 30 }} />;
        break;
    }

    return i;
  };

  return (
    <Card {...others}>
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
        <Flex vertical gap="middle">
          <Icon />
          <Typography.Text className="text-capitalize">{title}</Typography.Text>
          <Typography.Title level={2} className="m-0">
            <CountUp end={value || 0} />
          </Typography.Title>
        </Flex>
      )}
    </Card>
  );
};

export default SocialStatsCard;
