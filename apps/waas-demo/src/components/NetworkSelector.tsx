import { KeybanNetwork } from "@keyban/sdk-react";
import {
  FormControl,
  MenuItem,
  Select,
  Tooltip,
  useTheme,
} from "@mui/material";
import type React from "react";

interface NetworkSelectorProps {
  network: KeybanNetwork;
  onChange: (chainId: KeybanNetwork) => void;
}

const NetworkSelector: React.FC<NetworkSelectorProps> = ({
  network,
  onChange,
}) => {
  const theme = useTheme();

  const currentDomain = window.location.hostname;
  const shouldExcludeDevChains =
    currentDomain === "waas-demo.keyban.io" ||
    currentDomain === "waas-demo.staging.keyban.fr";

  const availableChains = shouldExcludeDevChains
    ? Object.values(KeybanNetwork).filter(
        (network) =>
          network !== KeybanNetwork.EthereumAnvil &&
          network !== KeybanNetwork.StarknetDevnet,
      )
    : Object.values(KeybanNetwork);

  return (
    <Tooltip title="Current blockchain" placement="left-start" arrow>
      <FormControl fullWidth size="small">
        <Select
          variant="standard"
          id="network-select"
          label="Network"
          value={network}
          onChange={(e) => onChange(e.target.value as KeybanNetwork)}
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
