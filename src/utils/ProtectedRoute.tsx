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
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

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

  // Allow access to auth pages without redirecting
  // (for requireAuth={false}, we just render the children without checking auth state)
  if (!requireAuth) {
    return <>{children}</>;
  }

  // Redirect to login if auth is required but user is not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
