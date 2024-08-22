import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useKeybanClient } from "@keyban/sdk-react";
import type { Address, KeybanAccount } from "@keyban/sdk-react";

const TranserMaticPage = styled.div`
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

const LoadingIcon = styled(FontAwesomeIcon)`
  margin-left: 10px;
  animation: spin 1s infinite linear;
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const TransactionLink = styled.a`
  color: var(--primary);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const TransferMatic: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [account, setAccount] = useState<KeybanAccount | null>(null);
  const [loading, setLoading] = useState(true);
  const [isTransferring, setIsTransferring] = useState(false);
  const client = useKeybanClient();

  useEffect(() => {
    if (state?.keyId) {
      client
        .initialize(state.keyId)
        .then((initializedAccount) => {
          setAccount(initializedAccount);
          setLoading(false);
        })
        .catch((error) => {
          setError(`Failed to initialize account: ${error.message}`);
          setLoading(false);
        });
    } else {
      setError("Key ID not provided");
      setLoading(false);
    }
  }, [client, state?.keyId]);

  const handleTransfer = async () => {
    setError(null);
    setTransactionHash(null);
    setIsTransferring(true);

    if (!account) {
      setError("Account not initialized");
      setIsTransferring(false);
      return;
    }

    try {
      const valueInWei = BigInt(Number(amount) * 10 ** 18);
      const txHash = await account.transfer(recipient as Address, valueInWei);
      setTransactionHash(txHash);
    } catch (err) {
      setError(`Transfer failed: ${(err as Error).message}`);
    } finally {
      setIsTransferring(false);
    }
  };

  const handleBackClick = () => {
    navigate("/");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <TranserMaticPage>
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
        <Button onClick={handleTransfer} disabled={isTransferring}>
          Send MATIC
          {isTransferring && <LoadingIcon icon={faSpinner} />}
        </Button>
        {transactionHash && (
          <SuccessMessage>
            Transaction successful! Hash:{" "}
            <TransactionLink
              href={`https://amoy.polygonscan.com/tx/${transactionHash}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {transactionHash}
            </TransactionLink>
          </SuccessMessage>
        )}
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <BackButton onClick={handleBackClick}>Back to Dashboard</BackButton>
      </Section>
    </TranserMaticPage>
  );
};

export default TransferMatic;
