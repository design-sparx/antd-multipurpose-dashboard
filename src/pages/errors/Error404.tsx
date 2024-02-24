import { Result } from 'antd';
import { BackBtn } from '../../components';

const Error404Page = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<BackBtn type="primary" />}
    />
  );
};

export default Error404Page;
