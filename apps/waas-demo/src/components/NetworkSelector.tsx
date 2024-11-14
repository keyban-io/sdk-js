import type React from "react";

import { KeybanChain } from "@keyban/sdk-react";
import {
  FormControl,
  MenuItem,
  Select,
  Tooltip,
  useTheme,
} from "@mui/material";

interface NetworkSelectorProps {
  chain: KeybanChain;
  onChange: (chainId: KeybanChain) => void;
}

const NetworkSelector: React.FC<NetworkSelectorProps> = ({
  chain,
  onChange,
}) => {
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
          value={chain}
          onChange={(e) => onChange(e.target.value as KeybanChain)}
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
