import {Avatar, Button, Card, CardProps, List, Typography} from "antd";
import {CommunityGroup} from "../../../../types";
import {PlusOutlined} from "@ant-design/icons";

import "./styles.css";

type Props = {
    data: CommunityGroup[]
} & CardProps

const ExamsCard = ({data, ...others}: Props) => {
    return (
        <Card
            title="Community Groups"
            className="community-group-card"
            extra={
                <Button icon={<PlusOutlined/>}/>
            }
            {...others}
        >
            <List
                itemLayout="vertical"
                size="small"
                className="community-group-list"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 5,
                }}
                dataSource={data}
                renderItem={(item) => (
                    <List.Item
                        key={item.id}
                    >
                        <List.Item.Meta
                            avatar={
                                <Avatar
                                    src={item.image}
                                    alt={item.name}
                                    size="default"
                                    style={{backgroundColor: item.favorite_color}}
                                />}
                            title={<Typography.Link>{item.name}</Typography.Link>}
                            description={`${item.size} Members`}
                        />
                    </List.Item>
                )}
            />
        </Card>
    );
};

export default ExamsCard;