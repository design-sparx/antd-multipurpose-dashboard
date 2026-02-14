import { Button, Flex, Switch, Tooltip, Typography, theme } from 'antd';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { Logo } from '../../components';
import { Link } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../redux/theme/themeSlice';
import { RootState } from '../../redux/store';

export const AccountDeactivePage = () => {
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
          Deactivated Account
        </Typography.Title>
        <Typography.Text style={{ fontSize: 18, color: token.colorText }}>
          Looking for answers? Check the{' '}
          <Link to="#" style={{ color: token.colorPrimary }}>
            Help Center
          </Link>
          .
        </Typography.Text>
        <Link to={PATH_DASHBOARD.default}>
          <Button type="primary" size="middle">
            Go to Homepage
          </Button>
        </Link>
      </Flex>
    </div>
  );
};
