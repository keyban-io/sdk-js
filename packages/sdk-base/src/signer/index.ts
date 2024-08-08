import type { Hex } from 'viem';
import { KeybanSigner_ECDSA } from './ecdsa';
import { KeybanSigner_EdDSA } from './eddsa';

export interface KeybanSigner<Share> {
  storagePrefix: string;
  add(n1: number, n2: number): Promise<number>;
  dkg(keyId: string): Promise<Share>;
  sign(keyId: string, clientShare: Share, message: string): Promise<Hex>;
  publicKey(clientShare: Share): Promise<Hex>;
}

export const KeybanSigner = {
  EdDSA: KeybanSigner_EdDSA,
  ECDSA: KeybanSigner_ECDSA,
};
