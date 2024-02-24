import { CardProps } from 'antd';
import { Column } from '@ant-design/charts';
import { Card } from '../../../index.ts';

const ColumnChart = () => {
  const data = [
    {
      name: 'Likes',
      month: 'Jan.',
      rainfall: 18.9,
    },
    {
      name: 'Likes',
      month: 'Feb.',
      rainfall: 28.8,
    },
    {
      name: 'Likes',
      month: 'Mar.',
      rainfall: 39.3,
    },
    {
      name: 'Likes',
      month: 'Apr.',
      rainfall: 81.4,
    },
    {
      name: 'Likes',
      month: 'May',
      rainfall: 47,
    },
    {
      name: 'Likes',
      month: 'Jun.',
      rainfall: 20.3,
    },
    {
      name: 'Likes',
      month: 'Jul.',
      rainfall: 24,
    },
    {
      name: 'Likes',
      month: 'Aug.',
      rainfall: 35.6,
    },
    {
      name: 'Share',
      month: 'Jan.',
      rainfall: 12.4,
    },
    {
      name: 'Share',
      month: 'Feb.',
      rainfall: 23.2,
    },
    {
      name: 'Share',
      month: 'Mar.',
      rainfall: 34.5,
    },
    {
      name: 'Share',
      month: 'Apr.',
      rainfall: 99.7,
    },
    {
      name: 'Share',
      month: 'May',
      rainfall: 52.6,
    },
    {
      name: 'Share',
      month: 'Jun.',
      rainfall: 35.5,
    },
    {
      name: 'Share',
      month: 'Jul.',
      rainfall: 37.4,
    },
    {
      name: 'Share',
      month: 'Aug.',
      rainfall: 42.4,
    },
    {
      name: 'Comments',
      month: 'Jan.',
      rainfall: 8.4,
    },
    {
      name: 'Comments',
      month: 'Feb.',
      rainfall: 33.2,
    },
    {
      name: 'Comments',
      month: 'Mar.',
      rainfall: 24.5,
    },
    {
      name: 'Comments',
      month: 'Apr.',
      rainfall: 79.7,
    },
    {
      name: 'Comments',
      month: 'May',
      rainfall: 42.6,
    },
    {
      name: 'Comments',
      month: 'Jun.',
      rainfall: 65.5,
    },
    {
      name: 'Comments',
      month: 'Jul.',
      rainfall: 57.4,
    },
    {
      name: 'Comments',
      month: 'Aug.',
      rainfall: 52.4,
    },
  ];
  const config = {
    data,
    isGroup: true,
    xField: 'month',
    yField: 'rainfall',
    seriesField: 'name',
    columnStyle: {
      radius: [20, 20, 0, 0],
    },
    label: {
      position: 'top',
    },
    /** Set color */
    //color: ['#1ca9e6', '#f88c24'],
  };

  // @ts-ignore
  return <Column {...config} />;
};

type Props = CardProps;

const LikesChart = ({ ...others }: Props) => {
  return (
    <Card title="Posts activity" {...others}>
      <ColumnChart />
    </Card>
  );
};

export default LikesChart;
