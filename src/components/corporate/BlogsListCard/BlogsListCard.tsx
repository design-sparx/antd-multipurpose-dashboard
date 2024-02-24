import React, { ReactNode } from 'react';
import { Alert, Button, CardProps, List, Space, Typography } from 'antd';
import { Card } from '../../index.ts';
import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';

import './styles.css';

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

type Props = { data: any; loading?: boolean; error?: ReactNode } & CardProps;

const BlogsListCard = ({ data, loading, error, ...others }: Props) => {
  return (
    <Card
      title="Blogs"
      actions={[<Button>Explore more</Button>]}
      className="card blogs-list-card"
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
            pageSize: 3,
            align: 'center',
          }}
          dataSource={data}
          loading={loading}
          renderItem={(item: any) => (
            <List.Item
              key={item.title}
              actions={[
                <IconText
                  icon={StarOutlined}
                  text="156"
                  key="list-vertical-star-o"
                />,
                <IconText
                  icon={LikeOutlined}
                  text="156"
                  key="list-vertical-like-o"
                />,
                <IconText
                  icon={MessageOutlined}
                  text="2"
                  key="list-vertical-message"
                />,
              ]}
            >
              <Typography.Title level={5} className="m-0">
                {item.title}
              </Typography.Title>
              <Typography.Paragraph ellipsis={{ rows: 3 }} className="m-0">
                {item.content}
              </Typography.Paragraph>
            </List.Item>
          )}
        />
      )}
    </Card>
  );
};

export default BlogsListCard;
