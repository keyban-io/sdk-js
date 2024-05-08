import { Add, Substract, useKeyban } from "@keyban/sdk-react";
import "./App.css";

function App() {
  const { initialized, add } = useKeyban();

  if (!initialized) {
    return <p>loading...</p>;
  }

  return (
    <>
      <p>Below is a sum for a 3 and 3 with @keyban/sdk-react with WASM</p>
      <div style={{ border: "1px solid purple", padding: 10 }}>{add(3, 3)}</div>
    </>
  );
}

export default App;
