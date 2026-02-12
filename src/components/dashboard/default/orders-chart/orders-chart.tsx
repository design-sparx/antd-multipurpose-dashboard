import { Card, CardProps } from 'antd';
import { Area } from '@ant-design/charts';
import { MoreMenu } from '../../../index.ts';

const AreaChart = () => {
  const data = [
    {
      country: 'order',
      date: '1 Aug',
      value: 100,
    },
    {
      country: 'order',
      date: '8 Aug',
      value: 300,
    },
    {
      country: 'order',
      date: '15 Aug',
      value: 200,
    },
    {
      country: 'order',
      date: '22 Aug',
      value: 250,
    },
    {
      country: 'revenue',
      date: '1 Aug',
      value: 900.5,
    },
    {
      country: 'revenue',
      date: '8 Aug',
      value: 1500.5,
    },
    {
      country: 'revenue',
      date: '15 Aug',
      value: 1200.7,
    },
    {
      country: 'revenue',
      date: '22 Aug',
      value: 1300.1,
    },
  ];

  const config = {
    data,
    xField: 'date',
    yField: 'value',
    seriesField: 'country',
    slider: {
      start: 0.1,
      end: 0.9,
    },
  };

  return <Area {...config} />;
};

type Props = CardProps;

export const OrdersChart = ({ ...others }: Props) => {
  return (
    <Card title="Orders value" extra={<MoreMenu />} {...others}>
      <AreaChart />
    </Card>
  );
};
