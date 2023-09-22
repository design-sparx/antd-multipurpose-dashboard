import {Button, Card, CardProps, List, Space, Typography} from "antd";
import {Exam} from "../../../../types";
import {RightOutlined} from "@ant-design/icons";

import "./styles.css";

type Props = {
    data: Exam[]
} & CardProps

const ExamsCard = ({data, ...others}: Props) => {
    return (
        <Card
            title="Upcoming Exams"
            className="exam-card"
            actions={[
                <Button>See all upcoming exams</Button>
            ]}
            {...others}
        >
            <List
                itemLayout="vertical"
                size="large"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 5,
                }}
                dataSource={data}
                renderItem={(item) => (
                    <List.Item
                        key={item.student_id}
                    >
                        <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <Space direction="vertical">
                                <Typography.Title level={5} style={{margin: 0}}>
                                    {item.course} - {item.course_code}
                                </Typography.Title>
                                <Typography.Text>Date:{' '}{item.exam_date}</Typography.Text>
                                <Typography.Text>Duration:{' '}{item.exam_duration}</Typography.Text>
                            </Space>
                            <Button size="small" icon={<RightOutlined/>}/>
                        </div>
                    </List.Item>
                )}
            />
        </Card>
    );
};

export default ExamsCard;