import type React from "react";
import { useEffect, useState, useCallback, useRef } from "react";
import { getErrorMessage } from "../utils/errorUtils";
import { Link } from "react-router-dom";
import { useKeyban } from "@keyban/sdk-react";
import type { KeybanAccount } from "@keyban/sdk-base";
import "../App.css";
import Modal from "../Modal";
import KnownAccounts from "../components/KnownAccounts";

interface SignerActionsContentProps {
  keyId: string;
}

const SignerActionsContent: React.FC<SignerActionsContentProps> = ({
  keyId,
}) => {
  const keyban = useKeyban();
  const [account, setAccount] = useState<KeybanAccount | null>(null);
  const [dataToSign, setDataToSign] = useState("");
  const [signature, setSignature] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleError = useCallback((error: unknown) => {
    const message = getErrorMessage(error);
    setModalMessage(message);
    setShowModal(true);
  }, []);

  const handleInitialize = useCallback(async () => {
    await keyban.client?.initialize(keyId).then(setAccount).catch(handleError);
  }, [keyban.client, handleError, keyId]);

  useEffect(() => {
    handleInitialize();
  }, [handleInitialize]);

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
        {account && <KnownAccounts accounts={[account]} />}{" "}
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

export default SignerActionsContent;
