import {
  Alert,
  Button,
  CardProps,
  Popover,
  Space,
  Table,
  TableColumnsType,
} from 'antd';
import { Card } from '../../../index.ts';
import {
  FacebookFilled,
  InstagramFilled,
  LinkedinFilled,
  QuestionCircleFilled,
  QuestionOutlined,
  TwitterCircleFilled,
} from '@ant-design/icons';
import { CampaignAds } from '../../../../types';
import { createElement, ReactNode, useEffect, useState } from 'react';
import * as _ from 'lodash';
import { numberWithCommas } from '../../../../utils';

type ParentDataType = {
  id: string;
  ad_source: string;
  items: CampaignAds[];
  total_impressions: number | string;
  total_clicks: number | string;
  total_cost: number | string;
  total_revenue: number | string;
};

type ExpandedDataType = CampaignAds;

const PARENT_TABLE_COLUMNS: TableColumnsType<ParentDataType> = [
  {
    title: 'Source',
    dataIndex: 'ad_source',
    key: 'total_marketing_source',
    render: (_) => {
      const social = _.toLowerCase();
      let icon: any;

      if (social.includes('facebook')) {
        icon = FacebookFilled;
      } else if (social.includes('linkedin')) {
        icon = LinkedinFilled;
      } else if (social.includes('twitter')) {
        icon = TwitterCircleFilled;
      } else if (social.includes('instagram')) {
        icon = InstagramFilled;
      } else {
        icon = QuestionCircleFilled;
      }

      return (
        <Space>
          {createElement(icon, { style: { fontSize: 16 } })}
          <span>{_}</span>
        </Space>
      );
    },
  },
  {
    title: 'Impressions',
    dataIndex: 'total_impressions',
    key: 'total_marketing_impression',
    render: (_: any) => <span>{numberWithCommas(Number(_))}</span>,
  },
  {
    title: 'Cost',
    dataIndex: 'total_cost',
    key: 'total_marketing_cost',
    render: (_: any) => <span>$ {numberWithCommas(Number(_))}</span>,
  },
  {
    title: 'Revenue',
    dataIndex: 'total_revenue',
    key: 'marketing_revenue',
    render: (_: any) => <span>$ {numberWithCommas(Number(_))}</span>,
  },
  {
    title: 'Clicks',
    dataIndex: 'total_clicks',
    key: 'total_marketing_clicks',
    render: (_: any) => <span>{numberWithCommas(Number(_))}</span>,
  },
];

const CHILD_TABLE_COLUMNS: TableColumnsType<ExpandedDataType> = [
  {
    title: 'Impressions',
    dataIndex: 'impressions',
    key: 'marketing_impression',
    render: (_: any) => <span>{numberWithCommas(Number(_))}</span>,
  },
  {
    title: 'Cost',
    dataIndex: 'cost',
    key: 'marketing_cost',
    render: (_: any) => <span>$ {numberWithCommas(Number(_))}</span>,
  },
  {
    title: 'Revenue',
    dataIndex: 'revenue',
    key: 'marketing_revenue',
    render: (_: any) => <span>$ {numberWithCommas(Number(_))}</span>,
  },
  {
    title: 'Clicks',
    dataIndex: 'clicks',
    key: 'marketing_clicks',
    render: (_: any) => <span>{numberWithCommas(Number(_))}</span>,
  },
  {
    title: 'Conversion rate',
    dataIndex: 'conversion_rate',
    key: 'conversion_rate',
    render: (_: any) => <span>{_}%</span>,
  },
  {
    title: 'ROI',
    dataIndex: 'roi',
    key: 'marketing_roi',
    render: (_: any) => <span>{_}%</span>,
  },
];

type ExpandedProps = { data: CampaignAds[] };

export const ExpandedRowRender = ({ data }: ExpandedProps) => {
  return (
    <Table
      columns={CHILD_TABLE_COLUMNS}
      dataSource={data}
      pagination={{
        pageSize: 5,
        position: ['bottomRight'],
      }}
    />
  );
};

type Props = {
  data?: CampaignAds[];
  loading?: boolean;
  error?: ReactNode;
} & CardProps;

export const CampaignsAdsCard = ({ error, data, ...others }: Props) => {
  const [groupedData, setGroupedData] = useState<ParentDataType[]>([]);

  useEffect(() => {
    const dd = _.chain(data)
      .groupBy('ad_source')
      .map((items: CampaignAds[], source: string) => ({
        id: source,
        ad_source: source,
        items,
        total_impressions: _.sumBy(items, 'impressions').toFixed(2),
        total_clicks: _.sumBy(items, 'clicks').toFixed(2),
        total_cost: _.sumBy(items, 'cost').toFixed(2),
        total_revenue: _.sumBy(items, 'revenue').toFixed(2),
      }))
      .value();

    setGroupedData(dd);
  }, [data]);

  return error ? (
    <Alert
      message="Error"
      description={error.toString()}
      type="error"
      showIcon
    />
  ) : (
    <Card
      title="Campaign performance by source"
      extra={
        <Popover content="Marketing data by several ads resources">
          <Button icon={<QuestionOutlined />} type="text" />
        </Popover>
      }
      {...others}
    >
      <Table
        dataSource={groupedData}
        columns={PARENT_TABLE_COLUMNS}
        rowKey={(record) => record.id}
        expandable={{
          expandedRowRender: (record) => (
            <ExpandedRowRender data={record.items} />
          ),
        }}
        className="overflow-scroll"
      />
    </Card>
  );
};
