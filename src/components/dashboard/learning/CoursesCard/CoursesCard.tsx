import {Avatar, Card, CardProps, Space, Table, Typography} from "antd";
import {LearningCourses} from "../../../../types";
import {CalendarOutlined, SwapRightOutlined} from "@ant-design/icons";
import {colourNameToHex, getNameInitials, isColorLight} from "../../../../utils";
import {ColumnsType} from "antd/es/table";

const COURSES_COLUMNS: ColumnsType<LearningCourses> = [
    {
        title: 'Courses Title',
        dataIndex: 'name',
        key: 'courses_title'
    },
    {
        title: 'Lessons Completed',
        dataIndex: 'current_lessons',
        key: 'current_lessons',
        render: (_: any, {current_lessons, total_lessons}: any) => (
            <Space size={2}>
                <Typography.Text type="success">{current_lessons}</Typography.Text>
                <Typography.Text>/</Typography.Text>
                <Typography.Text>{total_lessons}</Typography.Text>
                <Typography.Text strong>({Number(current_lessons / total_lessons).toFixed(2)}%)</Typography.Text>
            </Space>
        )
    },
    {
        title: 'Duration',
        dataIndex: 'start_date',
        key: 'start_date',
        render: (_: any, {start_date, end_date}: any) => (
            <Space size="small">
                <CalendarOutlined/>
                <Typography.Text>{start_date}</Typography.Text>
                <SwapRightOutlined/>
                <Typography.Text>{end_date}</Typography.Text>
            </Space>
        )
    },
    {
        title: 'Instructor',
        dataIndex: 'instructor_name',
        key: 'instructor_name',
        render: (_: any, {instructor_name, favorite_color}: any) => (
            <Space>
                <Avatar
                    style={{
                        backgroundColor: favorite_color,
                        color: isColorLight(colourNameToHex(favorite_color)) ? 'black' : 'white'
                    }}
                >
                    {getNameInitials(instructor_name)}
                </Avatar>
                <Typography.Text>{instructor_name}</Typography.Text>
            </Space>
        )
    },
    {
        title: 'Prerequisites',
        dataIndex: 'prerequisites',
        key: 'prerequisites'
    }
]

type Props = { data: LearningCourses[] } & CardProps

const CoursesCard = ({data, ...others}: Props) => {
    return (
        <Card
            title="Courses your're taking"
            {...others}
        >
            <Table dataSource={data} columns={COURSES_COLUMNS}/>
        </Card>
    );
};

export default CoursesCard;