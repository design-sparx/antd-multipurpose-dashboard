import {
  Alert,
  Avatar,
  Button,
  CardProps,
  Col,
  Divider,
  Flex,
  Image,
  List,
  Row,
  Space,
  theme,
  Typography,
} from 'antd';
import { Posts } from '../../../../types';
import {
  CommentOutlined,
  DeleteFilled,
  EditFilled,
  LikeOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import React, { ReactNode } from 'react';
import { getNameInitials } from '../../../../utils';
import { Card, Loader } from '../../../index.ts';

import './styles.css';

const IconText = ({
  icon,
  text,
}: {
  icon: React.FC;
  text: string | number;
}) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

type Props = {
  as: 'scheduled' | 'active';
  data?: Posts[];
  loading?: boolean;
  error?: ReactNode;
} & CardProps;

export const PostsCard = ({ as, data, error, loading, ...others }: Props) => {
  const { token } = theme.useToken();

  return (
    <Card className="posts-lists-card card" {...others}>
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
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 5,
            align: 'center',
          }}
          dataSource={data}
          renderItem={(item: Posts) =>
            as === 'active' ? (
              <List.Item
                key={item.title}
                actions={[
                  <IconText
                    icon={LikeOutlined}
                    text={item.likes_count}
                    key="list-vertical-star-o"
                  />,
                  <IconText
                    icon={CommentOutlined}
                    text={item.comments_count}
                    key="list-vertical-like-o"
                  />,
                  <IconText
                    icon={ShareAltOutlined}
                    text={item.shares_count}
                    key="list-vertical-message"
                  />,
                ]}
                extra={<img width={32} alt="logo" src={item.image_url} />}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar style={{ backgroundColor: token.colorPrimary }}>
                      {getNameInitials(item.author)}
                    </Avatar>
                  }
                  title={
                    <Typography.Link style={{ textTransform: 'capitalize' }}>
                      {item.title.slice(0, 30)}...
                    </Typography.Link>
                  }
                  description={
                    <Space>
                      <Typography.Text>{item.category}</Typography.Text>
                      <Divider type="vertical" />
                      <Typography.Text>{item.date}</Typography.Text>
                      <Divider type="vertical" />
                      <Typography.Text>{item.location}</Typography.Text>
                    </Space>
                  }
                />
                <Typography.Paragraph ellipsis={{ rows: 3 }}>
                  {item.content}
                </Typography.Paragraph>
              </List.Item>
            ) : (
              <List.Item key={item.title}>
                <Row gutter={[8, 8]}>
                  <Col span={2}>
                    <Flex
                      justify="center"
                      align="center"
                      style={{ height: '100%' }}
                    >
                      <Image
                        src={item.image_url}
                        width={24}
                        height={24}
                        alt={item.title}
                        placeholder={true}
                        preview={false}
                      />
                    </Flex>
                  </Col>
                  <Col span={20}>
                    <Flex vertical gap="small">
                      <Typography.Text strong className="text-capitalize m-0">
                        {item.title.slice(0, 50)}...
                      </Typography.Text>
                      <Flex vertical gap="small">
                        <Flex gap="small">
                          <Typography.Text>Category:</Typography.Text>
                          <Typography.Text>{item.category}</Typography.Text>
                        </Flex>
                        <Flex gap="small">
                          <Typography.Text>Posting date:</Typography.Text>
                          <Typography.Text>
                            {item.date} - {item.time}:00h
                          </Typography.Text>
                        </Flex>
                      </Flex>
                    </Flex>
                  </Col>
                  <Col span={2}>
                    <Flex vertical align="flex-end" gap="middle">
                      <Button shape="circle">
                        <EditFilled />
                      </Button>
                      <Button shape="circle">
                        <DeleteFilled />
                      </Button>
                    </Flex>
                  </Col>
                </Row>
              </List.Item>
            )
          }
        />
      )}
    </Card>
  );
};
