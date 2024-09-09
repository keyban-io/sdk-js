import { QRCodeSVG } from 'qrcode.react';

import {
  Box,
  Link,
  Typography,
} from '@mui/material';

export default function IndexPage() {
  const path = "/join";
  const link = window.location.origin + path;

  return (
    <>
      <Typography align="center" variant="h5">
        Keyban Loyalty Program demo
      </Typography>
      <Box
        component="img"
        sx={{
          height: 236,
          width: 236,
          maxHeight: { xs: 236, md: 100 },
          maxWidth: { xs: 236, md: 100 },
        }}
        alt="Keyban logo"
        src="/keyban-logo-small.svg"
      />
      <Typography align="center" variant="h6">
        To join the Keyban loyalty program, scan the QR code below
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
