import {Notifications} from "../../types";
import {Avatar, Space, Tag, Typography} from "antd";
import {ContainerOutlined, MailOutlined, PhoneOutlined} from "@ant-design/icons";

type Props = {
    data: Notifications
}

const NotificationsItem = ({data}: Props) => {
    const {
        notification_type,
        notification_category,
        notification_image,
        notification_date,
        notification_message,
        color
    } = data

    return (
        <div style={{display: "flex"}}>
            <Avatar src={notification_image}/>
            <div style={{display: "flex", flexDirection: "column", alignSelf: "center"}}>
                <div style={{display: "flex", alignItems: "center"}}>
                    <Typography.Text
                        strong
                        style={{flexGrow: 1}}
                    >
                        {notification_message.slice(0, 30)}...
                    </Typography.Text>
                    <Tag
                        bordered={true}
                        icon={
                            notification_type === "voice" ?
                                <PhoneOutlined/> :
                                notification_type === "email" ?
                                    <MailOutlined/> :
                                    <ContainerOutlined/>
                        }
                        style={{textTransform: "capitalize"}}
                    >
                        {notification_type}
                    </Tag>
                </div>
                <Space>
                    <Tag bordered={true} color={color}>{notification_category}</Tag>
                    <Typography.Text>{notification_date}</Typography.Text>
                </Space>
            </div>
        </div>
    );
};

export default NotificationsItem;