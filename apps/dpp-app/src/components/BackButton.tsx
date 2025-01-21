import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useLocation } from "react-router-dom";

const BackButton: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Hide the button if the previous page is the login page
  if (location.state?.from?.pathname === "/login") {
    return null;
  }

  return (
    <Tooltip title="Retour">
      <IconButton
        onClick={() => navigate(-1)}
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          border: "1px solid rgba(0, 0, 0, 0.1)",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
          zIndex: 1000,
        }}
      >
        <ArrowBackIcon />
      </IconButton>
    </Tooltip>
  );
};

export default BackButton;
