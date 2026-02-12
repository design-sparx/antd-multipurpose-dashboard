import {
  Button,
  CardProps,
  Col,
  Dropdown,
  Flex,
  MenuProps,
  Row,
  Space,
  Typography,
} from 'antd';
import { RadialBar } from '@ant-design/charts';
import { DownOutlined } from '@ant-design/icons';
import { Card } from '../../../index.ts';

const RadialChart = () => {
  const data = [
    {
      name: 'Not Started',
      count: 805,
    },
    {
      name: 'In Progress',
      count: 1478,
    },
    {
      name: 'Completed',
      count: 7100,
    },
  ];

  const config = {
    data,
    height: 240,
    xField: 'name',
    yField: 'count',
    maxAngle: 270,
    radius: 1,
    innerRadius: 0.5,
    tooltip: {
      formatter: (datum: any) => {
        return {
          name: 'count',
          value: datum.count,
        };
      },
    },
    colorField: 'count',
    color: ({ count }: any) => {
      if (count > 5000) {
        return '#36c361';
      } else if (count > 1000) {
        return '#2194ff';
      }

      return '#ff4d4f';
    },
    barBackground: {},
    barStyle: {
      lineCap: 'round',
    },
    xAxis: {
      title: null, // Hide x-axis title
      label: null, // Hide x-axis labels
    },
  };

  // @ts-ignore
  return <RadialBar {...config} />;
};

const items: MenuProps['items'] = [
  {
    key: 'daily',
    label: 'Daily',
  },
  {
    key: 'weekly',
    label: 'Weekly',
  },
  {
    key: 'yearly',
    label: 'Yearly',
  },
];

type Props = CardProps;

export const ProgressCard = ({ ...others }: Props) => {
  return (
    <Card
      title="My Progress"
      extra={
        <Dropdown menu={{ items }} trigger={['click']}>
          <Button onClick={(e) => e.preventDefault()}>
            <Space>
              Weekly
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      }
      {...others}
    >
      <Flex vertical gap="middle">
        <RadialChart />
        <Typography.Paragraph style={{ textAlign: 'center' }}>
          Total hours: <b>10h 34min</b>
        </Typography.Paragraph>
        <Row>
          <Col span={8}>
            <div style={{ display: 'flex', gap: '4px' }}>
              <div
                style={{
                  height: '20px',
                  width: '8px',
                  backgroundColor: '#36c361',
                  borderRadius: '4px',
                }}
              />
              <Space direction="vertical" size={2}>
                <Typography.Text strong>7100/9383</Typography.Text>
                <Typography.Text>Completed</Typography.Text>
              </Space>
            </div>
          </Col>
          <Col span={8}>
            <div style={{ display: 'flex', gap: '4px', borderRadius: '4px' }}>
              <div
                style={{
                  height: '20px',
                  width: '8px',
                  backgroundColor: '#2194ff',
                  borderRadius: '4px',
                }}
              />
              <Space direction="vertical" size={2}>
                <Typography.Text strong>1478/9383</Typography.Text>
                <Typography.Text>In progress</Typography.Text>
              </Space>
            </div>
          </Col>
          <Col span={8}>
            <div style={{ display: 'flex', gap: '4px', borderRadius: '4px' }}>
              <div
                style={{
                  height: '20px',
                  width: '8px',
                  backgroundColor: '#ff4d4f',
                  borderRadius: '4px',
                }}
              />
              <Space direction="vertical" size={2}>
                <Typography.Text strong>805/9383</Typography.Text>
                <Typography.Text>Not started</Typography.Text>
              </Space>
            </div>
          </Col>
        </Row>
      </Flex>
    </Card>
  );
};
