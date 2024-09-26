import React from 'react';

import { useErrorBoundary } from 'react-error-boundary';

import Row from '@/components/atoms/Row';
import SerializedValue from '@/components/atoms/SerializedValue';
import BigIntField from '@/components/molecules/BigIntField';
import TextField from '@/components/molecules/TextField';
import {
  Address,
  FeesEstimation,
  FormattedBalance,
  useKeybanAccount,
} from '@keyban/sdk-react';

export default function NativeTransfer() {
  const { showBoundary } = useErrorBoundary();

  const [account, accountError] = useKeybanAccount({ suspense: true });
  if (accountError) throw accountError;

  const [value, setValue] = React.useState(0n);
  const [recipient, setRecipient] = React.useState("");
  const [hash, setHash] = React.useState("");
  const [estimation, setEstimation] = React.useState<FeesEstimation>();

  return (
    <fieldset>
      <legend>Native transfer</legend>

      <Row>
        <BigIntField
          label="Value"
          value={value?.toString()}
          onChange={setValue}
          style={{ marginBlock: 0 }}
          data-test-id="NativeTransfer:value:input"
        />
        <div data-test-id="NativeTransfer:formattedValue">
          <FormattedBalance balance={value} />
        </div>
      </Row>

      <TextField
        label="Recipient"
        value={recipient}
        onChange={setRecipient}
        data-test-id="NativeTransfer:recipient"
      />

      <Row>
        <button
          type="button"
          onClick={() =>
            account
              .estimateTransfer(recipient as Address)
              .then(setEstimation)
              .catch(showBoundary)
          }
          data-test-id="NativeTransfer:estimate:submit"
        >
          Estimate max tx fees
        </button>
      </Row>

      {estimation && (
        <Row>
          <span>Estimation:</span>
          <SerializedValue
            value={estimation.maxFees}
            style={{ flexGrow: 1 }}
            data-test-id="NativeTransfer:estimate:rawValue"
          />

          <div data-test-id="NativeTransfer:estimate:formattedValue">
            <FormattedBalance balance={BigInt(estimation.maxFees)} />
          </div>
        </Row>
      )}

      <Row>
        <button
          type="button"
          onClick={() =>
            account
              .transfer(recipient as Address, value, {
                maxFeePerGas: estimation?.details.maxFeePerGas,
                maxPriorityFeePerGas: estimation?.details.maxPriorityFeePerGas,
              })
              .then(setHash)
              .catch(showBoundary)
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
