import { Button, Flex, Typography } from 'antd';
import { Logo } from '../../components';
import { Link } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../constants';

export const VerifyEmailPage = () => {
  return (
    <Flex
      vertical
      gap="large"
      align="center"
      justify="center"
      style={{ height: '80vh' }}
    >
      <Logo color="blue" />
      <Typography.Title className="m-0">Verify Your Email</Typography.Title>
      <Typography.Text>
        We have sent an email to{' '}
        <Link to="mailto:kelvin.kiprop96@gmail.com">
          kelvin.kiprop96@gmail.com
        </Link>{' '}
        plase follow a link to verify your email.
      </Typography.Text>
      <Link to={PATH_DASHBOARD.default}>
        <Button>Skip</Button>
      </Link>
      <Flex gap={2}>
        <Typography.Text>Did’t receive an email?</Typography.Text>
        <Typography.Link>Resend</Typography.Link>
      </Flex>
    </Flex>
  );
};
