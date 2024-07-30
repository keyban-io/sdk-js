import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WalletDashboard from "./pages/WalletDashboard";
import QRCodePage from "./pages/QRCodePage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WalletDashboard />} />
        <Route path="/qr-code" element={<QRCodePage />} />
      </Routes>
    </Router>
  );
};

export default App;
