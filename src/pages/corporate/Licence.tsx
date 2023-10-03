import {Card as AntCard, Col, Row, RowProps} from "antd";
import {Card} from "../../components";
import LicenceData from "../../mocks/License.json"
import {Typography} from "antd";

const ROW_PROPS: RowProps = {
    gutter: [
        {xs: 8, sm: 16, md: 24, lg: 32},
        {xs: 8, sm: 16, md: 24, lg: 32}
    ]
}

const CorporateLicensePage = () => {
    return (
        <div>
            <Row {...ROW_PROPS}>
                <Col span={24}>
                    <Card title="licence comparisons">
                        {LicenceData.map(l =>
                            <AntCard title={`${l.title} plan license`} bordered={true} style={{marginBottom: "1rem"}}>
                                <Typography.Text>{l.description}</Typography.Text>
                            </AntCard>
                        )}
                    </Card>
                </Col>
                <Col span={24}>
                    <Card title="general terms and conditions">
                        <ul>
                            <li>
                                All licenses are subject to adherence to the terms of service and acceptable use policies outlined by the provider.
                            </li>
                            <li>
                                Users must not remove or alter any copyright notices or branding present in the template.
                            </li>
                            <li>
                                Users are responsible for the content and data they upload or display using the dashboard template.
                            </li>
                            <li>
                                The provider reserves the right to terminate the license in case of violation of terms or misuse of the template.
                            </li>
                            <li>
                                Refunds are subject to the refund policy of the provider and are applicable within the specified period after the purchase.
                            </li>
                        </ul>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default CorporateLicensePage;