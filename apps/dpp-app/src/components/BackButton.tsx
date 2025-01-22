import React from "react";
import { IconButton, Tooltip, Box } from "@mui/material";
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
    <Box
      sx={{
        display: "flex",
        justifyContent: "left",
        width: "100%",
        marginLeft: 3,
      }}
    >
      <Box
        sx={{
          position: "fixed",
          top: 24,
          zIndex: 1000,
          backgroundColor: "black",
          borderRadius: "32px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Tooltip title="Retour">
          <IconButton
            onClick={() => navigate(-1)}
            sx={{
              color: "white",
            }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default BackButton;
