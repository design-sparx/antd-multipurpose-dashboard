import {Layout} from "antd";

const {Footer} = Layout

type FooterNavProps = React.HTMLAttributes<HTMLDivElement>

const FooterNav = ({...others}: FooterNavProps) => {
    return (
        <Footer {...others}>Ant Design ©2023 Created by Ant UED</Footer>
    );
};

export default FooterNav;