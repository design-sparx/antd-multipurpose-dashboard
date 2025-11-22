import { AppLayout } from '../app';
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

export const DashboardLayout = () => {
  const location = useLocation();

  useEffect(() => {
    console.log('[DashboardLayout] Mounted, location:', location.pathname);
    return () => {
      console.log('[DashboardLayout] Unmounting');
    };
  }, []);

  useEffect(() => {
    console.log('[DashboardLayout] Location changed to:', location.pathname);
  }, [location.pathname]);

  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};
