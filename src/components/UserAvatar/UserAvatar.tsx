import {Avatar, AvatarProps, Flex, theme, Typography} from "antd";
import {getNameInitials} from "../../utils";
import {UserOutlined} from "@ant-design/icons";

/**
 * mark - not a full name user, just a single user name
 */
type Props = {
    fullName: string
    mark?: boolean
    size?: "small" | "medium" | "large"
}

const UserAvatar = ({fullName, mark, size}: Props) => {
    const {token} = theme.useToken()

    const avatarProps: AvatarProps = {
        size: size === "large" ? 36 : size === "small" ? 16 : 24
    }

    return (
        <Flex gap="small" align="center">
            {mark ?
                <Avatar
                    style={{backgroundColor: token.colorPrimary}}
                    icon={<UserOutlined/>}
                    {...avatarProps}
                /> :
                <Avatar
                    style={{backgroundColor: token.colorPrimary}}
                    {...avatarProps}
                >
                    {getNameInitials(fullName)}
                </Avatar>
            }
            <Typography.Text>{fullName}</Typography.Text>
        </Flex>
    );
};

export default UserAvatar;