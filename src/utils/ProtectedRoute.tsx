/**
 * Protected Route Component
 * Wrapper for routes that require authentication
 */

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Spin } from 'antd';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

/**
 * ProtectedRoute component that guards routes requiring authentication
 * Redirects to login if user is not authenticated
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAuth = true,
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  console.log('isAuthenticated', isAuthenticated);
  console.log('user', user);

  // Show loading spinner while checking auth status
  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Spin size="large" tip="Loading..." />
      </div>
    );
  }

  // Redirect to login if auth is required but user is not authenticated
  if (requireAuth && !isAuthenticated) {
    // Save the location they were trying to access so we can redirect after login
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  }

  // Redirect authenticated users away from auth pages
  if (!requireAuth && isAuthenticated) {
    // If trying to access login/register while authenticated, redirect to dashboard
    return <Navigate to="/dashboards/default" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
