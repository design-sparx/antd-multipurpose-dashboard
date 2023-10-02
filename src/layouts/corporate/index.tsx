import {AppLayout} from "../index.ts";
import {Button, Col, Row, RowProps, Typography} from "antd";
import {Link, Outlet} from "react-router-dom";
import {BlogsListCard, Card, PageHeader, SocialMediaCard} from "../../components";
import {HomeOutlined, IdcardOutlined} from "@ant-design/icons";
import {CORPORATE_ITEMS} from "../../constants";

const {Text, Title} = Typography

const ROW_PROPS: RowProps = {
    gutter: [
        {xs: 8, sm: 16, md: 24, lg: 32},
        {xs: 8, sm: 16, md: 24, lg: 32}
    ]
}

const CorporateLayout = () => {
    return (
        <>
            {/*@ts-ignore*/}
            <AppLayout>
                <PageHeader
                    title="corporate"
                    breadcrumbs={[
                        {
                            title: (<><HomeOutlined/><span>home</span></>),
                            path: "/"
                        },
                        {
                            title: (<><IdcardOutlined/><span>corporate</span></>),
                            menu: {
                                items: CORPORATE_ITEMS.map(d => ({
                                    key: d.title,
                                    title: <Link to={d.path}>{d.title}</Link>,
                                }))
                            }
                        },
                        {
                            title: "about"
                        }
                    ]}
                />
                <Row {...ROW_PROPS}>
                    <Col sm={24} lg={18}>
                        <Outlet />
                    </Col>
                    <Col sm={24} lg={6}>
                        <Row {...ROW_PROPS}>
                            <Col span={24}>
                                <Card title="Careers" actions={[<Button>Explore more</Button>]}>
                                    <Text>
                                        Tortor id aliquet lectus proin nibh nisl condimentum. Semper quis lectus nulla
                                        at
                                        volutpat. Faucibus nisl tincidunt eget nullam non. Malesuada nunc vel risus
                                        commodo
                                        viverra. Lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi
                                        tincidunt
                                        ornare.
                                    </Text>
                                    <Title level={5}>Requirements</Title>
                                    <ul>
                                        <li>Experience with JavaScript</li>
                                        <li>Good time-management skills</li>
                                        <li>Experience with React & Nextjs</li>
                                        <li>Experience with HTML / CSS</li>
                                    </ul>
                                    <Title level={5}>Our Achievements</Title>
                                    <ul>
                                        <li>ISO Certified</li>
                                        <li>Atlassian Partner</li>
                                        <li>Amazon Partner</li>
                                        <li>Google Partner</li>
                                        <li>Microsoft Partner</li>
                                    </ul>
                                </Card>
                            </Col>
                            <Col span={24}>
                                <BlogsListCard/>
                            </Col>
                            <Col span={24}>
                                <SocialMediaCard/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </AppLayout>
        </>
    );
};

export default CorporateLayout;