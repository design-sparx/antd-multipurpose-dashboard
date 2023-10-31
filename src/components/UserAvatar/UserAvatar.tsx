import {Avatar, AvatarProps, Flex, FlexProps, theme, Typography} from "antd";
import {colourNameToHex, getNameInitials, isColorLight} from "../../utils";
import {CheckCircleFilled, UserOutlined} from "@ant-design/icons";
import {blue} from "@ant-design/colors"

/**
 * mark - not a full name user, just a single user name
 */
type Props = {
    fullName: string
    mark?: boolean
    size?: "small" | "middle" | "large"
    verified?: boolean
    color?: string
    textWidth?: number | string
} & Omit<FlexProps, "children">

const UserAvatar = ({fullName, mark, size, verified, color, textWidth, ...others}: Props) => {
    const {token: {colorPrimary}} = theme.useToken()

    const avatarProps: AvatarProps = {
        size: size === "large" ? 36 : size === "small" ? 16 : 24
    }

    return (
        <Flex gap="small" align="center" {...others}>
            {mark ?
                <Avatar
                    style={{
                        backgroundColor: color || colorPrimary,
                        color: isColorLight(colourNameToHex(color || colorPrimary)) ? 'black' : 'white'
                    }}
                    icon={<UserOutlined/>}
                    {...avatarProps}
                /> :
                <Avatar
                    style={{
                        backgroundColor: color || colorPrimary,
                        color: isColorLight(colourNameToHex(color || colorPrimary)) ? 'black' : 'white'
                    }}
                    {...avatarProps}
                >
                    {getNameInitials(fullName)}
                </Avatar>
            }
            <Typography.Text style={{width: textWidth || 160}}>{fullName}</Typography.Text>
            {verified && <CheckCircleFilled style={{fontSize: 14, color: blue[6]}}/>}
        </Flex>
    );
};

export default UserAvatar;