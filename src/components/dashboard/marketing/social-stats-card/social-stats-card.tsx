import {
  Card as AntdCard,
  CardProps,
  Flex,
  List,
  Space,
  Tag,
  Typography,
} from 'antd';
import {
  FacebookFilled,
  InstagramFilled,
  LinkedinFilled,
  TwitterOutlined,
  YoutubeFilled,
} from '@ant-design/icons';
import { Card } from '../../../index.ts';
import { createElement } from 'react';
import CountUp from 'react-countup';

const SOCIALS_DATA = [
  {
    icon: FacebookFilled,
    title: 'facebook',
    diff: 12.3,
    value: 216869,
  },
  {
    icon: InstagramFilled,
    title: 'instagram',
    diff: 4.8,
    value: 978342,
  },
  {
    icon: TwitterOutlined,
    title: 'twitter',
    diff: -2.4,
    value: 567323,
  },
  {
    icon: LinkedinFilled,
    title: 'linkedIn',
    diff: 3.79,
    value: 738382,
  },
  {
    icon: YoutubeFilled,
    title: 'youtube',
    diff: -5.3,
    value: 892123,
  },
];

type Props = CardProps;

export const SocialStatsCard = ({ ...others }: Props) => (
  <Card title="Social media analytics" {...others}>
    <List
      grid={{
        gutter: 16,
        xs: 1,
        sm: 1,
        md: 2,
        lg: 2,
        xl: 2,
        xxl: 2,
      }}
      dataSource={SOCIALS_DATA}
      renderItem={(item, i) => (
        <List.Item>
          <AntdCard key={`${item.title}-${i}`} hoverable={false}>
            <Flex vertical gap="middle" justify="center">
              <Flex align="center" justify="space-between">
                <Space>
                  {createElement(item.icon)}
                  <Typography.Text className="text-capitalize">
                    {item.title}
                  </Typography.Text>
                </Space>
                <Tag color={item.diff < 0 ? 'red-inverse' : 'green-inverse'}>
                  {item.diff}%
                </Tag>
              </Flex>
              <Flex gap="small" align="flex-end">
                <Typography.Title level={3} className="m-0">
                  <CountUp end={item.value} />
                </Typography.Title>
                <Typography.Text color="secondary">visitors</Typography.Text>
              </Flex>
            </Flex>
          </AntdCard>
        </List.Item>
      )}
    />
  </Card>
);
