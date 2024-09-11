import Row from "@/components/atoms/Row";
import SerializedValue from "@/components/atoms/SerializedValue";
import BigIntField from "@/components/molecules/BigIntField";
import TextField from "@/components/molecules/TextField";
import { Address, FormattedBalance, useKeybanAccount, FeesEstimation } from "@keyban/sdk-react";
import React from "react";

export type NativeTransferProps = { keyId: string };

export default function NativeTransfer({ keyId }: NativeTransferProps) {
  const [account, accountError] = useKeybanAccount(keyId, { suspense: true });
  if (accountError) throw accountError;

  const [value, setValue] = React.useState<bigint>(0n);
  const [recipient, setRecipient] = React.useState<string>("");
  const [hash, setHash] = React.useState<string>("");
  const [transferCost, setTransferCost] = React.useState<string>("");
  const [maxFeePerGas, setMaxFeePerGas] = React.useState<string>("");
  const [maxPriorityFeePerGas, setMaxPriorityFeePerGas] = React.useState<string>("");

  return (
    <fieldset>
      <legend>Native transfer</legend>

      <Row>
        <BigIntField
          label="Value"
          value={value?.toString()}
          onChange={setValue}
          data-test-id="NativeTransfer:rawValue"
        />
        <div data-test-id="NativeTransfer:formattedValue">
          <FormattedBalance balance={value} />
        </div>
      </Row>

      <Row>
        <TextField
          label="Recipient"
          value={recipient}
          onChange={setRecipient}
          data-test-id="NativeTransfer:recipient"
        />
      </Row>

      <Row>
        <button
          type="button"
          onClick={() =>
            account
              .estimateTransfer(recipient as Address, value)
              .then((estimation: FeesEstimation) => {
                setTransferCost(estimation.maxFees.toString());
                setMaxFeePerGas(estimation.details.maxFeePerGas.toString());
                setMaxPriorityFeePerGas(estimation.details.maxPriorityFeePerGas.toString());
              })
              .catch(console.error)
          }
          data-test-id="NativeTransfer:estimate:submit"
        >
          Estimate max tx fees
        </button>
      </Row>
      <Row>
        <span>Estimation:</span>
        <SerializedValue
          value={transferCost}
          style={{ flexGrow: 1 }}
          data-test-id="NativeTransfer:estimate:rawValue"
        />
        <div data-test-id="NativeTransfer:estimate:formattedValue">
          <FormattedBalance balance={BigInt(transferCost)} />
        </div>
      </Row>

      <Row>
        <button
          type="button"
          onClick={() =>
            account
              .transfer(
                recipient as Address,
                value,
                {
                    maxFeePerGas: maxFeePerGas? BigInt(maxFeePerGas): undefined,
                    maxPriorityFeePerGas: maxPriorityFeePerGas? BigInt(maxPriorityFeePerGas): undefined
                }
              )
              .then(setHash)
              .catch(console.error)
          }
          data-test-id="NativeTransfer:submit"
        >
          Transfer
        </button>
      </Row>
      <Row>
        <span>Hash:</span>
        <SerializedValue
          value={hash}
          style={{ flexGrow: 1 }}
          data-test-id="NativeTransfer:hash"
        />
      </Row>
    </fieldset>
  );
}
