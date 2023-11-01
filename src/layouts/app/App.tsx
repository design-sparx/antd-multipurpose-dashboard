import {Button, Flex, FloatButton, Input, Layout, Space, theme, Tooltip} from "antd";
import {useLocation} from "react-router-dom";
import {ReactNode, useEffect, useRef, useState} from "react";
import {AppstoreOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MessageOutlined} from "@ant-design/icons";
import {CSSTransition, SwitchTransition, TransitionGroup} from "react-transition-group";
import {useMediaQuery} from "react-responsive";
import SideNav from "./SideNav.tsx";
import HeaderNav from "./HeaderNav.tsx";
import FooterNav from "./FooterNav.tsx";
import {Nprogress} from "../../components";

const {Content} = Layout

type AppLayoutProps = {
    children: ReactNode
}

const AppLayout = ({children}: AppLayoutProps) => {
    const {
        token: {borderRadius},
    } = theme.useToken();
    const isMobile = useMediaQuery({maxWidth: 769})
    const [collapsed, setCollapsed] = useState(true);
    const [navFill, setNavFill] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const location = useLocation()
    const nodeRef = useRef(null)
    const floatBtnRef = useRef(null)

    useEffect(() => {
        setCollapsed(isMobile)
    }, [isMobile]);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 5) {
                setNavFill(true)
            } else {
                setNavFill(false)
            }
        });
    }, []);

    return (
        <>
            <Nprogress isAnimating={isLoading} key={location.key}/>
            <Layout
                style={{
                    minHeight: '100vh',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    backgroundImage: 'radial-gradient(at 47% 33%, hsl(197.95, 0%, 100%) 0, transparent 59%),\n' +
                        'radial-gradient(at 82% 65%, hsl(204.07, 70%, 75%) 0, transparent 55%)',
                }}
            >
                <SideNav
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}
                    style={{
                        overflow: 'auto',
                        position: 'fixed',
                        left: 0,
                        top: 0,
                        bottom: 0,
                        background: "none",
                        border: "none",
                        transition: "all .2s"
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
                            padding: '0 2rem 0 0',
                            background: navFill ? "#eaf5fc" : "none",
                            backdropFilter: navFill ? "blur(8px)" : "none",
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            position: 'sticky',
                            top: 0,
                            zIndex: 1,
                            gap: 8,
                            transition: "all .25s"
                        }}
                    >
                        <Flex align="center">
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
                                }}
                                size="middle"
                            />
                        </Flex>
                        <Space align="center">
                            <Tooltip title="Apps">
                                <Button icon={<AppstoreOutlined/>} type="text"/>
                            </Tooltip>
                            <Tooltip title="Messages">
                                <Button icon={<MessageOutlined/>} type="text"/>
                            </Tooltip>
                        </Space>
                    </HeaderNav>
                    <Content
                        style={{
                            margin: `0 0 0 ${collapsed ? 0 : '200px'}`,
                            background: "rgba(52, 152, 219, 0.35)",
                            borderRadius: collapsed ? 0 : borderRadius,
                            transition: "all .25s",
                            padding: '24px 32px',
                            minHeight: 360,
                        }}
                    >
                        <TransitionGroup>
                            <SwitchTransition>
                                <CSSTransition
                                    key={`css-transition-${location.key}`}
                                    nodeRef={nodeRef}
                                    onEnter={() => {
                                        setIsLoading(true)
                                    }}
                                    onEntered={() => {
                                        setIsLoading(false)
                                    }}
                                    timeout={300}
                                    classNames="bottom-to-top"
                                    unmountOnExit
                                >
                                    {() => (
                                        <div ref={nodeRef} style={{background: 'none'}}>
                                            {children}
                                        </div>
                                    )}
                                </CSSTransition>
                            </SwitchTransition>
                        </TransitionGroup>
                        <div ref={floatBtnRef}>
                            <FloatButton.BackTop/>
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
        </>
    );
};

export default AppLayout;