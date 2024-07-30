import type { Hex } from "viem";
import { KeybanSigner_EdDSA } from "./eddsa";
import { KeybanSigner_ECDSA } from "./ecdsa";

export interface KeybanSigner<Share> {
  storagePrefix: string;
  add(n1: number, n2: number): Promise<number>;
  dkg(keyId: string): Promise<Share>;
  sign(keyId: string, clientShare: Share, message: string): Promise<string>;
  publicKey(clientShare: Share): Promise<Hex>;
  clientPublicKey: (clientShare: Share) => string;
}

export const KeybanSigner = {
  EdDSA: KeybanSigner_EdDSA,
  ECDSA: KeybanSigner_ECDSA,
};
