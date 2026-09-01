import { ArrowRightOutlined, ThunderboltFilled } from '@ant-design/icons';
import { Button, Col, Empty, Flex, Row, Tag, Typography } from 'antd';
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
  const fallback = useAnnouncements();
  const items = data ?? fallback;

  if (items.length === 0) {
    return (
      <Container>
        <Title id={`${id}-title`} level={2}>
          <ThunderboltFilled />
          Major Announcements
        </Title>
        <Empty description="No announcements right now" />
      </Container>
    );
  }

  return (
    <Container>
      <Flex vertical align="center" style={{ marginBottom: '2rem' }}>
        <Title id={`${id}-title`} level={2}>
          Major Announcements
        </Title>
        <Text style={{ maxWidth: 560 }}>
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
            <Card hoverable style={{ height: '100%' }} data-enter-index={index}>
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
