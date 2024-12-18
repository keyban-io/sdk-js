import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { AppProvider } from "@toolpad/core/react-router-dom";
import { Outlet } from "react-router-dom";
import type { Navigation } from "@toolpad/core";
import { darkThemeOptions, lightThemeOptions } from "@keyban/mui-theme";
import { createTheme } from "@mui/material";

const NAVIGATION: Navigation = [
  {
    kind: "header",
    title: "Main items",
  },
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    segment: "orders",
    title: "Orders",
    icon: <ShoppingCartIcon />,
  },
];

const BRANDING = {
  title: "Keyban Admin Dashboard",
  logo: (
    <img
      src="src/assets/keyban-logo-small.svg"
      alt="Keyban logo"
      style={{ height: 128 }}
    />
  ),
};

export default function App() {
  return (
    <AppProvider
      navigation={NAVIGATION}
      branding={BRANDING}
      theme={{
        light: createTheme(lightThemeOptions),
        dark: createTheme(darkThemeOptions),
      }}
    >
      <Outlet />
    </AppProvider>
  );
}
