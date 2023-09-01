import {Layout} from "antd";

const {Header} = Layout

type HeaderNavProps = React.HTMLAttributes<HTMLDivElement>

const HeaderNav = ({...others}: HeaderNavProps) => {
    return (
        <Header {...others}/>
    );
};

export default HeaderNav;