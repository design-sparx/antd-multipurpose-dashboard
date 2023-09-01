import {Button} from "antd";
import {Link} from "react-router-dom";
import {PATH_DASHBOARD} from "../constants";

const HomePage = () => {
    return (
        <div>
            <h1>Home</h1>
            <Link to={PATH_DASHBOARD.default}>
                <Button>live preview</Button>
            </Link>
        </div>
    );
};

export default HomePage;