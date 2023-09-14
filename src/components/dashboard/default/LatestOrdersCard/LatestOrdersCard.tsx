import CountryUsersData from "../../../../mocks/CountryOrders.json"
import {Card, CardProps, Table} from "antd";
import {MoreMenu} from "../../../index.ts";

enum Status {
    Pending = 'pending',
    Inactive = 'inactive',
    Active = 'active',
    Cancelled = 'cancelled',
    Completed = 'completed'
}

const DATA_SOURCE = CountryUsersData;

const COLUMNS = [
    {
        title: 'Customer name',
        dataIndex: 'customer_name',
        key: 'customer_name',
    },
    {
        title: 'Product',
        dataIndex: 'product_name',
        key: 'product_name',
    },
    {
        title: 'Orders',
        dataIndex: 'orders',
        key: 'orders',
    },
    {
        title: 'Country',
        dataIndex: 'country',
        key: 'country',
    },
    {
        title: 'Shipping address',
        dataIndex: 'shipping_address',
        key: 'shipping_address',
    }
];

type Props = CardProps

const LatestOrdersCard = ({...others}: Props) => {
    return (
        <Card title={`Latest Orders`} extra={<MoreMenu/>} {...others}>
            <Table columns={COLUMNS} dataSource={DATA_SOURCE}/>
        </Card>
    );
};

export default LatestOrdersCard;