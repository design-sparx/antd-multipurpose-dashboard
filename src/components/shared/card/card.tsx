import { Card as AntdCard, CardProps } from 'antd';
import { ReactNode } from 'react';
import { useDesignStyle } from '../../../hooks/useDesignStyle';

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

export const Card = ({ children, classNames, style, ...others }: Props) => {
  const { tokens, styleName } = useDesignStyle();

  const designStyle: React.CSSProperties =
    styleName === 'clean'
      ? {}
      : {
          background: tokens.surfaceBg,
          border: tokens.border,
          boxShadow: tokens.shadow,
          backdropFilter: tokens.backdropFilter,
          WebkitBackdropFilter: tokens.backdropFilter,
          transition: 'box-shadow 0.25s ease, transform 0.2s ease',
        };

  return (
    <AntdCard
      classNames={
        {
          root: `card design-style-${styleName}`,
          ...classNames,
        } as CardSemanticClassNames
      }
      style={{ ...designStyle, ...style }}
      {...others}
    >
      {children}
    </AntdCard>
  );
};
