import {
  EddsaClient,
  SignerClientError,
  SignerClientErrors,
} from '@keyban/sdk-base';
import {
  type FC,
  type ReactNode,
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useWebViewMessage } from 'react-native-react-bridge';
import WebView from 'react-native-webview';
import { NativeWasm } from '~/wasmBridge';
import type { KeybanEddsaContext } from './types';

/** @ignore */
export const KeybanEddsaReactContext = createContext<null | KeybanEddsaContext>(
  null,
);

/**
 * Provider needed for Keyban sdk to work.
 *
 * @example
 * in your app entry point
 * ```
 * // import your file with WebViewRoot wrapped with react-native-react-bridge wrapper
 * import webApp from './src/keybanWebView';
 *
 * // initialize your storage provider that will be used to store created accounts or retrieved saved ones
 * const keybanAsyncStorage = new KeybanAsyncStorage();
 *
 * function App() {
 *   return (
 *     <KeybanEddsaProvider webApp={webApp}>
 *         <CommonProviders>
 *          // your app goes here
 *         </CommonProviders>
 *     </KeybanEddsaProvider>
 *   );
 * }
 * ```
 * */
export const KeybanEddsaProvider: FC<{
  children: ReactNode;
  webApp: string;
}> = ({ children, webApp }) => {
  const wasmApiRef = useRef<NativeWasm | null>(null);
  const eddsaClientRef = useRef<KeybanEddsaContext['eddsaClient'] | null>(null);
  const [knownAccounts, setKnownAccounts] = useState<
    KeybanEddsaContext['knownAccounts']
  >([]);
  const [initialized, setInitialized] = useState(false);
  const [clientStatus, setClientStatus] = useState<
    'operational' | 'down' | null
  >(null);
  const { ref, onMessage, emit } = useWebViewMessage(async (message) => {
    console.log('message', message);
    if (message.type === 'initialized') {
      console.log('WebAssembly initialized inside WebView');
      wasmApiRef.current = new NativeWasm(emit);
      eddsaClientRef.current = new EddsaClient(wasmApiRef.current);
      setInitialized(true);
      const clientHealth = await eddsaClientRef.current?.healthCheck();
      setClientStatus(clientHealth);
      return;
    }

    wasmApiRef.current?.receiveMessage(message.data as string);
  });

  const createAccount: KeybanEddsaContext['createAccount'] = useCallback(
    async (storageProvider) => {
      if (!initialized || !eddsaClientRef.current) {
        throw new SignerClientError(SignerClientErrors.CLIENT_NOT_INITIALIZED);
      }

      const account =
        await eddsaClientRef.current?.createAccount(storageProvider);

      setKnownAccounts((prev) => {
        prev.push(account);
        return [...prev];
      });
      return account;
    },
    [initialized],
  );

  const getSaveAccounts: KeybanEddsaContext['getSaveAccounts'] = useCallback(
    async (storageProvider) => {
      if (!initialized || !eddsaClientRef.current) {
        throw new SignerClientError(SignerClientErrors.CLIENT_NOT_INITIALIZED);
      }

      const accounts =
        await eddsaClientRef.current?.getSaveAccounts(storageProvider);
      setKnownAccounts(accounts);
      return accounts;
    },
    [initialized],
  );

  useEffect(() => {
    emit({ type: 'test', data: '' });
  }, [emit]);

  return (
    <KeybanEddsaReactContext.Provider
      value={{
        eddsaClient: eddsaClientRef.current,
        wasmApi: wasmApiRef.current,
        initialized,
        knownAccounts: knownAccounts,
        getSaveAccounts,
        createAccount,
        clientStatus,
      }}
    >
      <WebView
        ref={ref}
        style={{ display: 'none' }}
        webviewDebuggingEnabled
        source={{ html: webApp }}
        onMessage={onMessage}
      />
      {children}
    </KeybanEddsaReactContext.Provider>
  );
};
