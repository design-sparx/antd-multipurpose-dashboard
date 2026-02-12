import { Spin, theme } from 'antd';

import './styles.css';

export const Loader = () => {
  const {
    token: { borderRadius },
  } = theme.useToken();

  return (
    <div className="loader-container" style={{ borderRadius }}>
      <Spin tip="Loading">
        <div className="content" />
      </Spin>
    </div>
  );
};
