import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  KeybanAccount,
  KeybanLocalStorage,
  KeybanProvider,
  KeybanSigner,
  useKeyban,
} from "@keyban/sdk-react";
import "./App.css";
import Modal from "./Modal";

const SignerActionsEcdsaContent: React.FC = () => {
  const keyban = useKeyban();
  const [knownAccounts, setKnownAccounts] = React.useState<KeybanAccount[]>([]);

  const [dataToSign, setDataToSign] = useState("");
  const [signature, setSignature] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleError = (error: unknown) => {
    let message = "";

    if (typeof error === "object" && error !== null) {
      message = JSON.stringify(error);
    } else {
      message = (error as Error).message
        ? (error as Error).message
        : (error as Error).toString();
    }

    setModalMessage(message);
    setShowModal(true);
  };

  const handleInitialize = () => {
    keyban.client
      ?.initialize("my-ecdsa-key-id")
      .then((account) => setKnownAccounts((arr) => [...arr, account]))
      .catch(handleError);
  };

  const handleSignData = () => {
    knownAccounts[0]?.sign(dataToSign).then(setSignature).catch(handleError);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Keyban Demo App</h1>
        <Link to="/">Back to Signer Selection</Link>
        <button type="button" onClick={handleInitialize}>
          Initialize ECDSA Client
        </button>

        {knownAccounts.map((account, index) => (
          <div key={account.keyId} className="account-details">
            <p>Account {index + 1}</p>
            <p>Public Key: {account.clientPublicKey}</p>
            <p>Key ID: {account.keyId}</p>
          </div>
        ))}

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
      <Modal
        show={showModal}
        onClose={handleCloseModal}
        message={modalMessage}
      />
    </div>
  );
};

const SignerActionsEcdsa: React.FC = () => (
  <KeybanProvider signer={KeybanSigner.EcDSA} storage={KeybanLocalStorage}>
    <SignerActionsEcdsaContent />
  </KeybanProvider>
);

export default SignerActionsEcdsa;
