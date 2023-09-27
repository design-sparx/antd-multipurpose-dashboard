import {Badge, Button, Card as AntdCard,CardProps, List, Space, Tag, Typography} from "antd";
import {Tasks} from "../../../../types";
import {CalendarOutlined, FlagOutlined} from "@ant-design/icons";
import {Card, UserAvatar} from "../../../index.ts";

import "./styles.css";

type Props = {
    data: Tasks[]
} & CardProps

const TasksListCard = ({data, ...others}: Props) => {
    return (
        <Card
            title="Tasks"
            extra={<Button>View all</Button>}
            className="tasks-list-card card"
            {...others}
        >
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 1,
                    md: 2,
                    lg: 3,
                    xl: 3,
                    xxl: 4,
                }}
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 10,
                    align: "center"
                }}
                dataSource={data}
                renderItem={(item) => (
                    <List.Item
                        key={item.name}
                    >
                        <AntdCard title={item.name} hoverable={true} bordered={true} style={{height: "100%"}}>
                            <Space direction="vertical">
                                <Space style={{justifyContent: "space-between", width: "100%"}}>
                                    <Typography.Title
                                        level={5}
                                        style={{margin: 0, textTransform: "capitalize"}}
                                    >
                                        {item.name.slice(0, 20)}...
                                    </Typography.Title>
                                    <Tag bordered={false} style={{textTransform: "capitalize"}}>{item.category}</Tag>
                                </Space>
                                <Typography.Paragraph
                                    ellipsis={{rows: 2}}
                                    style={{marginBottom: 0}}
                                >
                                    {item.description}
                                </Typography.Paragraph>
                                <Space style={{justifyContent: "space-between", width: "100%"}}>
                                    <Tag
                                        icon={<FlagOutlined/>}
                                        color={item.color}
                                        style={{textTransform: "capitalize"}}
                                    >
                                        {item.priority}
                                    </Tag>
                                    <Badge
                                        status={
                                            item.status.toLowerCase() === "completed"
                                                ? "success"
                                                : item.status.toLowerCase() === "in progress"
                                                    ? "processing"
                                                    : "warning"
                                        }
                                        text={<span style={{textTransform: "capitalize"}}>{item.status}</span>}
                                    />
                                </Space>
                                <Space style={{justifyContent: "space-between", width: "100%"}}>
                                    <Typography.Text><CalendarOutlined/>{' '}{item.due_date}</Typography.Text>
                                    <UserAvatar fullName={item.assigned_to} size="medium"/>
                                </Space>
                            </Space>
                        </AntdCard>
                    </List.Item>
                )}
            />
        </Card>
    );
};

export default TasksListCard;