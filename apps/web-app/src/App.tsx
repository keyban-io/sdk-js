import {
  KeybanChain,
  KeybanClientShareProvider,
  KeybanProvider,
} from "@keyban/sdk-react";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useSearchParams } from "react-router-dom";

import AppError from "~/components/molecules/AppError";
import ConfigEditor, {
  ConfigEditorProps,
} from "~/components/organisms/ConfigEditor";
import KeybanTest from "~/KeybanTest";

const DEFAULT_API_URL = "https://api.keyban.localtest.me";
const DEFAULT_APP_ID = "a6f22ae8-341b-4b4f-8c22-f590254c3c21";
const DEFAULT_CHAIN = KeybanChain.EthereumAnvil;

export default function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [config, setConfig] = React.useState<ConfigEditorProps["config"]>({
    apiUrl: searchParams.get("apiUrl") ?? DEFAULT_API_URL,
    appId: searchParams.get("appId") ?? DEFAULT_APP_ID,
    chain: (searchParams.get("chain") as KeybanChain) ?? DEFAULT_CHAIN,
  });

  React.useEffect(() => {
    setSearchParams((prev) => {
      prev.set("apiUrl", config.apiUrl?.toString() ?? "");
      prev.set("appId", config.appId);
      prev.set("chain", config.chain);

      return prev;
    });
  }, [config, setSearchParams]);

  const clientShareProvider = React.useMemo(
    () => new KeybanClientShareProvider(config.apiUrl!, config.appId),
    [config.apiUrl, config.appId],
  );

  return (
    <>
      <ConfigEditor config={config} onChange={setConfig} />

      <ErrorBoundary FallbackComponent={AppError}>
        <KeybanProvider
          apiUrl={config.apiUrl}
          appId={config.appId}
          chain={config.chain}
          clientShareProvider={clientShareProvider}
        >
          <KeybanTest />
        </KeybanProvider>
      </ErrorBoundary>
    </>
  );
}
