import {Card, CardProps, Space, Typography} from "antd";
import {CommentOutlined, LikeOutlined, UserAddOutlined, UserOutlined, UserSwitchOutlined} from "@ant-design/icons";
import {ReactElement} from "react";

type Props = {
    title: 'followers' | 'following' | 'likes' | 'comments',
    value: number,
} & CardProps

const SocialStatsCard = ({value, title, ...others}: Props) => {
    const Icon = (): ReactElement => {
        let i;
        switch (title) {
            case "following":
                i = <UserAddOutlined/>
                break;
            case "followers":
                i = <UserSwitchOutlined/>
                break;
            case "likes":
                i = <LikeOutlined/>
                break;
            case "comments":
                i = <CommentOutlined/>
                break
            default:
                i = <UserOutlined/>
                break
        }

        return i;
    }

    return (
        <Card
            title={title}
            {...others}
        >
            <Space>
                <Space direction="vertical">
                    <Typography.Title>{value}</Typography.Title>
                    <Typography.Text>{title}</Typography.Text>
                </Space>
                <Icon/>
            </Space>
        </Card>
    );
};

export default SocialStatsCard;