import {Button, CardProps, Col, List, Progress, Row, Space, Typography} from "antd";
import React from "react";
import {GroupOutlined, RadiusSettingOutlined, ShareAltOutlined} from "@ant-design/icons";
import {Card} from "../../../index.ts";

const MOCK_DATA = [
    {
        title: 'ads challenges',
        progress: 56,
        current: 12000,
        target: 20000,
        deadline: '12/05/2023',
        icon: RadiusSettingOutlined
    },
    {
        title: 'add members',
        progress: 28,
        current: 3400,
        target: 20000,
        deadline: '12/05/2023',
        icon: GroupOutlined
    }
]

type Props = CardProps

const MilestonesCard = ({...others}: Props) => {
    return (
        <Card
            title="Milestones"
            extra={<Button icon={<ShareAltOutlined/>}>Share</Button>}
            {...others}
        >
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 3,
                }}
                dataSource={MOCK_DATA}
                renderItem={(item) => (
                    <List.Item
                        key={item.title}
                    >
                        <Row>
                            <Col span={2}>
                                {React.createElement(item.icon)}
                            </Col>
                            <Col span={8}>
                                <Space direction="vertical">
                                    <Typography.Title level={5}>{item.title}</Typography.Title>
                                    <Typography.Text>{item.target}{' '}reached</Typography.Text>
                                </Space>
                            </Col>
                            <Col span={8}>
                                <Space>
                                    <Typography.Title level={4}>{item.progress}%</Typography.Title>
                                    <Typography.Text type="secondary">targeted</Typography.Text>
                                </Space>
                                <Progress percent={item.progress} showInfo={false}/>
                            </Col>
                            <Col span={4}>
                                <Space direction="vertical">
                                    <Typography.Text>{item.deadline}</Typography.Text>
                                    <Button>View details</Button>
                                </Space>
                            </Col>
                        </Row>
                    </List.Item>
                )}
            />
        </Card>
    );
};

export default MilestonesCard;