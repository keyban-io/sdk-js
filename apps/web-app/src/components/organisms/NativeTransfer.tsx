import Row from "@/components/atoms/Row";
import SerializedValue from "@/components/atoms/SerializedValue";
import BigIntField from "@/components/molecules/BigIntField";
import TextField from "@/components/molecules/TextField";
import { Address, useKeybanAccount } from "@keyban/sdk-react";
import React from "react";

export type NativeTransferProps = { keyId: string };

export default function NativeTransfer({ keyId }: NativeTransferProps) {
  const [account, accountError] = useKeybanAccount(keyId, { suspense: true });
  if (accountError) throw accountError;

  const [value, setValue] = React.useState<bigint>(0n);
  const [recipient, setRecipient] = React.useState<string>("");
  const [hash, setHash] = React.useState<string>("");

  return (
    <fieldset>
      <legend>Native transfer</legend>

      <Row>
        <BigIntField
          label="Value"
          value={value?.toString()}
          onChange={setValue}
          data-test-id="NativeTransfer:value"
        />

        <TextField
          label="Recipient"
          value={recipient}
          onChange={setRecipient}
          data-test-id="NativeTransfer:recipient"
        />

        <button
          type="button"
          onClick={() =>
            account
              .transfer(recipient as Address, value)
              .then(setHash)
              .catch(console.error)
          }
          data-test-id="NativeTransfer:submit"
        >
          Transfer
        </button>
      </Row>

      <SerializedValue
        value={hash}
        style={{ marginBlockStart: "0.5em" }}
        data-test-id="NativeTransfer:hash"
      />
    </fieldset>
  );
}
