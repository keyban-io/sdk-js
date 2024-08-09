import {
  KeybanLocalStorage,
  KeybanProvider,
  KeybanSigner,
} from '@keyban/sdk-react';

import styles from './App.module.css';
import KeybanTest from './KeybanTest';

export default function App() {
  return (
    <div className={styles.root}>
      <div>
        <KeybanProvider
          signer={KeybanSigner.EdDSA}
          storage={KeybanLocalStorage}
        >
          <h1>EdDSA</h1>
          <KeybanTest testId="eddsa" />
        </KeybanProvider>
      </div>
      <div>
        <KeybanProvider
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
