import initWasmFile, { add, dkg, sign } from 'eddsa-wasm-client';
import type { InitOutput } from 'eddsa-wasm-client';
import type { Hex } from 'viem';
import { SdkError } from '~/errors';
import type { KeybanSigner } from '~/signer';

export type ClientShare_EdDSA = {
  client_pubkey: string;
  secret_share: {
    version: string;
    keypair: string;
  };
  server_pubkey: string;
};

let wasmPromise: Promise<InitOutput> | undefined;

export function KeybanSigner_EdDSA(): KeybanSigner<ClientShare_EdDSA> {
  if (!WebAssembly)
    throw new SdkError(SdkError.types.WebAssemblyNotSupported, 'getSigner');

  wasmPromise ??= initWasmFile();

  const wrap =
    <Args extends any[], Ret = unknown>(
      fn: (...args: Args) => Ret | Promise<Ret>,
    ) =>
    async (...args: Args) => {
      await wasmPromise;
      return fn(...args);
    };

  return {
    storagePrefix: 'KEYBAN-EDDSA',

    add: wrap(add),
    dkg: wrap(dkg),
    sign: wrap((keyId, clientShare, message) =>
      sign(keyId, clientShare.secret_share, message),
    ),
    publicKey: wrap((clientShare) => clientShare.client_pubkey as Hex),
  };
}
