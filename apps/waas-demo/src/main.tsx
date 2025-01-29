import { KeybanChain, KeybanProvider } from "@keyban/sdk-react";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "~/App.tsx";
import config from "~/config";

let chain: KeybanChain;

try {
  const stored = localStorage.getItem("selectedChain");
  if (stored) {
    chain = JSON.parse(stored) as KeybanChain;
  } else {
    chain = config.keyban.chain;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
} catch (e) {
  chain = config.keyban.chain;
}

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <KeybanProvider
        {...config.keyban}
        chain={chain}
        clientShareProvider={config.keyban.clientShareProvider}
      >
        <App />
      </KeybanProvider>
    </React.StrictMode>,
  );
}
