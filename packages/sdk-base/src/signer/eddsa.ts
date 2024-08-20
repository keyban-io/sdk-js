import type { InitOutput } from "eddsa-wasm-client";
import initWasmFile, { dkg, sign } from "eddsa-wasm-client";
import { SdkError } from "~/errors";
import type { KeybanSigner } from "~/signer";

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
    throw new SdkError(SdkError.types.WebAssemblyNotSupported, "getSigner");

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
    storagePrefix: "KEYBAN-EDDSA",

    dkg: wrap(dkg),
    sign: wrap((keyId, clientShare, message, apiUrl) =>
      sign(keyId, clientShare.secret_share, message, apiUrl).then(
        (str) => `0x${str}` as const,
      ),
    ),
    publicKey: wrap((clientShare) => `0x${clientShare.client_pubkey}` as const),
  };
}
