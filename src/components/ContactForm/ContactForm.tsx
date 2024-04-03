import { Button, Col, Form, FormProps, Input, Row } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { useStylesContext } from '../../context';

const { TextArea } = Input;

type Props = FormProps;

export const ContactForm = ({ ...others }: Props) => {
  const stylesContext = useStylesContext();

  return (
    <div>
      <Form layout="vertical" {...others}>
        <Row {...stylesContext?.rowProps}>
          <Col sm={24} lg={12}>
            <Form.Item label="Name" tooltip="This is a required field">
              <Input />
            </Form.Item>
          </Col>
          <Col sm={24} lg={12}>
            <Form.Item label="Email" tooltip="This is a required field">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item label="Subject" tooltip="This is a required field">
          <Input />
        </Form.Item>
        <Form.Item label="Message">
          <TextArea />
        </Form.Item>
        <Form.Item>
          <Button type="primary" icon={<SendOutlined />}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
