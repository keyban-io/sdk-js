import type React from 'react';

import { AppRouter } from '@/lib/router';
import {
  KeybanChain,
  KeybanLocalStorage,
  KeybanProvider,
  KeybanSigner,
} from '@keyban/sdk-react';

const App: React.FC = () => {
  return (
    <KeybanProvider
      chain={KeybanChain.anvil}
      chainUrl="https://anvil.keyban.localtest.me"
      signer={KeybanSigner.ECDSA}
      storage={KeybanLocalStorage}
      apiUrl="https://keyban.localtest.me"
    >
      <AppRouter />
    </KeybanProvider>
  );
};

export default App;
