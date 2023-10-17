import {CardProps, Space, Table, Typography} from "antd";
import CampaignsAdsData from "../../../../../public/mocks/CampaignAds.json";
import {Card} from "../../../index.ts";

type Props = CardProps

const TABLE_COLUMNS = [
    {
        title: 'Source',
        dataIndex: 'ad_source',
        key: 'marketing_source'
    },
    {
        title: 'Impression',
        dataIndex: 'impressions',
        key: 'marketing_impression'
    },
    {
        title: 'Cost',
        dataIndex: 'cost',
        key: 'marketing_cost'
    },
    {
        title: 'Revenue',
        dataIndex: 'revenue',
        key: 'marketing_revenue'
    },
    {
        title: 'Clicks',
        dataIndex: 'clicks',
        key: 'marketing_clicks'
    },
    {
        title: 'Conversion rate',
        dataIndex: 'conversion_rate',
        key: 'conversion_rate'
    },
    {
        title: 'ROI',
        dataIndex: 'roi',
        key: 'marketing_roi'
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
            <Table
                dataSource={CampaignsAdsData}
                columns={TABLE_COLUMNS}
                rowKey={(record) => record.id}
            />
        </Card>
    );
};

export default CampaignsAdsCard;