import {
  type EcdsaClientShare,
  KeybanEcdsaReactContext,
  KeybanLocalStorage,
  useKeybanEcdsa,
} from '@keyban/sdk-react';
import { useState } from 'react';
import { ActionBox, AssertionBox, InputBox, styles } from './common';

const keybanLocalStorage = new KeybanLocalStorage<EcdsaClientShare>();

export const EcdsaModule = () => {
  const [userKeyId, setUserKeyId] = useState('dumb');
  // const [signature, setSignature] = useState("");
  // const [payload, setPayload] = useState("");
  const { clientStatus, knownAccounts, initialize } = useKeybanEcdsa();

  const handleAccCreation = async () => {
    if (!userKeyId) return;
    try {
      await initialize(keybanLocalStorage, userKeyId);
    } catch (e) {
      console.error('ecdsaInitialize', e);
    }
  };

  // const handleSignature = async () => {
  //   const firstAcc = knownAccounts[0];
  //   if (firstAcc) {
  //     try {
  //       const signature = await firstAcc.signPayload(payload);
  //       setSignature(signature);
  //     } catch (error) {
  //       console.error("ecdsaSign", error);
  //     }
  //   } else {
  //     alert("Invoke DKG first");
  //   }
  // };

  return (
    <>
      <KeybanEcdsaReactContext.Consumer>
        {(value) => <p style={{ marginTop: 100 }}>{JSON.stringify(value)}</p>}
      </KeybanEcdsaReactContext.Consumer>
      <div style={styles.container}>
        <AssertionBox
          humanDescription="Client health check result"
          testId="ecdsa-client-health"
          value={clientStatus}
        />
        <AssertionBox
          humanDescription="Unsafe storage is initialized"
          testId="ecdsa-unsafe-storage"
          value={keybanLocalStorage ? 'on' : 'off'}
        />
        {/* <AssertionBox */}
        {/*   humanDescription="First account client secret share" */}
        {/*   testId="secret-share" */}
        {/*   value={knownAccounts[0]?.secretShare?.keypair} */}
        {/* /> */}
        <AssertionBox
          humanDescription="First account client public key"
          testId="ecdsa-client-pub-key"
          value={knownAccounts[0]?.clientPublicKey}
        />
        {/* <AssertionBox */}
        {/*   humanDescription="First account server public key" */}
        {/*   testId="server-pub-key" */}
        {/*   value={knownAccounts[0]?.serverPublicKey} */}
        {/* /> */}
        {/* <AssertionBox */}
        {/*   humanDescription="First account signature" */}
        {/*   testId="signature" */}
        {/*   value={signature} */}
        {/* /> */}
        {/* <ActionBox */}
        {/*   humanDescription="Button to sign with ECDSA dkg" */}
        {/*   actionp="Start sign" */}
        {/*   testId="start-ecdsa-sign-action" */}
        {/*   onTap={handleSignature} */}
        {/* /> */}
        <ActionBox
          humanDescription="Button to init ECDSA dkg process"
          actionp="Start dkg"
          testId="ecdsa-start-ecdsa-dkg-action"
          onTap={handleAccCreation}
        />
        {/* <ActionBox */}
        {/*   humanDescription="Button to sign" */}
        {/*   actionp="Start signing" */}
        {/*   testId="start-ecdsa-add-action" */}
        {/*   onTap={handleSignature} */}
        {/* /> */}
        {/* <ActionBox */}
        {/*   humanDescription="Button to add" */}
        {/*   actionp="Start adding" */}
        {/*   testId="start-ecdsa-add-action" */}
        {/*   onTap={handleAdd} */}
        {/* /> */}
        <InputBox
          humanDescription="Provided public key"
          testId="ecdsa-input-key-id"
          value={userKeyId}
          setValue={setUserKeyId}
        />
        {/* <InputBox */}
        {/*   humanDescription="Provided payload to signature" */}
        {/*   testId="signature-payload" */}
        {/*   value={payload} */}
        {/*   setValue={setPayload} */}
        {/* /> */}
      </div>
    </>
  );
};
