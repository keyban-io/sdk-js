import {
  KeybanChain,
} from "@keyban/sdk-react";

const API_URL = "https://api.beta.keyban.io";

export default {
  keyban: {
    apiUrl: API_URL,
    appId: "d3f29b27-1c5d-4e6e-8b49-123456789abc",
    chain: KeybanChain.PolygonAmoy,
  },
} as const;
