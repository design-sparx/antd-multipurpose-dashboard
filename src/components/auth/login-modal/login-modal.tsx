import { Modal, Form, Input, Button, Alert, Typography, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts';

const { Text, Title } = Typography;

interface LoginFormValues {
  email: string;
  password: string;
}

export const LoginModal = () => {
  const { isLoading, login } = useAuth();
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (values: LoginFormValues) => {
    setError(null);
    try {
      await login(values);
      setOpen(false);
      form.resetFields();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
    setError(null);
  };

  const fillDemoCredentials = () => {
    form.setFieldsValue({
      email: 'admin@adminhub.com',
      password: 'Admin@Pass1',
    });
  };

  // Expose open method globally
  useEffect(() => {
    const handleOpen = () => setOpen(true);
    window.addEventListener('open-login-modal', handleOpen);
    return () => window.removeEventListener('open-login-modal', handleOpen);
  }, []);

  return (
    <Modal
      title={
        <Title level={4} style={{ margin: 0 }}>
          Sign in to continue
        </Title>
      }
      open={open}
      onCancel={handleCancel}
      footer={null}
      centered
      mask={{ closable: false }}
    >
      <Space vertical size="middle" style={{ width: '100%' }}>
        <Alert
          title="Live API Mode Requires Authentication"
          description="Please sign in with your credentials to access live data from the API."
          type="info"
          showIcon
        />

        {error && (
          <Alert
            title="Authentication Failed"
            description={error}
            type="error"
            showIcon
            closable={{ onClose: () => dispatch(clearError()) }}
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
