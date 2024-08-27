import type React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import QRCode from "qrcode.react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { Stack, Typography, IconButton, Button } from "@mui/material";

const QRCodePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const address = new URLSearchParams(location.search).get("address");

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h4">Keyban WAAS Demo</Typography>
        <IconButton color="primary">
          <FontAwesomeIcon icon={faBell} />
        </IconButton>
      </Stack>
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={4}
      >
        <Typography variant="h6">
          {address
            ? "Share this QR code with your friends so they can easily access your address."
            : null}
        </Typography>
        <Typography variant="body1">
          {address || "No address provided"}
        </Typography>
        {address ? <QRCode value={address} size={256} level="H" /> : null}
        <Button variant="contained" onClick={handleBackClick}>
          Back to Dashboard
        </Button>
      </Stack>
    </Stack>
  );
};

export default QRCodePage;
