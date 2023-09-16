import {Card, CardProps, Image, Progress, Space, Table, Typography} from "antd";
import CampaignsAdsData from "../../../../mocks/CampaignAds.json";

type Props = CardProps

const TABLE_COLUMNS = [
    {
        title: 'Source',
        dataIndex: 'ad_source',
        key: 'source'
    },
    {
        title: 'Impression',
        dataIndex: 'impressions',
        key: 'impression'
    },
    {
        title: 'Cost',
        dataIndex: 'cost',
        key: 'cost'
    },
    {
        title: 'Revenue',
        dataIndex: 'revenue',
        key: 'revenue'
    },
    {
        title: 'Clicks',
        dataIndex: 'clicks',
        key: 'clicks'
    },
    {
        title: 'Conversion rate',
        dataIndex: 'conversion_rate',
        key: 'conversion_rate'
    },
    {
        title: 'ROI',
        dataIndex: 'roi',
        key: 'roi'
    },
]

const CampaignsAdsCard = ({...others}: Props) => {
    return (
        <Card
            title={
                <Space direction="vertical">
                    <Typography.Title level={5}>Campaign performance by source</Typography.Title>
                    <Typography.Text>Marketing data by several ads resources</Typography.Text>
                </Space>
            }
            {...others}
        >
            <Table dataSource={CampaignsAdsData} columns={TABLE_COLUMNS}/>
        </Card>
    );
};

export default CampaignsAdsCard;