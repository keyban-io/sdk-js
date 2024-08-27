import type React from 'react';
import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { formatEthereumAddress } from '@/utils/formatEthereumAddress';
import {
  faCheck,
  faCopy,
  faEdit,
  faQrcode,
  faSliders,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useKeybanAccount } from '@keyban/sdk-react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material/Select';

interface AccountInfoProps {
  keyId: string;
}

const AccountInfo: React.FC<AccountInfoProps> = ({ keyId }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [account, accountError] = useKeybanAccount(keyId, {
    suspense: true,
  });
  if (accountError) throw accountError;

  const handleShareAddressClick = () => {
    navigate(`/qr-code?address=${account?.address}`);
  };
  const handleKeyIdChange = () => {
    console.log("Key edition is still not implemented");
  };

  const handleRenameClick = () => {
    if (isEditing) {
      console.log("Key edition is still not implemented");
    }
    setIsEditing(!isEditing);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleRenameClick();
    }
  };

  const handleCopyClick = () => {
    if (account?.address) {
      navigator.clipboard.writeText(account.address);
    }
  };

  const [age, setAge] = useState<number | string>("");

  const handleChange = (event: SelectChangeEvent<typeof age>) => {
    setAge(Number(event.target.value) || "");
  };

  const handleOpenAdvancedOption = () => {
    setOpen(true);
  };

  const handleClose = (
    _event: React.SyntheticEvent<unknown>,
    reason?: string,
  ) => {
    if (reason !== "backdropClick") {
      setOpen(false);
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
          <IconButton color="primary" size="small" onClick={handleRenameClick}>
            <FontAwesomeIcon icon={isEditing ? faCheck : faEdit} />
          </IconButton>
        </Tooltip>
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center">
        <Tooltip title={account?.address} arrow>
          <Typography variant="body1">
            {account
              ? formatEthereumAddress(account.address)
              : "No address found"}
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
        <Tooltip title="Advanced options" arrow>
          <IconButton
            color="primary"
            size="small"
            onClick={handleOpenAdvancedOption}
          >
            <FontAwesomeIcon icon={faSliders} />
          </IconButton>
        </Tooltip>

        <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
          <DialogTitle>Fill the form</DialogTitle>
          <DialogContent>
            <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel htmlFor="demo-dialog-native">Age</InputLabel>
                <Select
                  native
                  value={age}
                  onChange={handleChange}
                  input={<OutlinedInput label="Age" id="demo-dialog-native" />}
                >
                  <option aria-label="None" value="" />
                  <option value={10}>Ten</option>
                  <option value={20}>Twenty</option>
                  <option value={30}>Thirty</option>
                </Select>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-dialog-select-label">Age</InputLabel>
                <Select
                  labelId="demo-dialog-select-label"
                  id="demo-dialog-select"
                  value={age}
                  onChange={handleChange}
                  input={<OutlinedInput label="Age" />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Ok</Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </Stack>
  );
};

export default AccountInfo;
