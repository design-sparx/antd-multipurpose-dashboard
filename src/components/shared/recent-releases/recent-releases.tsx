import { HistoryOutlined } from '@ant-design/icons';
import { Col, Empty, Flex, Row, Space, Tag, Typography } from 'antd';
import { Card, Container } from '../';
import { KIND_COLOR, useReleases } from '../../../lib/hooks/use-releases';

const { Title, Text, Paragraph } = Typography;

const summarize = (body: string): string => {
  const lines = body
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => l.startsWith('- '));

  const summary = lines
    .slice(0, 2)
    .map((l) =>
      l
        .replace(/^- /, '')
        .replace(/^[a-f0-9]{7}:\s*/i, '')
        .replace(/`/g, '')
        .replace(/^#+\s*/, '')
        .trim()
    )
    .filter(Boolean);

  return summary.join('. ') || 'See the changelog for details.';
};

export const RecentReleases = () => {
  const releases = useReleases(3);

  return (
    <Container>
      <Space orientation="vertical">
        <Flex vertical align="center" style={{ marginBottom: '2rem' }}>
          <Title level={2}>Recent Releases</Title>
          <Text style={{ maxWidth: 560 }}>
            The latest version bumps and notable changes to the dashboard
            template.
          </Text>
        </Flex>
        {releases.length === 0 ? (
          <Empty description="No recent releases" />
        ) : (
          <Row
            gutter={[
              { xs: 8, sm: 16, md: 24, lg: 32 },
              { xs: 8, sm: 16, md: 24, lg: 32 },
            ]}
          >
            {releases.map((release) => (
              <Col key={release.version} xs={24} sm={12} md={8}>
                <Card
                  hoverable
                  style={{ height: '100%' }}
                  title={
                    <Space>
                      <HistoryOutlined
                        style={{ color: KIND_COLOR[release.kind] }}
                      />
                      v{release.version}
                      <Tag variant="filled" color={KIND_COLOR[release.kind]}>
                        {release.kind}
                      </Tag>
                    </Space>
                  }
                >
                  <Flex vertical gap="small">
                    <Paragraph ellipsis={{ rows: 2, expandable: false }}>
                      {summarize(release.body)}
                    </Paragraph>
                  </Flex>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Space>
    </Container>
  );
};
