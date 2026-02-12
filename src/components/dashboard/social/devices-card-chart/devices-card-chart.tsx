import { Button, CardProps, Col, Popover, Row, Space, Typography } from 'antd';
import { Pie } from '@ant-design/charts';
import {
  DesktopOutlined,
  MobileOutlined,
  QuestionOutlined,
  SettingOutlined,
  TabletFilled,
} from '@ant-design/icons';
import { Card } from '../../../index.ts';

const PieChart = () => {
  const data = [
    {
      type: 'Desktop',
      value: 16,
    },
    {
      type: 'Mobile',
      value: 70,
    },
    {
      type: 'Tablet',
      value: 10,
    },
    {
      type: 'Others',
      value: 4,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: ({ percent }: any) => `${(percent * 100).toFixed(0)}%`,
      style: {
        textAlign: 'center',
        fontSize: 12,
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          fontSize: 16,
          fontWeight: 'normal',
        },
        content: 'Devices\nUsage',
      },
    },
    legend: false,
  };

  // @ts-ignore
  return <Pie {...config} />;
};

type Props = CardProps;

export const DevicesCardChart = ({ ...others }: Props) => {
  return (
    <Card
      title="Flow on device"
      extra={
        <Popover content="Stats can help to design post">
          <Button icon={<QuestionOutlined />} type="text" />
        </Popover>
      }
      {...others}
    >
      <Row gutter={[8, 8]} style={{ alignItems: 'center' }}>
        <Col xs={24} sm={10} lg={8}>
          <div style={{ height: 200 }}>
            <PieChart />
          </div>
        </Col>
        <Col xs={24} sm={12} lg={14}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Space direction="vertical">
              <DesktopOutlined />
              <Typography.Text>Desktop</Typography.Text>
              <Typography.Text style={{ color: '#62daaa' }}>
                70%
              </Typography.Text>
            </Space>
            <Space direction="vertical">
              <MobileOutlined />
              <Typography.Text>Mobile</Typography.Text>
              <Typography.Text style={{ color: '#6394f9' }}>
                16%
              </Typography.Text>
            </Space>
            <Space direction="vertical">
              <TabletFilled />
              <Typography.Text>Tablet</Typography.Text>
              <Typography.Text style={{ color: '#657797' }}>
                10%
              </Typography.Text>
            </Space>
            <Space direction="vertical">
              <SettingOutlined />
              <Typography.Text>Other</Typography.Text>
              <Typography.Text style={{ color: '#f6c022' }}>4%</Typography.Text>
            </Space>
          </div>
        </Col>
      </Row>
    </Card>
  );
};
