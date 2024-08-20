import type React from "react";
import { FormattedBalance } from "@keyban/sdk-react";
import styled from "@emotion/styled";
import { Tooltip } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

interface BalanceInfoProps {
  balance: bigint | undefined;
  euroBalance: number | null;
  onSend: () => void;
}

const BalanceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  align-items: center;
  margin-bottom: 10px;
`;

const Balance = styled.span`
  font-size: 1.2em;
  margin-bottom: 5px;
`;

const EuroBalance = styled.span`
  font-size: 1em;
  color: var(--primary);
`;

const SendButton = styled.button`
  background: none;
  border: none;
  color: var(--primary);
  cursor: pointer;
  font-size: 1.2em;
  display: flex;
  align-items: center;
  margin-top: 10px;

  &:hover {
    color: var(--primary-hover-color);
  }

  .fa {
    margin-left: 5px;
  }
`;

const BalanceInfo: React.FC<BalanceInfoProps> = ({
  balance,
  euroBalance,
  onSend,
}) => {
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
      <Tooltip title="Send" arrow>
        <SendButton type="button" onClick={onSend}>
          Send
          <FontAwesomeIcon className="fa" icon={faPaperPlane} />
        </SendButton>
      </Tooltip>
    </BalanceContainer>
  );
};

export default BalanceInfo;
