import React from "react";

import Row from "@/components/atoms/Row";
import SerializedValue from "@/components/atoms/SerializedValue";
import BigIntField from "@/components/molecules/BigIntField";
import TextField from "@/components/molecules/TextField";
import {
  Address,
  FormattedBalance,
  FeesEstimation,
  useKeybanAccount,
} from "@keyban/sdk-react";

export type ERC20TransferProps = { keyId: string };

export default function ERC20Transfer({ keyId }: ERC20TransferProps) {
  const [account, accountError] = useKeybanAccount(keyId, { suspense: true });
  if (accountError) throw accountError;

  const [value, setValue] = React.useState<bigint>(0n);
  const [contractAddress, setContractAddress] = React.useState<string>("");
  const [recipient, setRecipient] = React.useState<string>("");
  const [hash, setHash] = React.useState<string>("");
  const [transferCost, setTransferCost] = React.useState<string>("");
  const [maxFeePerGas, setMaxFeePerGas] = React.useState<string>("");
  const [maxPriorityFeePerGas, setMaxPriorityFeePerGas] = React.useState<string>("");

  return (
    <fieldset>
      <legend>ERC20 transfer</legend>

      <Row>
        <TextField
          label="Contract Address"
          value={contractAddress}
          onChange={setContractAddress}
          data-test-id="ERC20Transfer:contractAddress"
        />
      </Row>

      <Row>
        <BigIntField
          label="Value"
          value={value?.toString()}
          onChange={setValue}
          data-test-id="ERC20Transfer:rawValue"
        />
        <div data-test-id="ERC20Transfer:formattedValue">
          <FormattedBalance balance={value} />
        </div>
      </Row>

      <Row>
        <TextField
          label="Recipient"
          value={recipient}
          onChange={setRecipient}
          data-test-id="ERC20Transfer:recipient"
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
          data-test-id="ERC20Transfer:estimate:submit"
        >
          Estimate max tx fees
        </button>
      </Row>
      <Row>
        <span>Estimation:</span>
        <SerializedValue
          value={transferCost}
          style={{ flexGrow: 1 }}
          data-test-id="ERC20Transfer:estimate:rawValue"
        />
        <div data-test-id="ERC20Transfer:estimate:formattedValue">
          <FormattedBalance balance={BigInt(transferCost)} />
        </div>
      </Row>

      <Row>
        <button
          type="button"
          onClick={() =>
            account
              .transferERC20({
                  contractAddress: contractAddress as Address,
                  to: recipient as Address,
                  value,
                  txOptions: {
                    maxFeePerGas: maxFeePerGas? BigInt(maxFeePerGas): undefined,
                    maxPriorityFeePerGas: maxPriorityFeePerGas? BigInt(maxPriorityFeePerGas): undefined
                  }
                }
              )
              .then(setHash)
              .catch(console.error)
          }
          data-test-id="ERC20Transfer:submit"
        >
          Transfer
        </button>
      </Row>
      <Row>
        <span>Hash:</span>
        <SerializedValue
          value={hash}
          style={{ flexGrow: 1 }}
          data-test-id="ERC20Transfer:hash"
        />
      </Row>
    </fieldset>
  );
}
