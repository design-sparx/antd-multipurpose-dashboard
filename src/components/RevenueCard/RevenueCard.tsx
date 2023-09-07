import {Card, CardProps, Space, Typography} from "antd";
import {ArrowDownOutlined, ArrowUpOutlined} from "@ant-design/icons";

type Props = {
    title: string,
    value: string | number
    diff: number
} & CardProps

const RevenueCard = ({title, value, diff}: Props) => {
    return (
        <Card title={title}>
            <Typography.Title>{value}</Typography.Title>
            <Space>
                {diff > 0 ? <ArrowUpOutlined/> : <ArrowDownOutlined/>}
                <Typography.Text>{diff}%</Typography.Text>
            </Space>
        </Card>
    );
};

export default RevenueCard;