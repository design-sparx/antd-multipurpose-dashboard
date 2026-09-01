import { Button, Col, Divider, Row, Space, Typography, theme } from 'antd';
import {
  BookOutlined,
  GithubOutlined,
  HistoryOutlined,
  RocketOutlined,
  VerticalAlignTopOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Container, Logo } from '../';
import { PATH_DOCS, PATH_GITHUB, PATH_LANDING } from '../../../constants';
import { goToTop } from '../../../utils';

import './styles.css';

const { Text, Title } = Typography;

const PRODUCT_LINKS = [
  {
    key: 'help',
    label: 'Documentation',
    href: PATH_DOCS.help,
    icon: <BookOutlined />,
  },
  {
    key: 'roadmap',
    label: 'Product Roadmap',
    href: PATH_DOCS.productRoadmap,
    icon: <RocketOutlined />,
  },
  {
    key: 'changelog',
    label: 'Changelog',
    href: `${PATH_GITHUB.repo}/releases`,
    icon: <HistoryOutlined />,
  },
];

const REPO_LINKS = [
  { key: 'repo', label: 'Source', href: PATH_GITHUB.repo },
  { key: 'issues', label: 'Issues', href: `${PATH_GITHUB.repo}/issues` },
  {
    key: 'discussions',
    label: 'Discussions',
    href: `${PATH_GITHUB.repo}/discussions`,
  },
];

export const GuestFooter = () => {
  const { token } = theme.useToken();

  return (
    <footer
      className="guest-footer"
      style={{
        backgroundColor: token.colorBgContainer,
        borderTop: `1px solid ${token.colorBorderSecondary}`,
      }}
    >
      <Container>
        <Row gutter={[32, 32]} className="guest-footer__row">
          <Col xs={24} md={10}>
            <Space vertical size="middle" className="w-100">
              <Logo asLink href={PATH_LANDING.root} />
              <Text type="secondary">
                An open-source multipurpose dashboard template built with React,
                Vite, and Ant Design 6. Free to fork, extend, and ship.
              </Text>
              <Button
                type="primary"
                href={PATH_GITHUB.repo}
                target="_blank"
                rel="noopener noreferrer"
                icon={<GithubOutlined />}
              >
                Star on GitHub
              </Button>
            </Space>
          </Col>

          <Col xs={12} md={7}>
            <Title level={5} className="guest-footer__heading">
              Product
            </Title>
            <Space vertical size="small" className="w-100">
              {PRODUCT_LINKS.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="guest-footer__link"
                >
                  <span className="guest-footer__link-icon">{link.icon}</span>
                  {link.label}
                </a>
              ))}
            </Space>
          </Col>

          <Col xs={12} md={7}>
            <Title level={5} className="guest-footer__heading">
              Community
            </Title>
            <Space vertical size="small" className="w-100">
              {REPO_LINKS.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="guest-footer__link"
                >
                  {link.label}
                </a>
              ))}
            </Space>
          </Col>
        </Row>

        <Divider className="guest-footer__divider" />

        <Row
          justify="space-between"
          align="middle"
          className="guest-footer__meta"
        >
          <Col>
            <Text type="secondary" className="text-sm">
              © {new Date().getFullYear()} Antd Multipurpose Dashboard ·
              Released under the MIT License
            </Text>
          </Col>
          <Col>
            <Space size="small" className="text-sm">
              <Button
                type="link"
                size="small"
                icon={<VerticalAlignTopOutlined />}
                onClick={goToTop}
              >
                Back to top
              </Button>
              <Divider orientation="vertical" />
              <Link to={PATH_LANDING.root} className="guest-footer__link">
                design-sparx
              </Link>
            </Space>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
