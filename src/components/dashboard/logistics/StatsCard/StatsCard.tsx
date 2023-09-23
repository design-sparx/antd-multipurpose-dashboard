import React from "react";
import {Card, CardProps, Space, Typography} from "antd";
import {ArrowDownOutlined, ArrowUpOutlined} from "@ant-design/icons";
import {green, red} from "@ant-design/colors"

type Props = {
    title: string
    value: number
    diff: number
    icon: any
} & CardProps

const StatsCard = ({icon, title, value, diff, ...others}: Props) => {
    return (
        <Card
            {...others}
        >
            <Space direction="vertical" size="large" style={{width: '100%'}}>
                {React.createElement(icon, {style: {fontSize: 30}})}
                <Typography.Text style={{textTransform: "capitalize"}}>{title}</Typography.Text>
                <div style={{display: "flex", alignItems: "flex-end", justifyContent: "space-between"}}>
                    <Typography.Title level={3} style={{margin: 0}}>{value}</Typography.Title>
                    <Typography.Text
                        strong
                        style={{color: diff > 0 ? green[5] : red[5]}}
                    >
                        {diff}%&nbsp;
                        {diff > 0
                            ? <ArrowUpOutlined/>
                            : <ArrowDownOutlined/>
                        }
                    </Typography.Text>
                </div>
            </Space>
        </Card>
    );
};

export default StatsCard;