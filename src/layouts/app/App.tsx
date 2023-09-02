import {Button, Input, Layout, Space, theme, Tooltip} from "antd";
import {Outlet} from "react-router-dom";
import {ReactNode, useState} from "react";
import {AppstoreOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MessageOutlined} from "@ant-design/icons";
import SideNav from "./SideNav.tsx";
import HeaderNav from "./HeaderNav.tsx";
import FooterNav from "./FooterNav.tsx";

const {Content} = Layout

type AppLayoutProps = {
    headerContent: ReactNode
}

const AppLayout = ({headerContent}: AppLayoutProps) => {
    const {
        token: {colorBgContainer},
    } = theme.useToken();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout style={{minHeight: '100vh'}}>
            <SideNav trigger={null} collapsible collapsed={collapsed}/>
            <Layout>
                <HeaderNav
                    style={{
                        marginLeft: collapsed ? 0 : '200px',
                        padding: '0 1rem 0 0',
                        background: colorBgContainer,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.1)',
                        position: 'sticky',
                        top: 0,
                        zIndex: 1
                    }}>
                    <Space align="center">
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                        <div style={{marginBottom: '1.2rem'}}>
                            {headerContent}
                        </div>
                    </Space>
                    <Space align="center">
                        <Input.Search placeholder="search" style={{display: 'inline'}}></Input.Search>
                        <Tooltip title="Apps">
                            <Button icon={<AppstoreOutlined/>}/>
                        </Tooltip>
                        <Tooltip title="Messages">
                            <Button icon={<MessageOutlined/>}/>
                        </Tooltip>
                    </Space>
                </HeaderNav>
                <Content
                    style={{
                        marginTop: '24px',
                        marginBottom: '24px',
                        marginLeft: collapsed ? 0 : '200px'
                    }}
                >
                    <div style={{padding: 24, minHeight: 360, background: ''}}>
                        <Outlet/>
                    </div>
                </Content>
                <FooterNav style={{textAlign: 'center'}}/>
            </Layout>
        </Layout>
    );
};

export default AppLayout;