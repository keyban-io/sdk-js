import { faCopy, faQrcode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useKeybanAccount } from "@keyban/sdk-react";
import {
  Alert,
  IconButton,
  Snackbar,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AccountInfo: React.FC = () => {
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false); // État pour le Snackbar
  const [account, accountError] = useKeybanAccount();
  if (accountError) throw accountError;

  const handleShareAddressClick = () => {
    navigate(`/qr-code?address=${account?.address}`);
  };

  const handleCopyClick = () => {
    if (account?.address) {
      navigator.clipboard.writeText(account.address);
      setOpenSnackbar(true); // Affiche le Snackbar après la copie
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); // Ferme le Snackbar
  };

  return (
    <Stack direction="column" justifyContent="center" alignItems="center">
      <Stack direction="row" spacing={1} alignItems="center">
        <Tooltip title="Your wallet address" arrow>
          <Typography variant="body1">
            {account ? account.address : "No address found"}
          </Typography>
        </Tooltip>
        <Tooltip title="Copy Address" arrow>
          <IconButton color="primary" size="small" onClick={handleCopyClick}>
            <FontAwesomeIcon icon={faCopy} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Share Address" arrow>
          <IconButton
            color="primary"
            size="small"
            onClick={handleShareAddressClick}
          >
            <FontAwesomeIcon icon={faQrcode} />
          </IconButton>
        </Tooltip>
      </Stack>

      {/* Ajout du Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Address copied to clipboard!
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default AccountInfo;
