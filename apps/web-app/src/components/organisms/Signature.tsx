import Row from "@/components/atoms/Row";
import SerializedValue from "@/components/atoms/SerializedValue";
import TextField from "@/components/molecules/TextField";
import { useKeybanAccount } from "@keyban/sdk-react";
import React from "react";
import { useErrorBoundary } from "react-error-boundary";

export type SignatureProps = { keyId: string };
export default function Signature({ keyId }: SignatureProps) {
  const { showBoundary } = useErrorBoundary();

  const [account, accountError] = useKeybanAccount(keyId, { suspense: true });
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
          data-test-id="Signature:message"
        />

        <button
          type="button"
          onClick={() =>
            account
              .signMessage(message)
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
