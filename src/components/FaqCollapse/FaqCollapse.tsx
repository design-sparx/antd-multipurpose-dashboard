import { Collapse, CollapseProps } from 'antd';

type Props = CollapseProps;

const FaqCollapse = ({ ...others }: Props) => {
  return <Collapse {...others} />;
};

export default FaqCollapse;
