import * as chains from "viem/chains";
import { KeybanChain } from "~/index";

export { GqlChainType as KeybanChain } from "~/gql-types";

export const chainsMap: { [C in KeybanChain]: chains.Chain } = {
  [KeybanChain.KeybanTestnet]: chains.anvil,
  [KeybanChain.PolygonAmoy]: chains.polygonAmoy,
};
