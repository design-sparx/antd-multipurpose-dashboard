import { Button, ButtonProps } from 'antd';
import { SyncOutlined } from '@ant-design/icons';

type Props = {
  icon?: boolean;
} & ButtonProps;

const RefreshBtn = ({ icon, ...others }: Props) => {
  return (
    <Button
      icon={icon ? <SyncOutlined /> : null}
      onClick={() => window.location.reload()}
      {...others}
    >
      Refresh page
    </Button>
  );
};

export default RefreshBtn;
