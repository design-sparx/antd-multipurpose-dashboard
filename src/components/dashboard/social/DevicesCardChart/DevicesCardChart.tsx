import {Card, CardProps, Col, Row, Space, Typography} from "antd";
import {Pie} from "@ant-design/plots";
import {DesktopOutlined, MobileOutlined, SettingOutlined, TabletFilled} from "@ant-design/icons";

const PieChart = () => {
    const data = [
        {
            type: 'Desktop',
            value: 16,
        },
        {
            type: 'Mobile',
            value: 70,
        },
        {
            type: 'Tablet',
            value: 10,
        },
        {
            type: 'Others',
            value: 4,
        }
    ];
    const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.6,
        label: {
            type: 'inner',
            offset: '-50%',
            content: ({percent}) => `${(percent * 100).toFixed(0)}%`,
            style: {
                textAlign: 'center',
                fontSize: 12,
            },
        },
        interactions: [
            {
                type: 'element-selected',
            },
            {
                type: 'element-active',
            },
        ],
        statistic: {
            title: false,
            content: {
                style: {
                    whiteSpace: 'pre-wrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontSize: 16
                },
                content: 'Devices\nUsage',
            },
        },
        legend: false
    };
    return <Pie {...config} />;
};

type Props = CardProps

const DevicesCardChart = ({...others}: Props) => {
    return (
        <Card
            title={
                <Space direction="vertical">
                    <Typography.Title level={5}>Flow on device</Typography.Title>
                    <Typography.Text>Stats can help to design post</Typography.Text>
                </Space>
            }
            {...others}
        >
            <Row style={{alignItems: 'center'}}>
                <Col span={12}>
                    <div style={{height: 200}}>
                        <PieChart/>
                    </div>
                </Col>
                <Col span={12}>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Space direction="vertical">
                            <DesktopOutlined/>
                            <Typography.Text>Desktop</Typography.Text>
                            <Typography.Text style={{color: '#62daaa'}}>70%</Typography.Text>
                        </Space>
                        <Space direction="vertical">
                            <MobileOutlined/>
                            <Typography.Text>Mobile</Typography.Text>
                            <Typography.Text style={{color: '#6394f9'}}>16%</Typography.Text>
                        </Space>
                        <Space direction="vertical">
                            <TabletFilled/>
                            <Typography.Text>Tablet</Typography.Text>
                            <Typography.Text style={{color: '#657797'}}>10%</Typography.Text>
                        </Space>
                        <Space direction="vertical">
                            <SettingOutlined/>
                            <Typography.Text>Other</Typography.Text>
                            <Typography.Text style={{color: '#f6c022'}}>4%</Typography.Text>
                        </Space>
                    </div>
                </Col>
            </Row>
        </Card>
    );
};

export default DevicesCardChart;