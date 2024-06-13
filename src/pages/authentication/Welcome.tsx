import { Button, Flex, Typography } from 'antd';
import { Logo } from '../../components';
import { Link } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../constants';

export const WelcomePage = () => {
  return (
    <Flex
      vertical
      gap="large"
      align="center"
      justify="center"
      style={{ height: '80vh' }}
    >
      <Logo color="blue" />
      <Typography.Title className="m-0">Welcome to Antd</Typography.Title>
      <Typography.Text style={{ fontSize: 18 }}>
        A dynamic and versatile multipurpose dashboard utilizing Ant Design,
        React, TypeScript, and Vite.
      </Typography.Text>
      <Link to={PATH_DASHBOARD.default}>
        <Button type="primary" size="middle">
          Go to Homepage
        </Button>
      </Link>
    </Flex>
  );
};
