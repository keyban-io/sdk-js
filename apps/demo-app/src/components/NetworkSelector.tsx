import React from 'react';
import styled from 'styled-components';
import { Tooltip } from '@material-ui/core';

interface Network {
  id: string;
  name: string;
}

interface NetworkSelectorProps {
  networks: Network[];
  selectedNetworkId: string;
  onSelectNetwork: (networkId: string) => void;
}

const SelectorContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: var(--container-background-color);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  margin-bottom: 20px; /* Espacement des éléments */
`;

const Label = styled.label`
  margin-right: 10px;
  font-size: 1em;
  color: var(--primary);
`;

const Select = styled.select`
  padding: 5px;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  background-color: #fff;
  color: var(--primary);
  outline: none;

  &:focus {
    border-color: var(--primary-hover-color);
  }
`;

const NetworkSelector: React.FC<NetworkSelectorProps> = ({
  networks,
  selectedNetworkId,
  onSelectNetwork,
}) => {
  return (
    <SelectorContainer>
      <Tooltip title="Select Network" arrow>
        <Label htmlFor="network-select">Network:</Label>
      </Tooltip>
      <Select
        id="network-select"
        value={selectedNetworkId}
        onChange={(e) => onSelectNetwork(e.target.value)}
      >
        {networks.map((network) => (
          <option key={network.id} value={network.id}>
            {network.name}
          </option>
        ))}
      </Select>
    </SelectorContainer>
  );
};

export default NetworkSelector;
