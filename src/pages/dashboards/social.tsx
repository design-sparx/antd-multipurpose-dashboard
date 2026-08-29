import { useEffect, useState } from 'react';
import { Col, ConfigProvider, Row, Tabs, TabsProps } from 'antd';
import {
  FacebookFilled,
  FacebookOutlined,
  HomeOutlined,
  InstagramFilled,
  InstagramOutlined,
  LinkedinFilled,
  LinkedinOutlined,
  PieChartOutlined,
  TwitterCircleFilled,
  TwitterOutlined,
  YoutubeFilled,
  YoutubeOutlined,
} from '@ant-design/icons';
import {
  CommentsCard,
  DevicesCardChart,
  FollowersChart,
  LikesChart,
  MilestonesCard,
  PageHeader,
  PostsCard,
  SocialStatsCard,
} from '../../components';
import { DASHBOARD_ITEMS } from '../../constants';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useSocialActivities, useComments, useScheduledPosts } from '../../lib/queries';
import { SocialMediaActivityDto, ScheduledPostDto, CommentDto } from '../../lib/queries';
import { Posts, Comments } from '../../types';
import { useStylesContext } from '../../contexts';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { getThemeColors } from '../../theme/colors';

type TabKeys =
  | 'social-facebook-tab'
  | 'social-twitter-tab'
  | 'social-instagram-tab'
  | 'social-linkedin-tab'
  | 'social-youtube-tab'
  | string;

type SectionProps = {
  tab: TabKeys;
};

const Section = ({ tab }: SectionProps) => {
  const [title, setTitle] = useState<string>('');

  // Fetch social media data with proper typing
  const {
    data: socialsDataRaw,
    isLoading: socialsDataLoading,
    error: socialsDataError,
  } = useSocialActivities();
  const socialsData = socialsDataRaw ?? [];

  // Fetch social comments data with proper typing
  const {
    data: socialCommentsDataRaw,
    isLoading: socialsCommentsDataLoading,
    error: socialsCommentsDataError,
  } = useComments();
  const socialCommentsData = socialCommentsDataRaw ?? [];

  // Fetch scheduled posts data with proper typing
  const {
    data: scheduledPostsDataRaw,
    isLoading: scheduledPostsDataLoading,
    error: scheduledPostsDataError,
  } = useScheduledPosts();
  const scheduledPostsData = scheduledPostsDataRaw ?? [];

  useEffect(() => {
    switch (tab) {
      case 'social-facebook-tab':
        setTitle('facebook');
        break;
      case 'social-twitter-tab':
        setTitle('twitter');
        break;
      case 'social-instagram-tab':
        setTitle('instagram');
        break;
      case 'social-linkedin-tab':
        setTitle('linkedin');
        break;
      case 'social-youtube-tab':
        setTitle('youtube');
        break;
      default:
        setTitle('');
    }
  }, [tab]);

const errorMessage = socialsDataError?.toString() || scheduledPostsDataError?.toString() || socialsCommentsDataError?.toString();

  return (
    <>
      {/* Stats cards - top row */}
      <Col xs={24} md={12} lg={6}>
        <SocialStatsCard
          key="followers-card"
          title="followers"
          value={
            socialsData?.find((_: SocialMediaActivityDto) => _.platform === title)
              ?.reach || 0
          }
          error={errorMessage}
          loading={socialsDataLoading}
          style={{ height: '100%' }}
        />
      </Col>
      <Col xs={24} md={12} lg={6}>
        <SocialStatsCard
          key="following-card"
          title="following"
          value={
            socialsData?.find((_: SocialMediaActivityDto) => _.platform === title)
              ?.engagement_rate || 0
          }
          error={errorMessage}
          loading={socialsDataLoading}
          style={{ height: '100%' }}
        />
      </Col>
      <Col xs={24} md={12} lg={6}>
        <SocialStatsCard
          key="likes-card"
          title="likes"
          value={
            socialsData?.find((_: SocialMediaActivityDto) => _.platform === title)?.likes || 0
          }
          error={errorMessage}
          loading={socialsDataLoading}
          style={{ height: '100%' }}
        />
      </Col>
      <Col xs={24} md={12} lg={6}>
        <SocialStatsCard
          key="comments-card"
          title="comments"
          value={
            socialsData?.find((_: SocialMediaActivityDto) => _.platform === title)
              ?.comments || 0
          }
          error={errorMessage}
          loading={socialsDataLoading}
          style={{ height: '100%' }}
        />
      </Col>

      {/* Charts side by side */}
      <Col xs={24} lg={12}>
        <FollowersChart />
      </Col>
      <Col xs={24} lg={12}>
        <LikesChart style={{ height: '100%' }} />
      </Col>

      {/* Posts + Devices side by side */}
      <Col xs={24} lg={12}>
        <PostsCard
          title="Scheduled Posts"
          as="scheduled"
          data={scheduledPostsData?.filter(
            (_: ScheduledPostDto) => _.platform?.toLowerCase() === title
          ) as unknown as Posts[]}
          loading={scheduledPostsDataLoading}
          error={scheduledPostsDataError?.toString()}
        />
      </Col>
      <Col xs={24} lg={12}>
        <DevicesCardChart />
      </Col>

      {/* Milestones + Comments side by side */}
      <Col xs={24} lg={12}>
        <MilestonesCard />
      </Col>
      <Col xs={24} lg={12}>
        <CommentsCard
          data={socialCommentsData
            .filter((_: CommentDto) => _.platform?.toLowerCase() === title)
            ?.slice(0, 7) as unknown as Comments[]}
          loading={socialsCommentsDataLoading}
          error={socialsCommentsDataError?.toString()}
        />
      </Col>
    </>
  );
};

