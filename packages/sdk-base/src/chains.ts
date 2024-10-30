import * as chains from "viem/chains";

import { type IKeybanSigner, KeybanSigner } from "~/signer";

export enum KeybanChain {
  KeybanTestnet = "KeybanTestnet",
  Sepolia = "Sepolia",
  OptimismSepolia = "OptimismSepolia",
}

export const viemChainsMap: { [C in KeybanChain]: chains.Chain } = {
  [KeybanChain.KeybanTestnet]: chains.anvil,
  [KeybanChain.Sepolia]: chains.sepolia,
  [KeybanChain.OptimismSepolia]: chains.optimismSepolia,
};

export const signersChainMap: { [C in KeybanChain]: new () => IKeybanSigner } =
  {
    [KeybanChain.KeybanTestnet]: KeybanSigner.ECDSA,
    [KeybanChain.Sepolia]: KeybanSigner.ECDSA,
    [KeybanChain.OptimismSepolia]: KeybanSigner.ECDSA,
  };
