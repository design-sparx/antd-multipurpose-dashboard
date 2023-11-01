import {useNavigate} from "react-router-dom";
import {Button, ButtonProps} from "antd";
import {LeftOutlined} from "@ant-design/icons";

type Props = {
    icon?: boolean
} & ButtonProps

const BackBtn = ({icon, ...others}: Props) => {
    const navigate = useNavigate()

    return (
        <Button
            icon={icon ? <LeftOutlined/> : null}
            onClick={() => navigate(-1)}
            {...others}
        >
            Go back
        </Button>
    );
};

export default BackBtn;