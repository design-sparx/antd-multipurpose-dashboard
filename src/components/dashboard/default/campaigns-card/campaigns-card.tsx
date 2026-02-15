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
import CampaignsData from '@mocks/Campaigns.json';
import { Card, AdvancedTable, Loader } from '../../../index.ts';

enum Status {
  Pending = 'pending',
  Inactive = 'inactive',
  Active = 'active',
  Cancelled = 'cancelled',
  Completed = 'completed',
}

type Campaign = {
  campaign_id: string;
  campaign_name: string;
  start_date: string;
  end_date: string;
  target_audience: string;
  budget: string;
  campaign_objective: string;
  platform: string;
  impressions: number;
  clicks: number;
  status: string;
};

const DATA_SOURCE: Campaign[] = CampaignsData;

const COLUMNS = [
  {
    title: 'Name',
    dataIndex: 'campaign_name',
    key: 'name',
    sorter: true,
    render: (_: string) => <span className="text-capitalize">{_}</span>,
  },
  {
    title: 'Audience',
    dataIndex: 'target_audience',
    key: 'audience',
    sorter: true,
    render: (_: string) => <span className="text-capitalize">{_}</span>,
  },
  {
    title: 'Objective',
    dataIndex: 'campaign_objective',
    key: 'objective',
    sorter: true,
    render: (_: string) => <span className="text-capitalize">{_}</span>,
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
    render: (_: string) => {
      let color: TagProps['color'];
      if (_ === 'pending') color = 'orange';
      else if (_ === 'active') color = 'blue';
      else if (_ === 'completed') color = 'green';
      else if (_ === 'cancelled') color = 'red';
      else color = 'default';
      return (
        <Tag color={color} className="text-capitalize">
          {_}
        </Tag>
      );
    },
  },
  {
    title: 'Start - End Date',
    dataIndex: 'start_date',
    key: 'dates',
    sorter: true,
    render: (_: string, { start_date, end_date }: Campaign) => (
      <Space>
        <CalendarOutlined />
        <Typography.Text>{start_date}</Typography.Text>-
        <Typography.Text>{end_date}</Typography.Text>
      </Space>
    ),
  },
];

type Props = {
  data?: Campaign[];
  loading?: boolean;
  error?: ReactNode;
} & CardProps;

export const CampaignsCard = ({ error, data, loading, ...others }: Props) => {
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
              count={
                DATA_SOURCE.filter((c) => c.status === Status.Pending).length
              }
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
              count={
                DATA_SOURCE.filter((c) => c.status === Status.Active).length
              }
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
              count={
                DATA_SOURCE.filter((c) => c.status === Status.Pending).length
              }
            />
          )}
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const dd = data?.length > 0 ? data : DATA_SOURCE;
    if (activeTabKey !== 'allCampaigns') {
      setCampaignsData(dd.filter((c: Campaign) => c.status === activeTabKey));
    } else {
      setCampaignsData(dd);
    }
  }, [activeTabKey, data]);

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
      onTabChange={(key) => setActiveTabKey(key)}
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
          rowKey="id"
          exportable
        />
      )}
    </Card>
  );
};
