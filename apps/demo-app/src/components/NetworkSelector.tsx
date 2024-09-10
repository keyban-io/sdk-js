import type React from "react";

import { KeybanChain } from "@keyban/sdk-react"; // Import the KeybanChain type from the correct module
import { FormControl, FormHelperText, MenuItem, Select } from "@mui/material";

interface NetworkSelectorProps {
  selectedChainId: KeybanChain;
  onSelectChain: (chainId: KeybanChain) => void;
}

const NetworkSelector: React.FC<NetworkSelectorProps> = ({
  selectedChainId,
  onSelectChain,
}) => {
  return (
    <FormControl fullWidth size="small">
      <Select
        variant="standard"
        id="network-select"
        label="Network"
        value={selectedChainId}
        onChange={(e) => onSelectChain(e.target.value as KeybanChain)}
      >
        {Object.values(KeybanChain).map((chain) => (
          <MenuItem key={chain} value={chain}>
            {chain}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>Network</FormHelperText>
    </FormControl>
  );
};

export default NetworkSelector;
