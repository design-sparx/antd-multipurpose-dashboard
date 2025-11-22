import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  message,
  Row,
  Switch,
  theme,
  Tooltip,
  Typography,
} from 'antd';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { Logo } from '../../components';
import { useMediaQuery } from 'react-responsive';
import { PATH_AUTH, PATH_DASHBOARD } from '../../constants';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../redux/theme/themeSlice';
import { RootState } from '../../redux/store';

const { Title, Text } = Typography;

type FieldType = {
  email?: string;
};

export const PasswordResetPage = () => {
  const {
    token: { colorPrimary, colorBgContainer },
  } = theme.useToken();
  const isMobile = useMediaQuery({ maxWidth: 769 });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mytheme } = useSelector((state: RootState) => state.theme);
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    console.log('Success:', values);
    setLoading(true);

    message.open({
      type: 'loading',
      content: 'Sending reset link...',
      duration: 1.5,
    });

    // Mock - in production, this would send an actual reset email
    setTimeout(() => {
      message.destroy();
      message.success('Password reset link sent to your email!', 2);

      setTimeout(() => {
        setLoading(false);
        navigate(PATH_AUTH.signin);
      }, 2000);
    }, 1500);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Row style={{ minHeight: isMobile ? 'auto' : '100vh', overflow: 'hidden', position: 'relative' }}>
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
      <Col xs={24} lg={12}>
        <Flex
          vertical
          align="center"
          justify="center"
          className="text-center"
          style={{ background: colorPrimary, height: '100%', padding: '1rem' }}
        >
          <Logo color="white" />
          <Title level={2} className="text-white">
            Welcome back to Antd Admin
          </Title>
          <Text className="text-white" style={{ fontSize: 18 }}>
            A dynamic and versatile multipurpose dashboard utilizing Ant Design,
            React, TypeScript, and Vite.
          </Text>
        </Flex>
      </Col>
      <Col xs={24} lg={12}>
        <Flex
          vertical
          align={isMobile ? 'center' : 'flex-start'}
          justify="center"
          gap="middle"
          style={{ height: '100%', width: '100%', padding: '2rem', background: colorBgContainer }}
        >
          <Title className="m-0">Forgot password</Title>
          <Text>Enter your email to rest your password.</Text>
          <Form
            name="sign-up-form"
            layout="vertical"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            requiredMark={false}
            style={{ width: '100%' }}
          >
            <Form.Item<FieldType>
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Flex align="center" gap="small">
                <Button
                  type="primary"
                  htmlType="submit"
                  size="middle"
                  loading={loading}
                >
                  Submit
                </Button>
                <Button type="text" size="middle" loading={loading}>
                  Cancel
                </Button>
              </Flex>
            </Form.Item>
          </Form>
        </Flex>
      </Col>
    </Row>
  );
};
