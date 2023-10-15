import {CardProps, Timeline, Typography} from "antd";
import {LaptopOutlined, MobileOutlined, TabletOutlined} from "@ant-design/icons";
import {ActivityTimeline} from "../../types"
import {Card, Flex} from "../index.ts";

type Props = {
    data: ActivityTimeline[]
} & CardProps

const TimelineCard = ({data, ...others}: Props) => {
    return (
        <Card title="Latest activities" {...others}>
            <Timeline
                mode="left"
                items={
                    data.map(_ => (
                        {
                            dot: _.device_type === 'desktop' ?
                                <LaptopOutlined/> :
                                _.device_type === 'tablet' ?
                                    <TabletOutlined/> :
                                    <MobileOutlined/>,
                            children:
                                <Flex flexDirection="column" gap="small">
                                    <Typography.Paragraph
                                        ellipsis={{
                                            rows: 2,
                                        }}
                                        title={`${_.post_content}--${_.timestamp}`}
                                        style={{marginBottom: 0}}
                                    >
                                        {_.post_content}
                                    </Typography.Paragraph>
                                    <Typography.Text>
                                        <small>
                                            {_.timestamp}
                                        </small>
                                    </Typography.Text>
                                </Flex>,
                        }))
                }
            />
        </Card>
    );
};

export default TimelineCard;