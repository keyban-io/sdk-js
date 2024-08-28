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
import {
  KeybanChain,
  useKeybanAccount,
} from '@keyban/sdk-react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';

import { testEnvs } from '../lib/testData';
import EnvSelector from './EnvSelector';
import NetworkSelector from './NetworkSelector';

interface AccountInfoProps {
  keyId: string;
}

const AccountInfo: React.FC<AccountInfoProps> = ({ keyId }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedChainId, setSelectedChainId] = useState(
    KeybanChain.polygonAmoy,
  );
  const [selectedEnvId, setSelectedEnvId] = useState(testEnvs[0].id);
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

  const handleSelectChain = (chainId: KeybanChain) => {
    setSelectedChainId(chainId);
  };

  const handleSelectEnv = (envId: string) => {
    setSelectedEnvId(envId);
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
          <DialogTitle>Advanced options</DialogTitle>
          <DialogContent>
            <Stack>
              <NetworkSelector
                selectedChainId={selectedChainId}
                onSelectChain={handleSelectChain}
              />
              <EnvSelector
                envs={testEnvs}
                selectedEnvId={selectedEnvId}
                onSelectEnv={handleSelectEnv}
              />
            </Stack>
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
