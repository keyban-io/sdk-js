import { Auth0Provider } from "@auth0/auth0-react";
import { KeybanChain, KeybanProvider } from "@keyban/sdk-react";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "~/App.tsx";
import config from "~/config";

class ClientShareProvider {
  #key: string = "WAAS-DEMO-CLIENT-SHARE";

  async get() {
    return localStorage.getItem(this.#key);
  }

  async set(clientShare: string) {
    return localStorage.setItem(this.#key, clientShare);
  }
}

const clientShareProvider = new ClientShareProvider();

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

console.log("chain", chain);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Auth0Provider {...config.auth}>
        <KeybanProvider
          {...config.keyban}
          chain={chain}
          clientShareProvider={clientShareProvider}
        >
          <App />
        </KeybanProvider>
      </Auth0Provider>
    </React.StrictMode>,
  );
}
