import {Button, ButtonProps} from "antd";
import {LeftOutlined} from "@ant-design/icons";

type Props = {
    icon?: boolean
} & ButtonProps

const RefreshBtn = ({icon, ...others}: Props) => {
    return (
        <Button
            icon={icon ? <LeftOutlined/> : null}
            onClick={() => window.location.reload()}
            {...others}
        >
            Refresh page
        </Button>
    );
};

export default RefreshBtn;