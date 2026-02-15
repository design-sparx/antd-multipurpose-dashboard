import { Card, Skeleton, theme } from 'antd';

import './styles.css';

export const Loader = () => {
  const {
    token: { borderRadius },
  } = theme.useToken();

  return (
    <div className="loader-container" style={{ borderRadius }}>
      <Card style={{ borderRadius }}>
        <Skeleton active />
      </Card>
    </div>
  );
};
