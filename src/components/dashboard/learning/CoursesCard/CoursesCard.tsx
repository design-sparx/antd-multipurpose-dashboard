import { Alert, CardProps, Space, Table, Typography } from 'antd';
import { LearningCourses } from '../../../../types';
import { SwapRightOutlined } from '@ant-design/icons';
import { ColumnsType } from 'antd/es/table';
import { Card, UserAvatar } from '../../../index.ts';
import { ReactNode } from 'react';

const COURSES_COLUMNS: ColumnsType<LearningCourses> = [
  {
    title: 'Courses Title',
    dataIndex: 'name',
    key: 'courses_title',
    render: (_: any) => <span className="text-capitalize">{_}</span>,
  },
  {
    title: 'Lessons Completed',
    dataIndex: 'current_lessons',
    key: 'current_lessons',
    render: (_: any, { current_lessons, total_lessons }: any) => (
      <Space size={2} style={{ width: 120 }}>
        <Typography.Text type="success">{current_lessons}</Typography.Text>
        <Typography.Text>/</Typography.Text>
        <Typography.Text>{total_lessons}</Typography.Text>
        <Typography.Text strong>
          ({Number(current_lessons / total_lessons).toFixed(2)}%)
        </Typography.Text>
      </Space>
    ),
  },
  {
    title: 'Duration (Start-End)',
    dataIndex: 'start_date',
    key: 'start_date',
    render: (_: any, { start_date, end_date }: any) => (
      <Space size="small" style={{ width: 200 }}>
        <Typography.Text>{start_date}</Typography.Text>
        <SwapRightOutlined />
        <Typography.Text>{end_date}</Typography.Text>
      </Space>
    ),
  },
  {
    title: 'Instructor',
    dataIndex: 'instructor_name',
    key: 'instructor_name',
    render: (_: any, { instructor_name, favorite_color }: any) => (
      <UserAvatar
        fullName={instructor_name}
        color={favorite_color}
        textWidth={120}
      />
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
        <Table
          dataSource={data}
          columns={COURSES_COLUMNS}
          loading={loading}
          className="overflow-scroll"
        />
      )}
    </Card>
  );
};
