import { useKeybanAccount } from "@keyban/sdk-react";
import React from "react";
import { useErrorBoundary } from "react-error-boundary";

import Row from "~/components/atoms/Row";
import SerializedValue from "~/components/atoms/SerializedValue";
import TextField from "~/components/molecules/TextField";

export default function Signature() {
  const { showBoundary } = useErrorBoundary();

  const [account, accountError] = useKeybanAccount();
  if (accountError) throw accountError;

  const [message, setMessage] = React.useState("");
  const [signedMessage, setSignedMessage] = React.useState("");

  return (
    <fieldset>
      <legend>Signature</legend>

      <Row>
        <TextField
          label="Message"
          value={message}
          onChange={setMessage}
          style={{ marginBlock: 0 }}
          data-test-id="Signature:message"
        />

        <button
          type="button"
          onClick={() =>
            account
              .signMessage(message)
              .then(JSON.stringify)
              .then(setSignedMessage)
              .catch(showBoundary)
          }
          data-test-id="Signature:submit"
        >
          Sign
        </button>
      </Row>

      <SerializedValue
        value={signedMessage}
        data-test-id="Signature:signedMessage"
      />
    </fieldset>
  );
}
