import React, { useState } from 'react';
import { KeybanEddsaProvider, useKeybanEddsa, KeybanLocalStorage } from '@keyban/sdk-react';
import './App.css';
import Modal from './Modal';  // Import the Modal component

// The main component of the application
const AppContent: React.FC = () => {
  // Destructuring the necessary values from the KeybanEddsa context
  const { clientStatus, eddsaClient, initialized, knownAccounts, initialize } = useKeybanEddsa();

  // State hooks to manage the data to be signed and the resulting signature
  const [dataToSign, setDataToSign] = useState('');
  const [signature, setSignature] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Function to initialize the EdDSA client
  const handleInitialize = async () => {
    if (eddsaClient) {
      try {
        // Using KeybanLocalStorage as the storage provider
        const storageProvider = new KeybanLocalStorage();
        const keyId = 'my-key-id'; // Replace with your desired key identifier
        await initialize(storageProvider, keyId);
      } catch (error) {
        setModalMessage('Initialization failed: ' + (error as Error).message);
        setShowModal(true);
      }
    }
  };

  // Function to sign the data
  const handleSignData = async () => {
    if (eddsaClient && knownAccounts.length > 0) {
      try {
        // Assuming the first known account for signing
        const account = knownAccounts[0];
        const sig = await account.signPayload(dataToSign);
        setSignature(sig);
      } catch (error) {
        setModalMessage('Signing failed: ' + (error as Error).message);
        setShowModal(true);
      }
    } else {
      console.log('Cannot sign data: Conditions not met', {
        eddsaClient,
        initialized,
        knownAccountsLength: knownAccounts.length,
      });
    }
  };

  // Function to render the known accounts
  const renderKnownAccounts = () => {
    return knownAccounts.map((account, index) => (
      <div key={index} className="account-details">
        <p>Account {index + 1}</p>
        <p>Server Public Key: {account.serverPublicKey}</p>
        <p>Client Public Key: {account.clientPublicKey}</p>
        <p>Key ID: {account.keyId}</p>
      </div>
    ));
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  // JSX to render the application UI
  return (
    <div className="App">
      <header className="App-header">
        <h1>Keyban Demo App</h1>
        {initialized ? (
          <div>
            {knownAccounts.length === 0 ? (
              <button onClick={handleInitialize}>Initialize Client</button>
            ) : (
              <div>
                <p>Client Status: {clientStatus}</p>
                <div>{renderKnownAccounts()}</div>
                <input
                  type="text"
                  placeholder="Data to sign"
                  value={dataToSign}
                  onChange={(e) => setDataToSign(e.target.value)}
                />
                <button onClick={handleSignData}>Sign Data</button>
                {signature && <p>Signature: {signature}</p>}
              </div>
            )}
          </div>
        ) : (
          <div>
            <p>Loading...</p>
          </div>
        )}
      </header>
      <Modal show={showModal} onClose={handleCloseModal} message={modalMessage} />
    </div>
  );
};

// The main App component wrapped in the KeybanEddsaProvider
const App: React.FC = () => (
  <KeybanEddsaProvider>
    <AppContent />
  </KeybanEddsaProvider>
);

export default App;
