import {Projects} from "../../../../types";
import {Card as AntdCard, CardProps, Descriptions, DescriptionsProps, Space, Tooltip, Typography} from "antd";
import {CalendarOutlined, ClockCircleOutlined, UsergroupAddOutlined} from "@ant-design/icons";
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
            key: '1',
            label: 'Manager',
            children: project_manager,
        },
        {
            key: '1',
            label: 'Client',
            children: client_name,
        },
        {
            key: '2',
            label: 'Type',
            children: <Typography.Text style={{textTransform: 'capitalize'}}>{project_type}</Typography.Text>,
        },
        {
            key: '3',
            label: 'Location',
            children: project_location,
        },
        {
            key: '5',
            label: 'Priority',
            children: <Typography.Text style={{textTransform: 'capitalize'}}>{priority}</Typography.Text>,
        },
        {
            key: '6',
            label: 'Status',
            children: <Typography.Text style={{textTransform: 'capitalize'}}>{status}</Typography.Text>,
        },
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
                title={project_name}
                hoverable={true}
                actions={[
                    <Tooltip title="Team size">
                        <Space>
                            <UsergroupAddOutlined/>
                            <Typography.Text>{team_size}</Typography.Text>
                        </Space>
                    </Tooltip>,
                    <Tooltip title="Project duration (months)">
                        <Space>
                            <ClockCircleOutlined/>
                            <Typography.Text>{project_duration}</Typography.Text>
                        </Space>
                    </Tooltip>,
                    <Tooltip title="Project end date">
                        <Space>
                            <CalendarOutlined/>
                            <Typography.Text>{end_date}</Typography.Text>
                        </Space>
                    </Tooltip>
                ]}
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
