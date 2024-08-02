import type React from 'react';
import { FormattedBalance } from '@keyban/sdk-react';
import styled from 'styled-components';

interface BalanceInfoProps {
  balance: bigint | undefined;
  euroBalance: number | null;
}

const BalanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  background-color: var(--container-background-color);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
`;

const Balance = styled.span`
  font-size: 1.2em;
  margin-bottom: 5px;
`;

const EuroBalance = styled.span`
  font-size: 1em;
  color: var(--primary);
`;

const BalanceInfo: React.FC<BalanceInfoProps> = ({ balance, euroBalance }) => {
  return (
    <BalanceContainer>
      <Balance>
        {balance != null && <FormattedBalance balance={balance} />}
      </Balance>
      <EuroBalance>
        {euroBalance != null && <span>€{euroBalance.toFixed(2)}</span>}
      </EuroBalance>
    </BalanceContainer>
  );
};

export default BalanceInfo;
