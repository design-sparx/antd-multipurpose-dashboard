import {Button, CardProps, Table, Typography} from "antd";
import {TruckDelivery} from "../../../../types";
import {useState} from "react";
import {ColumnsType} from "antd/es/table";
import {Card} from "../../../index.ts";

type TabKeys = "all" | "in transit" | "delayed" | "delivered" | string

type TabList = { key: TabKeys, tab: string }[]

const TAB_LIST: TabList = [
    {
        key: 'all',
        tab: 'All',
    },
    {
        key: 'in transit',
        tab: 'In Transit',
    },
    {
        key: 'delivered',
        tab: 'Delivered',
    },
    {
        key: 'delayed',
        tab: 'Delayed',
    },
];

const DELIVERY_TABLE_COLUMNS: ColumnsType<TruckDelivery> = [
    {
        title: 'Id',
        dataIndex: 'shipment_id',
        key: 'shipment_id',
        render: (text: any) => <Typography.Text>{text.split("-")[0]}</Typography.Text>
    },
    {
        title: 'Destination',
        dataIndex: 'destination_city',
        key: 'destination'
    },
    {
        title: 'Customer',
        dataIndex: 'customer_name',
        key: 'customer_name'
    },
    {
        title: 'Driver',
        dataIndex: 'driver_name',
        key: 'driver_name'
    },
    {
        title: 'Driver',
        dataIndex: 'driver_name',
        key: 'driver_name'
    },
    {
        title: 'Status',
        dataIndex: 'delivery_status',
        key: 'delivery_status'
    },
    {
        title: 'Cost',
        dataIndex: 'shipment_cost',
        key: 'shipment_cost'
    },
    {
        title: 'Delivery date',
        dataIndex: 'shipment_date',
        key: 'shipment_date'
    },
]

type DeliveryTableProps = {
    data: TruckDelivery[]
}

const DeliveryTable = ({data}: DeliveryTableProps) => {
    return (
        <Table dataSource={data} columns={DELIVERY_TABLE_COLUMNS}/>
    )
}

type Props = {
    data: TruckDelivery[]
} & CardProps

const DeliveryTableCard = ({data, ...others}: Props) => {
    const [activeTabKey, setActiveTabKey] = useState<TabKeys>('all');

    const onTabChange = (key: string) => {
        setActiveTabKey(key);
    };

    return (
        <Card
            title="Deliveries"
            extra={<Button>See all</Button>}
            tabList={TAB_LIST}
            activeTabKey={activeTabKey}
            onTabChange={onTabChange}
            {...others}
        >
            <DeliveryTable
                data={activeTabKey !== "all" ? data.filter(d => d.delivery_status.toLowerCase() === activeTabKey) : data}
            />
        </Card>
    );
};

export default DeliveryTableCard;