import React from "react";
import {Layout, Menu} from "antd";
import {UploadOutlined, UserOutlined, VideoCameraOutlined} from "@ant-design/icons";
import {Logo} from "../../components";

const {Sider} = Layout

const SideNav = () => {
    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {
                console.log(broken);
            }}
            onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
            }}
        >
            <Logo color="white"
                  style={{display: 'flex', gap: '8px', justifyContent: 'center', width: '100%', alignItems: 'center'}}/>
            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['4']}
                items={[UserOutlined, VideoCameraOutlined, UploadOutlined, UserOutlined].map(
                    (icon, index) => ({
                        key: String(index + 1),
                        icon: React.createElement(icon),
                        label: `nav ${index + 1}`,
                    }),
                )}
            />
        </Sider>
    );
};

export default SideNav;