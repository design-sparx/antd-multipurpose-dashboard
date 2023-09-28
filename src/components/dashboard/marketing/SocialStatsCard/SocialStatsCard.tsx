import {Card as AntdCard, Button, CardProps, Space, Tag, Typography, theme, List} from "antd";
import {
    FacebookOutlined,
    InstagramOutlined,
    LinkedinOutlined, RightOutlined,
    TwitterOutlined,
    YoutubeOutlined
} from "@ant-design/icons";
import {Card} from "../../../index.ts";

const SOCIALS_DATA = [
    {
        icon: <FacebookOutlined/>,
        title: 'facebook',
        diff: 12.3,
        value: 216869
    },
    {
        icon: <InstagramOutlined/>,
        title: 'instagram',
        diff: 4.8,
        value: 978342
    },
    {
        icon: <TwitterOutlined/>,
        title: 'twitter',
        diff: -2.4,
        value: 567323
    },
    {
        icon: <LinkedinOutlined/>,
        title: 'linkedIn',
        diff: 3.79,
        value: 738382
    },
    {
        icon: <YoutubeOutlined/>,
        title: 'youtube',
        diff: -5.3,
        value: 892123
    }
]

const gridStyle: React.CSSProperties = {
    width: '100%',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column'
};

type Props = CardProps

const SocialStatsCard = ({...others}: Props) => {
    const {
        token: {borderRadius},
    } = theme.useToken();

    return (
        <Card
            actions={[
                <Button>View details report <RightOutlined/></Button>
            ]}
            {...others}
        >
            <List
                grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 3,
                }}
                dataSource={SOCIALS_DATA}
                renderItem={(item, i ) => (
                    <AntdCard.Grid
                        key={`${item.title}-${i}`}
                        hoverable={false}
                        style={{borderRadius, ...gridStyle}}
                    >
                        <Space>
                            <Typography.Text>{item.title}</Typography.Text>
                            <Tag color={item.diff < 0 ? 'error' : 'success'}>{item.diff}</Tag>
                        </Space>
                        <Space>
                            <Typography.Title level={4} style={{margin: 0}}>{item.value}</Typography.Title>
                            <Typography.Text color="secondary">visitors</Typography.Text>
                        </Space>
                    </AntdCard.Grid>
                )}
            />
        </Card>
    );
};

export default SocialStatsCard;