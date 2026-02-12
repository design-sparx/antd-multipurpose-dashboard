import { SitemapCard } from '../components';
import { Col, Flex, Row, Typography } from 'antd';
import {
  AUTHENTICATION_ITEMS,
  CORPORATE_ITEMS,
  DASHBOARD_ITEMS,
  ERROR_ITEMS,
  USER_PROFILE_ITEMS,
} from '../constants';
import { useStylesContext } from '../context';
import { BranchesOutlined } from '@ant-design/icons';

const SITES = [
  {
    title: 'dashboard',
    links: DASHBOARD_ITEMS,
  },
  {
    title: 'corporate',
    links: CORPORATE_ITEMS,
  },
  {
    title: 'user profile',
    links: USER_PROFILE_ITEMS,
  },
  {
    title: 'authentication',
    links: AUTHENTICATION_ITEMS,
  },
  {
    title: 'errors',
    links: ERROR_ITEMS,
  },
];

export const SitemapPage = () => {
  const context = useStylesContext();

  return (
    <div>
      <Flex vertical gap="middle">
        <Typography.Title level={3}>
          <BranchesOutlined /> Sitemap
        </Typography.Title>
        <Row {...context?.rowProps}>
          {SITES.map((s) => (
            <Col xs={24} sm={12} md={8} xl={6} key={`col-${s.title}`}>
              <SitemapCard data={s} style={{ height: '100%' }} />
            </Col>
          ))}
        </Row>
      </Flex>
    </div>
  );
};
