import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ isAuthenticated, children, isAdmin, adminRoute }) => {
  const { loading} = useSelector((state) => state.user);

  if (loading === false) {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    if (adminRoute && !isAdmin) {
      return <Navigate to="/" />;
    }

    return <Outlet />;
  }

  // Handle the case when loading is still true
  // You may want to return a loading spinner or some other UI element here
  return null;
};

export default ProtectedRoute;
