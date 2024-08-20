import React from "react";
import styled from "@emotion/styled";
import { Tooltip } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

interface Crypto {
  name: string;
  balance: number;
}

interface CryptoSectionProps {
  cryptos: Crypto[];
  onSend: (crypto: Crypto) => void;
}

const CryptoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
`;

const CryptoCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  padding: 1rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
    background-color: #f9f9f9;
  }
`;

const CryptoDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const CryptoName = styled.span`
  font-size: 1.2em;
  font-weight: bold;
`;

const CryptoBalance = styled.span`
  font-size: 1em;
  color: var(--primary);
`;

const SendButton = styled.button`
  background: none;
  border: none;
  color: var(--primary);
  cursor: pointer;
  font-size: 1.2em;
`;

const CryptoSection: React.FC<CryptoSectionProps> = ({ cryptos, onSend }) => {
  return (
    <CryptoContainer>
      {cryptos.map((crypto) => (
        <CryptoCard key={crypto.name}>
          <CryptoDetails>
            <Tooltip title={crypto.name} arrow>
              <CryptoName>{crypto.name}</CryptoName>
            </Tooltip>
            <Tooltip title="Balance" arrow>
              <CryptoBalance>{crypto.balance}</CryptoBalance>
            </Tooltip>
          </CryptoDetails>
          <Tooltip title="Send" arrow>
            <SendButton onClick={() => onSend(crypto)}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </SendButton>
          </Tooltip>
        </CryptoCard>
      ))}
    </CryptoContainer>
  );
};

export default CryptoSection;
