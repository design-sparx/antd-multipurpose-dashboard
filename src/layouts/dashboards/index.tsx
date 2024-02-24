import { AppLayout } from '../app';
import { Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};

export default DashboardLayout;
