import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import QRCode from "qrcode.react";
import "./QRCodePage.css";
import "./WalletDashboard.css";

const QRCodePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const address = new URLSearchParams(location.search).get("address");

  const handleBackClick = () => {
    navigate("/");
  };

  return (
    <div className="wallet-dashboard">
      <div className="header">
        <span>Keyban WAAS Demo</span>
        <span className="notification">🔔</span>
      </div>
      <div className="section">
        <h2>{address}</h2>
        {address ? <QRCode value={address} /> : <p>Loading address...</p>}
        <button type="button" className="back-button" onClick={handleBackClick}>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default QRCodePage;
