import * as chains from "viem/chains";

import { type IKeybanSigner, KeybanSigner } from "~/signer";
import { GqlChainType } from "~/gql-types";
// export { GqlChainType as KeybanChain } from "~/gql-types";

export type KeybanChain = GqlChainType;
export const KeybanChain = GqlChainType;

export const viemChainsMap: { [C in KeybanChain]: chains.Chain } = {
  [KeybanChain.KeybanTestnet]: chains.anvil,
  [KeybanChain.Sepolia]: chains.sepolia,
};

export const signersChainMap: { [C in KeybanChain]: new () => IKeybanSigner } =
  {
    [KeybanChain.KeybanTestnet]: KeybanSigner.ECDSA,
    [KeybanChain.Sepolia]: KeybanSigner.ECDSA,
  };
