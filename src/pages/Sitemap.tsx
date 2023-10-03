import {SitemapCard} from "../components";
import {Col, Row, RowProps, Typography} from "antd";
import {CORPORATE_ITEMS, DASHBOARD_ITEMS} from "../constants";

const ROW_PROPS: RowProps = {
    gutter: [
        {xs: 8, sm: 16, md: 24, lg: 32},
        {xs: 8, sm: 16, md: 24, lg: 32}
    ]
}

const SITES = [
    {
        title: "dashboard",
        links: DASHBOARD_ITEMS
    },
    {
        title: "corporate",
        links: CORPORATE_ITEMS
    }
]

const SitemapPage = () => {
    return (
        <div>
            <Typography.Title level={3}>Sitemap</Typography.Title>
            <Row {...ROW_PROPS}>
                {SITES.map(s =>
                    <Col xs={24} sm={12} lg={6} xl={6}>
                        <SitemapCard data={s}/>
                    </Col>
                )}
            </Row>
        </div>
    );
};

export default SitemapPage;