import {
  KeybanClientConfig,
  KeybanClientShareProvider,
  KeybanNetwork,
} from "@keyban/sdk-react";

const apiUrl =
  {
    "https://waas-demo.keyban.fr": "https://api.prod.keyban.io",
    "https://waas-demo.staging.keyban.fr": "https://api.staging.keyban.io",
    "https://waas-demo.testing.keyban.fr": "https://api.testing.keyban.io",
    "https://waas-demo.marc.lvh.me": "https://api.keyban.localtest.me",
    "http://localhost:4200": "https://api.keyban.localtest.me",
    "https://waas-demo.sandbox.keyban.fr": "https://api.sandbox.keyban.io",
  }[window.location.origin] ?? "https://api.prod.keyban.io";

const appId = "8febdb3d-75d4-409c-8453-aa5d81e92926";

export type Config = {
  keyban: KeybanClientConfig;
};

const config: Config = {
  keyban: {
    apiUrl,
    appId,
    network: KeybanNetwork.PolygonAmoy,
    clientShareProvider: new KeybanClientShareProvider(),
  },
};

export default config;
