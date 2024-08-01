// src/components/BalanceInfo/BalanceInfo.tsx
import type React from 'react';
import { FormattedBalance } from '@keyban/sdk-react';

interface BalanceInfoProps {
  balance: bigint | undefined;
  euroBalance: number | null;
}

const BalanceInfo: React.FC<BalanceInfoProps> = ({ balance, euroBalance }) => {
  return (
    <div className="balance-container">
      <span className="balance">
        {balance != null && <FormattedBalance balance={balance} />}
      </span>
      <span className="euro-balance">
        {euroBalance != null && <span>€{euroBalance.toFixed(2)}</span>}
      </span>
    </div>
  );
};

export default BalanceInfo;
