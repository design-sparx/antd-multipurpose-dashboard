import { AppLayout } from '../app';
import { Outlet } from 'react-router-dom';

export const DashboardLayout = () => {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};
