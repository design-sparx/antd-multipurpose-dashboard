import { Alert, CardProps, Flex, Timeline, Typography } from 'antd';
import {
  LaptopOutlined,
  MobileOutlined,
  TabletOutlined,
} from '@ant-design/icons';
import { ActivityTimeline } from '../../types';
import { Card, Loader } from '../index.ts';
import { ReactNode } from 'react';

type Props = {
  data?: ActivityTimeline[];
  loading?: boolean;
  error?: ReactNode;
} & CardProps;

const TimelineCard = ({ data, error, loading, ...others }: Props) => {
  return (
    <Card title="Latest activities" {...others}>
      {error ? (
        <Alert
          message="Error"
          description={error.toString()}
          type="error"
          showIcon
        />
      ) : loading ? (
        <Loader />
      ) : (
        <Timeline
          mode="left"
          items={data?.map((_) => ({
            dot:
              _.device_type === 'desktop' ? (
                <LaptopOutlined />
              ) : _.device_type === 'tablet' ? (
                <TabletOutlined />
              ) : (
                <MobileOutlined />
              ),
            children: (
              <Flex gap="small" vertical>
                <Typography.Paragraph
                  ellipsis={{
                    rows: 2,
                  }}
                  title={`${_.post_content}--${_.timestamp}`}
                  style={{ marginBottom: 0 }}
                >
                  {_.post_content}
                </Typography.Paragraph>
                <Typography.Text type="secondary">
                  {_.timestamp}
                </Typography.Text>
              </Flex>
            ),
          }))}
        />
      )}
    </Card>
  );
};

export default TimelineCard;
