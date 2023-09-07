import {Card, CardProps, Timeline, Typography} from "antd";
import TimelineActivityData from "../../mocks/TimelineActivity.json"
import {LaptopOutlined, MobileOutlined, TabletOutlined} from "@ant-design/icons";

type Props = CardProps

const TimelineCard = ({...others}: Props) => {
    return (
        <Card title="Latest activities" {...others}>
            <Timeline
                mode="left"
                items={
                    TimelineActivityData.map(_ => (
                        {
                            dot: _.device_type === 'desktop' ?
                                <LaptopOutlined/> :
                                _.device_type === 'tablet' ?
                                    <TabletOutlined/> :
                                    <MobileOutlined/>,
                            children: <Typography.Paragraph
                                ellipsis={{
                                    rows: 2,
                                    suffix: _.timestamp
                                }}
                                title={`${_.post_content}--${_.timestamp}`}
                            >
                                {_.post_content}
                            </Typography.Paragraph>
                        }))
                }
            />
        </Card>
    );
};

export default TimelineCard;