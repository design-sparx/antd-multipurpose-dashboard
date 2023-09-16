import {useEffect, useState} from "react";
import {Col, Row, Space, Tabs, TabsProps} from "antd";
import {
    FacebookFilled,
    FacebookOutlined,
    InstagramFilled,
    InstagramOutlined,
    LinkedinFilled,
    LinkedinOutlined,
    TwitterCircleFilled,
    TwitterOutlined,
    YoutubeFilled,
    YoutubeOutlined
} from "@ant-design/icons";
import {
    CommentsCard,
    DevicesCardChart,
    FollowersChart,
    LikesChart,
    MilestonesCard,
    PostsCard,
    SocialStatsCard
} from "../../components";
import SocialMediaData from "../../mocks/SocialMedia.json";
import ScheduledPostsData from "../../mocks/ScheduledPosts.json"
import SocialsCommentsData from "../../mocks/SocialComments.json";

type TabKeys =
    'social-facebook-tab'
    | 'social-twitter-tab'
    | 'social-instagram-tab'
    | 'social-linkedin-tab'
    | 'social-youtube-tab'
    | string

type SectionProps = {
    tab: TabKeys
}

const Section = ({tab}: SectionProps) => {
    const [title, setTitle] = useState();

    useEffect(() => {
        switch (tab) {
            case "social-facebook-tab":
                setTitle('facebook');
                break;
            case "social-twitter-tab":
                setTitle('twitter');
                break;
            case "social-instagram-tab":
                setTitle('instagram');
                break;
            case "social-linkedin-tab":
                setTitle('linkedin')
                break;
            case "social-youtube-tab":
                setTitle('youtube')
                break;
            default:
                setTitle('');
        }
    }, [tab]);

    return <>
        <Col span={18}>
            <Row gutter={[{xs: 8, sm: 12, md: 20, lg: 24}, {xs: 4, sm: 8, md: 12, lg: 16}]}>
                <Col span={6}>
                    <SocialStatsCard
                        title='followers'
                        value={SocialMediaData?.find(_ => _.title === title)?.followers || 0}
                    />
                </Col>
                <Col span={6}>
                    <SocialStatsCard
                        title='followers'
                        value={SocialMediaData?.find(_ => _.title === title)?.following || 0}
                    />
                </Col>
                <Col span={6}>
                    <SocialStatsCard
                        key='followers-card'
                        title='followers'
                        value={SocialMediaData?.find(_ => _.title === title)?.likes || 0}
                    />
                </Col>
                <Col span={6}>
                    <SocialStatsCard
                        key='followers-card'
                        title='followers'
                        value={SocialMediaData?.find(_ => _.title === title)?.comments || 0}
                    />
                </Col>
                <Col span={12}>
                    <FollowersChart/>
                </Col>
                <Col span={12}>
                    <LikesChart/>
                </Col>
                <Col span={12}>
                    <PostsCard
                        title='Scheduled Posts'
                        as="scheduled"
                        data={ScheduledPostsData?.filter(_ => _.platform.toLowerCase() === title)}
                    />
                </Col>
                <Col span={12}>
                    <Row gutter={[{xs: 8, sm: 12, md: 20, lg: 24}, {xs: 4, sm: 8, md: 12, lg: 16}]}>
                        <Col span={24}>
                            <DevicesCardChart/>
                        </Col>
                        <Col span={24}>
                            <MilestonesCard/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Col>
        <Col span={6}>
            <CommentsCard data={SocialsCommentsData.filter(_ => _.platform.toLowerCase() === title).slice(0, 7)}/>
        </Col>
    </>
}

const SocialDashboardPage = () => {
    const [activeTabKey, setActiveTabKey] = useState<TabKeys>('social-facebook-tab');

    const TAB_LIST: TabsProps['items'] = [
        {
            key: 'social-facebook-tab',
            label:
                <span>
                    {activeTabKey === 'social-facebook-tab' ? <FacebookFilled/> : <FacebookOutlined/>}
                    Facebook
            </span>,
        },
        {
            key: 'social-twitter-tab',
            label:
                <span>
                    {activeTabKey === 'social-twitter-tab' ? <TwitterCircleFilled/> : <TwitterOutlined/>}
                    Twitter
            </span>,
        },
        {
            key: 'social-instagram-tab',
            label:
                <span>
                    {activeTabKey === 'social-instagram-tab' ? <InstagramFilled/> : <InstagramOutlined/>}
                    Instagram
            </span>,
        },
        {
            key: 'social-linkedin-tab',
            label:
                <span>
                    {activeTabKey === 'social-linkedin-tab' ? <LinkedinFilled/> : <LinkedinOutlined/>}
                    LinkedIn
            </span>,
        },
        {
            key: 'social-youtube-tab',
            label:
                <span>
                    {activeTabKey === 'social-youtube-tab' ? <YoutubeFilled/> : <YoutubeOutlined/>}
                    YouTube
            </span>,
        },
    ];

    const TAB_CONTENT: Record<TabKeys, React.ReactNode> = {
        "social-facebook-tab": <Section tab={activeTabKey}/>,
        "social-twitter-tab": <Section tab={activeTabKey}/>,
        "social-instagram-tab": <Section tab={activeTabKey}/>,
        "social-linkedin-tab": <Section tab={activeTabKey}/>,
        "social-youtube-tab": <Section tab={activeTabKey}/>,
    };

    const onTabChange = (key: TabKeys) => {
        setActiveTabKey(key)
    };

    return (
        <div>
            <Tabs
                items={TAB_LIST}
                activeKey={activeTabKey}
                onChange={onTabChange}
            />
            <Row gutter={[{xs: 8, sm: 16, md: 24, lg: 32}, {xs: 4, sm: 8, md: 12, lg: 16}]}>
                {TAB_CONTENT[activeTabKey]}
            </Row>
        </div>
    );
};

export default SocialDashboardPage;