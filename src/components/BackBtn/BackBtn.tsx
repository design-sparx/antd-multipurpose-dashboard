import { useNavigate } from 'react-router-dom';
import { Button, ButtonProps, Tooltip } from 'antd';
import { LeftOutlined } from '@ant-design/icons';

type Props = {
  wIcon?: boolean;
  iconOnly?: boolean;
} & ButtonProps;

const BackBtn = ({ wIcon, iconOnly, ...others }: Props) => {
  const navigate = useNavigate();

  return (
    <Tooltip title="Navigate to previous page">
      <Button
        icon={wIcon || iconOnly ? <LeftOutlined /> : null}
        onClick={() => navigate(-1)}
        {...others}
      >
        {!iconOnly && 'Go back'}
      </Button>
    </Tooltip>
  );
};

export default BackBtn;
