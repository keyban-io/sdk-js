import {
  KeybanEcdsaReactContext,
  KeybanLocalStorage,
  useKeybanEcdsa,
} from '@keyban/sdk-react';
import { ActionBox, AssertionBox, InputBox, styles } from './common';

const keybanLocalStorage = new KeybanLocalStorage();

export const EcdsaModule = () => {
  // const [userKeyId, setUserKeyId] = useState("dumb");
  // const [signature, setSignature] = useState("");
  // const [payload, setPayload] = useState("");
  const { clientStatus, ecdsaClient } = useKeybanEcdsa();

  const handleDumb = async () => {
    if (ecdsaClient?.wasmApi) {
      const dumb = await ecdsaClient.wasmApi.dkg('adf');
      console.log('hello from ecdsa wasm \n', dumb);
    }
  };
  // (window as any).ecdsa.dkg().then((res) => console.log(res, "ha"));

  // const handleAccCreation = async () => {
  //   if (!userKeyId) return;
  //   try {
  //     await initialize(keybanLocalStorage, userKeyId);
  //   } catch (e) {
  //     console.error("ecdsaInitialize", e);
  //   }
  // };
  //
  // const handleAdd = async () => {
  //   if (ecdsaClient) {
  //     alert(await ecdsaClient?.wasmApi.add(4, 4));
  //   }
  // };
  //
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
          testId="client-health"
          value={clientStatus}
        />
        <AssertionBox
          humanDescription="Unsafe storage is initialized"
          testId="unsafe-storage"
          value={keybanLocalStorage ? 'on' : 'off'}
        />
        <ActionBox
          humanDescription="Button to call dumb heath check with ECDSA dkg"
          actionp="Start dumb"
          testId="start-ecdsa-dumb-action"
          onTap={handleDumb}
        />

        {/* <AssertionBox */}
        {/*   humanDescription="First account client secret share" */}
        {/*   testId="secret-share" */}
        {/*   value={knownAccounts[0]?.secretShare?.keypair} */}
        {/* /> */}
        {/* <AssertionBox */}
        {/*   humanDescription="First account client public key" */}
        {/*   testId="client-pub-key" */}
        {/*   value={knownAccounts[0]?.clientPublicKey} */}
        {/* /> */}
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
        {/* <ActionBox */}
        {/*   humanDescription="Button to init ECDSA dkg process" */}
        {/*   actionp="Start dkg" */}
        {/*   testId="start-ecdsa-dkg-action" */}
        {/*   onTap={handleAccCreation} */}
        {/* /> */}
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
        {/* <InputBox */}
        {/*   humanDescription="Provided public key" */}
        {/*   testId="input-key-id" */}
        {/*   value={userKeyId} */}
        {/*   setValue={setUserKeyId} */}
        {/* /> */}
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
