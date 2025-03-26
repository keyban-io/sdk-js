import { KeybanNetwork, KeybanClientShareProvider, KeybanClientConfig } from "@keyban/sdk-react";

const appId = "e7b8f9d2-3c4e-4f6e-9a7b-123456789def";

const apiUrl = {
  "http://localhost:4200": "https://api.keyban.localtest.me/v1",
  "https://dpp-app.keyban.fr": "https://api.keyban.io/v1",
  "https://dpp-app.prod.keyban.fr": "https://api.prod.keyban.io/v1",
  "https://dpp-app.staging.keyban.fr": "https://api.staging.keyban.io/v1",
  "https://dpp-app.testing.keyban.fr": "https://api.testing.keyban.io/v1",
  "https://dpp-app.marc.lvh.me": "https://api.keyban.localtest.me/v1",
  "https://dpp-app.sandbox.keyban.fr": "https://api.sandbox.keyban.io/v1",
}[window.location.origin] ?? "https://api.keyban.localtest.me/v1";
const storedNetwork = localStorage.getItem("selectedNetwork");
const defaultChain = (window.location.origin === "https://dpp-app.keyban.fr" || window.location.origin === "https://dpp-app.prod.keyban.fr")
  ? KeybanNetwork.StarknetSepolia
  : KeybanNetwork.StarknetDevnet;
const network = storedNetwork ? storedNetwork as KeybanNetwork : defaultChain;

const keybanConfig: KeybanClientConfig = {
  apiUrl,
  appId,
  network,
  clientShareProvider: new KeybanClientShareProvider(),
};

export default keybanConfig;
