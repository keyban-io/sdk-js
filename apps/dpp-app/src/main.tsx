import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import theme from "./theme";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import BottomNav from "./components/BottomNav";
import ProductDetails from "./pages/ProductDetails";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/product-details" element={<ProductDetails />} />
          {/* ...add more routes if needed... */}
        </Routes>
        <BottomNav />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
);
