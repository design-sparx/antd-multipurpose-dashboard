import { Card, Flex, Typography } from 'antd';
import CountUp from 'react-countup';

export const StatCards = () => {
  return (
    <>
      <Card style={{ height: '100%' }}>
        <Flex vertical align="center" gap="middle">
          <Typography.Title style={{ margin: 0 }}>
            <CountUp end={10} />+
          </Typography.Title>
          <Typography.Text>Projects</Typography.Text>
        </Flex>
      </Card>
      <Card style={{ height: '100%' }}>
        <Flex vertical align="center" gap="middle">
          <Typography.Title style={{ margin: 0 }}>
            <CountUp end={60} />+
          </Typography.Title>
          <Typography.Text>Tasks</Typography.Text>
        </Flex>
      </Card>
    </>
  );
};
