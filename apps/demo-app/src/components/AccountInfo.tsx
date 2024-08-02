import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faQrcode } from '@fortawesome/free-solid-svg-icons';
import { formatEthereumAddress } from '@/utils/formatEthereumAddress';
import styled from 'styled-components';
import { Tooltip } from '@material-ui/core';

interface AccountInfoProps {
  account: AccountType | null;
  onCopyClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onShareClick: () => void;
}

type AccountType = {
  keyId: string;
  address: string;
};

const AccountAddressContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: var(--container-background-color);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
`;

const Account = styled.div`
  flex: 1;
  font-weight: bold;
  text-align: left;
`;

const AccountAddress = styled.span`
  flex: 2;
  margin-left: 10px;
  text-align: right;
`;

const Button = styled.button`
  margin-left: 10px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--primary);
`;

const AccountInfo: React.FC<AccountInfoProps> = ({
  account,
  onCopyClick,
  onShareClick,
}) => {
  return (
    <AccountAddressContainer>
      <Tooltip title="Key ID" arrow>
        <Account>{account?.keyId || 'No account'}</Account>
      </Tooltip>
      <Tooltip title="Ethereum Address" arrow>
        <AccountAddress>
          {account
            ? formatEthereumAddress(account.address)
            : 'No address found'}
        </AccountAddress>
      </Tooltip>
      <Tooltip title="Copy Address" arrow>
        <Button type="button" onClick={onCopyClick} className="copy-button">
          <FontAwesomeIcon icon={faCopy} />
        </Button>
      </Tooltip>
      <Tooltip title="Share Address" arrow>
        <Button type="button" onClick={onShareClick} className="share-button">
          <FontAwesomeIcon icon={faQrcode} />
        </Button>
      </Tooltip>
    </AccountAddressContainer>
  );
};

export default AccountInfo;
