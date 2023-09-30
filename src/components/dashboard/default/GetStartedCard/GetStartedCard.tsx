import {Button, CardProps, Image, Space, Typography} from "antd";
import {RightOutlined} from "@ant-design/icons";
import {Card} from "../../../index";

type Props = CardProps

const GetStartedCard = ({...others}: Props) => {
    return (
        <Card {...others}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 8,
                }}
            >
                <Space direction="vertical" size="large">
                    <Typography.Title level={4} style={{margin: 0}}>You have 2 projects to finish this
                        week</Typography.Title>
                    <Typography.Text>You have already completed 68% of your monthly target. Keep going to achieve your
                        goal.</Typography.Text>
                    <Button type="primary">More{' '}<RightOutlined/></Button>
                </Space>
                <Image src="/get-started.png" height={180} preview={false} style={{objectFit: 'cover'}}/>
            </div>
        </Card>
    );
};

export default GetStartedCard;