import React from "react";
import {Button, Card as AntdCard, Col, Image, List, Row, RowProps, Typography} from "antd";
import {Card, EmployeeCard, BlogsListCard, SocialMediaCard} from "../../components";
import EmployeesData from "../../mocks/Employees.json"
import {Employee} from "../../types";

const {Title, Text, Paragraph} = Typography

const ROW_PROPS: RowProps = {
    gutter: [
        {xs: 8, sm: 16, md: 24, lg: 32},
        {xs: 8, sm: 16, md: 24, lg: 32}
    ]
}

const gridStyle: React.CSSProperties = {
    width: '33.33%',
    textAlign: 'center',
};

const CorporateAboutPage = () => {
    return (
        <div>
            <Row {...ROW_PROPS}>
                <Col sm={24} lg={16}>
                    <Row {...ROW_PROPS}>
                        <Col span={24}>
                            <Card
                                title={
                                    <Title level={3}>About Design Sparx</Title>
                                }
                            >
                                <Text>Save time and resources by using our templates.</Text>
                                <Image
                                    src="https://images.unsplash.com/photo-1483058712412-4245e9b90334?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGJyYW5kfGVufDB8MHwwfHx8MA%3D%3D&auto=format&fit=crop&w=400&q=60"
                                    alt="about us hero image"
                                    width="100%"
                                />
                                <Paragraph>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                    tempor incididunt ut labore et dolore magna aliqua. Non tellus orci ac auctor augue
                                    mauris augue. Id diam vel quam elementum pulvinar. Nunc scelerisque viverra mauris
                                    in. Tortor aliquam nulla facilisi cras fermentum odio eu. Eleifend mi in nulla
                                    posuere sollicitudin aliquam ultrices. Quis commodo odio aenean sed adipiscing diam
                                    donec adipiscing tristique. Pharetra magna ac placerat vestibulum lectus mauris
                                    ultrices. Viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Etiam tempor
                                    orci eu lobortis elementum nibh tellus molestie nunc. Iaculis eu non diam phasellus
                                    vestibulum lorem sed risus ultricies. Vestibulum lectus mauris ultrices eros in
                                    cursus turpis. Risus nec feugiat in fermentum posuere urna nec. Nam at lectus urna
                                    duis.
                                </Paragraph>
                                <Paragraph>
                                    Sit amet purus gravida quis blandit turpis cursus. Vulputate eu scelerisque felis
                                    imperdiet proin fermentum leo vel orci. Fusce id velit ut tortor pretium viverra
                                    suspendisse potenti.
                                </Paragraph>
                            </Card>
                        </Col>
                        <Col span={24}>
                            <Card title="Our great team">
                                <List
                                    grid={{
                                        gutter: 16,
                                        xs: 1,
                                        sm: 2,
                                        md: 3,
                                        lg: 3,
                                        xl: 3,
                                        xxl: 3,
                                    }}
                                    pagination={{
                                        onChange: (page) => {
                                            console.log(page);
                                        },
                                        pageSize: 6,
                                        align: "center"
                                    }}
                                    dataSource={EmployeesData}
                                    renderItem={(item: Employee) => (
                                        <List.Item key={item.employee_id}>
                                            <EmployeeCard data={item}/>
                                        </List.Item>
                                    )}
                                />
                            </Card>
                        </Col>
                        <Col span={24}>
                            <Card title="Our statistics">
                                <AntdCard.Grid hoverable={false} style={gridStyle}>
                                    <Title>100 %</Title>
                                    <Text>Satisfaction</Text>
                                </AntdCard.Grid>
                                <AntdCard.Grid hoverable={false} style={gridStyle}>
                                    <Title>124 K</Title>
                                    <Text>Customers</Text>
                                </AntdCard.Grid>
                                <AntdCard.Grid hoverable={false} style={gridStyle}>
                                    <Title>$24 K</Title>
                                    <Text>Worth in transactions</Text>
                                </AntdCard.Grid>
                            </Card>
                        </Col>
                    </Row>
                </Col>
                <Col sm={24} lg={8}>
                    <Row {...ROW_PROPS}>
                        <Col span={24}>
                            <Card title="Careers" actions={[<Button>Explore more</Button>]}>
                                <Text>
                                    Tortor id aliquet lectus proin nibh nisl condimentum. Semper quis lectus nulla at
                                    volutpat. Faucibus nisl tincidunt eget nullam non. Malesuada nunc vel risus commodo
                                    viverra. Lectus vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt
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
        </div>
    );
};

export default CorporateAboutPage;