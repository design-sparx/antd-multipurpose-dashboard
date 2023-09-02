import CompanyUsersData from "../../mocks/CompanyUsers.json"
import {Card, CardProps, Divider, Progress, Space, Typography} from "antd";
import {MoreMenu} from "../index.ts";
import _ from "lodash";

type Props = CardProps

const CompanyUsersStats = ({...others}: Props) => {
    return (
        <Card title={`Users per company`} extra={<MoreMenu/>} {...others}>
            <Typography.Title level={3} style={{marginTop: 0, marginBottom: '1rem'}}>Total users
                - {_.sumBy(CompanyUsersData, 'users')}</Typography.Title>
            <Space direction="vertical" style={{width: '100%'}}>
                {CompanyUsersData.map(_ => (
                    <div>
                        <Space key={_.id} style={{width: '100%', justifyContent: 'space-between'}}>
                            <Typography.Text>{_.company}</Typography.Text>
                            <Progress
                                percent={_.percentage}
                                style={{width: '200px'}}
                            />
                        </Space>
                        <Divider style={{margin: '.5rem 0'}}/>
                    </div>
                ))}
            </Space>
        </Card>
    );
};

export default CompanyUsersStats;