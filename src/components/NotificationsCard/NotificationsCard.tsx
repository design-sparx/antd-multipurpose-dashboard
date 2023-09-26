import {Button, Card, CardProps, List} from "antd";
import {NotificationsItem} from "../index.ts";
import {Notifications} from "../../types";

import "./styles.css";

type Props = {
    data: Notifications[]
} & CardProps

const NotificationsCard = ({data, ...others}: Props) => {
    return (
        <Card
            title="Notifications"
            extra={<Button>View all</Button>}
            className="notifications-list-card"
            {...others}
        >
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 5,
                    align: "center"
                }}
                dataSource={data}
                renderItem={(item) => (
                    <List.Item key={item.notification_id}>
                        <NotificationsItem data={item}/>
                    </List.Item>
                )}
            />
        </Card>
    );
};

export default NotificationsCard;