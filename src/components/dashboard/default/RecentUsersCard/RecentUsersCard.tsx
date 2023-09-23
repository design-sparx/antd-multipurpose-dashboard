import ChannelUsersData from "../../../../mocks/ChannelUsers.json"
import {Card, CardProps, Table, Typography} from "antd";
import {MoreMenu} from "../../../index.ts";

const DATA_SOURCE = ChannelUsersData;

const COLUMNS = [
    {
        title: 'Names',
        dataIndex: 'first_name',
        key: 'name',
        render: (_: any, {first_name, last_name}: any) => (
            <Typography.Text>{first_name}{' '}{last_name}</Typography.Text>
        )
    },
    {
        title: 'Gender',
        dataIndex: 'gender',
        key: 'gender',
    },
    {
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
    },
    {
        title: 'Birth date',
        dataIndex: 'birthdate',
        key: 'birthdate',
    },
];

type Props = CardProps

const RecentUsersCard = ({...others}: Props) => {
    return (
        <Card title={`Recent Users`} extra={<MoreMenu/>} {...others}>
            <Table columns={COLUMNS} dataSource={DATA_SOURCE}/>
        </Card>
    );
};

export default RecentUsersCard;