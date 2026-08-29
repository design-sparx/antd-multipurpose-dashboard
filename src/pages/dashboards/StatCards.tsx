import { Card, Flex, Row, Col, Typography } from 'antd';
import CountUp from 'react-countup';
import { useStylesContext } from '../../contexts';

export const StatCards = () => {
  const stylesContext = useStylesContext();

  return (
    <Row {...stylesContext?.rowProps}>
      <Col xs={12} lg={12}>
        <Card style={{ height: '100%' }}>
          <Flex vertical align="center" gap="middle">
            <Typography.Title style={{ margin: 0 }}>
              <CountUp end={10} />+
            </Typography.Title>
            <Typography.Text>Projects</Typography.Text>
          </Flex>
        </Card>
      </Col>
      <Col xs={12} lg={12}>
        <Card style={{ height: '100%' }}>
          <Flex vertical align="center" gap="middle">
            <Typography.Title style={{ margin: 0 }}>
              <CountUp end={60} />+
            </Typography.Title>
            <Typography.Text>Tasks</Typography.Text>
          </Flex>
        </Card>
      </Col>
    </Row>
  );
};
