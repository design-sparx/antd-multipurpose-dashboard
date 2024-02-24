import { Column } from '@ant-design/charts';
import { Button, CardProps } from 'antd';
import { Card } from '../../../index.ts';

type Tasks = {
  day: string;
  value: number;
  status: string;
};

type ChartProps = {
  data: Tasks[];
};

const ColumnChart = ({ data }: ChartProps) => {
  const config = {
    data,
    isStack: true,
    xField: 'day',
    yField: 'value',
    seriesField: 'status',
    label: {
      position: 'top', // 'top', 'bottom', 'middle'
      offset: 10,
      style: {
        fill: 'transparent',
      },
    },
    interactions: [
      {
        type: 'active-region',
        enable: false,
      },
    ],
    columnBackground: {
      style: {
        fill: 'rgba(0,0,0,0.1)',
      },
    },
    legend: {
      position: 'bottom',
    },
  };

  // @ts-ignore
  return <Column {...config} />;
};

type Props = {
  data?: Tasks[];
} & CardProps;

const TasksChartCard = ({ data, ...others }: Props) => {
  return (
    <Card title="Tasks stats" extra={<Button>See all</Button>} {...others}>
      <ColumnChart data={data || []} />
    </Card>
  );
};

export default TasksChartCard;
