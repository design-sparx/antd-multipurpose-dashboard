import React, { ReactNode } from 'react';
import { Divider, Space, Typography } from 'antd';

import './styles.css';

type Props = {
  title: string;
  extra?: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export const PageHeader = ({ title, extra, ...others }: Props) => {
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
      </Space>
      <Divider titlePlacement="end" plain>
        <span style={{ textTransform: 'capitalize' }}>{title}</span>
      </Divider>
    </div>
  );
};
