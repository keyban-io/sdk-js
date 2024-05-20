import {
	EddsaClient,
	SignerClientError,
	SignerClientErrors,
} from '@keyban/sdk-base';
import {
	type ReactNode,
	createContext,
	useCallback,
	useRef,
	useState,
} from 'react';
import { useWebViewMessage } from 'react-native-react-bridge';
import WebView from 'react-native-webview';
import { NativeWasm } from '~/eddsa/wasmBridge';
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
export const KeybanEddsaProvider = ({
	children,
	webApp,
}: {
	children: ReactNode;
	webApp: string;
}) => {
	const wasmApiRef = useRef<NativeWasm | null>(null);
	const eddsaClientRef = useRef<KeybanEddsaContext['eddsaClient'] | null>(null);
	const [knownAccounts, setKnownAccounts] = useState<
		KeybanEddsaContext['knownAccounts']
	>([]);
	const [initialized, setInitialized] = useState(false);

	const { ref, onMessage, emit } = useWebViewMessage(async (message) => {
		if (message.type === 'initialized') {
			console.log('WebAssembly initialized inside WebView');
			wasmApiRef.current = new NativeWasm(emit);
			eddsaClientRef.current = new EddsaClient(wasmApiRef.current);
			setInitialized(true);
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
				return prev;
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

	return (
		<KeybanEddsaReactContext.Provider
			value={{
				eddsaClient: eddsaClientRef.current,
				wasmApi: wasmApiRef.current,
				initialized,
				knownAccounts,
				getSaveAccounts,
				createAccount,
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
