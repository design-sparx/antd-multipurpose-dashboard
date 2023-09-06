import {Badge, Button, Card, CardProps, Space, Table, Typography} from "antd";
import {useState} from "react";
import CampaignsData from "../../mocks/CampaignsData.json"
import {CalendarOutlined, PlusOutlined} from "@ant-design/icons";

// socials - Facebook, Instagram, Twitter, LinkedIn
// target audience - men, women, young adults, parents
// statuses - active, inactive, pending, completed, cancelled

enum Status {
    Pending = 'pending',
    Inactive = 'inactive',
    Active = 'active',
    Cancelled = 'cancelled',
    Completed = 'completed'
}

const DATA_SOURCE = CampaignsData;

const COLUMNS = [
    {
        title: 'Name',
        dataIndex: 'campaign_name',
        key: 'name',
    },
    {
        title: 'Audience',
        dataIndex: 'target_audience',
        key: 'audience',
    },
    {
        title: 'Objective',
        dataIndex: 'campaign_objective',
        key: 'objective',
    },
    {
        title: 'Platform',
        dataIndex: 'platform',
        key: 'platform',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: 'Start - End Date',
        dataIndex: 'start_date',
        key: 'status',
        render: (_: any, {start_date, end_date}: any) => (
            <Space>
                <CalendarOutlined/>
                <Typography.Text>{start_date}</Typography.Text>
                -
                <Typography.Text>{end_date}</Typography.Text>
            </Space>
        )
    },
];

const TAB_LIST = [
    {
        key: 'allCampaigns',
        label: <Space>
            <Typography.Text>All Campaigns</Typography.Text>
            <Badge color="#4650dd" count={DATA_SOURCE.length}/>
        </Space>,
    },
    {
        key: 'pending',
        label: <Space>
            <Typography.Text>Pending</Typography.Text>
            <Badge color="#4650dd" count={DATA_SOURCE.filter(_ => _.status === Status.Pending).length}/>
        </Space>,
    },
    {
        key: 'completed',
        label: <Space>
            <Typography.Text>Completed</Typography.Text>
            <Badge color="#4650dd" count={DATA_SOURCE.filter(_ => _.status === Status.Pending).length}/>
        </Space>,
    },
];

const CONTENT_LIST: Record<string, React.ReactNode> = {
    allCampaigns: <Table columns={COLUMNS} dataSource={DATA_SOURCE}/>,
    pending: <Table columns={COLUMNS} dataSource={DATA_SOURCE.filter(_ => _.status === Status.Pending) || []}/>,
    completed: <Table columns={COLUMNS} dataSource={DATA_SOURCE.filter(_ => _.status === Status.Completed) || []}/>,
};

type Props = CardProps

const CampaignsCard = ({...others}: Props) => {
    const [activeTabKey2, setActiveTabKey2] = useState<string>('allCampaigns');

    const onTab2Change = (key: string) => {
        setActiveTabKey2(key);
    };

    return (
        <Card
            style={{width: '100%'}}
            tabList={TAB_LIST}
            activeTabKey={activeTabKey2}
            tabBarExtraContent={<Button type="primary" icon={<PlusOutlined/>}>Create campaign</Button>}
            onTabChange={onTab2Change}
            {...others}
        >
            {CONTENT_LIST[activeTabKey2]}
        </Card>
    );
};

export default CampaignsCard;