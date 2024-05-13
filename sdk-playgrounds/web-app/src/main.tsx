import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { KeybanLocalStorage, KeybanEddsaProvider } from "@keyban/sdk-react";

const keybanLocalStorage = new KeybanLocalStorage();

// biome-ignore lint/style/noNonNullAssertion: <explanation>
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <KeybanEddsaProvider storageProvider={keybanLocalStorage}>
      <App />
    </KeybanEddsaProvider>
  </React.StrictMode>
);
