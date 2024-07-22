import React from "react";
import { useNavigate } from "react-router-dom";
import { useSigner } from "./SignerContext";
import "./SignerSelection.css";

const SignerSelection: React.FC = () => {
  const { signerType, setSignerType } = useSigner();
  const navigate = useNavigate();

  const handleSelectSigner = () => {
    navigate(`/actions/${signerType}`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Select Signer</h1>
        <div className="select-container">
          <select value={signerType} onChange={(e) => setSignerType(e.target.value)}>
            <option value="eddsa">EDDSA</option>
            <option value="ecdsa">ECDSA</option>
          </select>
          <button type="button" onClick={handleSelectSigner}>
            Proceed
          </button>
        </div>
      </header>
    </div>
  );
};

export default SignerSelection;
