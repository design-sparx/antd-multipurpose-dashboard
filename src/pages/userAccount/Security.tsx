import {
  Alert,
  Badge,
  Button,
  Col,
  Collapse,
  Descriptions,
  Form,
  Input,
  Row,
  Typography,
} from 'antd';
import { useStylesContext } from '../../context';
import { Card, Flex, Loader } from '../../components';
import { Session } from '../../types';
import {
  LaptopOutlined,
  MobileOutlined,
  SaveOutlined,
  TabletOutlined,
} from '@ant-design/icons';
import { useFetchData } from '../../hooks';

const { Text } = Typography;

const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

type FieldType = {
  currentPassword?: string;
  newPassword?: string;
  reEnterPassword?: string;
};

export const UserProfileSecurityPage = () => {
  const stylesContext = useStylesContext();
  const {
    data: sessionActivityData,
    loading: sessionActivityDataLoading,
    error: sessionActivityDataError,
  } = useFetchData('../mocks/SessionActivity.json');

  return (
    <Row {...stylesContext?.rowProps}>
      <Col span={24}>
        <Row {...stylesContext?.rowProps}>
          <Col xs={24} sm={12}>
            <Card
              title="Additional security"
              extra={<Button type="default">Learn more</Button>}
              actions={[<Button>Turn on</Button>]}
              style={{ height: '100%' }}
            >
              <Flex flexDirection="column">
                <Text>Passwordless account</Text>
                <Badge status="error" text="OFF" />
              </Flex>
            </Card>
          </Col>
          <Col xs={24} sm={12}>
            <Card
              title="Additional security"
              extra={<Button type="default">Learn more</Button>}
              actions={[<Button>Turn off</Button>]}
              style={{ height: '100%' }}
            >
              <Flex flexDirection="column">
                <Text>Two-step verification</Text>
                <Badge status="success" text="ON" />
              </Flex>
            </Card>
          </Col>
          <Col xs={24} sm={12}>
            <Card
              title="Sign me out"
              actions={[<Button>Sign me out</Button>]}
              style={{ height: '100%' }}
            >
              <Flex flexDirection="column">
                <Text>
                  We can protect you by signing you out of browsers, apps and
                  anywhere else your account is used to sign in.
                </Text>
              </Flex>
            </Card>
          </Col>
          <Col xs={24} sm={12}>
            <Card
              title="Recovery code"
              actions={[<Button>Generate a new code</Button>]}
              style={{ height: '100%' }}
            >
              <Flex flexDirection="column">
                <Text>
                  You can use this code to access your account if you lose
                  access to your sign-in info. Print this out and keep it in a
                  safe place or take a picture of it.
                </Text>
              </Flex>
            </Card>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Card title="Change your password">
          <Form
            name="form-change-password"
            layout="vertical"
            labelCol={{ span: 8 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            requiredMark={false}
          >
            <Form.Item<FieldType>
              label="Current password"
              name="currentPassword"
              rules={[
                {
                  required: true,
                  message: 'Please input your current password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
              label="New password"
              name="newPassword"
              rules={[
                { required: true, message: 'Please input your new password!' },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
              label="Reenter password"
              name="reEnterPassword"
              rules={[
                {
                  required: true,
                  message: 'Please re-input your new password!!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                Save changes
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
      <Col span={24}>
        <Card
          title="Recent activity"
          extra={<Button>View all activity</Button>}
        >
          {sessionActivityDataError ? (
            <Alert
              message="Error"
              description={sessionActivityDataError.toString()}
              type="error"
              showIcon
            />
          ) : sessionActivityDataLoading ? (
            <Loader />
          ) : (
            <Collapse
              bordered
              expandIconPosition="start"
              items={sessionActivityData.slice(0, 5).map((s: Session) => ({
                key: s.id,
                label: (
                  <Flex>
                    <span>{s.login_time}</span>
                  </Flex>
                ),
                children: (
                  <Descriptions
                    bordered
                    column={{ xs: 1, sm: 2, md: 2, lg: 3, xl: 3, xxl: 4 }}
                    items={[
                      {
                        key: 'session_device',
                        label: 'Device',
                        children: s.device_type,
                      },
                      {
                        key: 'session_browser',
                        label: 'Browser',
                        children: s.browser,
                      },
                      {
                        key: 'session_ip',
                        label: 'IP address',
                        children: s.ip_address,
                      },
                      {
                        key: 'session_status',
                        label: 'Status',
                        children: <Badge status="processing" text={s.status} />,
                      },
                      {
                        key: 'session_location',
                        label: 'Location',
                        children: s.login_location,
                      },
                      {
                        key: 'session_duration',
                        label: 'Session duration (mins)',
                        children: s.login_duration,
                      },
                      {
                        key: 'session_login_attempts',
                        label: 'Login attempts',
                        children: s.login_attempts,
                      },
                    ]}
                  />
                ),
                extra:
                  s.device_type === 'desktop' ? (
                    <LaptopOutlined />
                  ) : s.device_type === 'tablet' ? (
                    <TabletOutlined />
                  ) : (
                    <MobileOutlined />
                  ),
              }))}
            />
          )}
        </Card>
      </Col>
    </Row>
  );
};
