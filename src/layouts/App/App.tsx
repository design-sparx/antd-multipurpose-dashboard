import {Layout, theme} from "antd";
import {Outlet} from "react-router-dom";
import SideNav from "./SideNav.tsx";
import HeaderNav from "./HeaderNav.tsx";
import FooterNav from "./FooterNav.tsx";

const {Content} = Layout

const AppLayout = () => {
    const {
        token: {colorBgContainer},
    } = theme.useToken();

    return (
        <Layout style={{height: '100vh'}}>
            <SideNav/>
            <Layout>
                <HeaderNav style={{padding: 0, background: colorBgContainer}}/>
                <Content style={{margin: '24px 16px 0'}}>
                    <div style={{padding: 24, minHeight: 360, background: colorBgContainer}}>
                        <Outlet/>
                    </div>
                </Content>
                <FooterNav style={{textAlign: 'center'}}/>
            </Layout>
        </Layout>
    );
};

export default AppLayout;