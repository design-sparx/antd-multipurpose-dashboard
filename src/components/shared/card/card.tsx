import { Card as AntdCard, CardProps } from 'antd';
import { ReactNode } from 'react';

import './styles.css';

type CardSemanticClassNames = {
  root?: string;
  header?: string;
  body?: string;
  extra?: string;
  title?: string;
  actions?: string;
  cover?: string;
};

type Props = { children: ReactNode } & CardProps;

export const Card = ({ children, classNames, ...others }: Props) => {
  return (
    <AntdCard
      classNames={
        {
          root: 'card',
          ...classNames,
        } as CardSemanticClassNames
      }
      {...others}
    >
      {children}
    </AntdCard>
  );
};
