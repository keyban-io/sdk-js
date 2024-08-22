import type React from "react";
import { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import WalletDashboard from "./pages/WalletDashboard";
import QRCodePage from "./pages/QRCodePage";
import TransferMatic from "./pages/TransferMatic"; // Importation du nouveau composant
import {
  KeybanChain,
  KeybanLocalStorage,
  KeybanProvider,
  KeybanSigner,
} from "@keyban/sdk-react";

const App: React.FC = () => {
  return (
    <KeybanProvider
      chain={KeybanChain.polygonAmoy}
      signer={KeybanSigner.ECDSA}
      storage={KeybanLocalStorage}
      apiUrl="https://keyban.localtest.me"
    >
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<WalletDashboard />} />
            <Route path="/qr-code" element={<QRCodePage />} />
            <Route path="/transfer-matic" element={<TransferMatic />} />{" "}
          </Routes>
        </Suspense>
      </Router>
    </KeybanProvider>
  );
};

export default App;
