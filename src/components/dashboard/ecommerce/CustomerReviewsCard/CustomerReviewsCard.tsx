import {
  Button,
  CardProps,
  Flex,
  Popover,
  Progress,
  ProgressProps,
  Rate,
  Typography,
} from 'antd';
import { green, lime, orange, red, yellow } from '@ant-design/colors';
import { QuestionOutlined } from '@ant-design/icons';
import { Card } from '../../../index.ts';

const PROGRESS_PROPS: ProgressProps = {
  style: {
    width: 300,
  },
};

type Props = CardProps;

export const CustomerReviewsCard = ({ ...others }: Props) => {
  return (
    <Card
      title="Customer reviews"
      extra={
        <Popover content="Overall rating of 5k reviews" title="Review ratings">
          <Button icon={<QuestionOutlined />} size="small" type="text" />
        </Popover>
      }
      actions={[<Button>See all customer reviews</Button>]}
      {...others}
    >
      <Flex vertical gap="middle">
        <Flex align="center" gap="middle" justify="center">
          <Rate allowHalf value={4.6} disabled />
          <Typography.Title level={2} style={{ margin: 0 }}>
            4.6/5
          </Typography.Title>
        </Flex>
        <Flex vertical gap="small">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography.Text>Excellent</Typography.Text>
            <Progress percent={35} strokeColor={lime[6]} {...PROGRESS_PROPS} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography.Text>Good</Typography.Text>
            <Progress percent={25} strokeColor={green[5]} {...PROGRESS_PROPS} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography.Text>Average</Typography.Text>
            <Progress
              percent={30}
              strokeColor={yellow[6]}
              {...PROGRESS_PROPS}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography.Text>Poor</Typography.Text>
            <Progress
              percent={30}
              strokeColor={orange[5]}
              {...PROGRESS_PROPS}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography.Text>Critical</Typography.Text>
            <Progress percent={30} strokeColor={red[6]} {...PROGRESS_PROPS} />
          </div>
        </Flex>
      </Flex>
    </Card>
  );
};
