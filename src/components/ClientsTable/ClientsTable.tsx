import {Table, Typography} from "antd";
import {Clients} from "../../types";

const COLUMNS = [
    {
        title: 'Client Name',
        dataIndex: 'client_name',
        key: 'client_name',
        render: (_: any, {first_name, last_name}: Clients) => <Typography.Text>{first_name} {last_name}</Typography.Text>
    },
    {
        title: 'Amount',
        dataIndex: 'total_price',
        key: 'amount',
    },
];

type Props = {
    data: Clients[]
}

const ClientsTable = ({data}: Props) => {
    return (
        <Table dataSource={data} columns={COLUMNS}/>
    );
};

export default ClientsTable;