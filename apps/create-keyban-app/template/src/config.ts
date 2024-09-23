import {
  KeybanChain,
  KeybanLocalStorage,
  KeybanSigner,
} from '@keyban/sdk-react';

const API_URL = "https://api.demo.keyban.io";

const config = {
  auth: {
    domain: "dev-dgn0003beuaahtmi.eu.auth0.com",
    clientId: "8VD9NHScJBXRh4AvynJAR2vmbT7imYKh",
    audience: API_URL,
  },
  keybanProvider: {
    apiUrl: API_URL,
    appId: "d3f29b27-1c5d-4e6e-8b49-123456789abc",
    chain: KeybanChain.Sepolia,
    signer: KeybanSigner.ECDSA,
    storage: KeybanLocalStorage,
  },
};

export default config;
