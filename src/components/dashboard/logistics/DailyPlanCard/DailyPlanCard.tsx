import { Bar } from '@ant-design/charts';
import { CardProps } from 'antd';
import { Card } from '../../../index.ts';

type Plan = {
  type: string;
  value: number;
};

type BarProps = {
  data: Plan[];
};

const BarChart = ({ data }: BarProps) => {
  const config = {
    data,
    xField: 'value',
    yField: 'type',
    seriesField: 'type',
    legend: {
      position: 'top-left',
    },
  };
  // @ts-ignore
  return <Bar {...config} />;
};

type Props = {
  data?: Plan[];
} & CardProps;

const DailyPlanCard = ({ data, ...others }: Props) => {
  return (
    <Card title="Daily activities" {...others}>
      <BarChart data={data || []} />
    </Card>
  );
};

export default DailyPlanCard;
