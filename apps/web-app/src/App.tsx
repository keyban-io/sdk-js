import {
  KeybanLocalStorage,
  KeybanProvider,
  KeybanChain,
  KeybanSigner,
  KeybanApiUrl,
} from "@keyban/sdk-react";

import styles from "./App.module.css";
import KeybanTest from "./KeybanTest";
import React from "react";
import Row from "@/components/Row";

export default function App() {
  const [chain, setChain] = React.useState(KeybanChain.polygonAmoy);
  const [apiUrl, setApiUrl] = React.useState(KeybanApiUrl);
  const [apiUrlApplied, setApiUrlApplied] = React.useState(KeybanApiUrl);

  return (
    <div className={styles.root}>
      <Row className={styles.config}>
        <label htmlFor="api-url-input">API Url</label>
        <input type="text" value={apiUrl} onChange={(evt) => setApiUrl(evt.currentTarget.value)} id="api-url-input" />
        <input type="button" value="Apply" onClick={() => setApiUrlApplied(apiUrl)} id="api-url-button" />

        <label htmlFor="chain-select">Chain</label>
        <select
          value={chain}
          onChange={(evt) => setChain(evt.currentTarget.value as KeybanChain)}
          id="chain-select"
        >
          {Object.entries(KeybanChain).map(([key, value]) => (
            <option key={key} value={value}>
              {value}
            </option>
          ))}
        </select>
      </Row>

      <div className={styles.eddsa}>
        <KeybanProvider
          apiUrl={apiUrlApplied}
          chain={chain}
          signer={KeybanSigner.EdDSA}
          storage={KeybanLocalStorage}
        >
          <h1>EdDSA</h1>
          <KeybanTest testId="eddsa" />
        </KeybanProvider>
      </div>

      <div className={styles.ecdsa}>
        <KeybanProvider
          apiUrl={apiUrlApplied}
          chain={chain}
          signer={KeybanSigner.ECDSA}
          storage={KeybanLocalStorage}
        >
          <h1>ECDSA</h1>
          <KeybanTest testId="ecdsa" />
        </KeybanProvider>
      </div>
    </div>
  );
}
