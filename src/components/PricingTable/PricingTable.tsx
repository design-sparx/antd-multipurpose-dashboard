import {Pricing} from "../../types";
import {Card as AntdCard, CardProps, Col, List, Row, RowProps, Segmented, Space, theme, Typography} from "antd";
import {CheckCircleOutlined} from "@ant-design/icons";
import {Card} from "../index.ts";
import {useState} from "react";

const ROW_PROPS: RowProps = {
    gutter: [
        {xs: 8, sm: 16, md: 24, lg: 32},
        {xs: 8, sm: 16, md: 24, lg: 32}
    ]
}

const textStyles = (preferred?: boolean, primary?: string): React.CSSProperties => {
    return {
        color: preferred ? "white" : (primary ? primary : "initial"),
        textTransform: "capitalize",
        textAlign: "center"
    }
}

type Props = {
    data: Pricing[]
} & CardProps

const PricingTable = ({data, ...others}: Props) => {
    const {token: {colorPrimary, colorFillSecondary}} = theme.useToken()
    const [value, setValue] = useState<"monthly" | "annually" | string | number>('monthly');

    return (
        <Card
            title="Pricing"
            actions={[
                <Typography.Text italic>Note: All plans come with a 30-day money-back guarantee.</Typography.Text>
            ]}
            {...others}
        >
            <div style={{textAlign: "center", marginBottom: "1rem", textTransform: "capitalize"}}>
                <Segmented size="large" options={['monthly', 'annually']} value={value} onChange={setValue}/>
            </div>
            <Row {...ROW_PROPS}>
                {data.map((d, i) => (
                    <Col sm={24} lg={8} key={`${d.color}-${i}`}>
                        <AntdCard
                            style={{
                                background: d.preferred ? colorPrimary : colorFillSecondary,
                                border: `1px solid ${d.preferred ? colorPrimary : colorFillSecondary}`
                            }}
                        >
                            <Typography.Text
                                strong
                                style={{...textStyles(d.preferred, colorPrimary), fontSize: 16}}
                            >
                                {d.plan}
                            </Typography.Text>
                            <Typography.Title
                                style={{...textStyles(d.preferred)}}
                            >
                                $ {value === "monthly" ? d.monthly : d.annually}/
                                <small
                                    style={{fontSize: 16, fontWeight: 400, textTransform: "lowercase"}}
                                >
                                    per{' '}{value === "monthly" ? "month" : "year"}
                                </small>
                            </Typography.Title>
                            <List
                                header={<Typography.Text style={textStyles(d.preferred)}>Features</Typography.Text>}
                                dataSource={d.features}
                                renderItem={(item) => (
                                    <List.Item>
                                        <Space>
                                            <CheckCircleOutlined style={textStyles(d.preferred)}/>
                                            <Typography.Text
                                                style={textStyles(d.preferred)}>{item}
                                            </Typography.Text>
                                        </Space>
                                    </List.Item>
                                )}
                            />
                        </AntdCard>
                    </Col>
                ))}
            </Row>
        </Card>
    );
};

export default PricingTable;