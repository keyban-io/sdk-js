import { useKeyban } from "@keyban/sdk-react";
import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const { initialized, add } = useKeyban();

  const [sum, setSum] = useState<number | null>(0);
  useEffect(() => {
    const init = async () => {
      if (initialized) {
        const res = await add(3, 3).catch((e) => {
          console.error(e);
        });
        setSum(res ?? 0);
      }
    };

    init();
  }, [initialized, add]);

  if (!initialized) {
    return <p>loading...</p>;
  }

  return (
    <>
      <p>Below is a sum for a 3 and 3 with @keyban/sdk-react with WASM</p>
      <div style={{ border: "1px solid purple", padding: 10 }}>{sum}</div>
    </>
  );
}

export default App;
