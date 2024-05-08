import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { KeybanLocalStorage, KeybanProvider } from "@keyban/sdk-react";

const keybanLocalStorage = new KeybanLocalStorage();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <KeybanProvider storageProvider={keybanLocalStorage}>
      <App />
    </KeybanProvider>
  </React.StrictMode>
);
