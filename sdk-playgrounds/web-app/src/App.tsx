import { KeybanLocalStorage, useKeybanEddsa } from "@keyban/sdk-react";
import { useEffect, useState } from "react";
import "./App.css";

const keybanLocalStorage = new KeybanLocalStorage();

function App() {
  const { initialized, createAccount, knownAccounts } = useKeybanEddsa();

  const [sum, setSum] = useState<number | null>(0);
  useEffect(() => {
    const init = async () => {
      if (initialized) {
        const account = await createAccount(keybanLocalStorage);
        const res = await account.add(3, 3).catch((e) => {
          console.error(e);
        });
        setSum(res ?? 0);
      }
    };

    init();
  }, [initialized, createAccount]);

  if (!initialized) {
    return <p>loading...</p>;
  }

  return (
    <>
      <p>Below is a sum for a 3 and 3 with @keyban/sdk-react with WASM</p>
      <p>Account address: {knownAccounts[0]?.address ?? "N/A"}</p>
      <div
        data-testid="wasm-sum"
        style={{ border: "1px solid purple", padding: 10 }}
      >
        {sum}
      </div>
    </>
  );
}

export default App;
