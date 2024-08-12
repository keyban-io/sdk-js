import {
  KeybanLocalStorage,
  KeybanProvider,
  KeybanChain,
  KeybanSigner,
} from "@keyban/sdk-react";

import styles from "./App.module.css";
import KeybanTest from "./KeybanTest";
import React from "react";
import Row from "@/components/Row";

export default function App() {
  const [chain, setChain] = React.useState(KeybanChain.polygonAmoy);

  return (
    <div className={styles.root}>
      <Row className={styles.chain}>
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
