import {Button, Card, CardProps, Image, Space, Typography} from "antd";
import {RightOutlined} from "@ant-design/icons";

type Props = CardProps

const GetStartedCard = ({...others}: Props) => {
    return (
        <Card {...others}>
            <Space align="center">
                <Space direction="vertical" size="large">
                    <Typography.Title level={4} style={{margin: 0}}>You have 2 projects to finish this
                        week</Typography.Title>
                    <Typography.Text>You have already completed 68% of your monthly target. Keep going to achieve your
                        goal.</Typography.Text>
                    <Button type="primary">More{' '}<RightOutlined/></Button>
                </Space>
                <Image src="/get-started.png" height={200} preview={false} style={{objectFit: 'cover'}}/>
            </Space>
        </Card>
    );
};

export default GetStartedCard;