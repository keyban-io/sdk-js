import React from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Tooltip,
  Box,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory2";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useKeybanAuth } from "@keyban/sdk-react";

export default function BottomNav() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const { logout } = useKeybanAuth();

  const handleLogout = async () => {
    console.log("Logging out...");
    await logout();
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
      <BottomNavigation
        value={value}
        onChange={(_event, newValue) => {
          setValue(newValue);
          if (newValue === 0) navigate("/dashboard");
          if (newValue === 1) navigate("/products");
          if (newValue === 2) navigate("/settings");
          if (newValue === 3) handleLogout();
        }}
        showLabels={false}
        sx={{
          position: "fixed",
          bottom: 16, // Add space between the navigation bar and the bottom of the screen
          height: "56px",
          backgroundColor: "black",
          maxWidth: "sm",
          borderRadius: "32px", // Rounded top corners
          zIndex: 1000, // Ensure the navigation bar is above all other elements
        }}
      >
        <Tooltip title="Dashboard">
          <BottomNavigationAction icon={<HomeIcon sx={{ color: "white" }} />} />
        </Tooltip>
        <Tooltip title="Mes Produits">
          <BottomNavigationAction
            icon={<InventoryIcon sx={{ color: "white" }} />}
          />
        </Tooltip>
        <Tooltip title="Paramètres">
          <BottomNavigationAction
            icon={<SettingsIcon sx={{ color: "white" }} />}
          />
        </Tooltip>
        <Tooltip title="Logout">
          <BottomNavigationAction
            icon={<LogoutIcon sx={{ color: "white" }} />}
          />
        </Tooltip>
      </BottomNavigation>
    </Box>
  );
}
