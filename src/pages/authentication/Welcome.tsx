import { Button, Flex, Switch, Tooltip, Typography } from 'antd';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { Logo } from '../../components';
import { Link } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../constants';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../redux/theme/themeSlice';
import { RootState } from '../../redux/store';

export const WelcomePage = () => {
  const dispatch = useDispatch();
  const { mytheme } = useSelector((state: RootState) => state.theme);

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <div style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 10 }}>
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
    </div>
  );
};
