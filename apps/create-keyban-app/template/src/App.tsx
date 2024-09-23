import './App.css'; // Fichier CSS séparé

import { useAuth0 } from '@auth0/auth0-react';

import Wallet from './Wallet';

const App = () => {
  const { loginWithRedirect, logout, isAuthenticated, user, isLoading } =
    useAuth0();

  if (isLoading) {
    return (
      <div className="loading-container">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      {isAuthenticated ? (
        <>
          <h2>Welcome, {user?.name}</h2>
          <Wallet />
          <button
            type="button"
            className="logout-button"
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
          >
            Logout
          </button>
        </>
      ) : (
        <button
          type="button"
          className="login-button"
          onClick={() => loginWithRedirect()}
        >
          Login to get access to your Wallet
        </button>
      )}
    </div>
  );
};

export default App;
