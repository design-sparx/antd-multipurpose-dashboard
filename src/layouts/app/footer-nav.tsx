import { Layout } from 'antd';
import { PATH_GITHUB } from '../../constants';

const { Footer } = Layout;

type FooterNavProps = React.HTMLAttributes<HTMLDivElement>;

const FooterNav = ({ ...others }: FooterNavProps) => {
  return (
    <Footer {...others}>
      Antd dashboard © {new Date().getFullYear()}. Created by&nbsp;
      <a href={PATH_GITHUB.org} target="_blank">
        Design Sparx
      </a>
    </Footer>
  );
};

export default FooterNav;
