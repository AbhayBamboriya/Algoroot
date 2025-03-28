import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../content/AuthContext';


const PrivateRoute = ({ children }) => {
  const { user } = useAuth();

  // If no user is authenticated, redirect to homepage
  if (!user || !user.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // If user is authenticated, render the children components
  return children;
};

export default PrivateRoute;