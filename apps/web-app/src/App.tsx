import { generateKey, KeybanChain, KeybanProvider } from "@keyban/sdk-react";
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
const DEFAULT_CHAIN = KeybanChain.KeybanTestnet;

export default function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [config, setConfig] = React.useState<ConfigEditorProps["config"]>({
    apiUrl: searchParams.get("apiUrl") ?? DEFAULT_API_URL,
    appId: searchParams.get("appId") ?? DEFAULT_APP_ID,
    chain: (searchParams.get("chain") as KeybanChain) ?? DEFAULT_CHAIN,
  });

  React.useEffect(() => {
    setSearchParams((prev) => {
      prev.set("apiUrl", config.apiUrl ?? "");
      prev.set("appId", config.appId);
      prev.set("chain", config.chain);

      return prev;
    });
  }, [config, setSearchParams]);

  return (
    <>
      <ConfigEditor config={config} onChange={setConfig} />

      <ErrorBoundary FallbackComponent={AppError}>
        <KeybanProvider
          apiUrl={config.apiUrl}
          appId={config.appId}
          chain={config.chain}
          clientShareKeyProvider={async () => {
            try {
              return JSON.parse(localStorage.getItem("MYKEY") ?? "");
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (_err) {
              const key = await generateKey();
              localStorage.setItem("MYKEY", JSON.stringify(key));
              return key;
            }
          }}
        >
          <KeybanTest />
        </KeybanProvider>
      </ErrorBoundary>
    </>
  );
}
