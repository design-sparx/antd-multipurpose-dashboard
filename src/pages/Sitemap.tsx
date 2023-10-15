import {SitemapCard} from "../components";
import {Col, Flex, Row, Typography} from "antd";
import {CORPORATE_ITEMS, DASHBOARD_ITEMS, USER_PROFILE_ITEMS} from "../constants";
import {useStylesContext} from "../context";
import {BranchesOutlined} from "@ant-design/icons";


const SITES = [
    {
        title: "dashboard",
        links: DASHBOARD_ITEMS
    },
    {
        title: "corporate",
        links: CORPORATE_ITEMS
    },
    {
        title: "user profile",
        links: USER_PROFILE_ITEMS
    }
]

const SitemapPage = () => {
    const context = useStylesContext()

    return (
        <div>
            <Flex vertical gap="middle">
                <Typography.Title level={3}><BranchesOutlined/>{' '}Sitemap</Typography.Title>
                <Row {...context?.rowProps}>
                    {SITES.map(s =>
                        <Col xs={24} sm={12} md={8} lg={6} key={`col-${s.title}`}>
                            <SitemapCard data={s}/>
                        </Col>
                    )}
                </Row>
            </Flex>
        </div>
    );
};

export default SitemapPage;