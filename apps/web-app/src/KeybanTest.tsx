import {
  KeybanAccount,
  Address,
  FormattedBalance,
  useKeybanClient,
  useKeybanApiStatus,
} from "@keyban/sdk-react";
import React from "react";
import Row from "./components/Row";
import SerializedValue from "./components/SerializedValue";
import TextField from "./components/TextField";
import BigIntField from "./components/BigIntField";
import * as chains from "viem/chains";

export type KeybanTestProps = {
  testId: string;
};
export default function KeybanTest({ testId }: KeybanTestProps) {
  const client = useKeybanClient();
  const { nativeCurrency } = (chains as Record<string, chains.Chain>)[
    client.chain
  ];

  const [account, setAccount] = React.useState<KeybanAccount>();

  const [userKeyId, setUserKeyId] = React.useState("dumb");
  const [signature, setSignature] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [balance, setBalance] = React.useState<bigint>();
  const [transferValue, setTransferValue] = React.useState<bigint>(BigInt(0));
  const [transferRecipient, setTransferRecipient] = React.useState("");
  const [txHash, setTxHash] = React.useState("");

  const [tokenBalances, setTokenBalances] = React.useState<
    Awaited<ReturnType<KeybanAccount["getTokenBalances"]>>
  >([]);

  React.useEffect(() => {
    account?.getTokenBalances().then(setTokenBalances);
  }, [client, account]);

  const handleInitDkg = () => {
    setAccount(undefined);
    setSignature("");
    setBalance(undefined);

    client.initialize(userKeyId).then(setAccount).catch(console.error);
  };

  const handleSign = () =>
    account?.signMessage(message).then(setSignature).catch(console.error);

  const handleGetBalance = () =>
    account?.getBalance().then(setBalance).catch(console.error);

  const handleTransfer = () =>
    account
      ?.transfer(transferRecipient as Address, transferValue)
      .then(setTxHash)
      .catch(console.error);

  return (
    <>
      <fieldset>
        <legend>Context</legend>
        <SerializedValue value={client} data-test-id={`${testId}:context`} />
      </fieldset>

      <fieldset>
        <legend>API status</legend>
        <SerializedValue
          value={useKeybanApiStatus()}
          data-test-id={`${testId}:api-status`}
        />
      </fieldset>

      <fieldset>
        <legend>Account</legend>

        <Row>
          <TextField
            label="Public key ID"
            value={userKeyId}
            onChange={setUserKeyId}
            data-test-id={`${testId}:key-id-input`}
          />

          <button
            type="button"
            onClick={handleInitDkg}
            data-test-id={`${testId}:dkg-action`}
          >
            Init dkg
          </button>
        </Row>

        {account && (
          <SerializedValue
            value={account}
            style={{ marginBlockStart: "1em" }}
            data-test-id={`${testId}:account`}
          />
        )}
      </fieldset>

      <fieldset>
        <legend>Client public key</legend>
        <SerializedValue
          value={account?.publicKey ?? ""}
          data-test-id={`${testId}:client-pub-key`}
        />
      </fieldset>

      <fieldset>
        <legend>Address</legend>

        <SerializedValue
          value={account?.address ?? ""}
          data-test-id={`${testId}:address`}
        />
      </fieldset>

      <fieldset>
        <legend>Signature</legend>

        <Row>
          <TextField
            label="Message"
            value={message}
            onChange={setMessage}
            data-test-id={`${testId}:message-input`}
          />

          <button
            type="button"
            onClick={handleSign}
            data-test-id={`${testId}:sign-action`}
          >
            Sign
          </button>
        </Row>

        <SerializedValue
          value={signature}
          style={{ marginBlockStart: "1em" }}
          data-test-id={`${testId}:signature`}
        />
      </fieldset>

      <fieldset>
        <legend>Balance</legend>

        <Row>
          <button
            type="button"
            onClick={handleGetBalance}
            data-test-id={`${testId}:getBalance-action`}
          >
            Get balance
          </button>
        </Row>

        {balance != null && (
          <>
            <Row>
              <span>Balance:</span>
              <div data-test-id={`${testId}:balance`}>
                <FormattedBalance balance={balance} />
              </div>
            </Row>

            <Row>
              <span>Raw balance:</span>
              <SerializedValue
                value={balance}
                style={{ flexGrow: 1 }}
                data-test-id={`${testId}:raw-balance`}
              />
            </Row>
          </>
        )}
      </fieldset>

      <fieldset>
        <legend>Currency</legend>

        <Row>
          <span>Currency name:</span>
          <SerializedValue
            value={nativeCurrency.name}
            style={{ flexGrow: 1 }}
            data-test-id={`${testId}:currency-name`}
          />
        </Row>

        <Row>
          <span>Currency decimals:</span>
          <SerializedValue
            value={nativeCurrency.decimals}
            style={{ flexGrow: 1 }}
            data-test-id={`${testId}:currency-decimals`}
          />
        </Row>
      </fieldset>
      <fieldset>
        <legend>Transfer {nativeCurrency.name}</legend>

        <Row>
          <BigIntField
            label="Value"
            value={transferValue?.toString()}
            onChange={setTransferValue}
            data-test-id={`${testId}:transfer-value-input`}
          />

          <TextField
            label="TransferRecipient"
            value={transferRecipient}
            onChange={setTransferRecipient}
            data-test-id={`${testId}:transfer-recipient-input`}
          />

          <button
            type="button"
            onClick={handleTransfer}
            data-test-id={`${testId}:transfer-action`}
          >
            Transfer
          </button>
        </Row>

        <SerializedValue
          value={txHash}
          style={{ marginBlockStart: "1em" }}
          data-test-id={`${testId}:tx-hash`}
        />
      </fieldset>

      <fieldset>
        <legend>Non native currency</legend>

        {tokenBalances.map(({ token, balance }) => (
          <fieldset
            key={token.address}
            data-test-id={`${testId}:token:${token.address}`}
          >
            <legend>{token.name}</legend>

            <Row>
              <span>Address:</span>
              <SerializedValue
                value={token.address}
                style={{ flexGrow: 1 }}
                data-test-id={`${testId}:token-address`}
              />
            </Row>

            <Row style={{ marginBlockStart: "1em" }}>
              <span>Balance:</span>
              <SerializedValue
                value={balance}
                style={{ flexGrow: 1 }}
                data-test-id={`${testId}:token-balance`}
              />
              <SerializedValue
                value={token.symbol}
                data-test-id={`${testId}:token-symbol`}
              />
            </Row>
          </fieldset>
        ))}
      </fieldset>
    </>
  );
}
