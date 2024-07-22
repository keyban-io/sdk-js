import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  type EddsaClientShare,
  useKeybanEddsa,
  KeybanLocalStorage,
  KeybanEddsaProvider
} from "@keyban/sdk-react";
import "./App.css";
import Modal from "./Modal";

const SignerActionsEddsaContent: React.FC = () => {
  const eddsaContext = useKeybanEddsa();
  const [dataToSign, setDataToSign] = useState("");
  const [signature, setSignature] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleInitialize = async () => {
    try {
      const keyId = "my-key-id";
      const storageProvider = new KeybanLocalStorage<EddsaClientShare>();
      if (eddsaContext.eddsaClient) {
        await eddsaContext.initialize(storageProvider, keyId);
      }
    } catch (error) {
      const message = (error as Error).message
        ? (error as Error).message
        : error;
      setModalMessage(`Initialization failed: ${message}`);
      setShowModal(true);
    }
  };

  const handleSignData = async () => {
    try {
      if (
        eddsaContext.eddsaClient &&
        eddsaContext.knownAccounts.length > 0
      ) {
        const account = eddsaContext.knownAccounts[0];
        const sig = await account.signPayload(dataToSign);
        setSignature(sig);
      }
    } catch (error) {
      const message = (error as Error).message
        ? (error as Error).message
        : error;
      setModalMessage(`Signing failed: ${message}`);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const renderKnownAccounts = () => {
    return eddsaContext.knownAccounts.map((account, index) => (
      <div key={index} className="account-details">
        <p>Account {index + 1}</p>
        <p>Public Key: {account.clientPublicKey}</p>
        <p>Key ID: {account.keyId}</p>
      </div>
    ));
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Keyban Demo App</h1>
        <Link to="/">Back to Signer Selection</Link>
        <button type="button" onClick={handleInitialize}>
          Initialize EDDSA Client
        </button>
        {eddsaContext.initialized && renderKnownAccounts()}
        <input
          type="text"
          placeholder="Data to sign"
          value={dataToSign}
          onChange={(e) => setDataToSign(e.target.value)}
        />
        <button type="button" onClick={handleSignData}>
          Sign Data
        </button>
        {signature && <p>Signature: {signature}</p>}
      </header>
      <Modal show={showModal} onClose={handleCloseModal} message={modalMessage} />
    </div>
  );
};

const SignerActionsEddsa: React.FC = () => (
  <KeybanEddsaProvider>
    <SignerActionsEddsaContent />
  </KeybanEddsaProvider>
);

export default SignerActionsEddsa;
