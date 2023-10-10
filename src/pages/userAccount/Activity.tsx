import {TimelineCard} from "../../components";
import TimelineActivityData from "../../mocks/TimelineActivity.json"

const UserProfileActivityPage = () => {
    return (
        <TimelineCard data={TimelineActivityData} title="Recent activity"/>
    );
};

export default UserProfileActivityPage;