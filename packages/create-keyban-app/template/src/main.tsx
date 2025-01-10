import React from "react";
import ReactDOM from "react-dom/client";
import { ClientShareProvider } from "@keyban/sdk-react";
import { KeybanProvider } from "@keyban/sdk-react";
import config from "./config";
import ErrorBoundary from "./ErrorBoundary";

import App from "./App.tsx";

class MyClientShareProvider implements ClientShareProvider {
  private clientShareKey: string;

  constructor(appId: string) {
    // Concatenates the appId to form a unique storage key
    this.clientShareKey = `clientShare-${appId}`;
  }

  async get(): Promise<string | null> {
    try {
      return localStorage.getItem(this.clientShareKey);
    } catch (error) {
      console.error("Error retrieving the clientShare:", error);
      return null;
    }
  }

  async set(clientShare: string): Promise<void> {
    try {
      localStorage.setItem(this.clientShareKey, clientShare);
    } catch (error) {
      console.error("Error saving the clientShare:", error);
    }
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <React.Suspense fallback={<div>Loading...</div>}>
      <ErrorBoundary>
        <KeybanProvider
          {...config.keyban}
          clientShareProvider={new MyClientShareProvider(config.keyban.appId)}
        >
          <App />
        </KeybanProvider>
      </ErrorBoundary>
    </React.Suspense>
  </React.StrictMode>,
);
