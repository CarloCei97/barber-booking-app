// import React from 'react';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children, isAuthenticated }) => {
//   //console.log("[DEBUG] ProtectedRoute received isAuthenticated:", isAuthenticated);

//   if (!isAuthenticated) {
//     //console.log("[DEBUG] Redirecting to /login...");
//     return <Navigate to="/login" replace />;
//   }

//   //console.log("[DEBUG] Rendering protected content...");
//   return children;
// };

// export default ProtectedRoute;
//----------------------------------------------------------------
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAuthenticated }) => {
  // If isAuthenticated is null, show a loading indicator
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  // Otherwise, if not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;

