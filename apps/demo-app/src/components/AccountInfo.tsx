import type React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCopy,
  faQrcode,
  faEdit,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { formatEthereumAddress } from "@/utils/formatEthereumAddress";
import styled from "@emotion/styled";
import { Tooltip } from "@mui/material";

interface AccountInfoProps {
  account?: AccountType;
  onCopyClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onShareClick: () => void;
  onRenameKeyId: (newKeyId: string) => void;
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
  display: flex;
  align-items: center;
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

const KeyIdInput = styled.input`
  border: none;
  background: none;
  color: var(--primary);
  font-weight: bold;
  text-align: left;
  &:focus {
    outline: none;
  }
`;

const AccountInfo: React.FC<AccountInfoProps> = ({
  account,
  onCopyClick,
  onShareClick,
  onRenameKeyId,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [keyId, setKeyId] = useState(account?.keyId || "");

  const handleKeyIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyId(e.target.value);
  };

  const handleRenameClick = () => {
    if (isEditing) {
      onRenameKeyId(keyId);
    }
    setIsEditing(!isEditing);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleRenameClick();
    }
  };

  return (
    <AccountAddressContainer>
      <Tooltip title="Key ID" arrow>
        <Account>
          {isEditing ? (
            <KeyIdInput
              value={keyId}
              onChange={handleKeyIdChange}
              onBlur={handleRenameClick}
              onKeyDown={handleKeyDown}
              autoFocus
            />
          ) : (
            keyId || "No account"
          )}
          <Button type="button" onClick={handleRenameClick}>
            <FontAwesomeIcon icon={isEditing ? faCheck : faEdit} />
          </Button>
        </Account>
      </Tooltip>
      <Tooltip title="Ethereum Address" arrow>
        <AccountAddress>
          {account
            ? formatEthereumAddress(account.address)
            : "No address found"}
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
