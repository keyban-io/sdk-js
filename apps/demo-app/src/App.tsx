import type React from "react";
import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import WalletDashboard from "./pages/WalletDashboard";
import QRCodePage from "./pages/QRCodePage";
import TransferMatic from "./components/TransferMatic"; // Importation du nouveau composant

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<WalletDashboard />} />
          <Route path="/qr-code" element={<QRCodePage />} />
          <Route path="/transfer-matic" element={<TransferMatic />} />{" "}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
