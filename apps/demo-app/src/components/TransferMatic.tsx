import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import type { KeybanAccount } from '@keyban/sdk-react';

const WalletDashboard = styled.div`
  padding: 20px;
  background-color: var(--primary-lightest);
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 20px;
`;

const Notification = styled.span`
  cursor: pointer;
  color: var(--primary);
`;

const Section = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const FormField = styled.div`
  margin-bottom: 15px;
  text-align: left;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: var(--primary);
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  font-size: 1rem;
  box-sizing: border-box;
`;

const Button = styled.button`
  margin-top: 20px;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  display: block;
  margin: 20px auto;
  min-width: 30%;

  &:hover {
    background-color: var(--primary-hover-color);
  }
`;

const BackButton = styled(Button)`
  margin-top: 20px;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
  display: block;
  margin: 20px auto;
  min-width: 30%;

  &:hover {
    background-color: var(--primary-hover-color);
  }
`;

const ErrorMessage = styled.p`
  color: var(--error-color);
  margin-top: 20px;
`;

const SuccessMessage = styled.p`
  color: var(--success-color);
  margin-top: 20px;
`;

const TransferMatic: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleTransfer = async () => {
    setError(null);
    setTransactionHash(null);

    try {
      if (!state?.account) {
        throw new Error('Account not provided');
      }

      // Debugging: Check if the transfer method is available
      console.log(state.account);

      if (typeof state.account.transfer !== 'function') {
        throw new Error('Transfer method not available on account object');
      }

      const valueInWei = BigInt(Number(amount) * 10 ** 18); // Convert MATIC to Wei
      const txHash = await state.account.transfer(recipient, valueInWei);
      setTransactionHash(txHash);
    } catch (err) {
      setError(`Transfer failed: ${(err as Error).message}`);
    }
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <WalletDashboard>
      <Header>
        <span>Keyban WAAS Demo</span>
        <Notification>
          <FontAwesomeIcon icon={faBell} />
        </Notification>
      </Header>
      <Section>
        <FormField>
          <Label>Recipient Address</Label>
          <Input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="0xRecipientAddress"
          />
        </FormField>
        <FormField>
          <Label>Amount (MATIC)</Label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
          />
        </FormField>
        <Button onClick={handleTransfer}>Send MATIC</Button>
        {transactionHash && (
          <SuccessMessage>
            Transaction successful! Hash: {transactionHash}
          </SuccessMessage>
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <BackButton onClick={handleBackClick}>Back to Dashboard</BackButton>
      </Section>
    </WalletDashboard>
  );
};

export default TransferMatic;
