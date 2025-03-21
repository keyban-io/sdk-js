import { KeybanChain, KeybanClientShareProvider } from "@keyban/sdk-react";

const appId = "e7b8f9d2-3c4e-4f6e-9a7b-123456789def";

const apiUrl = {
  "http://localhost:4200": "https://api.keyban.localtest.me/v1",
  "https://dpp-app.beta.keyban.fr": "https://api.beta.keyban.io/v1",
  "https://dpp-app.testing.keyban.fr": "https://api.testing.keyban.io/v1",
  "https://dpp-app.marc.lvh.me": "https://api.keyban.localtest.me/v1",
  "https://dpp-app.sandbox.keyban.fr": "https://api.sandbox.keyban.io/v1",
}[window.location.origin] ?? "https://api.keyban.localtest.me/v1";
const storedChain = localStorage.getItem("selectedChain");
const defaultChain = window.location.origin === "https://dpp-app.beta.keyban.fr"
  ? KeybanChain.StarknetSepolia
  : KeybanChain.StarknetDevnet;
const chain = storedChain ? storedChain as KeybanChain : defaultChain;

const keybanConfig = {
  apiUrl,
  appId,
  chain,
  clientShareProvider: new KeybanClientShareProvider(),
};

export default keybanConfig;
