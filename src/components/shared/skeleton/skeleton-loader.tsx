import { Card, Skeleton, SkeletonProps, theme } from 'antd';

import './styles.css';

type SkeletonLoaderProps = {
  variant?: 'card' | 'table' | 'paragraph';
  active?: boolean;
} & Omit<SkeletonProps, 'variant'>;

export const SkeletonLoader = ({
  variant = 'card',
  active = true,
  ...props
}: SkeletonLoaderProps) => {
  const { token } = theme.useToken();

  if (variant === 'table') {
    return (
      <div className="skeleton-table">
        <Skeleton.Input active={active} style={{ width: '100%', height: 40 }} />
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton.Input
            key={i}
            active={active}
            style={{ width: '100%', height: 48, marginTop: 8 }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'paragraph') {
    return (
      <div className="skeleton-paragraph">
        <Skeleton.Input active={active} style={{ width: '30%', height: 20 }} />
        <Skeleton.Input
          active={active}
          style={{ width: '100%', height: 16, marginTop: 12 }}
        />
        <Skeleton.Input
          active={active}
          style={{ width: '100%', height: 16, marginTop: 8 }}
        />
        <Skeleton.Input
          active={active}
          style={{ width: '70%', height: 16, marginTop: 8 }}
        />
      </div>
    );
  }

  return (
    <Card style={{ borderRadius: token.borderRadius }}>
      <Skeleton active={active} {...props} />
    </Card>
  );
};
