import {
  KeybanChain,
  KeybanClientConfig,
  KeybanClientShareProvider,
} from "@keyban/sdk-react";

const apiUrl =
  {
    "https://waas-demo.beta.keyban.fr": "https://api.beta.keyban.io",
    "https://waas-demo.testing.keyban.fr": "https://api.testing.keyban.io",
    "https://waas-demo.marc.lvh.me": "https://api.keyban.localtest.me",
    "http://localhost:4200": "https://api.keyban.localtest.me",
  }[window.location.origin] ?? "https://api.beta.keyban.io";

const appId = "8febdb3d-75d4-409c-8453-aa5d81e92926";

export type Config = {
  keyban: KeybanClientConfig;
};

const config: Config = {
  keyban: {
    apiUrl,
    appId,
    chain: KeybanChain.PolygonAmoy,
    clientShareProvider: new KeybanClientShareProvider(),
  },
};

export default config;
