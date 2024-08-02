import type React from 'react';
import styled from 'styled-components';

interface NetworkSelectorProps {
  network: string;
  onNetworkChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const NetworkSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
`;

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const Select = styled.select`
  padding: 10px;
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  background-color: var(--primary);
  color: white;

  &:focus {
    outline: none;
    border-color: var(--primary);
  }
  &:hover {
    background-color: var(--primary-hover-color);
  }
`;

const NetworkSelector: React.FC<NetworkSelectorProps> = ({
  network,
  onNetworkChange,
}) => {
  return (
    <NetworkSelectContainer>
      <Label htmlFor="network">Network:</Label>
      <Select id="network" value={network} onChange={onNetworkChange}>
        <option value="Polygon Testnet Amoy">Polygon Testnet Amoy</option>
        <option value="Polygon Mainnet">Polygon Mainnet</option>
      </Select>
    </NetworkSelectContainer>
  );
};

export default NetworkSelector;
