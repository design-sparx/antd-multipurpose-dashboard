import {Card as AntdCard, Button, CardProps, Space, Tag, Typography, theme} from "antd";
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
            {SOCIALS_DATA.map((_, i) =>
                <AntdCard.Grid
                    key={`${_.title}-${i}`}
                    hoverable={false}
                    style={{borderRadius, ...gridStyle}}
                >
                    <Space>
                        <Typography.Text>{_.title}</Typography.Text>
                        <Tag color={_.diff < 0 ? 'error' : 'success'}>{_.diff}</Tag>
                    </Space>
                    <Space>
                        <Typography.Title level={4} style={{margin: 0}}>{_.value}</Typography.Title>
                        <Typography.Text color="secondary">visitors</Typography.Text>
                    </Space>
                </AntdCard.Grid>
            )}
        </Card>
    );
};

export default SocialStatsCard;