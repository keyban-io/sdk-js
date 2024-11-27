import {
  KeybanChain,
  KeybanSigner,
} from "@keyban/sdk-react";

const API_URL = "https://api.demo.keyban.io";

export default {
  auth0: {
    domain: "dev-dgn0003beuaahtmi.eu.auth0.com",
    clientId: "8VD9NHScJBXRh4AvynJAR2vmbT7imYKh",
    authorizationParams: {
      redirect_uri: window.location.origin,
      audience: API_URL,
    }
  },
  keyban: {
    apiUrl: API_URL,
    appId: "d3f29b27-1c5d-4e6e-8b49-123456789abc",
    chain: KeybanChain.PolygonAmoy,
    signer: KeybanSigner.ECDSA,
  },
} as const;
