import { Badge, BadgeProps, Tag, TagProps, Typography } from 'antd';
import { AdvancedTable } from '../../../shared/advanced-table/advanced-table';
import { Projects } from '../../../../types';

const COLUMNS = [
  {
    title: 'Name',
    dataIndex: 'project_name',
    key: 'proj_name',
    sorter: true,
    render: (_: string, { project_name }: Projects) => (
      <Typography.Paragraph
        ellipsis={{ rows: 1 }}
        className="text-capitalize"
        style={{ marginBottom: 0 }}
      >
        {project_name.substring(0, 20)}
      </Typography.Paragraph>
    ),
  },
  {
    title: 'Client',
    dataIndex: 'client_name',
    key: 'proj_client_name',
    sorter: true,
  },
  {
    title: 'Category',
    dataIndex: 'project_category',
    key: 'proj_category',
    sorter: true,
    render: (_: string) => <span className="text-capitalize">{_}</span>,
  },
  {
    title: 'Priority',
    dataIndex: 'priority',
    key: 'proj_priority',
    sorter: true,
    render: (_: string) => {
      let color: TagProps['color'];

      if (_ === 'low') {
        color = 'cyan';
      } else if (_ === 'medium') {
        color = 'geekblue';
      } else {
        color = 'magenta';
      }

      return (
        <Tag color={color} className="text-capitalize">
          {_}
        </Tag>
      );
    },
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'proj_status',
    sorter: true,
    render: (_: string) => {
      let status: BadgeProps['status'];

      if (_ === 'on hold') {
        status = 'default';
      } else if (_ === 'completed') {
        status = 'success';
      } else {
        status = 'processing';
      }

      return <Badge status={status} text={_} className="text-capitalize" />;
    },
  },
  {
    title: 'Team size',
    dataIndex: 'team_size',
    key: 'proj_team_size',
    sorter: true,
  },
  {
    title: 'Duration',
    dataIndex: 'project_duration',
    key: 'project_duration',
    sorter: true,
  },
  {
    title: 'Start date',
    dataIndex: 'start_date',
    key: 'proj_start_date',
    sorter: true,
  },
];

type Props = {
  data: Projects[];
  title?: React.ReactNode;
};

export const ProjectsTable = ({ data, title }: Props) => {
  return (
    <AdvancedTable
      columns={COLUMNS}
      dataSource={data}
      rowKey="project_id"
      title={title as string}
      exportable
    />
  );
};
