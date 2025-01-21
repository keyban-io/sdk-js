import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "./theme";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import BottomNav from "./components/BottomNav";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import { KeybanProvider } from "@keyban/sdk-react";
import RouteGuard from "./components/RouteGuard";
import keybanConfig from "./config";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <KeybanProvider
        apiUrl={keybanConfig.apiUrl}
        appId={keybanConfig.appId}
        chain={keybanConfig.chain}
        clientShareProvider={keybanConfig.clientShareProvider}
      >
        <BrowserRouter>
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
          <BottomNav />
        </BrowserRouter>
      </KeybanProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
