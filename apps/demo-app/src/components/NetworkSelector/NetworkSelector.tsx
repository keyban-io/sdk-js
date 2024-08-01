// src/components/NetworkSelector/NetworkSelector.tsx
import React from 'react';

interface NetworkSelectorProps {
  network: string;
  onNetworkChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const NetworkSelector: React.FC<NetworkSelectorProps> = ({
  network,
  onNetworkChange,
}) => {
  return (
    <div className="network-select">
      <label htmlFor="network">Network:</label>
      <select id="network" value={network} onChange={onNetworkChange}>
        <option value="Polygon Testnet Amoy">Polygon Testnet Amoy</option>
        <option value="Polygon Mainnet">Polygon Mainnet</option>
      </select>
    </div>
  );
};

export default NetworkSelector;
