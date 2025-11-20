import { Switch, Tooltip, Tag, Flex } from 'antd';
import { DatabaseOutlined, ApiOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDataMode } from '../../redux/dataMode/dataModeSlice';
import { RootState } from '../../redux/store';

type DataModeToggleProps = {
  showLabel?: boolean;
  size?: 'small' | 'default';
};

export const DataModeToggle = ({
  showLabel = false,
  size = 'default',
}: DataModeToggleProps) => {
  const dispatch = useDispatch();
  const { useMockData } = useSelector((state: RootState) => state.dataMode);

  const handleToggle = () => {
    dispatch(toggleDataMode());
  };

  return (
    <Flex align="center" gap="small">
      {showLabel && (
        <Tag color={useMockData ? 'orange' : 'green'} style={{ margin: 0 }}>
          {useMockData ? 'Demo Mode' : 'Live Mode'}
        </Tag>
      )}
      <Tooltip
        title={
          useMockData
            ? 'Switch to Live API (Real Data)'
            : 'Switch to Demo Mode (Mock Data)'
        }
      >
        <Switch
          checkedChildren={
            <Flex align="center" gap={4}>
              <DatabaseOutlined />
              {size === 'default' && <span>Demo</span>}
            </Flex>
          }
          unCheckedChildren={
            <Flex align="center" gap={4}>
              <ApiOutlined />
              {size === 'default' && <span>Live</span>}
            </Flex>
          }
          checked={useMockData}
          onChange={handleToggle}
        />
      </Tooltip>
    </Flex>
  );
};

export default DataModeToggle;
