import { Auth0Provider } from "@auth0/auth0-react";
import { KeybanProvider } from "@keyban/sdk-react";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "~/App.tsx";
import config from "~/config";
import { useLocalStorage } from "~/lib/localStorage";

class ClientShareProvider {
  #key: string = "KEYBAN-CLIENT-SHARE";

  async get() {
    return localStorage.getItem(this.#key);
  }

  async set(clientShare: string) {
    return localStorage.setItem(this.#key, clientShare);
  }
}

const clientShareProvider = React.useMemo(() => new ClientShareProvider(), []);

const [chain] = useLocalStorage<KeybanChain>(
  "selectedChain",
  config.keyban.chain,
);

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
