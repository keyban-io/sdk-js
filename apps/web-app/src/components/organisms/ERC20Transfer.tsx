import {
  Address,
  FeesEstimation,
  FormattedBalance,
  useKeybanAccount,
} from "@keyban/sdk-react";
import React from "react";
import { useErrorBoundary } from "react-error-boundary";

import Row from "~/components/atoms/Row";
import SerializedValue from "~/components/atoms/SerializedValue";
import TextField from "~/components/molecules/TextField";

export default function ERC20Transfer() {
  const { showBoundary } = useErrorBoundary();

  const [account, accountError] = useKeybanAccount();
  if (accountError) throw accountError;

  const [value, setValue] = React.useState("0");
  const [contractAddress, setContractAddress] = React.useState("");
  const [recipient, setRecipient] = React.useState("");
  const [hash, setHash] = React.useState("");
  const [estimation, setEstimation] = React.useState<FeesEstimation>();

  return (
    <fieldset>
      <legend>ERC20 transfer</legend>

      <TextField
        label="Contract Address"
        value={contractAddress}
        onChange={setContractAddress}
        data-test-id="ERC20Transfer:contractAddress"
      />

      <Row>
        <TextField
          label="Value"
          type="number"
          value={value}
          onChange={setValue}
          style={{ marginBlock: 0 }}
          data-test-id="ERC20Transfer:rawValue"
        />
      </Row>

      <TextField
        label="Recipient"
        value={recipient}
        onChange={setRecipient}
        data-test-id="ERC20Transfer:recipient"
      />

      <Row>
        <button
          type="button"
          onClick={() =>
            account
              .estimateERC20Transfer({
                contractAddress: contractAddress as Address,
                to: recipient as Address,
                value: BigInt(value),
              })
              .then(setEstimation)
              .catch(showBoundary)
          }
          data-test-id="ERC20Transfer:estimate:submit"
        >
          Estimate max tx fees
        </button>
      </Row>

      {estimation && (
        <Row>
          <SerializedValue
            label="Estimation"
            value={estimation.maxFees}
            style={{ flexGrow: 1 }}
            data-test-id="ERC20Transfer:estimate:rawValue"
          />

          <div data-test-id="ERC20Transfer:estimate:formattedValue">
            <FormattedBalance
              balance={{ raw: estimation.maxFees, isFees: true }}
            />
          </div>
        </Row>
      )}

      <Row>
        <button
          type="button"
          onClick={() =>
            account
              .transferERC20({
                contractAddress: contractAddress as Address,
                to: recipient as Address,
                value: BigInt(value),
                txOptions: {
                  maxFeePerGas: estimation?.details.maxFeePerGas,
                  maxPriorityFeePerGas:
                    estimation?.details.maxPriorityFeePerGas,
                },
              })
              .then(setHash)
              .catch(showBoundary)
          }
          data-test-id="ERC20Transfer:submit"
        >
          Transfer
        </button>
      </Row>

      <SerializedValue
        label="Tx hash"
        value={hash}
        style={{ flexGrow: 1 }}
        data-test-id="ERC20Transfer:hash"
      />
    </fieldset>
  );
}
