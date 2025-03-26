import React from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Tooltip,
  Box,
  CircularProgress,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";
import { useKeybanAuth } from "@keyban/sdk-react";
import AddProductModal from "./AddProductModal";

export default function BottomNav() {
  const [value, setValue] = React.useState(0);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);
  const navigate = useNavigate();
  const { logout } = useKeybanAuth();

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <BottomNavigation
          value={value}
          onChange={(_event, newValue) => {
            if (newValue === 1) {
              setModalOpen(true);
              // Do not update state so previous button stays highlighted
            } else {
              setValue(newValue);
              if (newValue === 0) navigate("/dashboard");
              if (newValue === 2) navigate("/settings");
              if (newValue === 3) handleLogout();
            }
          }}
          showLabels={false}
          sx={{
            position: "fixed",
            bottom: 16,
            height: "56px",
            backgroundColor: "black",
            maxWidth: "sm",
            borderRadius: "32px",
            zIndex: 1000,
          }}
        >
          <Tooltip title="Dashboard">
            <BottomNavigationAction
              icon={
                <HomeIcon
                  sx={{ color: value === 0 ? "primary.main" : "white" }}
                />
              }
            />
          </Tooltip>
          <Tooltip title="Ajouter un produit">
            <BottomNavigationAction
              icon={
                <AddCircleIcon
                  sx={{ color: "white" }} // always white regardless of selected state
                />
              }
            />
          </Tooltip>
          <Tooltip title="Paramètres">
            <BottomNavigationAction
              icon={
                <SettingsIcon
                  sx={{ color: value === 2 ? "primary.main" : "white" }}
                />
              }
            />
          </Tooltip>
          <Tooltip title="Logout">
            <BottomNavigationAction
              icon={
                <LogoutIcon
                  sx={{ color: value === 3 ? "primary.main" : "white" }}
                />
              }
            />
          </Tooltip>
        </BottomNavigation>
      </Box>
      <AddProductModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {isLoggingOut && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(255,255,255,0.7)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1100,
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </>
  );
}
