import { Box, Link, Typography } from "@mui/material";
import { QRCodeSVG } from "qrcode.react";

export default function IndexPage() {
  const path = "/join";
  const link = window.location.origin + path;

  return (
    <>
      <Typography align="center">
        To join our loyalty program, scan the QR code below
      </Typography>

      <Box borderRadius={4} p={2} bgcolor="white">
        <QRCodeSVG value={link} style={{ display: "block" }} />
      </Box>

      <Typography align="center">
        Use your camera to scan the code,
        <br />
        or visit the following link: <Link href={path}>{link}</Link>
      </Typography>
    </>
  );
}
