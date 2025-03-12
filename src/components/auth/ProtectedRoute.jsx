import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAuthenticated }) => {
  //console.log("[DEBUG] ProtectedRoute received isAuthenticated:", isAuthenticated);

  if (!isAuthenticated) {
    //console.log("[DEBUG] Redirecting to /login...");
    return <Navigate to="/login" replace />;
  }

  //console.log("[DEBUG] Rendering protected content...");
  return children;
};

export default ProtectedRoute;
