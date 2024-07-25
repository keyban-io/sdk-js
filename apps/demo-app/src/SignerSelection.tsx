import React from "react";
import { useNavigate } from "react-router-dom";
import "./SignerSelection.css";

export default function SignerSelection() {
  const navigate = useNavigate();

  const [signerType, setSignerType] = React.useState("ecdsa");

  return (
    <div className="App">
      <header className="App-header">
        <h1>Select Signer</h1>
        <div className="select-container">
          <select
            value={signerType}
            onChange={(e) => setSignerType(e.target.value)}
          >
            <option value="eddsa">EDDSA</option>
            <option value="ecdsa">ECDSA</option>
          </select>
          <button onClick={() => navigate(`/actions/${signerType}`)}>
            Proceed
          </button>
        </div>
      </header>
    </div>
  );
}
