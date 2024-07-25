import {
  KeybanProvider,
  KeybanSigner,
  KeybanLocalStorage,
} from "@keyban/sdk-react";

import styles from "./App.module.css";
import KeybanTest from "./KeybanTest";

export default function App() {
  return (
    <div className={styles.root}>
      <div data-test-id="eddsa">
        <KeybanProvider
          signer={KeybanSigner.EdDSA}
          storage={KeybanLocalStorage}
        >
          <h1>EdDSA</h1>
          <KeybanTest />
        </KeybanProvider>
      </div>
      <div data-test-id="ecdsa">
        <KeybanProvider
          signer={KeybanSigner.EcDSA}
          storage={KeybanLocalStorage}
        >
          <h1>EcDSA</h1>
          <KeybanTest />
        </KeybanProvider>
      </div>
    </div>
  );
}
