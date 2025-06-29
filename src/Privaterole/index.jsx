// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const PrivateRoute = () => {
//   const { auth } = useSelector(state => state.auth);
//   return auth ? <Outlet /> : <Navigate to="/login" />;
// };

// export default PrivateRoute;
// components/RoleProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RoleProtectedRoute = ({ allowedRoles, children }) => {
  const role = useSelector((state) => state.auth.auth?.role);
  const isAuthenticated = useSelector((state) => !!state.auth.token);
  const location = useLocation();

  if (!isAuthenticated || !role) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children ? children : <Outlet />;
};

export default RoleProtectedRoute;