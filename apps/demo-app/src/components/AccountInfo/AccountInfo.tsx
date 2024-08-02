// src/components/AccountInfo/AccountInfo.tsx
import type React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faQrcode } from '@fortawesome/free-solid-svg-icons';
import { formatEthereumAddress } from '@/utils/formatEthereumAddress';

interface AccountInfoProps {
  account: AccountType | null;
  onCopyClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onShareClick: () => void;
}

type AccountType = {
  keyId: string;
  address: string;
  // Add other properties as needed
};

const AccountInfo: React.FC<AccountInfoProps> = ({
  account,
  onCopyClick,
  onShareClick,
}) => {
  return (
    <div className="account-address-container">
      <div className="account">{account?.keyId || 'No account'}</div>
      <span className="account-address">
        {account ? formatEthereumAddress(account.address) : 'No address found'}
      </span>
      <button type="button" onClick={onCopyClick} className="copy-button">
        <FontAwesomeIcon icon={faCopy} />
      </button>
      <button type="button" onClick={onShareClick} className="share-button">
        <FontAwesomeIcon icon={faQrcode} />
      </button>
    </div>
  );
};

export default AccountInfo;
