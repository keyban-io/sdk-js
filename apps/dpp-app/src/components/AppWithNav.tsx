import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useKeybanAuth } from "@keyban/sdk-react";
import Dashboard from "../pages/Dashboard";
import ProductDetails from "../pages/ProductDetails";
import Login from "../pages/Login";
import RouteGuard from "./RouteGuard";
import BottomNav from "./BottomNav";
import BackButton from "./BackButton";

const AppWithNav: React.FC = () => {
  const { isAuthenticated } = useKeybanAuth();
  const location = useLocation();

  return (
    <>
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
      {isAuthenticated && location.pathname !== "/login" && <BackButton />}
    </>
  );
};

export default AppWithNav;
