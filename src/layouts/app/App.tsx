import {Affix, Button, Input, Layout, Space, theme, Tooltip} from "antd";
import {Outlet} from "react-router-dom";
import {useEffect, useState} from "react";
import {AppstoreOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MessageOutlined, UpOutlined} from "@ant-design/icons";
import SideNav from "./SideNav.tsx";
import HeaderNav from "./HeaderNav.tsx";
import FooterNav from "./FooterNav.tsx";
import {useMediaQuery} from "react-responsive";

const {Content} = Layout

const AppLayout = () => {
    const {
        token: {borderRadius},
    } = theme.useToken();
    const isMobile = useMediaQuery({maxWidth: 769})
    const [collapsed, setCollapsed] = useState(true);
    const [showTopBtn, setShowTopBtn] = useState(false);
    const [navFill, setNavFill] = useState(false)

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        setCollapsed(isMobile)
    }, [isMobile]);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }

            if (window.scrollY > 10) {
                setNavFill(true)
            } else {
                setNavFill(false)
            }
        });
    }, []);

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
                        background: navFill ? "rgb(211, 215, 231)" : "none",
                        backdropFilter: navFill ? "blur(8px)" : "none",
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        // boxShadow: '0px 4px 4px 0px rgba(0,0,0,0.1)',
                        position: 'sticky',
                        top: 0,
                        zIndex: 1,
                        gap: 8,
                        transition: "width 2s"
                    }}>
                    <Space align="center" style={{width: "100%"}}>
                        <Tooltip title={`${collapsed ? "Expand" : "Collapse"} Sidebar`}>
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
                        </Tooltip>
                        <Input.Search
                            placeholder="search"
                            style={{
                                width: isMobile ? "100%" : "400px",
                                marginTop: "10px"
                            }}
                            size="large"
                        />
                    </Space>
                    <Space align="center">
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
                    <div style={{padding: 24, minHeight: 360, background: 'none'}}>
                        <Outlet/>
                    </div>
                    {showTopBtn &&
                        <Affix offsetBottom={10} style={{textAlign: 'end', transition: "width 2s"}}>
                            <Tooltip title="Scroll to top of the screen">
                                <Button
                                    type="primary"
                                    onClick={goToTop}
                                    icon={<UpOutlined/>}
                                    shape={isMobile ? "circle" : "default"}
                                    size={isMobile ? "large" : "middle"}>
                                    {!isMobile && "Scroll to top"}
                                </Button>
                            </Tooltip>
                        </Affix>
                    }
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