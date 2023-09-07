import {Table, Typography} from "antd";
import {Projects} from "../../types";

const COLUMNS = [
    {
        title: 'Name',
        dataIndex: 'project_name',
        key: 'project_name',
        render: (_: any, {project_name}: Projects) =>
            <Typography.Paragraph ellipsis={{rows: 1}}>
                {project_name.substring(0, 20)}
            </Typography.Paragraph>
    },
    {
        title: 'Manager',
        dataIndex: 'project_manager',
        key: 'project_manager',
    },
    {
        title: 'Client',
        dataIndex: 'client_name',
        key: 'client_name',
    },
    {
        title: 'Type',
        dataIndex: 'project_type',
        key: 'project_type',
    },
    {
        title: 'Category',
        dataIndex: 'project_category',
        key: 'project_category',
    },
    {
        title: 'Priority',
        dataIndex: 'priority',
        key: 'priority',
    },
    {
        title: 'Status',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: 'Team size',
        dataIndex: 'team_size',
        key: 'team_size',
    },
    {
        title: 'Duration',
        dataIndex: 'project_duration',
        key: 'project_duration',
    },
    {
        title: 'Start date',
        dataIndex: 'start_date',
        key: 'start_date',
    },
    {
        title: 'Location',
        dataIndex: 'project_location',
        key: 'project_location',
    },
];

type Props = {
    data: Projects[]
}

const ProjectsTable = ({data}: Props) => {
    return (
        <Table dataSource={data} columns={COLUMNS}/>
    );
};

export default ProjectsTable;