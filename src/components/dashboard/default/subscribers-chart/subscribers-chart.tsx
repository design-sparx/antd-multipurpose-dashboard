import { Card, CardProps, Flex, Typography } from 'antd';
import { Column } from '@ant-design/charts';
import { MoreMenu } from '../../../index.ts';

type Props = CardProps;

const ColumnChart = () => {
  const data = [
    {
      type: '1 July',
      subscribers: 38,
    },
    {
      type: '8 July',
      subscribers: 52,
    },
    {
      type: '15 July',
      subscribers: 61,
    },
    {
      type: '22 July',
      subscribers: 145,
    },
    {
      type: '29 July',
      subscribers: 48,
    },
    {
      type: '5 Aug',
      subscribers: 38,
    },
    {
      type: '12 Aug',
      subscribers: 38,
    },
    {
      type: '19 Aug',
      subscribers: 38,
    },
  ];
  const config = {
    data,
    xField: 'type',
    yField: 'subscribers',
    label: {
      position: 'middle',

      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: 'Subscribers',
      },
      subscribers: {
        alias: 'count',
      },
    },
  };
  // @ts-ignore
  return <Column {...config} />;
};

export const SubscribersChart = ({ ...others }: Props) => {
  return (
    <Card title="YouTube Subscribers" extra={<MoreMenu />} {...others}>
      <Flex gap="middle" vertical>
        <Typography.Text>75% activity growth</Typography.Text>
        <ColumnChart />
      </Flex>
    </Card>
  );
};
