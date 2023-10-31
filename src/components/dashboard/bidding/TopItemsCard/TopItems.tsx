import {Alert, CardProps, Flex, Image, Table, Typography} from "antd";
import {AuctionSales} from "../../../../types";
import {Card} from "../../../index.ts";
import {ReactNode} from "react";

const SALES_COLUMNS = [
    {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        render: (_: any, {image_url, owner, title}: any) => (
            <Flex align="center" gap="small">
                <Image src={image_url} height={24} width={24} preview={false}/>
                <Flex vertical style={{width: 160}}>
                    <Typography.Text strong className="text-capitalize">{title}</Typography.Text>
                    <Typography.Text type="secondary">@{owner.split(' ')[0]}</Typography.Text>
                </Flex>
            </Flex>
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
    loading: boolean
    error: ReactNode
} & CardProps

const TopItemsCard = ({data, loading, error, ...others}: Props) => {
    return (
        error ?
            <Alert
                message="Error"
                description={error.toString()}
                type="error"
                showIcon
            /> :
            <Card
                title="Top selling items"
                {...others}
            >
                <Table dataSource={data} columns={SALES_COLUMNS} loading={loading} className="overflow-scroll"/>
            </Card>
    );
};

export default TopItemsCard;