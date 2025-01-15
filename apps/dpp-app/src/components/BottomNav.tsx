import React from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Tooltip,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import InventoryIcon from "@mui/icons-material/Inventory2";
import HelpIcon from "@mui/icons-material/HelpOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";

export default function BottomNav() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        if (newValue === 0) navigate("/dashboard");
        if (newValue === 1) navigate("/products");
        if (newValue === 2) navigate("/support");
        if (newValue === 3) navigate("/settings");
      }}
      showLabels={false}
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
    >
      <Tooltip title="Dashboard">
        <BottomNavigationAction icon={<HomeIcon />} />
      </Tooltip>
      <Tooltip title="Mes Produits">
        <BottomNavigationAction icon={<InventoryIcon />} />
      </Tooltip>
      <Tooltip title="Support">
        <BottomNavigationAction icon={<HelpIcon />} />
      </Tooltip>
      <Tooltip title="Paramètres">
        <BottomNavigationAction icon={<SettingsIcon />} />
      </Tooltip>
    </BottomNavigation>
  );
}
