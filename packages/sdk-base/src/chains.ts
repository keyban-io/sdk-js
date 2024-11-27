import * as chains from "viem/chains";

export enum KeybanChain {
  KeybanTestnet = "KeybanTestnet",
  PolygonAmoy = "PolygonAmoy",
}

export interface FeesUnit {
  symbol: string;
  decimals: number;
}

export const viemChainsMap: { [C in KeybanChain]: chains.Chain } = {
  [KeybanChain.KeybanTestnet]: chains.anvil,
  [KeybanChain.PolygonAmoy]: chains.polygonAmoy,
};

export const feesUnitChainsMap: { [C in KeybanChain]: FeesUnit } = {
  [KeybanChain.KeybanTestnet]: {
    symbol: "gwei",
    decimals: 9,
  },
  [KeybanChain.PolygonAmoy]: {
    symbol: "gwei",
    decimals: 9,
  },
};
