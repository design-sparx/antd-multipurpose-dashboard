import { Switch, Tooltip, Tag, Flex } from 'antd';
import { DatabaseOutlined, ApiOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';
import { toggleDataMode } from '../../redux/dataMode/dataModeSlice';
import { setLoginModalOpen } from '../../redux/auth/authSlice';
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
  const queryClient = useQueryClient();
  const { useMockData } = useSelector((state: RootState) => state.dataMode);
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const handleToggle = () => {
    console.log('[DataModeToggle] Toggle clicked:', {
      currentMode: useMockData ? 'Mock' : 'Live',
      isAuthenticated,
      willToggle: !(useMockData && !isAuthenticated),
    });

    // If switching from mock to live mode, check authentication
    if (useMockData && !isAuthenticated) {
      console.log('[DataModeToggle] Blocked: User not authenticated, showing login modal');
      // Show login modal
      dispatch(setLoginModalOpen(true));
      return;
    }

    console.log('[DataModeToggle] Dispatching toggleDataMode action');
    // Toggle the data mode
    dispatch(toggleDataMode());

    // CRITICAL: Invalidate all React Query caches to refetch data with new mode
    console.log('[DataModeToggle] Invalidating all queries to refetch with new data mode');
    queryClient.invalidateQueries();
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
