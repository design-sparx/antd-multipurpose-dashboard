import {AppLayout} from "../index.ts";
import {Col, Descriptions, DescriptionsProps, Image, Row, Tabs, TabsProps, theme} from "antd";
import {Card} from "../../components";
import {Outlet, useNavigate} from "react-router-dom";
import {USER_PROFILE_ITEMS} from "../../constants";
import {useStylesContext} from "../../context";

import "./styles.css"

const DESCRIPTION_ITEMS: DescriptionsProps['items'] = [
    {
        key: 'full-name',
        label: 'Name',
        children: <span>Kelvin Kiptum Kiprop</span>,
    },
    {
        key: 'job-title',
        label: 'Job title',
        children: <span>Software Engineer</span>,
    },
    {
        key: 'email',
        label: 'Email',
        children: <a href="mailto:kelvin.kiprop96@gmail.com">kelvin.kiprop96@gmail.com</a>,
    },
    {
        key: 'telephone',
        label: 'Phone',
        children: <a href="tel:+254706094433">+254 706 094 4433</a>,
    },
    {
        key: 'github',
        label: 'Github',
        children: <a href="https://github.com/kelvink96" target="_blank">kelvink96</a>,
    },
    {
        key: 'twitter',
        label: 'Twitter',
        children: <a href="https://twitter.com/kelvink_96" target="_blank">@kelvink_96</a>,
    },
];

const TAB_ITEMS: TabsProps['items'] = USER_PROFILE_ITEMS.map(u => ({key: u.title, label: u.title}))

const UserAccountLayout = () => {
    const {token: {borderRadius}} = theme.useToken()
    const navigate = useNavigate()
    const stylesContext = useStylesContext()

    const onChange = (key: string) => {
        navigate(key)
    };

    return (
        <>
            <AppLayout>
                <Card
                    className="user-profile-card-nav card"
                    actions={[
                        <Tabs defaultActiveKey="1" items={TAB_ITEMS} onChange={onChange}
                              style={{textTransform: "capitalize"}}/>
                    ]}
                >
                    <Row {...stylesContext?.rowProps}>
                        <Col lg={4}>
                            <Image
                                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
                                alt="user profile image"
                                height="100%"
                                width="100%"
                                style={{borderRadius}}
                            />
                        </Col>
                        <Col lg={20}>
                            <Descriptions title="User Info" items={DESCRIPTION_ITEMS}/>
                        </Col>
                    </Row>
                </Card>
                <div style={{marginTop: "1.5rem"}}>
                    <Outlet/>
                </div>
            </AppLayout>
        </>
    );
};

export default UserAccountLayout;