import { Modal, Form, Input, Button, Alert, Typography, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import {
  loginUser,
  setLoginModalOpen,
  clearError,
} from '../../../redux/auth/authSlice';
import { enableRealData } from '../../../redux/data-mode/dataModeSlice';
import { RootState } from '../../../redux/store';
import { useEffect } from 'react';

const { Text, Title } = Typography;

interface LoginFormValues {
  email: string;
  password: string;
}

export const LoginModal = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { loginModalOpen, isLoading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  // Clear form and error when modal closes
  useEffect(() => {
    if (!loginModalOpen) {
      form.resetFields();
      dispatch(clearError());
    }
  }, [loginModalOpen, form, dispatch]);

  // Automatically switch to live mode after successful login
  useEffect(() => {
    if (isAuthenticated && !loginModalOpen) {
      dispatch(enableRealData());
    }
  }, [isAuthenticated, loginModalOpen, dispatch]);

  const handleLogin = async (values: LoginFormValues) => {
    await dispatch(loginUser(values) as any);
  };

  const handleCancel = () => {
    dispatch(setLoginModalOpen(false));
  };

  const fillDemoCredentials = () => {
    form.setFieldsValue({
      email: 'admin@adminhub.com',
      password: 'Admin@Pass1',
    });
  };

  return (
    <Modal
      title={
        <Title level={4} style={{ margin: 0 }}>
          Sign in to continue
        </Title>
      }
      open={loginModalOpen}
      onCancel={handleCancel}
      footer={null}
      centered
      maskClosable={false}
    >
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Alert
          message="Live API Mode Requires Authentication"
          description="Please sign in with your credentials to access live data from the API."
          type="info"
          showIcon
        />

        {error && (
          <Alert
            message="Authentication Failed"
            description={error}
            type="error"
            showIcon
            closable
            onClose={() => dispatch(clearError())}
          />
        )}

        <Form
          form={form}
          name="login"
          onFinish={handleLogin}
          layout="vertical"
          requiredMark={false}
          size="large"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="admin@adminhub.com"
              autoComplete="email"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 8 }}>
            <Button type="primary" htmlType="submit" block loading={isLoading}>
              Sign In
            </Button>
          </Form.Item>

          <Form.Item style={{ marginBottom: 0 }}>
            <Button type="link" onClick={fillDemoCredentials} block>
              Use Demo Credentials
            </Button>
          </Form.Item>
        </Form>

        <div style={{ textAlign: 'center', marginTop: 8 }}>
          <Text type="secondary" style={{ fontSize: 12 }}>
            Demo Account: admin@adminhub.com / Admin@Pass1
          </Text>
        </div>
      </Space>
    </Modal>
  );
};

export default LoginModal;
