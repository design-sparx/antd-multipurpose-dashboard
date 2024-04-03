import { Badge, Card, CardProps, Space, Typography } from 'antd';
import { Pie } from '@ant-design/charts';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import * as _ from 'lodash';
import { MoreMenu } from '../../../index.ts';

type Props = {
  data: any;
  title: string;
  diff: number;
} & CardProps;

export const EarningsCard = ({ data, title, diff, ...others }: Props) => {
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
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
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
        },
        content: '',
      },
    },
  };

  return (
    <Card title={title} extra={<MoreMenu />} {...others}>
      <Space
        direction="vertical"
        style={{ justifyContent: 'flex-start', width: '100%' }}
      >
        <Space direction="horizontal" align="center">
          <Typography.Title level={1} style={{ margin: 0 }}>
            <small>$</small>
            {_.sumBy(data, 'value')}
          </Typography.Title>
          <Badge
            count={
              <div style={{ display: 'flex', gap: '4px' }}>
                {diff < 0 ? <ArrowDownOutlined /> : <ArrowUpOutlined />}
                <Typography.Text style={{ color: 'white' }} strong>
                  {diff}
                </Typography.Text>
              </div>
            }
            style={{
              backgroundColor: diff < 0 ? '#ff4d4f' : '#52c41a',
              color: 'white',
              padding: '.175rem .35rem',
            }}
          />
        </Space>
        <div style={{ height: 180, textAlign: 'center' }}>
          {/*@ts-ignore*/}
          <Pie {...config} />
        </div>
      </Space>
    </Card>
  );
};
