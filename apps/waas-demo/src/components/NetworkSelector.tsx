import type React from 'react';
import {
  useEffect,
  useState,
} from 'react';

import { KeybanChain } from '@keyban/sdk-react';
import type { SelectChangeEvent } from '@mui/material';
import {
  FormControl,
  MenuItem,
  Select,
  Tooltip,
  useTheme,
} from '@mui/material';

interface NetworkSelectorProps {
  selectedChainId: KeybanChain;
  onSelectChain: (chainId: KeybanChain) => void;
}

const NetworkSelector: React.FC<NetworkSelectorProps> = ({
  selectedChainId,
  onSelectChain,
}) => {
  const [initialChain, setInitialChain] =
    useState<KeybanChain>(selectedChainId);

  useEffect(() => {
    const savedChain = localStorage.getItem("selectedChain");
    if (savedChain) {
      setInitialChain(savedChain as KeybanChain);
      onSelectChain(savedChain as KeybanChain);
    }
  }, [onSelectChain]);

  const handleChange = (event: SelectChangeEvent<KeybanChain>) => {
    const { value } = event.target;
    const chainId = value as KeybanChain;
    onSelectChain(chainId);
    localStorage.setItem("selectedChain", chainId); // Sauvegarde dans le localStorage
  };

  const theme = useTheme();

  const currentDomain = window.location.hostname;
  const shouldExcludeKeybanTestnet =
    currentDomain === "waas-demo.keyban.io" ||
    currentDomain === "waas-demo.demo.keyban.io";

  const availableChains = shouldExcludeKeybanTestnet
    ? Object.values(KeybanChain).filter((chain) => chain !== "KeybanTestnet")
    : Object.values(KeybanChain);

  return (
    <Tooltip title="Current blockchain" placement="left-start" arrow>
      <FormControl fullWidth size="small">
        <Select
          variant="standard"
          id="network-select"
          label="Network"
          value={initialChain}
          onChange={handleChange}
          labelId="network-select-label"
          inputProps={{ "aria-label": "Network Selector" }}
          sx={{ maxWidth: 140, color: theme.palette.secondary.dark, mr: 1 }}
        >
          {availableChains.map((chain) => (
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
