import React from "react";
import ReactDOM from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";

import App from "./App.tsx";
import config from "./config.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Auth0Provider {...config.auth0}>
      <App />
    </Auth0Provider>
  </React.StrictMode>,
);
