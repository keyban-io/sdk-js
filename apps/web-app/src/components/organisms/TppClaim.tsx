import { useKeybanAccount, useKeybanClient } from "@keyban/sdk-react";
import React from "react";
import { useErrorBoundary } from "react-error-boundary";

import Row from "~/components/atoms/Row";
import SerializedValue from "~/components/atoms/SerializedValue";
import TextField from "~/components/molecules/TextField";

export default function TppClaim() {
  const { showBoundary } = useErrorBoundary();
  const client = useKeybanClient();

  const [account, accountError] = useKeybanAccount();
  if (accountError) throw accountError;

  const [tppId, setTppId] = React.useState("");
  const [result, setResult] = React.useState<{ transactionHash: string }>();

  const handleClaim = React.useCallback(async () => {
    client.tppClaim(tppId, account.address).then(setResult).catch(showBoundary);
  }, [showBoundary, client, tppId, account.address]);

  return (
    <fieldset data-test-id="TppClaim">
      <legend>TPP Claim</legend>

      <Row>
        <TextField
          label="TPP ID"
          value={tppId}
          onChange={setTppId}
          data-test-id="TppClaim:tppId"
          style={{ flexGrow: 1 }}
        />

        <button onClick={handleClaim} data-test-id="TppClaim:claim">
          Claim
        </button>
      </Row>

      <SerializedValue value={result} data-test-id="TppClaim:result" />
    </fieldset>
  );
}
