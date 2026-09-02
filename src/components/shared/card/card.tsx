import { Card as AntdCard, CardProps, theme } from 'antd';
import { ReactNode } from 'react';

type Props = { children: ReactNode } & CardProps;

export const Card = ({ children, style, ...others }: Props) => {
  const { token } = theme.useToken();

  return (
    <AntdCard
      style={{ borderRadius: token.borderRadius, ...style }}
      {...others}
    >
      {children}
    </AntdCard>
  );
};
