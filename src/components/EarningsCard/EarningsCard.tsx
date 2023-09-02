import {Badge, Card, CardProps, Space, Typography} from "antd";
import {Pie} from '@ant-design/plots';
import {ArrowUpOutlined} from "@ant-design/icons";
import {MoreMenu} from "../index.ts";

const PieChart = () => {
    const data = [
        {
            type: 'Sales',
            value: 3838,
        },
        {
            type: 'YouTube',
            value: 2722,
        },
        {
            type: 'Courses',
            value: 2411,
        },
        {
            type: 'Others',
            value: 5163,
        },
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
            content: '{value}',
            style: {
                textAlign: 'center',
                fontSize: 14,
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
                },
                content: '',
            },
        },
    };
    // @ts-ignore
    return <Pie {...config} />;
};

type Props = CardProps

const EarningsCard = ({...others}: Props) => {

    return (
        <Card
            title='Revenue stream'
            extra={
                <MoreMenu/>
            }
            {...others}
        >
            <Space style={{justifyContent: 'space-between', width: '100%'}}>
                <Space direction="horizontal" align="center">
                    <Typography.Title level={1} style={{margin: 0}}>$10,233</Typography.Title>
                    <Badge
                        count={
                            <div style={{display: 'flex', gap: '4px'}}>
                                <ArrowUpOutlined/>
                                <Typography.Text style={{color: 'white'}} strong>2.2</Typography.Text>
                            </div>
                        }
                        style={{
                            backgroundColor: '#52c41a',
                            color: 'white',
                            padding: '.15rem .25rem',
                            borderRadius: '4px'
                        }}
                    />
                </Space>
                <div style={{height: 180, textAlign: 'center'}}>
                    <PieChart/>
                </div>
            </Space>
        </Card>
    );
};

export default EarningsCard;