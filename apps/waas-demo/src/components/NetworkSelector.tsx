import { KeybanChain } from "@keyban/sdk-react";
import {
  FormControl,
  MenuItem,
  Select,
  Tooltip,
  useTheme,
} from "@mui/material";
import type React from "react";

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
    currentDomain === "waas-demo.beta.keyban.fr";

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
          sx={{
            maxWidth: 140,
            color: theme.palette.secondary.contrastText,
            mr: 1,
            "& .MuiSelect-icon": {
              color: theme.palette.secondary.contrastText,
            },
            "&:before": {
              borderBottom: `1px solid ${theme.palette.secondary.contrastText}`,
            },
            "&:hover:not(.Mui-disabled):before": {
              borderBottom: `2px solid ${theme.palette.secondary.contrastText}`,
            },
            "&.Mui-focused:after": {
              borderBottom: `2px solid ${theme.palette.secondary.contrastText}`,
            },
            "&.Mui-focused .MuiSelect-select": {
              color: theme.palette.secondary.contrastText,
            },
          }}
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
