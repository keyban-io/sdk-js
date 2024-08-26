import type React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faQrcode,
  faEdit,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { formatEthereumAddress } from "@/utils/formatEthereumAddress";
import {
  Tooltip,
  Typography,
  IconButton,
  TextField,
  Stack,
} from "@mui/material";

interface AccountInfoProps {
  account?: AccountType;
  onCopyClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onShareClick: () => void;
  onRenameKeyId: (newKeyId: string) => void;
}

type AccountType = {
  keyId: string;
  address: string;
};

const AccountInfo: React.FC<AccountInfoProps> = ({
  account,
  onCopyClick,
  onShareClick,
  onRenameKeyId,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [keyId, setKeyId] = useState(account?.keyId || "");

  const handleKeyIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyId(e.target.value);
  };

  const handleRenameClick = () => {
    if (isEditing) {
      onRenameKeyId(keyId);
    }
    setIsEditing(!isEditing);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleRenameClick();
    }
  };

  return (
    <Stack direction="row" justifyContent="space-between">
      <Stack direction="row" spacing={1} alignItems="center">
        <Tooltip title="Key ID" arrow>
          {isEditing ? (
            <TextField
              id="standard-basic"
              variant="standard"
              value={keyId}
              onChange={handleKeyIdChange}
              onBlur={handleRenameClick}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          ) : (
            <Typography variant="body1">{keyId || "No account"}</Typography>
          )}
        </Tooltip>
        <Tooltip title="Edit Key ID" arrow>
          <IconButton color="primary" onClick={handleRenameClick}>
            <FontAwesomeIcon icon={isEditing ? faCheck : faEdit} />
          </IconButton>
        </Tooltip>
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center">
        <Tooltip title="Ethereum Address" arrow>
          <Typography variant="body1">
            {account
              ? formatEthereumAddress(account.address)
              : "No address found"}
          </Typography>
        </Tooltip>
        <Tooltip title="Copy Address" arrow>
          <IconButton
            color="primary"
            onClick={onCopyClick}
            className="copy-button"
          >
            <FontAwesomeIcon icon={faCopy} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Share Address" arrow>
          <IconButton
            color="primary"
            onClick={onShareClick}
            className="share-button"
          >
            <FontAwesomeIcon icon={faQrcode} />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
};

export default AccountInfo;
