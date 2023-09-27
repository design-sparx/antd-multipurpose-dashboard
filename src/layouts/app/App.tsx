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
        token: {borderRadius},
    } = theme.useToken();
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout
            style={{
                minHeight: '100vh',
                backgroundColor: '#d3d7e7',
                backgroundImage: 'radial-gradient(at 47% 33%, hsl(237.50, 23%, 80%) 0, transparent 59%), radial-gradient(at 82% 65%, hsl(349.81, 35%, 70%) 0, transparent 55%)',
            }}
        >
            <SideNav
                trigger={null}
                collapsible
                collapsed={collapsed}
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    background: "none",
                    border: "none"
                }}
            />
            <Layout
                style={{
                    background: "none"
                }}
            >
                <HeaderNav
                    style={{
                        marginLeft: collapsed ? 0 : '200px',
                        padding: '0 1rem 0 0',
                        background: "none",
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        // boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.1)',
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
                        margin: `0 24px 0 ${collapsed ? '24px' : '200px'}`,
                        background: "rgba(161, 167, 203, .5)",
                        borderRadius
                    }}
                >
                    <div style={{padding: 24, minHeight: 360, background: ''}}>
                        <Outlet/>
                    </div>
                </Content>
                <FooterNav
                    style={{
                        textAlign: 'center', marginLeft: collapsed ? 0 : '200px',
                        background: "none"
                    }}
                />
            </Layout>
        </Layout>
    );
};

export default AppLayout;