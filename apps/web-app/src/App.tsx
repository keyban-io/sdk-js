import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useSearchParams } from "react-router-dom";

import ConfigEditor, {
  ConfigEditorProps,
} from "@/components/organisms/ConfigEditor";
import KeybanTest from "@/KeybanTest";
import {
  KeybanChain,
  type KeybanClientConfig,
  KeybanLocalStorage,
  KeybanProvider,
  KeybanSigner,
} from "@keyban/sdk-react";
import AppError from "@/components/molecules/AppError";

const DEFAULT_API_URL = "https://api.keyban.localtest.me";
const DEFAULT_APP_ID = "INVALID_APP_ID";
const DEFAULT_ACCESS_TOKEN = "INVALID_ACCESS_TOKEN";
const DEFAULT_CHAIN = KeybanChain.KeybanTestnet;

const getSignerName = (config: Pick<KeybanClientConfig, "signer">) =>
  Object.entries(KeybanSigner).find(
    ([, value]) => value === config.signer,
  )?.[0];

export default function App() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [config, setConfig] = React.useState<ConfigEditorProps["config"]>({
    apiUrl: searchParams.get("apiUrl") ?? DEFAULT_API_URL,
    appId: searchParams.get("appId") ?? DEFAULT_APP_ID,
    accessToken: searchParams.get("accessToken") ?? DEFAULT_ACCESS_TOKEN,
    chain: (searchParams.get("chain") as KeybanChain) ?? DEFAULT_CHAIN,
    signer: KeybanSigner[searchParams.get("signer") ?? ""],
    storage: KeybanLocalStorage,
  });

  React.useEffect(() => {
    setSearchParams((prev) => {
      prev.set("apiUrl", config.apiUrl ?? "");
      prev.set("appId", config.appId);
      prev.set("accessToken", config.accessToken);
      prev.set("chain", config.chain);

      const signer = getSignerName(config);
      if (signer) prev.set("signer", signer);

      return prev;
    });
  }, [config, setSearchParams]);

  return (
    <>
      <ConfigEditor config={config} onChange={setConfig} />

      <ErrorBoundary FallbackComponent={AppError}>
        <KeybanProvider
          {...config}
          accessTokenProvider={() => config.accessToken}
        >
          <KeybanTest />
        </KeybanProvider>
      </ErrorBoundary>
    </>
  );
}
