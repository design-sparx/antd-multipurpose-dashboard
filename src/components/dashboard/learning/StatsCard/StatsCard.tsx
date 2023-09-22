import React from "react";
import {Card, CardProps, Progress, Space, Typography} from "antd";

type Props = {
    title: string
    value: number
    icon: any
    color: string
    progress: number
} & CardProps

const StatsCard = ({color, icon, title, value, progress, ...others}: Props) => {
    return (
        <Card
            title={
                <Space align="center">
                    {React.createElement(icon)}
                    <Typography.Title level={5}>{title}</Typography.Title>
                </Space>
            }
            {...others}
        >
            <div style={{display: 'flex', flexDirection: 'column'}}>
                <Typography.Title>{value}</Typography.Title>
                <Progress percent={progress} showInfo={false} strokeColor={color}/>
            </div>
        </Card>
    );
};

export default StatsCard;