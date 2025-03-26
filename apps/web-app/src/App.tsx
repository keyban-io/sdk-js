import {
  KeybanClientShareProvider,
  KeybanNetwork,
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
const DEFAULT_CHAIN = KeybanNetwork.EthereumAnvil;

export default function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [config, setConfig] = React.useState<ConfigEditorProps["config"]>({
    apiUrl: searchParams.get("apiUrl") ?? DEFAULT_API_URL,
    appId: searchParams.get("appId") ?? DEFAULT_APP_ID,
    network: (searchParams.get("network") as KeybanNetwork) ?? DEFAULT_CHAIN,
  });

  React.useEffect(() => {
    setSearchParams((prev) => {
      prev.set("apiUrl", config.apiUrl?.toString() ?? "");
      prev.set("appId", config.appId);
      prev.set("network", config.network);

      return prev;
    });
  }, [config, setSearchParams]);

  const clientShareProvider = React.useMemo(
    () => new KeybanClientShareProvider(),
    [],
  );

  return (
    <>
      <ConfigEditor config={config} onChange={setConfig} />

      <ErrorBoundary FallbackComponent={AppError}>
        <KeybanProvider
          apiUrl={config.apiUrl}
          appId={config.appId}
          network={config.network}
          clientShareProvider={clientShareProvider}
        >
          <KeybanTest />
        </KeybanProvider>
      </ErrorBoundary>
    </>
  );
}
