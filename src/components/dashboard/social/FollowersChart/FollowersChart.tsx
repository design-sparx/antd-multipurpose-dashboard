import { CardProps, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { Line } from '@ant-design/charts';
import { Card } from '../../../index.ts';

type TabKeys = 'all' | 'followers' | 'following' | 'blocked' | string;

type LineProps = {
  type: TabKeys;
};

const LineChart = ({ type }: LineProps) => {
  const dd = [
    {
      month: 'Jan',
      key: 'followers',
      value: 125,
    },
    {
      month: 'Jan',
      key: 'following',
      value: 51,
    },
    {
      month: 'Jan',
      key: 'blocked',
      value: 6,
    },
    {
      month: 'Feb',
      key: 'followers',
      value: 132,
    },
    {
      month: 'Feb',
      key: 'following',
      value: 91,
    },
    {
      month: 'Feb',
      key: 'blocked',
      value: 9,
    },
    {
      month: 'Mar',
      key: 'followers',
      value: 141,
    },
    {
      month: 'Mar',
      key: 'following',
      value: 34,
    },
    {
      month: 'Mar',
      key: 'blocked',
      value: 3,
    },
    {
      month: 'Apr',
      key: 'followers',
      value: 158,
    },
    {
      month: 'Apr',
      key: 'following',
      value: 47,
    },
    {
      month: 'Apr',
      key: 'blocked',
      value: 4,
    },
    {
      month: 'May',
      key: 'followers',
      value: 133,
    },
    {
      month: 'May',
      key: 'following',
      value: 63,
    },
    {
      month: 'May',
      key: 'blocked',
      value: 6,
    },
    {
      month: 'June',
      key: 'followers',
      value: 143,
    },
    {
      month: 'June',
      key: 'following',
      value: 58,
    },
    {
      month: 'June',
      key: 'blocked',
      value: 7,
    },
    {
      month: 'July',
      key: 'followers',
      value: 176,
    },
    {
      month: 'July',
      key: 'following',
      value: 56,
    },
    {
      month: 'July',
      key: 'blocked',
      value: 6,
    },
    {
      month: 'Aug',
      key: 'followers',
      value: 194,
    },
    {
      month: 'Aug',
      key: 'following',
      value: 77,
    },
    {
      month: 'Aug',
      key: 'blocked',
      value: 8,
    },
    {
      month: 'Sep',
      key: 'followers',
      value: 115,
    },
    {
      month: 'Sep',
      key: 'following',
      value: 99,
    },
    {
      month: 'Sep',
      key: 'blocked',
      value: 10,
    },
    {
      month: 'Oct',
      key: 'followers',
      value: 134,
    },
    {
      month: 'Oct',
      key: 'following',
      value: 106,
    },
    {
      month: 'Oct',
      key: 'blocked',
      value: 16,
    },
    {
      month: 'Nov',
      key: 'followers',
      value: 110,
    },
    {
      month: 'Nov',
      key: 'following',
      value: 88,
    },
    {
      month: 'Nov',
      key: 'blocked',
      value: 8,
    },
    {
      month: 'Dec',
      key: 'followers',
      value: 91,
    },
    {
      month: 'Dec',
      key: 'following',
      value: 56,
    },
    {
      month: 'Dec',
      key: 'blocked',
      value: 8,
    },
  ];
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    if (type === 'all') {
      setData(dd);
    } else {
      setData(dd.filter((_) => _.key === type));
    }
  }, [type]);

  const config = {
    data,
    xField: 'month',
    yField: 'value',
    legend: false,
    seriesField: 'key',
    stepType: 'hvh',
  };

  // @ts-ignore
  return <Line {...config} />;
};

const TAB_LIST = [
  {
    key: 'all',
    tab: 'All',
  },
  {
    key: 'followers',
    tab: 'Followers',
  },
  {
    key: 'following',
    tab: 'Following',
  },
  {
    key: 'blocked',
    tab: 'Blocked',
  },
];

const TAB_CONTENT: Record<TabKeys, React.ReactNode> = {
  all: <LineChart type="all" />,
  followers: <LineChart type="followers" />,
  following: <LineChart type="following" />,
  blocked: <LineChart type="blocked" />,
};

type Props = CardProps;

const FollowersChart = ({ ...others }: Props) => {
  const [activeTabKey, setActiveTabKey] = useState<TabKeys>('all');

  const onTabChange = (key: TabKeys) => {
    setActiveTabKey(key);
  };

  return (
    <Card
      tabList={TAB_LIST}
      activeTabKey={activeTabKey}
      onTabChange={onTabChange}
      tabBarExtraContent={
        <Typography.Title level={5} className="m-0">
          Account activity
        </Typography.Title>
      }
      tabProps={{
        size: 'large',
      }}
      {...others}
    >
      {TAB_CONTENT[activeTabKey]}
    </Card>
  );
};

export default FollowersChart;
