import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useKeybanAuth } from "@keyban/sdk-react";
import Dashboard from "../pages/Dashboard";
import ProductDetails from "../pages/ProductDetails";
import Login from "../pages/Login";
import RouteGuard from "./RouteGuard";
import BottomNav from "./BottomNav";
import BackButton from "./BackButton";
import { Box } from "@mui/material";

const AppWithNav: React.FC = () => {
  const { isAuthenticated } = useKeybanAuth();
  const location = useLocation();

  return (
    <Box
      sx={{
        position: "relative",
        maxWidth: "sm",
        margin: "auto",
        pb: 6, // Add padding to the bottom
      }}
    >
      {isAuthenticated && location.pathname !== "/login" && <BackButton />}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<RouteGuard />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/product-details/:productId"
            element={<ProductDetails />}
          />
          {/* ...add more routes if needed... */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Route>
      </Routes>
      {isAuthenticated && <BottomNav />}
    </Box>
  );
};

export default AppWithNav;
