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
import { COLOR } from '../../App.tsx';
import { useFetchData } from '../../hooks';
import { Comments, Posts } from '../../types';
import { useStylesContext } from '../../context';

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
  const stylesContext = useStylesContext();
  const [title, setTitle] = useState<string>('');
  const {
    data: socialsData,
    loading: socialsDataLoading,
    error: socialsDataError,
  } = useFetchData('../mocks/SocialMedia.json');
  const {
    data: socialCommentsData,
    loading: socialsCommentsDataLoading,
    error: socialsCommentsDataError,
  } = useFetchData('../mocks/SocialComments.json');
  const {
    data: scheduledPostsData,
    loading: scheduledPostsDataLoading,
    error: scheduledPostsDataError,
  } = useFetchData('../mocks/ScheduledPosts.json');

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

  return (
    <>
      <Col xs={24} xl={16}>
        <Row {...stylesContext?.rowProps}>
          <Col xs={24} md={12} lg={6}>
            <SocialStatsCard
              key="followers-card"
              title="followers"
              value={
                socialsData?.find((_: any) => _.title === title)?.followers || 0
              }
              error={socialsDataError}
              loading={socialsDataLoading}
              style={{ height: '100%' }}
            />
          </Col>
          <Col xs={24} md={12} lg={6}>
            <SocialStatsCard
              key="following-card"
              title="following"
              value={
                socialsData?.find((_: any) => _.title === title)?.following || 0
              }
              error={socialsDataError}
              loading={socialsDataLoading}
              style={{ height: '100%' }}
            />
          </Col>
          <Col xs={24} md={12} lg={6}>
            <SocialStatsCard
              key="likes-card"
              title="likes"
              value={
                socialsData?.find((_: any) => _.title === title)?.likes || 0
              }
              error={socialsDataError}
              loading={socialsDataLoading}
              style={{ height: '100%' }}
            />
          </Col>
          <Col xs={24} md={12} lg={6}>
            <SocialStatsCard
              key="comments-card"
              title="comments"
              value={
                socialsData?.find((_: any) => _.title === title)?.comments || 0
              }
              error={socialsDataError}
              loading={socialsDataLoading}
              style={{ height: '100%' }}
            />
          </Col>
          <Col xs={24} xl={12}>
            <FollowersChart />
          </Col>
          <Col xs={24} xl={12}>
            <LikesChart style={{ height: '100%' }} />
          </Col>
          <Col xs={24} sm={24} xl={12}>
            <PostsCard
              title="Scheduled Posts"
              as="scheduled"
              data={scheduledPostsData?.filter(
                (_: Posts) => _.platform.toLowerCase() === title
              )}
              loading={scheduledPostsDataLoading}
              error={scheduledPostsDataError}
            />
          </Col>
          <Col xs={24} sm={24} xl={12}>
            <Row
              gutter={[
                { xs: 8, sm: 12, md: 20, lg: 24 },
                { xs: 4, sm: 8, md: 12, lg: 16 },
              ]}
            >
              <Col span={24}>
                <DevicesCardChart />
              </Col>
              <Col span={24}>
                <MilestonesCard />
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
      <Col xs={24} xl={8}>
        <CommentsCard
          data={socialCommentsData
            .filter((_: Comments) => _.platform.toLowerCase() === title)
            ?.slice(0, 7)}
          loading={socialsCommentsDataLoading}
          error={socialsCommentsDataError}
        />
      </Col>
    </>
  );
};

export const SocialDashboardPage = () => {
  const stylesContext = useStylesContext();
  const isMobile = useMediaQuery({ maxWidth: 769 });
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
              cardBg: COLOR['50'],
              colorBgContainer: COLOR['500'],
              itemSelectedColor: '#FFFFFF',
              itemHoverColor: COLOR['500'],
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
