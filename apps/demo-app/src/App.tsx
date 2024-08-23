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
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./components/ErrorFallback";

const App: React.FC = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
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
    </ErrorBoundary>
  );
};

export default App;
