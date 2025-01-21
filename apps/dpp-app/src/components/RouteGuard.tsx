import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useKeybanAuth } from "@keyban/sdk-react";
import { CircularProgress, Container, Typography } from "@mui/material";

const RouteGuard: React.FC = () => {
  const { isAuthenticated, isLoading } = useKeybanAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <Container maxWidth="sm" sx={{ py: 2, textAlign: "center" }}>
        <CircularProgress />
        <Typography variant="h6">Chargement...</Typography>
      </Container>
    );
  }

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default RouteGuard;
