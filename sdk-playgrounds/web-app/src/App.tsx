import { Add, Substract } from "@keyban/sdk-react";
import "./App.css";

function App() {
  return (
    <>
      <p>Below is a sum for a 3 and 3 with @keyban/sdk-react</p>
      <div style={{ border: "1px solid purple", padding: 10 }}>
        <Add a={3} b={3} />
      </div>
      <br />
      <br />
      <br />

      <p>Below is a subtraction of a 10 and 8 with @keyban/sdk-react</p>
      <div style={{ border: "1px solid purple", padding: 10 }}>
        <Substract a={10} b={8} />
      </div>
    </>
  );
}

export default App;
