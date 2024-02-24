import { Alert, Button, CardProps, Flex, List, Typography } from 'antd';
import { Exam } from '../../../../types';
import { RightOutlined } from '@ant-design/icons';

import './styles.css';
import { Card } from '../../../index.ts';
import { ReactNode } from 'react';
import { useMediaQuery } from 'react-responsive';

type Props = {
  data?: Exam[];
  loading?: boolean;
  error?: ReactNode;
} & CardProps;

const ExamsCard = ({ data, loading, error, ...others }: Props) => {
  const isLarge = useMediaQuery({ maxWidth: 1024 });

  return (
    <Card
      title="Upcoming Exams"
      className="exam-card card"
      actions={[<Button>See all upcoming exams</Button>]}
      {...others}
    >
      {error ? (
        <Alert
          message="Error"
          description={error.toString()}
          type="error"
          showIcon
        />
      ) : (
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 5,
            align: 'center',
          }}
          dataSource={data}
          renderItem={(item) => (
            <List.Item key={item.student_id}>
              <Flex align="center" justify="space-between">
                <Flex vertical={!isLarge} gap={!isLarge ? 'small' : 'middle'}>
                  <Typography.Title level={5} style={{ margin: 0 }}>
                    {item.course} - {item.course_code}
                  </Typography.Title>
                  <Typography.Text>Date: {item.exam_date}</Typography.Text>
                  <Typography.Text>
                    Duration: {item.exam_duration} mins
                  </Typography.Text>
                </Flex>
                <Button size="small" icon={<RightOutlined />} type="link" />
              </Flex>
            </List.Item>
          )}
          loading={loading}
        />
      )}
    </Card>
  );
};

export default ExamsCard;
