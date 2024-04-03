import { Button, Col, Flex, Form, Input, Rate, Row, Typography } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { Card } from '../../components';
import { useState } from 'react';

const { Text } = Typography;

const RATING_DESC = ['terrible', 'bad', 'average', 'very good', 'wonderful'];

type FieldType = {
  rating?: number;
  comment?: string;
};

export const UserProfileFeedbackPage = () => {
  const [value, setValue] = useState(3);

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div>
      <Card title="Feedback form" style={{ width: '50%' }}>
        <Flex vertical gap="middle">
          <Text>
            Your input is valuable in helping us better understand your needs
            and tailor our service accordingly
          </Text>
          <Form
            name="user-profile-address-form"
            layout="vertical"
            initialValues={{
              rating: 0,
              comment: '',
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="on"
            requiredMark={false}
          >
            <Row gutter={[16, 0]}>
              <Col span={24}>
                <Form.Item<FieldType>
                  label=""
                  name="rating"
                  rules={[
                    { required: true, message: 'Please enter your ratings!' },
                  ]}
                >
                  <Flex>
                    <Rate
                      tooltips={RATING_DESC}
                      onChange={setValue}
                      value={value}
                      allowClear
                      allowHalf
                    />
                    {value ? (
                      <span className="ant-rate-text">
                        {RATING_DESC[Math.round(value) - 1]}
                      </span>
                    ) : (
                      ''
                    )}
                  </Flex>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item<FieldType>
                  label="Comment"
                  name="comment"
                  rules={[
                    { required: true, message: 'Please enter your comment!' },
                  ]}
                >
                  <Input.TextArea />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<SendOutlined />}>
                Submit now
              </Button>
            </Form.Item>
          </Form>
        </Flex>
      </Card>
    </div>
  );
};
