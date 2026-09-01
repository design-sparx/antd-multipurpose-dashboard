import { useState } from 'react';
import {
  Divider,
  Empty,
  Flex,
  Input,
  Space,
  Tag,
  Timeline,
  Typography,
  theme,
} from 'antd';
import { HistoryOutlined, SearchOutlined } from '@ant-design/icons';
import ReactMarkdown, { type Components } from 'react-markdown';
import { Card, Container } from '../components';
import { KIND_COLOR, useReleases } from '../hooks';

const { Title, Text, Paragraph, Link } = Typography;
const { Search } = Input;

export const ReleasesPage = () => {
  const { token } = theme.useToken();
  const releases = useReleases();
  const [search, setSearch] = useState('');

  const filtered = releases.filter((r) =>
    r.version.toLowerCase().includes(search.toLowerCase())
  );

  const components: Components = {
    h3: ({ children }) => (
      <Typography.Title level={5}>{children}</Typography.Title>
    ),
    p: ({ children }) => <Paragraph>{children}</Paragraph>,
    li: ({ children }) => <li>{children}</li>,
    code: ({ children }) => <Text code>{children}</Text>,
    pre: ({ children }) => (
      <div
        style={{
          overflowX: 'auto',
          padding: token.paddingXS,
          background: token.colorBgContainer,
          borderRadius: token.borderRadius,
        }}
      >
        {children}
      </div>
    ),
    a: ({ children, href }) => (
      <Link href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </Link>
    ),
    hr: () => <Divider />,
  };

  return (
    <Container>
      <Flex vertical gap="large">
        <Flex align="center" gap={token.marginSM}>
          <HistoryOutlined />
          <Title level={2} className="m-0">
            Releases & Changelog
          </Title>
        </Flex>
        <Space>
          <Tag
            variant="filled"
            color={KIND_COLOR[releases[0]?.kind ?? 'Patch']}
          >
            v{releases[0]?.version ?? '0.0.0'}
          </Tag>
          <Text type="secondary">
            Published release notes for antd-multi-dashboard.
          </Text>
        </Space>
        <Search
          placeholder="Search versions (e.g. 1.5)"
          prefix={<SearchOutlined />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          allowClear
          style={{ maxWidth: 320 }}
        />
        {filtered.length === 0 ? (
          <Empty description="No matching releases" />
        ) : (
          <Timeline
            mode="start"
            items={filtered.map((release) => ({
              key: release.version,
              color: token.colorPrimary,
              icon: <HistoryOutlined />,
              content: (
                <Card
                  title={
                    <Space>
                      {`Release ${release.version}`}
                      <Tag variant="filled" color={KIND_COLOR[release.kind]}>
                        {release.kind}
                      </Tag>
                    </Space>
                  }
                  type="inner"
                  hoverable
                >
                  <ReactMarkdown components={components}>
                    {release.body}
                  </ReactMarkdown>
                </Card>
              ),
            }))}
          />
        )}
      </Flex>
    </Container>
  );
};
