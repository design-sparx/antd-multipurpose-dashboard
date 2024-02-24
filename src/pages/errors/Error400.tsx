import { Result, Typography } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { red } from '@ant-design/colors';
import { BackBtn, RefreshBtn } from '../../components';

const { Paragraph, Text } = Typography;

const Error400Page = () => {
  return (
    <Result
      status="error"
      title="400"
      subTitle="Bad request. The request could not be understood by the server due to malformed syntax. The client should not repeat the request without modifications"
      extra={[<BackBtn type="primary" />, <RefreshBtn />]}
    >
      <div className="desc">
        <Paragraph>
          <Text
            strong
            style={{
              fontSize: 16,
            }}
          >
            The content you submitted has the following error:
          </Text>
        </Paragraph>
        <Paragraph>
          <CloseCircleOutlined style={{ color: red[5] }} />
          &nbsp;Bad Request - Invalid URL &nbsp;<a>Forward error &gt;</a>
        </Paragraph>
        <Paragraph>
          <CloseCircleOutlined style={{ color: red[5] }} />
          &nbsp;Bad Request. Your browser sent a request that this server could
          not understand &nbsp;<a>Go to console &gt;</a>
        </Paragraph>
      </div>
    </Result>
  );
};

export default Error400Page;