export const SocialDashboardPage = () => {
  const stylesContext = useStylesContext();
  const isMobile = useMediaQuery({ maxWidth: 769 });
  const { mytheme } = useSelector((state: RootState) => state.theme);
  const colors = getThemeColors(mytheme as 'dark' | 'light');
  const [activeTabKey, setActiveTabKey] = useState<TabKeys>(
    'social-facebook-tab'
  );

  const TAB_LIST: TabsProps['items'] = [
    {
      key: 'social-facebook-tab',
      label: (
        <span>
          {activeTabKey === 'social-facebook-tab' ? (
            <FacebookFilled />
          ) : (
            <FacebookOutlined />
          )}
          Facebook
        </span>
      ),
    },
    {
      key: 'social-twitter-tab',
      label: (
        <span>
          {activeTabKey === 'social-twitter-tab' ? (
            <TwitterCircleFilled />
          ) : (
            <TwitterOutlined />
          )}
          Twitter
        </span>
      ),
    },
    {
      key: 'social-instagram-tab',
      label: (
        <span>
          {activeTabKey === 'social-instagram-tab' ? (
            <InstagramFilled />
          ) : (
            <InstagramOutlined />
          )}
          Instagram
        </span>
      ),
    },
    {
      key: 'social-linkedin-tab',
      label: (
        <span>
          {activeTabKey === 'social-linkedin-tab' ? (
            <LinkedinFilled />
          ) : (
            <LinkedinOutlined />
          )}
          LinkedIn
        </span>
      ),
    },
    {
      key: 'social-youtube-tab',
      label: (
        <span>
          {activeTabKey === 'social-youtube-tab' ? (
            <YoutubeFilled />
          ) : (
            <YoutubeOutlined />
          )}
          YouTube
        </span>
      ),
    },
  ];

  const TAB_CONTENT: Record<TabKeys, React.ReactNode> = {
    'social-facebook-tab': <Section tab={activeTabKey} />,
    'social-twitter-tab': <Section tab={activeTabKey} />,
    'social-instagram-tab': <Section tab={activeTabKey} />,
    'social-linkedin-tab': <Section tab={activeTabKey} />,
    'social-youtube-tab': <Section tab={activeTabKey} />,
  };

  const onTabChange = (key: TabKeys) => {
    setActiveTabKey(key);
  };

  return (
    <div>
      <PageHeader
        title="social dashboard"
        breadcrumbs={[
          {
            title: (
              <>
                <HomeOutlined />
                <span>home</span>
              </>
            ),
            path: '/',
          },
          {
            title: (
              <>
                <PieChartOutlined />
                <span>dashboards</span>
              </>
            ),
            menu: {
              items: DASHBOARD_ITEMS.map((d) => ({
                key: d.title,
                title: <Link to={d.path}>{d.title}</Link>,
              })),
            },
          },
          {
            title: 'social',
          },
        ]}
      />
      <ConfigProvider
        theme={{
          components: {
            Tabs: {
              cardBg: colors[50],
              colorBgContainer: colors[500],
              itemSelectedColor: '#FFFFFF',
              itemHoverColor: colors[500],
            },
          },
        }}
      >
        <Tabs
          centered={isMobile}
          items={TAB_LIST}
          activeKey={activeTabKey}
          onChange={onTabChange}
          type="card"
          size="middle"
        />
      </ConfigProvider>
      <Row {...stylesContext?.rowProps}>{TAB_CONTENT[activeTabKey]}</Row>
    </div>
  );
};
