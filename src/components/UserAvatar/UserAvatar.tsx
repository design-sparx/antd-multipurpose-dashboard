import {Avatar, Space, theme, Typography} from "antd";
import {getNameInitials} from "../../utils";
import {UserOutlined} from "@ant-design/icons";

/**
 * mark - not a full name user, just a single user name
 */
type Props = {
    fullName: string
    mark?: boolean
}

const UserAvatar = ({fullName, mark}: Props) => {
    const {token} = theme.useToken()

    return (
        <Space>
            {mark ?
                <Avatar style={{backgroundColor: token.colorPrimary}} icon={<UserOutlined />}/> :
                <Avatar style={{backgroundColor: token.colorPrimary}}>{getNameInitials(fullName)}</Avatar>
            }
            <Typography.Text>{fullName}</Typography.Text>
        </Space>
    );
};

export default UserAvatar;