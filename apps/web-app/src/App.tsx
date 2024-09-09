import React from "react";
import {
  KeybanLocalStorage,
  KeybanProvider,
  KeybanChain,
  KeybanSigner,
  KeybanClientConfig,
} from "@keyban/sdk-react";
import { useSearchParams } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import KeybanTest from "@/KeybanTest";
import ConfigEditor from "@/components/organisms/ConfigEditor";
import RefreshButton from "@/components/atoms/RefreshButton";

const DEFAULT_API_URL = "https://api.keyban.localtest.me";
const DEFAULT_CHAIN = KeybanChain.KeybanTestnet;

const getSignerName = (config: KeybanClientConfig) =>
  Object.entries(KeybanSigner).find(
    ([, value]) => value === config.signer,
  )?.[0];

export default function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [config, setConfig] = React.useState<KeybanClientConfig>({
    apiUrl: searchParams.get("apiUrl") ?? DEFAULT_API_URL,
    chain: (searchParams.get("chain") as KeybanChain) ?? DEFAULT_CHAIN,
    signer:
      KeybanSigner[searchParams.get("signer") ?? "EDCSA"] ?? KeybanSigner.ECDSA,
    storage: KeybanLocalStorage,
  });

  React.useEffect(() => {
    setSearchParams((prev) => ({
      ...prev,
      apiUrl: config.apiUrl,
      chain: config.chain,
      signer: getSignerName(config),
    }));
  }, [config, setSearchParams]);

  return (
    <>
      <ConfigEditor config={config} onChange={setConfig} />

      <ErrorBoundary
        fallbackRender={({ error, resetErrorBoundary }) => {
          console.error(error);

          return (
            <fieldset data-test-id="error">
              <legend>
                <span data-test-id="error:message">{error.message}</span>
                <RefreshButton
                  onClick={resetErrorBoundary}
                  style={{ marginInlineStart: "0.5ch" }}
                  data-test-id="error:retry"
                />
              </legend>
              <pre data-test-id="error:stack">{error.stack}</pre>
            </fieldset>
          );
        }}
      >
        <KeybanProvider {...config}>
          <KeybanTest />
        </KeybanProvider>
      </ErrorBoundary>
    </>
  );
}
