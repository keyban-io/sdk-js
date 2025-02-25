import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useKeybanAuth } from "@keyban/sdk-react";
import { CircularProgress, Stack, Typography } from "@mui/material";

const RouteGuard: React.FC = () => {
  const { isAuthenticated, isLoading } = useKeybanAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
        <Typography variant="h6">Chargement...</Typography>
      </Stack>
    );
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default RouteGuard;
