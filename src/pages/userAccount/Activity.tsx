import {TimelineCard} from "../../components";
import {useFetchData} from "../../hooks";

const UserProfileActivityPage = () => {
    const {
        data: timelineData,
        loading: timelineDataLoading,
        error: timelineDataError
    } = useFetchData("../mocks/TimelineActivity.json")

    return (
        <TimelineCard title="Recent activity" data={timelineData} loading={timelineDataLoading} error={timelineDataError}/>
    );
};

export default UserProfileActivityPage;