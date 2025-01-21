import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useKeybanAuth } from "@keyban/sdk-react";

const RouteGuard: React.FC = () => {
  const { isAuthenticated, isLoading } = useKeybanAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default RouteGuard;
