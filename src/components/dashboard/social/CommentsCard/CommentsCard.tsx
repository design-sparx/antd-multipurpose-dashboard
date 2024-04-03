import { ReactNode } from 'react';
import {
  Alert,
  Button,
  CardProps,
  Flex,
  List,
  Space,
  Tag,
  Typography,
} from 'antd';
import {
  ArrowRightOutlined,
  CommentOutlined,
  DeleteOutlined,
  EyeOutlined,
  LikeOutlined,
} from '@ant-design/icons';
import { Comments } from '../../../../types';
import { Card, Loader, UserAvatar } from '../../../index';

import './styles.css';

type Props = {
  data?: Comments[];
  error?: ReactNode;
  loading?: boolean;
} & CardProps;

export const CommentsCard = ({ data, error, loading, ...others }: Props) => (
  <Card
    title="recent comments"
    actions={[
      <Button>
        View all <ArrowRightOutlined />
      </Button>,
    ]}
    className="comments-lists-card card"
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
      <List
        itemLayout="vertical"
        pagination={false}
        dataSource={data}
        renderItem={(item: Comments) => (
          <List.Item key={item.id}>
            <Space direction="vertical" size="small">
              <Flex justify="space-between">
                <UserAvatar
                  fullName={item.author}
                  size="middle"
                  style={{ fontWeight: 500 }}
                />
                <Tag className="text-capitalize" bordered={false}>
                  {item.activity_type}
                </Tag>
              </Flex>
              <Typography.Paragraph ellipsis={{ rows: 3 }} className="m-0">
                {item.post_content}
              </Typography.Paragraph>
              <Flex justify="space-between">
                <Space size="small">
                  <Button shape="circle" type="text">
                    <LikeOutlined />
                  </Button>
                  <Button shape="circle" type="text">
                    <CommentOutlined />
                  </Button>
                  <Button type="text" icon={<EyeOutlined />}>
                    See Post
                  </Button>
                </Space>
                <Button shape="circle" type="text" danger>
                  <DeleteOutlined />
                </Button>
              </Flex>
            </Space>
          </List.Item>
        )}
      />
    )}
  </Card>
);
