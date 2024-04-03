import { Button, Calendar, CalendarProps, CardProps, Popover } from 'antd';
import type { Dayjs } from 'dayjs';
import { QuestionOutlined } from '@ant-design/icons';
import { Card } from '../../../index.ts';

const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
  console.log(value.format('YYYY-MM-DD'), mode);
};

type Props = CardProps;

export const CampaignsActivity = ({ ...others }: Props) => {
  return (
    <Card
      title="Campaign activity"
      extra={
        <Popover content="Check the campaign activity schedule">
          <Button icon={<QuestionOutlined />} type="text" />
        </Popover>
      }
      {...others}
    >
      <Calendar fullscreen={false} onPanelChange={onPanelChange} />
    </Card>
  );
};
