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
import { useDebounce } from "@uidotdev/usehooks";
import TextField from "@/components/TextField";

export default function App() {
  const [chain, setChain] = React.useState(KeybanChain.anvil);
  const [chainUrl, setChainUrl] = React.useState<string>(
    "https://anvil.keyban.localtest.me",
  );
  const [apiUrl, setApiUrl] = React.useState<string>(
    "https://keyban.localtest.me",
  );

  const config = useDebounce(
    React.useMemo(
      () => ({ apiUrl, chain, chainUrl, storage: KeybanLocalStorage }),
      [apiUrl, chain, chainUrl],
    ),
    10,
  );

  return (
    <div className={styles.root}>
      <fieldset className={styles.config}>
        <legend>Config</legend>

        <TextField
          label="API URL"
          value={apiUrl}
          onChange={setApiUrl}
          data-test-id="api-url-input"
        />

        <Row>
          <label htmlFor="chain-select">Chain</label>
          <select
            value={chain}
            onChange={(evt) => setChain(evt.currentTarget.value as KeybanChain)}
            id="chain-select"
            data-test-id="chain-select"
          >
            {Object.entries(KeybanChain).map(([key, value]) => (
              <option key={key} value={value}>
                {value}
              </option>
            ))}
          </select>
        </Row>

        <TextField
          label="Chain URL"
          value={chainUrl}
          onChange={setChainUrl}
          data-test-id="chain-url-input"
        />
      </fieldset>

      <div className={styles.eddsa}>
        <KeybanProvider signer={KeybanSigner.EdDSA} {...config}>
          <h1>EdDSA</h1>
          <KeybanTest testId="eddsa" />
        </KeybanProvider>
      </div>

      <div className={styles.ecdsa}>
        <KeybanProvider signer={KeybanSigner.ECDSA} {...config}>
          <h1>ECDSA</h1>
          <KeybanTest testId="ecdsa" />
        </KeybanProvider>
      </div>
    </div>
  );
}
