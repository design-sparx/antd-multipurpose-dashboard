import {Affix, Button, ConfigProvider, Flex, Layout, Menu, theme, Tooltip} from "antd";
import {CSSTransition, SwitchTransition, TransitionGroup} from "react-transition-group";
import {Link, Outlet, useLocation} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {GithubOutlined, LoginOutlined, UpOutlined} from "@ant-design/icons";
import {useMediaQuery} from "react-responsive";
import {Logo, Nprogress} from "../../components";
import {goToTop} from "../../utils";
import {PATH_DASHBOARD, PATH_GITHUB, PATH_LANDING} from "../../constants";

const {Header, Content, Footer} = Layout

const ROUTES = [
    {title: "Why us", path: PATH_LANDING.why},
    {title: "Pricing", path: PATH_LANDING.pricing},
    {title: "About", path: PATH_LANDING.about},
    {title: "Contact", path: PATH_LANDING.contact},
]

const GuestLayout = () => {
    const {
        token: {borderRadius},
    } = theme.useToken();
    const isMobile = useMediaQuery({maxWidth: 769})
    const [isLoading, setIsLoading] = useState(false)
    const location = useLocation()
    const nodeRef = useRef(null)
    const [navFill, setNavFill] = useState(false)
    const [showTopBtn, setShowTopBtn] = useState(false);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }

            if (window.scrollY > 50) {
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
                className="layout"
                style={{
                    minHeight: '100vh',
                    backgroundColor: 'rgba(52, 152, 219, 0.05)',
                    backgroundImage: 'radial-gradient(at 47% 33%, hsl(197.95, 0%, 100%) 0, transparent 59%),\n' +
                        'radial-gradient(at 82% 65%, hsl(204.07, 70%, 53%) 0, transparent 55%)',
                }}
            >
                <Header
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: navFill ? "rgba(255, 255, 255, .5)" : "none",
                        backdropFilter: navFill ? "blur(8px)" : "none",
                        gap: 12,
                        position: "sticky",
                        top: 0
                    }}
                >
                    <Logo color="black" asLink href={PATH_LANDING.root}/>
                    <ConfigProvider
                        theme={{
                            components: {
                                Menu: {
                                    itemBg: "none",
                                    lineType: "none"
                                }
                            }
                        }}>
                        <Menu
                            mode="horizontal"
                            defaultSelectedKeys={['2']}
                            items={ROUTES.map(r => ({
                                key: r.title,
                                label: <Link to={r.path}>{r.title}</Link>,
                            }))}
                        />
                    </ConfigProvider>
                    <Flex gap="small">
                        <Link to={PATH_DASHBOARD.default}>
                            <Button icon={<LoginOutlined/>} type="primary">Live Preview</Button>
                        </Link>
                        <a href={PATH_GITHUB.personal} target="_blank">
                            <Button icon={<GithubOutlined/>}>Github</Button>
                        </a>
                    </Flex>
                </Header>
                <Content
                    style={{
                        // padding: '0 50px',
                        background: "rgba(52, 152, 219, 0.35)",
                        borderRadius,
                        transition: "all .25s",
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
                                    <div ref={nodeRef} className="site-layout-content" style={{background: 'none'}}>
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
                <Footer
                    style={{
                        textAlign: 'center',
                        backgroundColor: 'rgba(52, 152, 219, 0.2)',
                    }}
                >
                    AntD Dashboard &copy; {new Date().getFullYear()} Created by Design Sparx
                </Footer>
            </Layout>
        </>
    );
};

export default GuestLayout;