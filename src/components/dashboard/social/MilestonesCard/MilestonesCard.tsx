import {
  Button,
  CardProps,
  Col,
  Flex,
  List,
  Progress,
  Row,
  Typography,
} from 'antd';
import React from 'react';
import {
  GroupOutlined,
  RadiusSettingOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import { Card } from '../../../index.ts';

import './styles.css';

const MOCK_DATA = [
  {
    title: 'ads challenges',
    progress: 56,
    current: 12000,
    target: 20000,
    deadline: '12/05/2023',
    icon: RadiusSettingOutlined,
  },
  {
    title: 'add members',
    progress: 28,
    current: 3400,
    target: 20000,
    deadline: '12/05/2023',
    icon: GroupOutlined,
  },
];

type Props = CardProps;

export const MilestonesCard = ({ ...others }: Props) => {
  return (
    <Card
      title="Milestones"
      extra={<Button icon={<ShareAltOutlined />}>Share</Button>}
      className="milestones-lists-card card"
      {...others}
    >
      <List
        itemLayout="vertical"
        size="large"
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 3,
          align: 'center',
        }}
        dataSource={MOCK_DATA}
        renderItem={(item) => (
          <List.Item key={item.title}>
            <Row gutter={[8, 8]}>
              <Col xs={2} sm={2} lg={2}>
                <Flex
                  align="center"
                  justify="center"
                  style={{ height: '100%' }}
                >
                  {React.createElement(item.icon, {
                    style: { fontSize: 24, margin: 4 },
                  })}
                </Flex>
              </Col>
              <Col xs={22} sm={6} lg={6}>
                <Flex
                  vertical
                  gap="small"
                  justify="center"
                  style={{ height: '100%' }}
                >
                  <Typography.Title level={5} className="text-capitalize m-0">
                    {item.title}
                  </Typography.Title>
                  <Typography.Text>{item.target} reached</Typography.Text>
                </Flex>
              </Col>
              <Col xs={24} sm={8} lg={8}>
                <Flex vertical justify="center" style={{ height: '100%' }}>
                  <Flex align="end" gap="small">
                    <Typography.Title level={4} className="m-0">
                      {item.progress}%
                    </Typography.Title>
                    <Typography.Text>target</Typography.Text>
                  </Flex>
                  <Progress percent={item.progress} showInfo={false} />
                </Flex>
              </Col>
              <Col xs={12} sm={4} lg={4}>
                <Flex align="center" style={{ height: '100%' }}>
                  <Typography.Text>Deadline: {item.deadline}</Typography.Text>
                </Flex>
              </Col>
              <Col xs={12} sm={4} lg={4}>
                <Flex align="center" style={{ height: '100%' }}>
                  <Button size="middle" type="link">
                    View details
                  </Button>
                </Flex>
              </Col>
            </Row>
          </List.Item>
        )}
        className="overflow-scroll"
      />
    </Card>
  );
};
