import { KeybanNetwork, KeybanProvider } from "@keyban/sdk-react";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "~/App.tsx";
import config from "~/config";

let network: KeybanNetwork;

try {
  const stored = localStorage.getItem("selectedChain");
  if (stored) {
    network = JSON.parse(stored) as KeybanNetwork;
  } else {
    network = config.keyban.network;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
} catch (e) {
  network = config.keyban.network;
}

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <KeybanProvider
        {...config.keyban}
        network={network}
        clientShareProvider={config.keyban.clientShareProvider}
      >
        <App />
      </KeybanProvider>
    </React.StrictMode>,
  );
}
