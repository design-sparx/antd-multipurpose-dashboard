import {Button, Card, CardProps, Image, Space, Typography} from "antd";

type Props = CardProps

const GetStartedCard = ({...others}: Props) => {
    return (
        <Card {...others}>
            <Space align="center">
                <Image src="/get-started.png" height={200} preview={false} style={{objectFit: 'cover'}}/>
                <Space direction="vertical">
                    <Typography.Title level={4}>Get started</Typography.Title>
                    <Button type="primary">Go to guided setup</Button>
                </Space>
            </Space>
        </Card>
    );
};

export default GetStartedCard;