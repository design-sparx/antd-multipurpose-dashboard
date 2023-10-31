import {Alert, CardProps, Space, Typography} from "antd";
import {CommentOutlined, LikeOutlined, UserAddOutlined, UserOutlined, UserSwitchOutlined} from "@ant-design/icons";
import {ReactElement, ReactNode} from "react";
import {Card, Loader} from "../../../index";

type Props = {
    title: 'followers' | 'following' | 'likes' | 'comments',
    value: number,
    error: ReactNode
    loading: boolean
} & CardProps

const SocialStatsCard = ({value, title, loading, error, ...others}: Props) => {
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
            extra={<Icon/>}
            {...others}
        >
            {error ?
                <Alert
                    message="Error"
                    description={error.toString()}
                    type="error"
                    showIcon
                /> :
                (loading ?
                        <Loader/> :
                        <Space direction="vertical">
                            <Typography.Title className="m-0">{value}</Typography.Title>
                        </Space>
                )
            }
        </Card>
    );
};

export default SocialStatsCard;