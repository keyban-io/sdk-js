import React, { useState } from "react";
import { getErrorMessage } from "../utils/errorUtils";
import { Link } from "react-router-dom";
import {
  KeybanLocalStorage,
  KeybanProvider,
  KeybanSigner,
  useKeyban,
} from "@keyban/sdk-react";
import type { KeybanAccount } from "@keyban/sdk-base";
import "../App.css";
import Modal from "../Modal";
import KnownAccounts from "../components/KnownAccounts";

const SignerActionsEcdsaContent: React.FC = () => {
  const keyban = useKeyban();
  const [account, setAccount] = useState<KeybanAccount | null>(null);

  const [dataToSign, setDataToSign] = useState("");
  const [signature, setSignature] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleError = (error: unknown) => {
    const message = getErrorMessage(error);
    setModalMessage(message);
    setShowModal(true);
  };

  const handleInitialize = () => {
    keyban.client
      ?.initialize("my-ecdsa-key-id")
      .then(setAccount)
      .catch(handleError);
  };

  const handleSignData = () => {
    account?.sign(dataToSign).then(setSignature).catch(handleError);
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
        {account && <KnownAccounts accounts={[account]} />}{" "}
        {/* Use KnownAccounts component */}
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
