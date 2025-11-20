import { TimelineCard } from '../../components';
import { useFetchData } from '../../hooks';
import { ActivityTimeline } from '../../types';

export const UserProfileActivityPage = () => {
  // Fetch timeline activity data with proper typing
  const {
    data: timelineDataRaw,
    loading: timelineDataLoading,
    error: timelineDataError,
  } = useFetchData<ActivityTimeline[]>('../mocks/TimelineActivity.json');
  const timelineData = timelineDataRaw ?? [];

  return (
    <TimelineCard
      title="Recent activity"
      data={timelineData}
      loading={timelineDataLoading}
      error={timelineDataError}
    />
  );
};
