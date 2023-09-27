import {Avatar, Button, CardProps, List, Space, Typography} from "antd";
import {AuctionCreator} from "../../../../types";
import {getNameInitials} from "../../../../utils";
import {CheckCircleFilled, PlusOutlined} from "@ant-design/icons";
import {Card} from "../../../index.ts";

type Props = { data: AuctionCreator[] } & CardProps

const CreatorsCard = ({data, ...others}: Props) => {
    return (
        <Card
            title="Popular creators"
            extra={<Button>See all creators</Button>}
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
                }}
                dataSource={data}
                renderItem={(item) => (
                    <div style={{display: 'flex', gap: 8}}>
                        <Avatar
                            style={{backgroundColor: item.favorite_color}}
                        >
                            {getNameInitials(`${item.first_name} ${item.last_name}`)}
                        </Avatar>
                        <Space direction="vertical" size={4} style={{flex: 1}}>
                            <Typography.Link>
                                {item.first_name}{' '}{item.last_name}{' '}
                                <CheckCircleFilled style={{fontSize: 12}}/>
                            </Typography.Link>
                            <Typography.Text>{item.sales_count} items</Typography.Text>
                        </Space>
                        <Button>Follow <PlusOutlined/></Button>
                    </div>
                )}
            />
        </Card>
    );
};

export default CreatorsCard;