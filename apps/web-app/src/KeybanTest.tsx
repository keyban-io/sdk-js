import type { KeybanAccount } from "@keyban/sdk-react";
import { FormattedBalance, useKeyban } from "@keyban/sdk-react";
import React from "react";
import SerializedValue from "./components/SerializedValue";
import Row from "./components/Row";
import TextField from "./components/TextField";

export default function EcdsaTest() {
  const keyban = useKeyban();

  const [account, setAccount] = React.useState<KeybanAccount>();

  const [userKeyId, setUserKeyId] = React.useState("dumb");
  const [signature, setSignature] = React.useState("");
  const [payload, setPayload] = React.useState("");
  const [balance, setBalance] = React.useState<bigint>();

  const handleInitDkg = () => {
    setAccount(undefined);
    setSignature("");
    setBalance(undefined);

    keyban.client.initialize(userKeyId).then(setAccount).catch(console.error);
  };

  const handleSign = () =>
    account?.sign(payload).then(setSignature).catch(console.error);

  const handleGetBalance = () =>
    account?.getBalance().then(setBalance).catch(console.error);

  return (
    <>
      <fieldset>
        <legend>Context</legend>
        <SerializedValue value={keyban} data-test-id="context" />
      </fieldset>

      <fieldset>
        <legend>API status</legend>
        <SerializedValue value={keyban.apiStatus} data-test-id="api-status" />
      </fieldset>

      <fieldset>
        <legend>Account</legend>

        <Row>
          <TextField
            label="Public key ID"
            value={userKeyId}
            onChange={setUserKeyId}
            data-test-id="key-id-input"
          />

          <button
            type="button"
            onClick={handleInitDkg}
            data-test-id="dkg-action"
          >
            Init dkg
          </button>
        </Row>

        {account && (
          <SerializedValue
            value={account}
            style={{ marginBlockStart: "1em" }}
            data-test-id="account"
          />
        )}
      </fieldset>

      <fieldset>
        <legend>Client public key</legend>
        <SerializedValue
          value={account?.clientPublicKey ?? ""}
          data-test-id="client-pub-key"
        />
      </fieldset>

      <fieldset>
        <legend>Address</legend>

        <SerializedValue
          value={account?.address ?? ""}
          data-test-id="address"
        />
      </fieldset>

      <fieldset>
        <legend>Signature</legend>

        <Row>
          <TextField
            label="Payload"
            value={payload}
            onChange={setPayload}
            data-test-id="payload-input"
          />

          <button type="button" onClick={handleSign} data-test-id="sign-action">
            Sign
          </button>
        </Row>

        <SerializedValue
          value={signature}
          style={{ marginBlockStart: "1em" }}
          data-test-id="signature"
        />
      </fieldset>

      <fieldset>
        <legend>Balance</legend>

        <Row>
          <button
            type="button"
            onClick={handleGetBalance}
            data-test-id="getBalance-action"
          >
            Get balance
          </button>

          {balance != null && (
            <div data-test-id="balance">
              <FormattedBalance balance={balance} />
            </div>
          )}
        </Row>
      </fieldset>
    </>
  );
}
