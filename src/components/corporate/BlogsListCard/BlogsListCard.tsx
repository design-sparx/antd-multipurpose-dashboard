import React from 'react';
import {Button, CardProps, List, Space, Typography} from "antd";
import {Card} from "../../index.ts";
import {LikeOutlined, MessageOutlined, StarOutlined} from '@ant-design/icons';

import "./styles.css"

const data = Array.from({ length: 23 }).map((_, i) => ({
    href: 'https://ant.design',
    title: `Lorem ipsum ${i}`,
    avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
    description:
        'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
        'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

type Props = CardProps

const BlogsListCard = ({...others}: Props) => {
    return (
        <Card
            title="Blogs"
            actions={[<Button>Explore more</Button>]}
            className="card blogs-list-card"
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
                    align: "center"
                }}
                dataSource={data}
                renderItem={(item) => (
                    <List.Item
                        key={item.title}
                        actions={[
                            <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                            <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                            <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                        ]}
                    >
                        <Typography.Title level={5} className="m-0">{item.title}</Typography.Title>
                        <Typography.Paragraph ellipsis={{rows: 3}} className="m-0">
                            {item.content}
                        </Typography.Paragraph>
                    </List.Item>
                )}
            />
        </Card>
    );
};

export default BlogsListCard;