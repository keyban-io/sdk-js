import type React from "react";
import { Select, MenuItem, FormControl, FormHelperText } from "@mui/material";

interface Network {
  id: string;
  name: string;
}

interface NetworkSelectorProps {
  networks: Network[];
  selectedNetworkId: string;
  onSelectNetwork: (networkId: string) => void;
}

const NetworkSelector: React.FC<NetworkSelectorProps> = ({
  networks,
  selectedNetworkId,
  onSelectNetwork,
}) => {
  return (
    <FormControl fullWidth size="small">
      <Select
        variant="standard"
        id="network-select"
        label="Network"
        value={selectedNetworkId}
        onChange={(e) => onSelectNetwork(e.target.value)}
      >
        {networks.map((network) => (
          <MenuItem key={network.id} value={network.id}>
            {network.name}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>Network</FormHelperText>
    </FormControl>
  );
};

export default NetworkSelector;
