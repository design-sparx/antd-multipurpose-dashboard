import {Badge, Button, CardProps, List, Space, Typography} from "antd";
import {DeliveryRequest} from "../../../../types";
import {Card, UserAvatar} from "../../../index.ts";

import "./styles.css";

type Props = {
    data: DeliveryRequest[]
} & CardProps

const DeliveryRequestCard = ({data, ...others}: Props) => {
    return (
        <Card
            title="Recent request"
            className="delivery-request-card card"
            extra={<Button>See all</Button>}
            {...others}
        >
            <List
                size="large"
                className="delivery-request-list"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 5,
                    align: "center"
                }}
                dataSource={data}
                renderItem={(item) => (
                    <List.Item
                        key={item.id}
                    >
                        <Space style={{justifyContent: "space-between", width: "100%"}}>
                            <Space direction="vertical">
                                <Typography.Text
                                    strong
                                    style={{textTransform: "capitalize"}}
                                >
                                    {item.name}
                                </Typography.Text>
                                <Badge
                                    color="geekblue"
                                    text={<Typography.Text>From: {item.delivery_location}</Typography.Text>}
                                />
                                <Badge
                                    color="magenta"
                                    text={<Typography.Text>To: {item.pickup_location}</Typography.Text>}
                                />
                            </Space>
                            <Space direction="vertical" align="end">
                                <Typography.Text>{item.delivery_date}</Typography.Text>
                                <UserAvatar fullName={item.driver_name}/>
                                <Typography.Text>Contact:{' '}{item.contact_number}</Typography.Text>
                            </Space>
                        </Space>
                    </List.Item>
                )}
            />
        </Card>
    );
};

export default DeliveryRequestCard;