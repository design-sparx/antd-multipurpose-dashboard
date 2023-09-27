import {Button, CardProps, Popover, Progress, ProgressProps, Rate, Space, Typography} from "antd";
import {lime, green, yellow, orange, red} from '@ant-design/colors';
import {ExclamationOutlined, QuestionOutlined, SyncOutlined} from "@ant-design/icons";
import {Card} from "../../../index.ts";

const PROGRESS_PROPS: ProgressProps = {
    style: {
        width: 300
    }
}

type Props = CardProps

const CustomerReviewsCard = ({...others}: Props) => {
    return (
        <Card
            title={
                <Space>
                    <Typography.Title level={5}>Customer reviews</Typography.Title>
                    <Popover content="Total sales over period x" title="Total sales">
                        <Button icon={<QuestionOutlined/>}/>
                    </Popover>
                </Space>
            }
            extra={<Button icon={<SyncOutlined/>}/>} {...others}
        >
            <Space>
                <Rate allowHalf value={4.6}/>
                <Typography.Title level={3}>4.6 out of 5 stars</Typography.Title>
            </Space>
            <Typography.Paragraph>Overall rating of 5k reviews</Typography.Paragraph>
            <Space style={{width: '100%'}} direction="vertical">
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography.Text>Excellent</Typography.Text>
                    <Progress percent={35} strokeColor={lime[6]} {...PROGRESS_PROPS}/>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography.Text>Good</Typography.Text>
                    <Progress percent={25} strokeColor={green[5]} {...PROGRESS_PROPS}/>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography.Text>Average</Typography.Text>
                    <Progress percent={30} strokeColor={yellow[6]} {...PROGRESS_PROPS}/>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography.Text>Poor</Typography.Text>
                    <Progress percent={30} strokeColor={orange[5]} {...PROGRESS_PROPS}/>
                </div>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Typography.Text>Critical</Typography.Text>
                    <Progress percent={30} strokeColor={red[6]} {...PROGRESS_PROPS}/>
                </div>
            </Space>
            <Space>
                <Typography.Text>
                    Ratings and reviews are verified
                </Typography.Text>
                <Button icon={<ExclamationOutlined/>}/>
            </Space>
            <Button>See all customer reviews</Button>
        </Card>
    );
};

export default CustomerReviewsCard;