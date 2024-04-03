import { Card as AntdCard, CardProps } from 'antd';
import { ReactNode } from 'react';

import './styles.css';

type Props = { children: ReactNode } & CardProps;

export const Card = ({ children, ...others }: Props) => {
  return (
    <AntdCard className="card" {...others}>
      {children}
    </AntdCard>
  );
};
