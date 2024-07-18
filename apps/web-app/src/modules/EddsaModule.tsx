import {
  type EddsaClientShare,
  KeybanEddsaReactContext,
  KeybanLocalStorage,
  useKeybanEddsa,
} from '@keyban/sdk-react';
import { useState } from 'react';
import { ActionBox, AssertionBox, InputBox, styles } from './common';

const keybanLocalStorage = new KeybanLocalStorage<EddsaClientShare>();

export const EddsaModule = () => {
  const [userKeyId, setUserKeyId] = useState('dumb');
  const [signature, setSignature] = useState('');
  const [payload, setPayload] = useState('');
  const { initialize, knownAccounts, clientStatus } = useKeybanEddsa();

  const handleAccCreation = async () => {
    if (!userKeyId) return;
    try {
      await initialize(keybanLocalStorage, userKeyId);
    } catch (e) {
      console.error('eddsaInitialize', e);
    }
  };

  const handleSignature = async () => {
    const firstAcc = knownAccounts[0];
    if (firstAcc) {
      try {
        const signature = await firstAcc.signPayload(payload);
        setSignature(signature);
      } catch (error) {
        console.error('eddsaSign', error);
      }
    } else {
      alert('Invoke DKG first');
    }
  };

  return (
    <>
      <KeybanEddsaReactContext.Consumer>
        {(value) => <p style={{ marginTop: 100 }}>{JSON.stringify(value)}</p>}
      </KeybanEddsaReactContext.Consumer>
      <div style={styles.container}>
        <AssertionBox
          humanDescription="Client health check result"
          testId="eddsa-client-health"
          value={clientStatus}
        />
        <AssertionBox
          humanDescription="Unsafe storage is initialized"
          testId="eddsa-unsafe-storage"
          value={keybanLocalStorage ? 'on' : 'off'}
        />
        <AssertionBox
          humanDescription="First account client secret share"
          testId="eddsa-secret-share"
          value={knownAccounts[0]?.secretShare?.keypair}
        />
        <AssertionBox
          humanDescription="First account client public key"
          testId="eddsa-client-pub-key"
          value={knownAccounts[0]?.clientPublicKey}
        />
        <AssertionBox
          humanDescription="First account server public key"
          testId="eddsa-server-pub-key"
          value={knownAccounts[0]?.serverPublicKey}
        />
        <AssertionBox
          humanDescription="First account signature"
          testId="eddsa-signature"
          value={signature}
        />
        <ActionBox
          humanDescription="Button to sign with EDDSA dkg"
          actionp="Start sign"
          testId="eddsa-start-eddsa-sign-action"
          onTap={handleSignature}
        />
        <ActionBox
          humanDescription="Button to init EDDSA dkg process"
          actionp="Start dkg"
          testId="eddsa-start-eddsa-dkg-action"
          onTap={handleAccCreation}
        />
        <ActionBox
          humanDescription="Button to sign"
          actionp="Start signing"
          testId="eddsa-start-eddsa-add-action"
          onTap={handleSignature}
        />
        <InputBox
          humanDescription="Provided public key"
          testId="eddsa-input-key-id"
          value={userKeyId}
          setValue={setUserKeyId}
        />
        <InputBox
          humanDescription="Provided payload to signature"
          testId="eddsa-signature-payload"
          value={payload}
          setValue={setPayload}
        />
      </div>
    </>
  );
};
