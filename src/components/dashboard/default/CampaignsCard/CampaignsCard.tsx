import {
  Alert,
  Badge,
  Button,
  Card,
  CardProps,
  Space,
  Spin,
  Table,
  Tag,
  TagProps,
  theme,
  Typography,
} from 'antd';
import { ReactNode, useEffect, useState } from 'react';
import { CalendarOutlined, PlusOutlined } from '@ant-design/icons';
import { blue, green, orange } from '@ant-design/colors';
import CampaignsData from '../../../../../public/mocks/Campaigns.json';
import { Loader } from '../../../index.ts';

// socials - Facebook, Instagram, Twitter, LinkedIn
// target audience - men, women, young adults, parents
// statuses - active, inactive, pending, completed, cancelled

enum Status {
  Pending = 'pending',
  Inactive = 'inactive',
  Active = 'active',
  Cancelled = 'cancelled',
  Completed = 'completed',
}

const DATA_SOURCE = CampaignsData;

const COLUMNS = [
  {
    title: 'Name',
    dataIndex: 'campaign_name',
    key: 'name',
    render: (_: any) => <span className="text-capitalize">{_}</span>,
  },
  {
    title: 'Audience',
    dataIndex: 'target_audience',
    key: 'audience',
    render: (_: any) => <span className="text-capitalize">{_}</span>,
  },
  {
    title: 'Objective',
    dataIndex: 'campaign_objective',
    key: 'objective',
    render: (_: any) => <span className="text-capitalize">{_}</span>,
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
    render: (_: any) => {
      let color: TagProps['color'];

      if (_ === 'pending') {
        color = 'orange';
      } else if (_ === 'active') {
        color = 'blue';
      } else if (_ === 'completed') {
        color = 'green';
      } else if (_ === 'cancelled') {
        color = 'red';
      } else {
        color = 'default';
      }

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
    key: 'status',
    render: (_: any, { start_date, end_date }: any) => (
      <Space>
        <CalendarOutlined />
        <Typography.Text>{start_date}</Typography.Text>-
        <Typography.Text>{end_date}</Typography.Text>
      </Space>
    ),
  },
];

type Props = { data?: any; loading?: boolean; error?: ReactNode } & CardProps;

const CampaignsCard = ({ error, data, loading, ...others }: Props) => {
  const {
    token: { colorPrimary },
  } = theme.useToken();
  const [activeTabKey, setActiveTabKey] = useState<string>('allCampaigns');
  const [campaignsData, setCampaignsData] = useState<any>([]);

  const TAB_LIST = [
    {
      key: 'allCampaigns',
      label: (
        <Space>
          <Typography.Text>All Campaigns</Typography.Text>
          {loading ? (
            <Spin size="small" />
          ) : (
            <Badge color={colorPrimary} count={DATA_SOURCE.length} />
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
                DATA_SOURCE.filter((_: any) => _.status === Status.Pending)
                  .length
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
                DATA_SOURCE.filter((_: any) => _.status === Status.Active)
                  .length
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
                DATA_SOURCE.filter((_: any) => _.status === Status.Pending)
                  .length
              }
            />
          )}
        </Space>
      ),
    },
  ];

  const onTabChange = (key: string) => {
    setActiveTabKey(key);
  };

  useEffect(() => {
    const dd = data.length > 0 ? data : DATA_SOURCE;
    if (activeTabKey !== 'allCampaigns') {
      setCampaignsData(dd.filter((_: any) => _.status === activeTabKey));
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
      onTabChange={onTabChange}
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
        <Table columns={COLUMNS} dataSource={campaignsData} />
      )}
    </Card>
  );
};

export default CampaignsCard;
