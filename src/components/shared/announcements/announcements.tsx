import {
  BorderBeam,
  Button,
  Col,
  Empty,
  Flex,
  Row,
  Tag,
  Typography,
  theme,
} from 'antd';
import { ArrowRightOutlined, ThunderboltFilled } from '@ant-design/icons';
import { Card, Container } from '../';
import {
  Announcement,
  AnnouncementTag,
  formatRelativeDate,
  useAnnouncements,
} from '../../../lib/hooks/use-announcements';

import './styles.css';

const { Title, Text, Paragraph } = Typography;

const TAG_COLOR: Record<AnnouncementTag, string> = {
  release: 'blue',
  security: 'red',
  breaking: 'volcano',
  maintenance: 'gold',
};

type Props = {
  data?: Announcement[];
  /** Optional override for the section heading id (a11y). */
  id?: string;
};

export const Announcements = ({ data, id = 'announcements' }: Props) => {
  const items = data ?? useAnnouncements();

  const {
    token: { colorPrimary },
  } = theme.useToken();

  if (items.length === 0) {
    return (
      <Container>
        <Title
          id={`${id}-title`}
          level={2}
          className="text-center"
          style={{ marginBottom: '2rem' }}
        >
          <ThunderboltFilled style={{ color: colorPrimary, marginRight: 12 }} />
          Major Announcements
        </Title>
        <Empty description="No announcements right now" />
      </Container>
    );
  }

  return (
    <Container>
      <Flex vertical align="center" style={{ marginBottom: '2.5rem' }}>
        <Tag
          variant="filled"
          color={colorPrimary}
          icon={<ThunderboltFilled />}
          style={{ marginBottom: 12, fontWeight: 600 }}
        >
          Major
        </Tag>
        <Title
          id={`${id}-title`}
          level={2}
          className="text-center m-0"
          style={{ fontWeight: 800 }}
        >
          Major Announcements
        </Title>
        <Text
          type="secondary"
          className="text-center"
          style={{ marginTop: 8, maxWidth: 560 }}
        >
          Releases, breaking changes, and security notes that affect how you
          build with this template.
        </Text>
      </Flex>
      <Row
        gutter={[
          { xs: 8, sm: 16, md: 24, lg: 32 },
          { xs: 8, sm: 16, md: 24, lg: 32 },
        ]}
      >
        {items.map((item, index) => (
          <Col key={item.id} xs={24} md={12} lg={8}>
            <Card
              hoverable
              style={{ height: '100%', position: 'relative' }}
              classNames={{
                root: `announcement-card announcement-card--${index}`,
                body: 'announcement-card__body',
              }}
              styles={{ body: { padding: 20 } }}
              data-enter-index={index}
            >
              <BorderBeam
                color={colorPrimary}
                duration={6}
                size={120}
                lineWidth={2}
              />
              <Flex vertical gap="small" style={{ height: '100%' }}>
                {item.tag && (
                  <Tag
                    variant="filled"
                    color={TAG_COLOR[item.tag]}
                    style={{
                      alignSelf: 'flex-start',
                      textTransform: 'capitalize',
                      fontWeight: 600,
                    }}
                  >
                    {item.tag}
                  </Tag>
                )}
                <Title level={4} className="m-0" style={{ fontWeight: 700 }}>
                  {item.title}
                </Title>
                <Paragraph
                  className="m-0"
                  ellipsis={{ rows: 3, expandable: false }}
                  type="secondary"
                >
                  {item.body}
                </Paragraph>
                <Flex
                  align="center"
                  justify="space-between"
                  style={{ marginTop: 'auto', paddingTop: 12 }}
                >
                  <Text type="secondary" style={{ fontSize: 12 }}>
                    <time dateTime={item.publishedAt}>
                      {formatRelativeDate(item.publishedAt)}
                    </time>
                  </Text>
                  {item.cta && (
                    <Button
                      type="link"
                      href={item.cta.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      icon={<ArrowRightOutlined />}
                      iconPlacement="end"
                      style={{ paddingInline: 0 }}
                    >
                      {item.cta.label}
                    </Button>
                  )}
                </Flex>
              </Flex>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
