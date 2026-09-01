import { Flex, theme, Typography } from 'antd';
import { Link } from 'react-router-dom';

import './styles.css';

type LogoProps = {
  color?: string;
  bgColor?: string;
  imgSrc?: string;
  imgAlt?: string;
  brandName?: string;
  imgHeight?: number;
  asLink?: boolean;
  href?: string;
  showText?: boolean;
};

const DEFAULT_BRAND = 'Antd Admin';
const DEFAULT_IMG = '/logo-no-background.png';

export const Logo = ({
  color,
  bgColor,
  imgSrc = DEFAULT_IMG,
  imgAlt = 'logo',
  brandName = DEFAULT_BRAND,
  imgHeight = 48,
  asLink,
  href,
  showText = true,
}: LogoProps) => {
  const { token } = theme.useToken();

  const content = (
    <Flex gap="small" align="center">
      <img src={imgSrc} alt={imgAlt} height={imgHeight} />
      {showText && (
        <Typography.Text
          strong
          ellipsis
          style={{
            color: color ?? token.colorPrimary,
            backgroundColor: bgColor,
            padding: '4px 8px',
            borderRadius: token.borderRadius,
            transition: 'opacity 0.2s ease',
          }}
        >
          {brandName}
        </Typography.Text>
      )}
    </Flex>
  );

  if (!asLink) return content;
  return (
    <Link to={href ?? '/'} className="logo-link">
      {content}
    </Link>
  );
};
