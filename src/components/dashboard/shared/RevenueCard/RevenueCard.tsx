import {CardProps, Flex, Space, Typography} from "antd";
import {ArrowDownOutlined, ArrowUpOutlined} from "@ant-design/icons";
import {Card} from "../../../index.ts";
import {green, red} from "@ant-design/colors"

type Props = {
    title: string,
    value: string | number
    diff: number
} & CardProps

const RevenueCard = ({title, value, diff}: Props) => (
    <Card>
        <Flex vertical gap="large">
            <Typography.Text>{title}</Typography.Text>
            <Typography.Title level={2} style={{margin: 0}}>{value}</Typography.Title>
            <Space style={{color: diff > 0 ? green[6] : red[5]}}>
                {diff > 0 ? <ArrowUpOutlined/> : <ArrowDownOutlined/>}
                <Typography.Text
                    style={{
                        color: diff > 0 ? green[6] : red[5],
                        fontWeight: 500
                    }}
                >
                    {diff}%
                </Typography.Text>
            </Space>
        </Flex>
    </Card>
);

export default RevenueCard;