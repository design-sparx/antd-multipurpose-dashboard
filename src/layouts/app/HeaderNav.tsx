import { Layout } from 'antd';
import { useRef } from 'react';

const { Header } = Layout;

type HeaderNavProps = {
  navFill?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

const HeaderNav = ({ navFill, ...others }: HeaderNavProps) => {
  const nodeRef = useRef(null);

  return <Header ref={nodeRef} {...others} />;
};

export default HeaderNav;
