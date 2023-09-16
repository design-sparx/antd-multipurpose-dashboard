import {Button, Card, CardProps, Space, Tag, Typography} from "antd";
import {
    FacebookOutlined,
    InstagramOutlined,
    LinkedinOutlined, RightOutlined,
    TwitterOutlined,
    YoutubeOutlined
} from "@ant-design/icons";

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
    return (
        <Card
            actions={[
               <Button>View details report <RightOutlined/></Button>
            ]}
            {...others}
        >
            {SOCIALS_DATA.map((_, i) =>
                <Card.Grid key={`${_.title}-${i}`} hoverable={false} style={gridStyle}>
                    <Space>
                        <Typography.Text>{_.title}</Typography.Text>
                        <Tag color={_.diff < 0 ? 'error' : 'success'}>{_.diff}</Tag>
                    </Space>
                    <Space>
                        <Typography.Title level={4} style={{margin: 0}}>{_.value}</Typography.Title>
                        <Typography.Text color="secondary">visitors</Typography.Text>
                    </Space>
                </Card.Grid>
            )}
        </Card>
    );
};

export default SocialStatsCard;