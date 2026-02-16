import {
  Alert,
  Badge,
  Button,
  CardProps,
  Space,
  Spin,
  Tag,
  TagProps,
  theme,
  Typography,
} from 'antd';
import { ReactNode, useEffect, useState } from 'react';
import { CalendarOutlined, PlusOutlined } from '@ant-design/icons';
import { blue, green, orange } from '@ant-design/colors';
import { ColumnsType } from 'antd/es/table';
import CampaignsData from '@mocks/Campaigns.json';
import { Card, AdvancedTable, Loader } from '../../../index.ts';

type Campaign = {
  campaign_id: string;
  campaign_name: string;
  start_date: string;
  end_date: string;
  target_audience: string;
  budget: number;
  campaign_objective: string;
  platform: string;
  impressions: number;
  clicks: number;
  status: string;
};

const DATA_SOURCE: Campaign[] = CampaignsData as Campaign[];

const COLUMNS: ColumnsType<Campaign> = [
  {
    title: 'Name',
    dataIndex: 'campaign_name',
    key: 'name',
    sorter: true,
    render: (value: string) => <span className="text-capitalize">{value}</span>,
  },
  {
    title: 'Audience',
    dataIndex: 'target_audience',
    key: 'audience',
    sorter: true,
    render: (value: string) => <span className="text-capitalize">{value}</span>,
  },
  {
    title: 'Objective',
    dataIndex: 'campaign_objective',
    key: 'objective',
    sorter: true,
    render: (value: string) => <span className="text-capitalize">{value}</span>,
  },
  {
    title: 'Platform',
    dataIndex: 'platform',
    key: 'platform',
    sorter: true,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    sorter: true,
    render: (value: string) => {
      let color: TagProps['color'];
      if (value === 'pending') color = 'orange';
      else if (value === 'active') color = 'blue';
      else if (value === 'completed') color = 'green';
      else if (value === 'cancelled') color = 'red';
      else color = 'default';
      return (
        <Tag color={color} className="text-capitalize">
          {value}
        </Tag>
      );
    },
  },
  {
    title: 'Start - End Date',
    dataIndex: 'start_date',
    key: 'dates',
    sorter: true,
    render: (value: string, record: Campaign) => (
      <Space>
        <CalendarOutlined />
        <Typography.Text>{value}</Typography.Text>-
        <Typography.Text>{record.end_date}</Typography.Text>
      </Space>
    ),
  },
];

type Props = {
  data?: Campaign[];
  loading?: boolean;
  error?: ReactNode;
} & CardProps;

export const CampaignsCard = ({ error, loading, ...others }: Props) => {
  const { token } = theme.useToken();
  const [activeTabKey, setActiveTabKey] = useState<string>('allCampaigns');
  const [campaignsData, setCampaignsData] = useState<Campaign[]>([]);

  const TAB_LIST = [
    {
      key: 'allCampaigns',
      label: (
        <Space>
          <Typography.Text>All Campaigns</Typography.Text>
          {loading ? (
            <Spin size="small" />
          ) : (
            <Badge color={token.colorPrimary} count={DATA_SOURCE.length} />
          )}
        </Space>
      ),
    },
    {
      key: 'pending',
      label: (
        <Space>
          <Typography.Text>Pending</Typography.Text>
          {loading ? (
            <Spin size="small" />
          ) : (
            <Badge
              color={orange[5]}
              count={DATA_SOURCE.filter((c) => c.status === 'pending').length}
            />
          )}
        </Space>
      ),
    },
    {
      key: 'active',
      label: (
        <Space>
          <Typography.Text>Active</Typography.Text>
          {loading ? (
            <Spin size="small" />
          ) : (
            <Badge
              color={blue[5]}
              count={DATA_SOURCE.filter((c) => c.status === 'active').length}
            />
          )}
        </Space>
      ),
    },
    {
      key: 'completed',
      label: (
        <Space>
          <Typography.Text>Completed</Typography.Text>
          {loading ? (
            <Spin size="small" />
          ) : (
            <Badge
              color={green[6]}
              count={DATA_SOURCE.filter((c) => c.status === 'completed').length}
            />
          )}
        </Space>
      ),
    },
  ];

  useEffect(() => {
    if (activeTabKey !== 'allCampaigns') {
      setCampaignsData(DATA_SOURCE.filter((c) => c.status === activeTabKey));
    } else {
      setCampaignsData(DATA_SOURCE);
    }
  }, [activeTabKey]);

  return (
    <Card
      style={{ width: '100%' }}
      tabList={TAB_LIST}
      activeTabKey={activeTabKey}
      tabBarExtraContent={
        <Button type="primary" icon={<PlusOutlined />}>
          Create campaign
        </Button>
      }
      onTabChange={setActiveTabKey}
      {...others}
    >
      {error ? (
        <Alert
          message="Error"
          description={error.toString()}
          type="error"
          showIcon
        />
      ) : loading ? (
        <Loader />
      ) : (
        <AdvancedTable
          columns={COLUMNS}
          dataSource={campaignsData}
          rowKey="campaign_id"
          exportable
        />
      )}
    </Card>
  );
};
