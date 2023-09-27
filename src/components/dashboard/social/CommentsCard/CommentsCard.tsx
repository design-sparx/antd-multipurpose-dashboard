import {Avatar, Button, CardProps, List, Space, Tag, theme, Typography} from "antd";
import {ArrowRightOutlined, CommentOutlined, DeleteOutlined, LikeOutlined} from "@ant-design/icons";
import {Comments} from "../../../../types";
import {getNameInitials} from "../../../../utils";
import {Card} from "../../../index.ts";

type Props = {data: Comments[]} & CardProps

const CommentsCard = ({data, ...others}: Props) => {
    const {token} = theme.useToken()

    return (
        <Card
            title="Comments"
            actions={[<Button>View all{' '}<ArrowRightOutlined/></Button>]}
            {...others}
        >
            <List
                itemLayout="vertical"
                size="large"
                pagination={false}
                dataSource={data}
                renderItem={(item: Comments) => (
                    <List.Item
                        key={item.id}
                        style={{padding: '.5rem 0 1rem 0'}}
                    >
                        <Space direction="vertical" size="small">
                            <Space>
                                <Avatar style={{backgroundColor: token.colorPrimary}}>{getNameInitials(item.author)}</Avatar>
                                <Space direction="vertical" size={0}>
                                    <Typography.Title level={5} style={{margin: 0}}>{item.author}</Typography.Title>
                                    <Tag>{item.activity_type}</Tag>
                                </Space>
                            </Space>
                            <Typography.Paragraph ellipsis={{rows: 3}} style={{margin: 0}}>{item.post_content}</Typography.Paragraph>
                            <Space>
                                <Space size="small">
                                    <Button shape="circle"><LikeOutlined/></Button>
                                    <Button shape="circle"><CommentOutlined/></Button>
                                    <Button shape="circle"><DeleteOutlined/></Button>
                                </Space>
                                <Button>See Post</Button>
                            </Space>
                        </Space>
                    </List.Item>
                )}
            />
        </Card>
    );
};

export default CommentsCard;