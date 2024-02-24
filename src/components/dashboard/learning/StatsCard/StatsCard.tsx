import React from 'react';
import { CardProps, Flex, Progress, Typography } from 'antd';
import { Card } from '../../../index.ts';
import CountUp from 'react-countup';

type Props = {
  title: string;
  value: number;
  icon: any;
  color: string;
  progress: number;
} & CardProps;

const StatsCard = ({
  color,
  icon,
  title,
  value,
  progress,
  ...others
}: Props) => {
  return (
    <Card {...others}>
      <Flex vertical gap="middle">
        {React.createElement(icon, { style: { fontSize: 30 } })}
        <Typography.Text className="m-0 text-capitalize">
          {title}
        </Typography.Text>
        <Typography.Title level={2} className="m-0">
          <CountUp end={value} />
        </Typography.Title>
        <Progress percent={progress} showInfo={false} strokeColor={color} />
      </Flex>
    </Card>
  );
};

export default StatsCard;
