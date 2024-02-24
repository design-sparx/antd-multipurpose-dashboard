import { Button, CardProps } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { Area } from '@ant-design/charts';
import { Card } from '../../../index.ts';

const AreaChart = () => {
  const data = [
    {
      timePeriod: '1 Aug',
      value: 6789,
    },
    {
      timePeriod: '2 Aug',
      value: 4123,
    },
    {
      timePeriod: '3 Aug',
      value: 7142,
    },
    {
      timePeriod: '4 Aug',
      value: 8461,
    },
    {
      timePeriod: '5 Aug',
      value: 10393,
    },
    {
      timePeriod: '6 Aug',
      value: 20381,
    },
    {
      timePeriod: '7 Aug',
      value: 19381,
    },
    {
      timePeriod: '8 Aug',
      value: 5693,
    },
    {
      timePeriod: '9 Aug',
      value: 11283,
    },
    {
      timePeriod: '10 Aug',
      value: 17621,
    },
  ];

  const config = {
    data,
    xField: 'timePeriod',
    yField: 'value',
    xAxis: {
      range: [0, 1],
    },
    smooth: true,
  };

  return <Area {...config} />;
};

type Props = CardProps;

const VisitorsChartCard = ({ ...others }: Props) => {
  return (
    <Card
      title="Website visitor traffic and analytics"
      extra={
        <Button>
          More details <RightOutlined />
        </Button>
      }
      {...others}
    >
      <AreaChart />
    </Card>
  );
};

export default VisitorsChartCard;
