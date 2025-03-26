import { useKeybanAccount } from "@keyban/sdk-react";
import React from "react";
import { useErrorBoundary } from "react-error-boundary";

import Row from "~/components/atoms/Row";
import SerializedValue from "~/components/atoms/SerializedValue";
import TextField from "~/components/molecules/TextField";

export default function TppClaim() {
  const { showBoundary } = useErrorBoundary();

  const [account, accountError] = useKeybanAccount();
  if (accountError) throw accountError;

  const [tppId, setTppId] = React.useState("");
  const [txHash, setTxHash] = React.useState("");

  const handleClaim = React.useCallback(async () => {
    account
      .tppClaim(tppId)
      .then(({ transactionHash }) => transactionHash)
      .then(setTxHash)
      .catch(showBoundary);
  }, [showBoundary, tppId, account]);

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

      <SerializedValue
        label="Tx hash"
        value={txHash}
        data-test-id="TppClaim:txHash"
      />
    </fieldset>
  );
}
