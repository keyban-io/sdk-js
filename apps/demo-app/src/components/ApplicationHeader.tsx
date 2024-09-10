import React from 'react';

import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { KeybanChain } from '@keyban/sdk-react';
import {
  IconButton,
  Stack,
  Typography,
} from '@mui/material';

import NetworkSelector from './NetworkSelector';

type ApplicationHeaderProps = {
  selectedChainId: KeybanChain;
  onSelectChain: (chainId: KeybanChain) => void;
};

const ApplicationHeader: React.FC<ApplicationHeaderProps> = ({
  selectedChainId,
  onSelectChain,
}) => {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Stack>
        <Typography variant="h4">Keyban WAAS Demo</Typography>
      </Stack>
      <Stack direction="row" alignItems="center">
        <NetworkSelector
          selectedChainId={selectedChainId}
          onSelectChain={onSelectChain}
        />
        <IconButton color="primary">
          <FontAwesomeIcon icon={faBell} />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default ApplicationHeader;
