import {CardProps, Col, Flex, Row, Tag, Typography} from "antd";
import {TinyColumn} from "@ant-design/charts";
import {Card} from "../../../index.ts";

type ChartData = [number, number, number, number]

type StatsColumnChartProps = {
    data: ChartData,
    color?: string
}

const ColumnChart = ({data, color}: StatsColumnChartProps) => {
    const brandColor = color || '#5B8FF9';
    const config = {
        height: 64,
        autoFit: true,
        data,
        color: brandColor,
        tooltip: {
            customContent: function (x: any, data: any) {
                return `NO.${x}: ${data[0]?.data?.y.toFixed(2)}`;
            },
        }
    };
    return <TinyColumn {...config} />;
};

type Props = {
    title: string,
    value: number | string,
    data: ChartData,
    diff: number
} & CardProps

const StatsCard = ({data, diff, title, value, ...others}: Props) => {
    return (
        <Card {...others}>
            <Flex vertical>
                <Typography.Title level={5} className="text-capitalize m-0">{title}</Typography.Title>
                <Row>
                    <Col span={14}>
                        <Typography.Title level={2}>{value}</Typography.Title>
                    </Col>
                    <Col span={10}>
                        <ColumnChart data={data}/>
                    </Col>
                </Row>
                <Flex>
                    <Tag color={diff < 0 ? 'red' : 'green'}>{diff}%</Tag>
                    <Typography.Text>compared to last month.</Typography.Text>
                </Flex>
            </Flex>
        </Card>
    );
};

export default StatsCard;