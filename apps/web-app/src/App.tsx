import "./App.css";
import {
  KeybanLocalStorage,
  KeybanEddsaReactContext,
  useKeybanEddsa,
} from "@keyban/sdk-react";
import type { ReactNode } from "react";
import { dkg, add } from "@keyban/sdk-react";

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
  const { createAccount, knownAccounts, clientStatus } = useKeybanEddsa();



  const handleAccCreation = async () => {
    //createAccount(keybanLocalStorage);
    console.log(await dkg("toto"));
  };

  const handleAdd = () => {
    console.log(add(1, 5));
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
          humanDescription="Below is an address of an first account"
          testId="first-address"
          value={knownAccounts[0]?.address}
        />
        <ActionBox
          humanDescription="Button to init EDDSA dkg process"
          actionp="Start dkg"
          testId="start-eddsa-dkg-action"
          onTap={handleAccCreation}
        />
        <ActionBox
          humanDescription="Button to add"
          actionp="Start adding"
          testId="start-eddsa-add-action"
          onTap={handleAdd}
        />
      </div>
    </>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 30,
    marginTop: 20,
    overflow: "scroll",
    height: "100%",
  },
};

const ActionBox = ({
  humanDescription,
  onTap,
  actionp,
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
      <p style={{ textAlign: "center" }}>{humanDescription}</p>
      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      <button onClick={onTap}>
        <p
          style={{
            borderStyle: "solid",
            borderColor: "purple",
            borderWidth: 1,
            padding: 10,
            marginTop: 20,
            marginBottom: 50,
            textAlign: "center",
          }}
        >
          {actionp}
        </p>
      </button>
    </div>
  );
};

const AssertionBox = ({
  humanDescription,
  value,
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
      <p style={{ textAlign: "center" }}>{humanDescription}</p>
      <p
        style={{
          borderStyle: "solid",
          borderColor: "purple",
          borderWidth: 1,
          padding: 10,
          marginTop: 20,
          marginBottom: 50,
          textAlign: "center",
        }}
      >
        {value}
      </p>
    </div>
  );
};

export default App;
