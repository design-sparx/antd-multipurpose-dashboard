import { TimelineCard } from '../../components';
import { useTimeline } from '../../lib/queries';

export const UserProfileActivityPage = () => {
  // Fetch timeline activity data with proper typing
  const {
    data: timelineDataRaw,
    isLoading: timelineDataLoading,
    error: timelineDataError,
  } = useTimeline();
  const timelineData = timelineDataRaw ?? [];

  return (
    <TimelineCard
      title="Recent activity"
      data={timelineData}
      loading={timelineDataLoading}
      error={timelineDataError?.toString()}
    />
  );
};
