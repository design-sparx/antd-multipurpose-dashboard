import {Col, List, Row, RowProps} from "antd";
import {Card, EmployeeCard} from "../../components";
import EmployeesData from "../../mocks/Employees.json";
import {Employee} from "../../types";

const ROW_PROPS: RowProps = {
    gutter: [
        {xs: 8, sm: 16, md: 24, lg: 32},
        {xs: 8, sm: 16, md: 24, lg: 32}
    ]
}

const CorporateTeamPage = () => {
    return (
        <div>
            <Row {...ROW_PROPS}>
                <Col span={24}>
                    <Card title="Our team">
                        <List
                            grid={{
                                gutter: 16,
                                xs: 1,
                                sm: 2,
                                md: 3,
                                lg: 4,
                                xl: 4,
                                xxl: 4,
                            }}
                            pagination={{
                                onChange: (page) => {
                                    console.log(page);
                                },
                                pageSize: 10,
                                align: "center"
                            }}
                            dataSource={EmployeesData}
                            renderItem={(item: Employee) => (
                                <List.Item key={item.employee_id}>
                                    <EmployeeCard
                                        data={item}
                                        showInfo={true}
                                    />
                                </List.Item>
                            )}
                        />
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default CorporateTeamPage;