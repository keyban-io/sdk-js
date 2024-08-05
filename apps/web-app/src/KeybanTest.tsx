import type { KeybanAccount } from '@keyban/sdk-react';
import { FormattedBalance, useKeyban } from '@keyban/sdk-react';
import React from 'react';
import Row from './components/Row';
import SerializedValue from './components/SerializedValue';
import TextField from './components/TextField';

export type KeybanTestProps = {
  testId: string;
};
export default function KeybanTest({ testId }: KeybanTestProps) {
  const keyban = useKeyban();

  const [account, setAccount] = React.useState<KeybanAccount>();

  const [userKeyId, setUserKeyId] = React.useState('dumb');
  const [signature, setSignature] = React.useState('');
  const [payload, setPayload] = React.useState('');
  const [balance, setBalance] = React.useState<bigint>();

  const handleInitDkg = () => {
    setAccount(undefined);
    setSignature('');
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
        <SerializedValue value={keyban} data-test-id={`${testId}:context`} />
      </fieldset>

      <fieldset>
        <legend>API status</legend>
        <SerializedValue
          value={keyban.apiStatus}
          data-test-id={`${testId}:api-status`}
        />
      </fieldset>

      <fieldset>
        <legend>Account</legend>

        <Row>
          <TextField
            label="Public key ID"
            value={userKeyId}
            onChange={setUserKeyId}
            data-test-id={`${testId}:key-id-input`}
          />

          <button
            type="button"
            onClick={handleInitDkg}
            data-test-id={`${testId}:dkg-action`}
          >
            Init dkg
          </button>
        </Row>

        {account && (
          <SerializedValue
            value={account}
            style={{ marginBlockStart: '1em' }}
            data-test-id={`${testId}:account`}
          />
        )}
      </fieldset>

      <fieldset>
        <legend>Client public key</legend>
        <SerializedValue
          value={account?.publicKey ?? ''}
          data-test-id={`${testId}:client-pub-key`}
        />
      </fieldset>

      <fieldset>
        <legend>Address</legend>

        <SerializedValue
          value={account?.address ?? ''}
          data-test-id={`${testId}:address`}
        />
      </fieldset>

      <fieldset>
        <legend>Signature</legend>

        <Row>
          <TextField
            label="Payload"
            value={payload}
            onChange={setPayload}
            data-test-id={`${testId}:payload-input`}
          />

          <button
            type="button"
            onClick={handleSign}
            data-test-id={`${testId}:sign-action`}
          >
            Sign
          </button>
        </Row>

        <SerializedValue
          value={signature}
          style={{ marginBlockStart: '1em' }}
          data-test-id={`${testId}:signature`}
        />
      </fieldset>

      <fieldset>
        <legend>Balance</legend>

        <Row>
          <button
            type="button"
            onClick={handleGetBalance}
            data-test-id={`${testId}:getBalance-action`}
          >
            Get balance
          </button>
        </Row>

        {balance != null && (
          <>
            <Row>
              <span>Balance:</span>
              <div data-test-id={`${testId}:balance`}>
                <FormattedBalance balance={balance} />
              </div>
            </Row>

            <Row>
              <span>Raw balance:</span>
              <SerializedValue
                value={balance?.toString()}
                style={{ flexGrow: 1 }}
                data-test-id={`${testId}:raw-balance`}
              />
            </Row>
          </>
        )}
      </fieldset>

      <fieldset>
        <legend>Currency</legend>

        <Row>
          <span>Currency name:</span>
          <SerializedValue
            value={keyban.client.chain.nativeCurrency.name}
            style={{ flexGrow: 1 }}
            data-test-id={`${testId}:currency-name`}
          />
        </Row>

        <Row>
          <span>Currency decimals:</span>
          <SerializedValue
            value={keyban.client.chain.nativeCurrency.decimals}
            style={{ flexGrow: 1 }}
            data-test-id={`${testId}:currency-decimals`}
          />
        </Row>
      </fieldset>
    </>
  );
}
