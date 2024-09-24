import { Auth0ProviderOptions } from '@auth0/auth0-react';
import {
  KeybanChain,
  KeybanClientConfig,
  KeybanLocalStorage,
  KeybanSigner,
} from '@keyban/sdk-react';

const API_URL = {
  "https://waas-demo.demo.keyban.io": "https://api.demo.keyban.io",
  "https://waas-demo.testing.keyban.io": "https://api.testing.keyban.io",
  "https://waas-demo.keyban.localtest.me": "https://api.keyban.localtest.me",
  "http://localhost:4200": "https://api.keyban.localtest.me",
}[window.location.origin];

export type Config = {
  auth: Auth0ProviderOptions;
  keyban: KeybanClientConfig;
};
const config = {
  auth: {
    domain: "dev-dgn0003beuaahtmi.eu.auth0.com",
    clientId: "8VD9NHScJBXRh4AvynJAR2vmbT7imYKh",
    authorizationParams: {
      redirect_uri: window.location.origin,
      audience: API_URL,
    },
  },
  keybanProvider: {
    apiUrl: API_URL,
    appId: "8febdb3d-75d4-409c-8453-aa5d81e92926",
    chain: KeybanChain.Sepolia,
    signer: KeybanSigner.ECDSA,
    storage: KeybanLocalStorage,
  },
};

export default config;
