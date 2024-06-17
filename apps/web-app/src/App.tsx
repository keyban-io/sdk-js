import './App.css';
import {
  KeybanEddsaReactContext,
  KeybanLocalStorage,
  useKeybanEddsa,
} from '@keyban/sdk-react';
import { type ReactNode, useState } from 'react';

const keybanLocalStorage = new KeybanLocalStorage();

function App() {
  const { initialized } = useKeybanEddsa();

  if (!initialized) {
    return <p>loading...</p>;
  }

  return (
    <>
      <Main />
    </>
  );
}

export const Main = () => {
  const [userKeyId, setUserKeyId] = useState('dumb');
  const { initialize, knownAccounts, clientStatus, eddsaClient } =
    useKeybanEddsa();

  const handleAccCreation = async () => {
    if (!userKeyId) return;
    initialize(keybanLocalStorage, userKeyId);
  };

  const handleAdd = async () => {
    if (eddsaClient) {
      alert(await eddsaClient?.wasmApi.add(4, 4));
    }
  };

  const handleSignature = () => {
    const firstAcc = knownAccounts[0];
    if (firstAcc) {
      firstAcc.signPayload("test payload").then((res) => {
        alert(res);
        console.log("in app signature", res);
      });
    } else {
      alert("Invoke DKG first");
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
          testId="client-health"
          value={clientStatus}
        />
        <AssertionBox
          humanDescription="Unsaffe storage is initialized"
          testId="unsafe-storage"
          value={keybanLocalStorage ? 'on' : 'off'}
        />
        <AssertionBox
          humanDescription="First account client secret share"
          testId="secret-share"
          value={knownAccounts[0]?.secretShare?.keypair}
        />
        <AssertionBox
          humanDescription="First account client public key"
          testId="client-pub-key"
          value={knownAccounts[0]?.clientPublicKey}
        />
        <AssertionBox
          humanDescription="First account server public key"
          testId="server-pub-key"
          value={knownAccounts[0]?.serverPublicKey}
        />
        <ActionBox
          humanDescription="Button to init EDDSA dkg process"
          actionp="Start dkg"
          testId="start-eddsa-dkg-action"
          onTap={handleAccCreation}
        />
        <ActionBox
          humanDescription="Button to sign"
          actionp="Start signing"
          testId="start-eddsa-add-action"
          onTap={handleSignature}
        />
        <ActionBox
          humanDescription="Button to add"
          actionp="Start adding"
          testId="start-eddsa-add-action"
          onTap={handleAdd}
        />
        <InputBox
          humanDescription="Provided public key"
          testId="input-key-id"
          value={userKeyId}
          setValue={setUserKeyId}
        />
      </div>
    </>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: 30,
    marginTop: 20,
    overflow: 'scroll',
    height: '100%',
  },
};

const ActionBox = ({
  humanDescription,
  onTap,
  actionp,
  testId,
}: {
  humanDescription: string;
  testId: string;
  onTap: () => void;
  actionp: string;
}) => {
  return (
    <div
      style={{
        marginTop: 20,
      }}
    >
      <p style={{ textAlign: 'center' }}>{humanDescription}</p>
      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      <button data-testId={testId} onClick={onTap}>
        <p
          style={{
            borderStyle: 'solid',
            borderColor: 'purple',
            borderWidth: 1,
            padding: 10,
            marginTop: 20,
            marginBottom: 50,
            textAlign: 'center',
          }}
        >
          {actionp}
        </p>
      </button>
    </div>
  );
};

const InputBox = ({
  humanDescription,
  value,
  testId,
  setValue,
}: {
  humanDescription: string;
  testId: string;
  value: string;
  setValue: (val: string) => void;
}) => {
  return (
    <div
      style={{
        marginTop: 20,
      }}
    >
      <p style={{ textAlign: 'center' }}>{humanDescription}</p>
      <input
        style={{
          borderStyle: 'solid',
          borderColor: 'purple',
          borderWidth: 1,
          padding: 10,
          marginTop: 20,
          marginBottom: 50,
          textAlign: 'center',
        }}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        data-testId={testId}
      />
    </div>
  );
};

const AssertionBox = ({
  humanDescription,
  value,
  testId,
}: {
  humanDescription: string;
  testId: string;
  value: ReactNode;
}) => {
  return (
    <div
      style={{
        marginTop: 20,
      }}
    >
      <p style={{ textAlign: 'center' }}>{humanDescription}</p>
      <p
        style={{
          borderStyle: 'solid',
          borderColor: 'purple',
          borderWidth: 1,
          padding: 10,
          marginTop: 20,
          marginBottom: 50,
          textAlign: 'center',
        }}
        data-testId={testId}
      >
        {value}
      </p>
    </div>
  );
};

export default App;
