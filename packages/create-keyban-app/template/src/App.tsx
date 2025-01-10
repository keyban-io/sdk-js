import { useKeybanAuth } from "@keyban/sdk-react";
import Wallet from "./Wallet";
import "./App.css";

export default function App() {
  const { login, logout, isAuthenticated, isLoading } = useKeybanAuth();

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
          <h2>Welcome!</h2>
          <Wallet />
          <button
            type="button"
            className="logout-button"
            onClick={() => logout()}
          >
            Logout
          </button>
        </>
      ) : (
        <button type="button" className="login-button" onClick={() => login()}>
          Login to get access to your Wallet
        </button>
      )}
    </div>
  );
}
