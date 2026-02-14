import { useState } from 'react';
import {
  Button,
  Flex,
  InputNumber,
  Typography,
  Card,
  message,
  Space,
} from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const { Title, Text, Paragraph } = Typography;

const OtpAuthPage: React.FC = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [resendCount, setResendCount] = useState(3);

  const handleVerify = () => {
    if (!otp || otp.toString().length !== 6) {
      message.error('Please enter a valid 6-digit OTP');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      message.success('Verification successful!');
      navigate('/dashboards/default');
    }, 1500);
  };

  const handleResend = () => {
    if (resendCount > 0) {
      setResendCount(resendCount - 1);
      message.success('OTP resent successfully!');
    }
  };

  return (
    <Flex
      align="center"
      justify="center"
      style={{
        minHeight: '100vh',
        padding: '2rem',
      }}
    >
      <Card style={{ width: '100%', maxWidth: 420 }}>
        <Flex vertical gap="middle">
          <Link to="/auth/signin">
            <Text type="secondary">
              <ArrowLeftOutlined /> Back to Sign In
            </Text>
          </Link>

          <Title level={3} style={{ margin: 0 }}>
            Email OTP Verification
          </Title>

          <Paragraph type="secondary">
            We have sent a 6-digit verification code to your email. Enter the
            code below to verify your identity.
          </Paragraph>

          <Flex vertical gap="small">
            <Text strong>Verification Code</Text>
            <InputNumber
              value={otp}
              onChange={(value) => setOtp(value)}
              placeholder="Enter 6-digit OTP"
              style={{ width: '100%', height: 48 }}
              maxLength={6}
              controls={true}
            />
            <Text type="secondary" style={{ fontSize: 12 }}>
              Use the spinner controls or type directly
            </Text>
          </Flex>

          <Space orientation="vertical" style={{ width: '100%' }}>
            <Button
              type="primary"
              size="large"
              block
              loading={loading}
              onClick={handleVerify}
            >
              Verify & Continue
            </Button>

            <Flex justify="space-between" align="center">
              <Text type="secondary">Didn't receive code?</Text>
              <Button
                type="link"
                onClick={handleResend}
                disabled={resendCount === 0}
              >
                Resend {resendCount > 0 && `(${resendCount})`}
              </Button>
            </Flex>
          </Space>

          <Card
            styles={{ body: { padding: 12 } }}
            style={{
              background: '#f5f5f5',
              marginTop: 8,
            }}
          >
            <Text type="secondary" style={{ fontSize: 12 }}>
              <strong>Demo OTP:</strong> 123456
            </Text>
          </Card>
        </Flex>
      </Card>
    </Flex>
  );
};

export default OtpAuthPage;
