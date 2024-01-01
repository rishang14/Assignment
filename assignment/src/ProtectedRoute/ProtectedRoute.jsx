import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../Authentication/Authcontext';

const ProtectedRoute = ({  }) => {
  const { user } = useAuth();

  // If the user is authenticated, render the original element, otherwise, redirect to the login page
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;