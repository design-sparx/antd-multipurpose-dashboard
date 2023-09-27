import {CardProps, Col, Row, Space, Tag, Typography} from "antd";
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
        <Card title={title} {...others}>
            <Space direction="vertical">
                <Row>
                    <Col span={12}>
                        <Typography.Title>{value}</Typography.Title>
                    </Col>
                    <Col span={12}>
                        <ColumnChart data={data}/>
                    </Col>
                </Row>
                <Space>
                    <Tag color={diff < 0 ? 'error' : 'success'}>{diff}%</Tag>
                    <Typography.Text>Total {title} compared to last month.</Typography.Text>
                </Space>
            </Space>
        </Card>
    );
};

export default StatsCard;