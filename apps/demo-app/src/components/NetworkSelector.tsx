import type React from 'react';

import { KeybanChain } from '@keyban/sdk-react';
import type { SelectChangeEvent } from '@mui/material';
import {
  FormControl,
  MenuItem,
  Select,
  Tooltip,
} from '@mui/material';

interface NetworkSelectorProps {
  selectedChainId: KeybanChain;
  onSelectChain: (chainId: KeybanChain) => void;
}

const NetworkSelector: React.FC<NetworkSelectorProps> = ({
  selectedChainId,
  onSelectChain,
}) => {
  const handleChange = (event: SelectChangeEvent<KeybanChain>) => {
    const { value } = event.target;
    const chainId = value as KeybanChain;
    onSelectChain(chainId);
  };

  return (
    <Tooltip title="Current blockchain" placement="left-start" arrow>
      <FormControl fullWidth size="small">
        <Select
          variant="standard"
          id="network-select"
          label="Network"
          value={selectedChainId}
          onChange={handleChange}
          labelId="network-select-label"
          inputProps={{ "aria-label": "Network Selector" }}
        >
          {Object.values(KeybanChain).map((chain) => (
            <MenuItem key={chain} value={chain}>
              {chain}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Tooltip>
  );
};

export default NetworkSelector;
