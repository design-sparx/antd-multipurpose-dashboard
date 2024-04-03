import { Collapse, CollapseProps } from 'antd';

type Props = CollapseProps;

export const FaqCollapse = ({ ...others }: Props) => {
  return <Collapse {...others} />;
};
