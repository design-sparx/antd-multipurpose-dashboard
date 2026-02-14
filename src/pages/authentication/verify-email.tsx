import { Button, Flex, Switch, Tooltip, Typography, theme } from 'antd';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { Logo } from '../../components';
import { Link } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../redux/theme/themeSlice';
import { RootState } from '../../redux/store';

export const VerifyEmailPage = () => {
  const dispatch = useDispatch();
  const { mytheme } = useSelector((state: RootState) => state.theme);
  const { token } = theme.useToken();

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: token.colorBgContainer,
        transition: 'background 0.3s',
      }}
    >
      <div
        style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 10 }}
      >
        <Tooltip title="Toggle theme">
          <Switch
            checkedChildren={<MoonOutlined />}
            unCheckedChildren={<SunOutlined />}
            checked={mytheme === 'dark'}
            onClick={() => dispatch(toggleTheme())}
          />
        </Tooltip>
      </div>
      <Flex
        vertical
        gap="large"
        align="center"
        justify="center"
        style={{ height: '80vh' }}
      >
        <Logo color="blue" />
        <Typography.Title className="m-0" style={{ color: token.colorText }}>
          Verify Your Email
        </Typography.Title>
        <Typography.Text style={{ color: token.colorText }}>
          We have sent an email to{' '}
          <Link
            to="mailto:kelvin.kiprop96@gmail.com"
            style={{ color: token.colorPrimary }}
          >
            kelvin.kiprop96@gmail.com
          </Link>{' '}
          plase follow a link to verify your email.
        </Typography.Text>
        <Link to={PATH_DASHBOARD.default}>
          <Button>Skip</Button>
        </Link>
        <Flex gap={2}>
          <Typography.Text style={{ color: token.colorText }}>
            Did't receive an email?
          </Typography.Text>
          <Typography.Link style={{ color: token.colorPrimary }}>
            Resend
          </Typography.Link>
        </Flex>
      </Flex>
    </div>
  );
};
