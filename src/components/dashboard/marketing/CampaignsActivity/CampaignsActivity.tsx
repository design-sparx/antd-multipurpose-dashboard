import {Button, Calendar, CalendarProps, CardProps, Space, Typography} from "antd";
import type {Dayjs} from 'dayjs';
import {RightOutlined} from "@ant-design/icons";
import {Card} from "../../../index.ts";

const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM-DD'), mode);
};

type Props = CardProps

const CampaignsActivity = ({...others}: Props) => {
    return (
        <Card
            title={
                <Space direction="vertical">
                    <Typography.Title level={5}>Campaign activity</Typography.Title>
                    <Typography.Text>Check the campaign activity schedule</Typography.Text>
                </Space>
            }
            extra={<Button>More details{' '}<RightOutlined/></Button>}
            {...others}
        >
            <Calendar fullscreen={false} onPanelChange={onPanelChange}/>
        </Card>
    );
};

export default CampaignsActivity;