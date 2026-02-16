import { Alert, CardProps, Space, Typography } from 'antd';
import { LearningCourses } from '../../../../types';
import { SwapRightOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { Card, UserAvatar, AdvancedTable } from '../../../index.ts';
import { ReactNode } from 'react';

const COURSES_COLUMNS: ColumnsType<LearningCourses> = [
  {
    title: 'Courses Title',
    dataIndex: 'name',
    key: 'courses_title',
    render: (value: string) => <span className="text-capitalize">{value}</span>,
  },
  {
    title: 'Lessons Completed',
    dataIndex: 'current_lessons',
    key: 'current_lessons',
    render: (_: unknown, record: LearningCourses) => (
      <Space size={2} style={{ width: 120 }}>
        <Typography.Text type="success">
          {record.current_lessons}
        </Typography.Text>
        <Typography.Text>/</Typography.Text>
        <Typography.Text>{record.total_lessons}</Typography.Text>
        <Typography.Text strong>
          ({Number(record.current_lessons / record.total_lessons).toFixed(2)}%)
        </Typography.Text>
      </Space>
    ),
  },
  {
    title: 'Duration (Start-End)',
    dataIndex: 'start_date',
    key: 'start_date',
    render: (_: unknown, record: LearningCourses) => (
      <Space size="small" style={{ width: 200 }}>
        <Typography.Text>{record.start_date}</Typography.Text>
        <SwapRightOutlined />
        <Typography.Text>{record.end_date}</Typography.Text>
      </Space>
    ),
  },
  {
    title: 'Instructor',
    dataIndex: 'instructor_name',
    key: 'instructor_name',
    render: (_: unknown, record: LearningCourses) => (
      <UserAvatar fullName={record.instructor_name} textWidth={120} />
    ),
  },
  {
    title: 'Prerequisites',
    dataIndex: 'prerequisites',
    key: 'prerequisites',
  },
];

type Props = {
  data?: LearningCourses[];
  loading?: boolean;
  error?: ReactNode;
} & CardProps;

export const CoursesCard = ({ data, loading, error, ...others }: Props) => {
  return (
    <Card title="My courses" {...others}>
      {error ? (
        <Alert
          message="Error"
          description={error.toString()}
          type="error"
          showIcon
        />
      ) : (
        <AdvancedTable
          dataSource={data || []}
          columns={COURSES_COLUMNS}
          loading={loading}
          rowKey="id"
          exportable
        />
      )}
    </Card>
  );
};
