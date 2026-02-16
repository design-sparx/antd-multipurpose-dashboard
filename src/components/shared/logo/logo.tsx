import { Flex, FlexProps, theme, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { CSSProperties } from 'react';

import './styles.css';

type LogoProps = {
  color: CSSProperties['color'];
  imgSize?: {
    h?: number | string;
    w?: number | string;
  };
  asLink?: boolean;
  href?: string;
  bgColor?: CSSProperties['backgroundColor'];
  showText?: boolean;
} & Partial<FlexProps>;

export const Logo = ({
  asLink,
  color,
  href,
  imgSize,
  bgColor,
  showText = true,
  ...others
}: LogoProps) => {
  const {
    token: { borderRadius },
  } = theme.useToken();

  const textNode = showText ? (
    <Typography.Title
      level={asLink ? 5 : 4}
      type="secondary"
      style={{
        color,
        margin: 0,
        padding: '4px 8px',
        backgroundColor: bgColor,
        borderRadius,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        transition: 'opacity 0.2s ease',
      }}
    >
      Antd Admin
    </Typography.Title>
  ) : null;

  const content = (
    <Flex gap={others.gap || 'small'} align="center" {...others}>
      <img
        src="/logo-no-background.png"
        alt="design sparx logo"
        height={imgSize?.h || 48}
      />
      {textNode}
    </Flex>
  );

  return asLink ? (
    <Link to={href || '#'} className="logo-link">
      {content}
    </Link>
  ) : (
    content
  );
};
