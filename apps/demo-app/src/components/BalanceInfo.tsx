import type React from 'react';
import { FormattedBalance } from '@keyban/sdk-react';
import styled from 'styled-components';
import { Tooltip } from '@material-ui/core';

interface BalanceInfoProps {
  balance: bigint | undefined;
  euroBalance: number | null;
}

const BalanceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; /* Ajout pour centrer horizontalement */
  padding: 10px;
  background-color: var(--container-background-color);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f9f9f9;
  }
`;

const BalanceDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 10px;
`;

const Balance = styled.span`
  font-size: 1.2em;
`;

const EuroBalance = styled.span`
  font-size: 1em;
  color: var(--primary);
`;

const BalanceInfo: React.FC<BalanceInfoProps> = ({ balance, euroBalance }) => {
  return (
    <BalanceContainer>
      <BalanceDetails>
        <Tooltip title="Cryptocurrency Balance" arrow>
          <Balance>
            {balance != null && <FormattedBalance balance={balance} />}
          </Balance>
        </Tooltip>
        <Tooltip title="Equivalent Euro Balance" arrow>
          <EuroBalance>
            {euroBalance != null && <span>€{euroBalance.toFixed(2)}</span>}
          </EuroBalance>
        </Tooltip>
      </BalanceDetails>
    </BalanceContainer>
  );
};

export default BalanceInfo;
