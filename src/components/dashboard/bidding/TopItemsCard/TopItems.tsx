import {Card, CardProps, Image, Space, Table, Typography} from "antd";
import {AuctionSales} from "../../../../types";

const SALES_COLUMNS = [
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        render: (_: any, {image_url, owner, title}: any) => (
            <Space>
                <Image src={image_url} height={24} width={24} preview={false}/>
                <Space direction="vertical" size={0}>
                    <Typography.Text strong>{title}</Typography.Text>
                    <Typography.Text type="secondary">@{owner.split(' ')[0]}</Typography.Text>
                </Space>
            </Space>
        )
    },
    {
        title: 'Sales count',
        dataIndex: 'volume',
        key: 'sales_count',
    },
    {
        title: 'Price',
        dataIndex: 'price',
        key: 'price',
        render: (text: any) => <Typography.Text>${text}</Typography.Text>
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: 'Collection',
        dataIndex: 'collection',
        key: 'collection',
    },
    {
        title: 'Owners',
        dataIndex: 'owners_count',
        key: 'owners_count',
    },
]

type Props = {
    data: AuctionSales[]
} & CardProps

const TopItemsCard = ({data, ...others}: Props) => {
    return (
        <Card
            title="Top selling items"
            {...others}
        >
            <Table dataSource={data} columns={SALES_COLUMNS}/>
        </Card>
    );
};

export default TopItemsCard;