import {AppLayout} from "../app";
import {Breadcrumb, Space, Typography} from "antd";
import {Link} from "react-router-dom";
import {PATH_DASHBOARD} from "../../constants";


const DashboardLayout = () => {
    return (
        <AppLayout
            headerContent={
                <Space direction="vertical" size={0}>
                    <Typography.Title level={5} style={{padding: 0, margin: 0}}>
                        Dashboard
                    </Typography.Title>
                    <Breadcrumb
                        items={[
                            {
                                title: <Link to={PATH_DASHBOARD.root}>Home</Link>,
                            },
                            {
                                title: 'Page title',
                            },
                        ]}
                    />
                </Space>
            }
        />
    );
};

export default DashboardLayout;