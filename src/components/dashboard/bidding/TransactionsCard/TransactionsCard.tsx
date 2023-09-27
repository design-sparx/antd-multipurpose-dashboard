import {CardProps, Table, Typography, Image, Space} from "antd";
import {AuctionTransactions} from "../../../../types";
import {SwapRightOutlined} from "@ant-design/icons";
import {Card} from "../../../index.ts";

const TRANSACTIONS_COLUMNS = [
    {
        title: 'Type',
        dataIndex: 'transaction_type',
        key: 'transaction_type'
    },
    {
        title: 'Image',
        dataIndex: 'image',
        key: 'image',
        render: (text: any, {product_id}: any) => (
            <Image src={text} alt={product_id} width={24} height={24} preview={false}/>)
    },
    {
        title: 'From/To',
        dataIndex: 'seller',
        key: 'from_to',
        render: (_: any, {buyer, seller, profit}: any) => <Space>
            <Typography.Text>{seller}</Typography.Text>
            <SwapRightOutlined style={{color: profit > 0 ? 'green' : 'red'}}/>
            <Typography.Text>{buyer}</Typography.Text>
        </Space>
    },
    {
        title: 'Profit',
        dataIndex: 'profit',
        key: 'profit',
        render: (_: any, {profit}: any) => <Typography.Text>{profit}</Typography.Text>
    },
    {
        title: 'Value',
        dataIndex: 'purchase_price',
        key: 'purchase_price',
        render: (text: any) => <Typography.Text>${text}</Typography.Text>
    },
    {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
    },
    {
        title: 'Date',
        dataIndex: 'transaction_date',
        key: 'transaction_date',
    }
]

type Props = {
    data: AuctionTransactions[]
} & CardProps

const TransactionsCard = ({data, ...others}: Props) => {
    return (
        <Card
            title="Recent transactions"
            {...others}
        >
            <Table dataSource={data} columns={TRANSACTIONS_COLUMNS}/>
        </Card>
    );
};

export default TransactionsCard;