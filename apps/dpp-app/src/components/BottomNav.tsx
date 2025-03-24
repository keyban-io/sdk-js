import React from "react";
import {
  BottomNavigation,
  BottomNavigationAction,
  Tooltip,
  Box,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useNavigate } from "react-router-dom";
import {
  useKeybanAuth,
  useKeybanClient,
  useKeybanAccount,
} from "@keyban/sdk-react";
import AddProductModal from "./AddProductModal";

function hashSHA256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  return crypto.subtle.digest("SHA-256", msgBuffer).then((hashBuffer) => {
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  });
}

export default function BottomNav() {
  const [value, setValue] = React.useState(0);
  const [modalOpen, setModalOpen] = React.useState(false);
  const navigate = useNavigate();
  const { logout } = useKeybanAuth();
  const keybanClient = useKeybanClient();
  const [account] = useKeybanAccount();

  const handleLogout = async () => {
    await logout();
  };

  const handleAddProduct = async (ean: string, serialNumber: string) => {
    const concatenated = ean + serialNumber;
    const tppId = await hashSHA256(concatenated);
    const recipient = account?.address || "";
    const { transactionHash } = await keybanClient.tppClaim(tppId, recipient);
    console.log("Transaction hash:", transactionHash);
    setModalOpen(false);
  };

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
        <BottomNavigation
          value={value}
          onChange={(_event, newValue) => {
            setValue(newValue);
            if (newValue === 0) navigate("/dashboard");
            if (newValue === 1) setModalOpen(true); // Open AddProductModal instead of navigating
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
            <BottomNavigationAction
              icon={<HomeIcon sx={{ color: "white" }} />}
            />
          </Tooltip>
          <Tooltip title="Ajouter un produit">
            <BottomNavigationAction
              icon={<AddCircleIcon sx={{ color: "white" }} />}
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
      <AddProductModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddProduct}
      />
    </>
  );
}
