import { Auth0Provider } from "@auth0/auth0-react";
import React from "react";
import ReactDOM from "react-dom/client";

import App from "~/App.tsx";
import config from "~/config";

import ClientShareProvider from "./contexts/ClientShareProvider";

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Auth0Provider {...config.auth}>
        <ClientShareProvider>
          <App />
        </ClientShareProvider>
      </Auth0Provider>
    </React.StrictMode>,
  );
}
