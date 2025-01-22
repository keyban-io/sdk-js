import { KeybanChain, KeybanClientShareProvider } from "@keyban/sdk-react";
// import MyClientShareProvider from "./utils/MyClientShareProvider";

const appId = "e7b8f9d2-3c4e-4f6e-9a7b-123456789def";

const API_URL = {
  "http://localhost:5173": "https://api.keyban.localtest.me",
}[window.location.origin] ?? "https://api.keyban.localtest.me";

const keybanConfig = {
  apiUrl: API_URL,
  appId,
  chain: KeybanChain.KeybanTestnet,
  clientShareProvider: new KeybanClientShareProvider(API_URL, appId),
};

export default keybanConfig;
