import React, { ReactNode } from 'react';
import { Breadcrumb, BreadcrumbProps, Divider, Space, Typography } from 'antd';

import './styles.css';

type Props = {
  title: string;
  breadcrumbs: BreadcrumbProps['items'];
  extra?: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const PageHeader = ({ breadcrumbs, title, extra, ...others }: Props) => {
  return (
    <div {...others}>
      <Space orientation="vertical" size="small" style={{ width: '100%' }}>
        <Space style={{ width: '100%', justifyContent: 'space-between' }}>
          <Typography.Title
            level={4}
            style={{ padding: 0, margin: 0, textTransform: 'capitalize' }}
          >
            {title}
          </Typography.Title>
          {extra}
        </Space>
        <Breadcrumb items={breadcrumbs} className="page-header-breadcrumbs" />
      </Space>
      <Divider titlePlacement="end" plain>
        <span style={{ textTransform: 'capitalize' }}>{title}</span>
      </Divider>
    </div>
  );
};
