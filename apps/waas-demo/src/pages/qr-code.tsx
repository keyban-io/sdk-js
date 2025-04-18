import { Button, Stack, Typography } from "@mui/material";
import { QRCodeSVG } from "qrcode.react";
import type React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const QRCodePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const address = new URLSearchParams(location.search).get("address");

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={4}
    >
      <Typography>
        {address
          ? "Share this QR code with your friends so they can easily access your address."
          : null}
      </Typography>
      <Typography variant="body1">
        {address || "No address provided"}
      </Typography>
      {address ? <QRCodeSVG value={address} size={256} level="H" /> : null}
      <Button variant="contained" onClick={handleBackClick} color="secondary">
        Back to Dashboard
      </Button>
    </Stack>
  );
};

export default QRCodePage;
