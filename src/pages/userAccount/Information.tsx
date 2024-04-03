import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  Row,
  Select,
} from 'antd';
import { Card } from '../../components';
import {
  MinusCircleOutlined,
  PlusOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import { useStylesContext } from '../../context';
import * as dayjs from 'dayjs';

const SOCIALS = [
  'Facebook',
  'Instagram',
  'Twitter',
  'LinkedIn',
  'Mastodon',
  'Threads',
  'YouTube',
  'WhatsApp',
  'Tiktok',
  'Telegram',
  'QQ',
  'WeChat',
];

type FieldType = {
  country?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  postalCode?: string;
  preferred?: boolean;
};

type BirthdayFieldType = {
  dob?: string;
};

export const UserProfileInformationPage = () => {
  const context = useStylesContext();
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Row {...context?.rowProps}>
      <Col span={24}>
        <Card title="Address book">
          <Form
            name="user-profile-address-form"
            layout="vertical"
            initialValues={{
              country: 'Kenya',
              addressLine1: '828, 18282 ABC Drive, XYZ Rd',
              city: 'Nairobi',
              postalCode: '00100',
              preferred: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="on"
            requiredMark={false}
          >
            <Row gutter={[16, 0]}>
              <Col sm={24} lg={12}>
                <Form.Item<FieldType>
                  label="Country"
                  name="country"
                  rules={[
                    {
                      required: true,
                      message: 'Please select your country or region!',
                    },
                  ]}
                >
                  <Select options={[]} />
                </Form.Item>
              </Col>
              <Col sm={24} lg={12}>
                <Form.Item<FieldType>
                  label="City"
                  name="city"
                  rules={[
                    { required: true, message: 'Please enter your city!' },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col sm={24} lg={12}>
                <Form.Item<FieldType>
                  label="Address line 1"
                  name="addressLine1"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your address line!',
                    },
                  ]}
                >
                  <Input.TextArea />
                </Form.Item>
              </Col>
              <Col sm={24} lg={12}>
                <Form.Item<FieldType>
                  label="Address line 2"
                  name="addressLine2"
                  rules={[
                    {
                      required: false,
                      message: 'Please enter your address line!',
                    },
                  ]}
                >
                  <Input.TextArea />
                </Form.Item>
              </Col>
              <Col sm={24} lg={12}>
                <Form.Item<FieldType>
                  label="Postal code"
                  name="postalCode"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your postal code!',
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col sm={24} lg={24}>
                <Form.Item<FieldType> name="preferred">
                  <Checkbox>
                    Set as a preferred billing and shipping address
                  </Checkbox>
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
      </Col>
      <Col sm={24} lg={16}>
        <Card title="Social links">
          <Form
            name="user-profile-social-form"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.List name="social-links">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Flex
                      key={key}
                      align="baseline"
                      gap="small"
                      style={{ marginBottom: 8 }}
                    >
                      <Form.Item
                        {...restField}
                        name={[name, 'social']}
                        rules={[{ required: true, message: 'Missing social' }]}
                        style={{ width: 200 }}
                      >
                        <Select
                          placeholder="social"
                          options={SOCIALS.map((s) => ({ value: s, label: s }))}
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'username']}
                        rules={[
                          { required: true, message: 'Missing username' },
                        ]}
                      >
                        <Input placeholder="username" />
                      </Form.Item>
                      <Button
                        type="text"
                        icon={<MinusCircleOutlined />}
                        onClick={() => remove(name)}
                      ></Button>
                    </Flex>
                  ))}
                  <Form.Item>
                    <Button
                      type="default"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add link
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                Save changes
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
      <Col sm={24} lg={8}>
        <Card title="Birthday">
          <Form
            name="user-profile-birhday-form"
            layout="vertical"
            initialValues={{
              dob: dayjs('1996/04/27'),
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="on"
            requiredMark={false}
          >
            <Form.Item<BirthdayFieldType>
              label="Birth date"
              name="dob"
              rules={[
                { required: true, message: 'Please select your birthday!' },
              ]}
            >
              <DatePicker />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                Save changes
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};
