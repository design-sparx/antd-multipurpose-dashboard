import { Button, Col, Form, Input, Radio, Row, Select, Typography } from 'antd';
import { Card } from '../../components';
import { SaveOutlined } from '@ant-design/icons';

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  company?: string;
  email?: string;
  subscription?: 'free' | 'pro' | 'enterprise' | 'custom';
  id?: string;
  status?: 'active' | 'inactive';
};

export const UserProfileDetailsPage = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Card>
      <Form
        name="user-profile-details-form"
        layout="vertical"
        initialValues={{
          id: '474e2cd2-fc79-49b8-98fe-dab443facede',
          username: 'kelvink96',
          firstName: 'Kelvin',
          middleName: 'Kiptum',
          lastName: 'Kiprop',
          company: 'Design Sparx',
          email: 'kelvin.kiprop96@gmail.com',
          subscription: 'pro',
          status: 'active',
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
        requiredMark={false}
      >
        <Row gutter={[16, 0]}>
          <Col sm={24} lg={24}>
            <Form.Item<FieldType>
              label="User ID"
              name="id"
              rules={[{ required: true, message: 'Please input your id!' }]}
            >
              <Input
                readOnly={true}
                suffix={
                  <Typography.Paragraph
                    copyable={{ text: '474e2cd2-fc79-49b8-98fe-dab443facede' }}
                    style={{ margin: 0 }}
                  ></Typography.Paragraph>
                }
              />
            </Form.Item>
          </Col>
          <Col sm={24} lg={8}>
            <Form.Item<FieldType>
              label="First name"
              name="firstName"
              rules={[
                { required: true, message: 'Please input your first name!' },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col sm={24} lg={8}>
            <Form.Item<FieldType>
              label="Middle name"
              name="middleName"
              rules={[
                { required: true, message: 'Please input your middle name!' },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col sm={24} lg={8}>
            <Form.Item<FieldType>
              label="Last name"
              name="lastName"
              rules={[
                { required: true, message: 'Please input your last name!' },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col sm={24} lg={12}>
            <Form.Item<FieldType>
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col sm={24} lg={12}>
            <Form.Item<FieldType>
              label="Username"
              name="username"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col sm={24} lg={12}>
            <Form.Item<FieldType>
              label="Company"
              name="company"
              rules={[
                { required: true, message: 'Please input your company!' },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col sm={24} lg={12}>
            <Form.Item<FieldType>
              label="Subscription"
              name="subscription"
              rules={[
                { required: true, message: 'Please select your subscription!' },
              ]}
            >
              <Select
                options={[
                  { value: 'free', label: 'Free' },
                  { value: 'pro', label: 'Pro' },
                  { value: 'enterprise', label: 'Enterprise' },
                  { value: 'custom', label: 'Custom', disabled: true },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item<FieldType>
              label="Status"
              name="status"
              rules={[
                { required: true, message: 'Please select your status!' },
              ]}
            >
              <Radio.Group>
                <Radio value="active">Active</Radio>
                <Radio value="inactive">Inactive</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
            Save changes
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
