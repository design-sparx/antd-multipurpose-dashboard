import {Card as AntdCard, CardProps, Descriptions, DescriptionsProps, Space, Tooltip, Typography} from "antd";
import {CalendarOutlined, ClockCircleOutlined, UsergroupAddOutlined} from "@ant-design/icons";
import {Projects} from "../../../../types";

import "./styles.css";

const {Text} = Typography

type Props = {
    project: Projects
    size?: "small" | "default"
} & CardProps

const ProjectsCard = (props: Props) => {
    const {
        size,
        project:
            {
                client_name,
                end_date,
                project_duration,
                project_manager,
                project_name,
                project_type,
                project_location,
                priority,
                team_size,
                status
            },
        ...others
    } = props

    const items: DescriptionsProps['items'] = [
        {
            key: "project_name",
            label: "Title",
            children: <span className="text-capitalize">{project_name.slice(0, 36)}...</span>,
            span: 24
        },
        {
            key: 'project_manager',
            label: 'Manager',
            children: project_manager,
            span: 24
        },
        {
            key: 'project_client',
            label: 'Client',
            children: client_name,
            span: 24
        },
        {
            key: 'project_type',
            label: 'Type',
            children: <span className="text-capitalize">{project_type}</span>,
            span: 24
        },
        {
            key: 'project_location',
            label: 'Location',
            children: project_location,
            span: 24
        },
        {
            key: 'project_priority',
            label: 'Priority',
            children: <span className="text-capitalize">{priority}</span>,
        },
        {
            key: 'project_status',
            label: 'Status',
            children: <span className="text-capitalize">{status}</span>,
        },
        {
            key: 'team_size',
            label: <UsergroupAddOutlined/>,
            children: <Tooltip title="Team size">
                <Typography.Text>{team_size}</Typography.Text>
            </Tooltip>,
        },
        {
            key: 'period',
            label: <ClockCircleOutlined/>,
            children: <Tooltip title="Project duration (months)">
                <Typography.Text>{project_duration}</Typography.Text>
            </Tooltip>,
        },
        {
            key: 'end_date',
            label: <CalendarOutlined/>,
            children: <Tooltip title="Project end date">
                <Typography.Text>{end_date}</Typography.Text>
            </Tooltip>
        }
    ];

    return (
        size === "small" ?
            <AntdCard className="project-small-card" {...others}>
                <Space direction="vertical">
                    <Text strong className="text-capitalize">{project_name.slice(0, 15)}</Text>
                    <Text>Owner: {project_manager}</Text>
                    <Text>Client: {client_name}</Text>
                    <Text>Priority: {priority}</Text>
                    <Text>Type: {project_type}</Text>
                    <Text>Location: {project_location}</Text>
                </Space>
            </AntdCard> :
            <AntdCard
                bordered
                hoverable={true}
                {...others}
            >
                <Descriptions
                    items={items}
                    column={{xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1}}
                />
            </AntdCard>
    );
};

export default ProjectsCard;
