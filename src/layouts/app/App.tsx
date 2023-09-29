import {Affix, Button, Input, Layout, Space, theme, Tooltip} from "antd";
import {Outlet, useLocation} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {AppstoreOutlined, MenuFoldOutlined, MenuUnfoldOutlined, MessageOutlined, UpOutlined} from "@ant-design/icons";
import {CSSTransition, SwitchTransition, TransitionGroup} from "react-transition-group";
import {useMediaQuery} from "react-responsive";
import SideNav from "./SideNav.tsx";
import HeaderNav from "./HeaderNav.tsx";
import FooterNav from "./FooterNav.tsx";
import {Nprogress} from "../../components";

const {Content} = Layout

const AppLayout = () => {
    const {
        token: {borderRadius},
    } = theme.useToken();
    const isMobile = useMediaQuery({maxWidth: 769})
    const [collapsed, setCollapsed] = useState(true);
    const [showTopBtn, setShowTopBtn] = useState(false);
    const [navFill, setNavFill] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const location = useLocation()
    const nodeRef = useRef(null)

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
                    backgroundColor: '#d3d7e7',
                    backgroundImage: 'radial-gradient(at 47% 33%, hsl(237.50, 23%, 80%) 0, transparent 59%), radial-gradient(at 82% 65%, hsl(349.81, 35%, 70%) 0, transparent 55%)',
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
                            padding: '0 1rem 0 0',
                            background: navFill ? "rgb(211, 215, 231)" : "none",
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
                            margin: `0 24px 0 ${collapsed ? '24px' : '224px'}`,
                            background: "rgba(161, 167, 203, .5)",
                            borderRadius,
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
                                    classNames="page"
                                    unmountOnExit
                                >
                                    {() => (
                                        <div ref={nodeRef} style={{background: 'none'}}>
                                            <Outlet/>
                                        </div>
                                    )}
                                </CSSTransition>
                            </SwitchTransition>
                        </TransitionGroup>
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
        </>
    );
};

export default AppLayout;