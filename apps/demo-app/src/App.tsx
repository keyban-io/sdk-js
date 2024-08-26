import type React from "react";
import {
  KeybanChain,
  KeybanLocalStorage,
  KeybanProvider,
  KeybanSigner,
} from "@keyban/sdk-react";
import { AppRouter } from "@/lib/router";

const App: React.FC = () => {
  return (
    <KeybanProvider
      chain={KeybanChain.polygonAmoy}
      signer={KeybanSigner.ECDSA}
      storage={KeybanLocalStorage}
      apiUrl="https://keyban.localtest.me"
    >
      <AppRouter />
    </KeybanProvider>
  );
};

export default App;
