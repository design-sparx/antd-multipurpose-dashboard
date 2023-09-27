import {Avatar, Button, CardProps, Col, Divider, Image, List, Row, Space, theme, Typography} from "antd";
import {Posts} from "../../../../types";
import {CommentOutlined, DeleteFilled, EditFilled, LikeOutlined, ShareAltOutlined} from "@ant-design/icons";
import React from "react";
import {getNameInitials} from "../../../../utils";
import {Card} from "../../../index.ts";

const IconText = ({icon, text}: { icon: React.FC; text: string | number }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

type Props = {
    as: "scheduled" | "active"
    data: Posts[]
} & CardProps

const PostsCard = ({as, data, ...others}: Props) => {
    const {token} = theme.useToken();

    return (
        <Card
            {...others}
        >
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 5,
                }}
                dataSource={data}
                renderItem={(item: Posts) => (
                    as === "active" ?
                        <List.Item
                            key={item.title}
                            actions={[
                                <IconText icon={LikeOutlined} text={item.likes_count} key="list-vertical-star-o"/>,
                                <IconText icon={CommentOutlined} text={item.comments_count} key="list-vertical-like-o"/>,
                                <IconText icon={ShareAltOutlined} text={item.shares_count} key="list-vertical-message"/>,
                            ]}
                            extra={
                                <img
                                    width={32}
                                    alt="logo"
                                    src={item.image_url}
                                />
                            }
                        >
                            <List.Item.Meta
                                avatar={
                                    <Avatar
                                        style={{backgroundColor: token.colorPrimary}}
                                    >
                                        {getNameInitials(item.author)
                                        }
                                    </Avatar>}
                                title={
                                    <Typography.Link
                                        style={{textTransform: 'capitalize'}}
                                    >
                                        {item.title.slice(0, 30)}...
                                    </Typography.Link>
                                }
                                description={
                                    <Space>
                                        <Typography.Text>{item.category}</Typography.Text>
                                        <Divider type="vertical"/>
                                        <Typography.Text>{item.date}</Typography.Text>
                                        <Divider type="vertical"/>
                                        <Typography.Text>{item.location}</Typography.Text>
                                    </Space>
                                }
                            />
                            <Typography.Paragraph
                                ellipsis={{rows: 3}}
                            >
                                {item.content}
                            </Typography.Paragraph>
                        </List.Item> :
                        <List.Item
                            key={item.title}
                        >
                            <Row>
                                <Col span={4}>
                                    <Image
                                        src={item.image_url}
                                        width={48}
                                        height={48}
                                        alt={item.title}
                                        placeholder={true}
                                        preview={false}
                                    />
                                </Col>
                                <Col span={18}>
                                    <Space direction="vertical">
                                        <Typography.Title
                                            level={5}
                                            style={{margin: 0}}
                                        >
                                            {item.title.slice(0, 20)}
                                        </Typography.Title>
                                        <Space>
                                            <Space direction="vertical">
                                                <Typography.Text>Category</Typography.Text>
                                                <Typography.Text>{item.category}</Typography.Text>
                                            </Space>
                                            <Space direction="vertical">
                                                <Typography.Text>Posted date</Typography.Text>
                                                <Typography.Text>{item.date}{' '}-{' '}{item.time}:00h</Typography.Text>
                                            </Space>
                                        </Space>
                                    </Space>
                                </Col>
                                <Col span={2}>
                                    <Space direction="vertical">
                                        <Button shape="circle"><EditFilled/></Button>
                                        <Button shape="circle"><DeleteFilled/></Button>
                                    </Space>
                                </Col>
                            </Row>
                        </List.Item>
                )}
            />
        </Card>
    );
};

export default PostsCard;