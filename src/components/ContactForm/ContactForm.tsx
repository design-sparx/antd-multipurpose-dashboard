import {Button, Col, Form, FormProps, Input, Row, RowProps} from "antd";
import {SendOutlined} from "@ant-design/icons";

const {TextArea} = Input

const ROW_PROPS: RowProps = {
    gutter: [
        {xs: 8, sm: 16, md: 24, lg: 32},
        {xs: 8, sm: 16, md: 24, lg: 32}
    ]
}

type Props = FormProps

const ContactForm = ({...others}: Props) => {
    return (
        <div>
            <Form
                layout="vertical"
                {...others}
            >
                <Row {...ROW_PROPS}>
                    <Col sm={24} lg={12}>
                        <Form.Item label="Name" tooltip="This is a required field">
                            <Input/>
                        </Form.Item>
                    </Col>
                    <Col sm={24} lg={12}>
                        <Form.Item label="Email" tooltip="This is a required field">
                            <Input/>
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item label="Subject" tooltip="This is a required field">
                    <Input/>
                </Form.Item>
                <Form.Item label="Message">
                    <TextArea/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" icon={<SendOutlined/>}>Submit</Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ContactForm;