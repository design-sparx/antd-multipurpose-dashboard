import React from 'react';
import { Breadcrumb, BreadcrumbProps, Divider, Space, Typography } from 'antd';

import './styles.css';

type Props = {
  title: string;
  breadcrumbs: BreadcrumbProps['items'];
} & React.HTMLAttributes<HTMLDivElement>;

const PageHeader = ({ breadcrumbs, title, ...others }: Props) => {
  return (
    <div {...others}>
      <Space direction="vertical" size="small">
        <Typography.Title
          level={4}
          style={{ padding: 0, margin: 0, textTransform: 'capitalize' }}
        >
          {title}
        </Typography.Title>
        <Breadcrumb items={breadcrumbs} className="page-header-breadcrumbs" />
      </Space>
      <Divider orientation="right" plain>
        <span style={{ textTransform: 'capitalize' }}>{title}</span>
      </Divider>
    </div>
  );
};

export default PageHeader;
