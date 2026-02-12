import { CirclePacking } from '@ant-design/charts';
import { Button, CardProps, Popover } from 'antd';
import { Card } from '../../../index.ts';
import { QuestionOutlined } from '@ant-design/icons';

const CirclePackingChart = () => {
  const data = {
    name: 'root',
    children: [
      {
        name: 'US',
        value: 1046790,
      },
      {
        name: 'China',
        value: 1039358,
      },
      {
        name: 'Canada',
        value: 461880,
      },
      {
        name: 'France',
        value: 308136,
      },
      {
        name: 'India',
        value: 270578,
      },
      {
        name: 'Germany',
        value: 226334,
      },
      {
        name: 'UK',
        value: 197342,
      },
      {
        name: 'Brazil',
        value: 189739,
      },
      {
        name: 'South Africa',
        value: 175272,
      },
      {
        name: 'Spain',
        value: 150621,
      },
      {
        name: 'Russia',
        value: 138255,
      },
      {
        name: 'Egypt',
        value: 121216,
      },
      {
        name: 'Australia',
        value: 119912,
      },
      {
        name: 'Japan',
        value: 102488,
      },
      {
        name: 'New Zealand',
        value: 90157,
      },
      {
        name: 'Netherlands',
        value: 59307,
      },
      {
        name: 'Italy',
        value: 58999,
      },
      {
        name: 'Switzerland',
        value: 52776,
      },
      {
        name: 'Sweden',
        value: 50800,
      },
      {
        name: 'Greece',
        value: 22614,
      },
      {
        name: 'Morocco',
        value: 22026,
      },
      {
        name: 'Mexico',
        value: 19706,
      },
      {
        name: 'Saudi Arabia',
        value: 18274,
      },
      {
        name: 'Poland',
        value: 16108,
      },
      {
        name: 'Algeria',
        value: 12535,
      },
      {
        name: 'Israel',
        value: 12240,
      },
      {
        name: 'Argentina',
        value: 1992,
      },
      {
        name: 'Portugal',
        value: 36,
      },
    ],
  };
  const config = {
    autoFit: true,
    padding: 0,
    data,
    sizeField: 'r',
    color: 'rgb(252, 253, 191)-rgb(231, 82, 99)-rgb(183, 55, 121)',
    // 自定义 label 样式
    label: {
      formatter: ({ name }: any) => {
        return name !== 'root' ? name : '';
      },
      // 偏移
      offsetY: 8,
      style: {
        fontSize: 12,
        textAlign: 'center',
        fill: 'rgba(0,0,0,0.65)',
      },
    },
    legend: false,
  };

  // @ts-ignore
  return <CirclePacking {...config} />;
};

type Props = CardProps;

export const AudienceLocationChart = ({ ...others }: Props) => {
  return (
    <Card
      title="Audience by location"
      extra={
        <Popover content="View your audience data by their location">
          <Button icon={<QuestionOutlined />} type="text" />
        </Popover>
      }
      {...others}
    >
      <CirclePackingChart />
    </Card>
  );
};
