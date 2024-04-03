import { CardProps, Col, Flex, Row, Tag, Typography } from 'antd';
import { TinyColumn } from '@ant-design/charts';
import { Card } from '../../../index.ts';
import CountUp from 'react-countup';

type ChartData = [number, number, number, number];

type StatsColumnChartProps = {
  data: ChartData;
  color?: string;
};

const ColumnChart = ({ data, color }: StatsColumnChartProps) => {
  const brandColor = color || '#5B8FF9';
  const config = {
    height: 64,
    autoFit: true,
    data,
    color: brandColor,
    tooltip: {
      customContent: function (x: any, data: any) {
        return `NO.${x}: ${data[0]?.data?.y.toFixed(2)}`;
      },
    },
  };
  return <TinyColumn {...config} />;
};

type Props = {
  title: string;
  value: number | string;
  data: ChartData;
  diff: number;
  asCurrency?: boolean;
} & CardProps;

export const StatsCard = ({
  data,
  diff,
  title,
  value,
  asCurrency,
  ...others
}: Props) => {
  return (
    <Card {...others}>
      <Flex vertical>
        <Typography.Text className="text-capitalize m-0">
          {title}
        </Typography.Text>
        <Row>
          <Col span={14}>
            <Typography.Title level={2}>
              {typeof value === 'number' ? (
                <>
                  {asCurrency && <span>$</span>}
                  <CountUp end={value} />
                </>
              ) : (
                value
              )}
            </Typography.Title>
          </Col>
          <Col span={10}>
            <ColumnChart data={data} />
          </Col>
        </Row>
        <Flex align="center">
          <Tag color={diff < 0 ? 'red' : 'green'}>{diff}%</Tag>
          <Typography.Text>compared to last month.</Typography.Text>
        </Flex>
      </Flex>
    </Card>
  );
};
